import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/content";

type UpstreamResponse = {
  success?: string | boolean;
  message?: string;
};

function getStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function isSuccess(value: UpstreamResponse["success"]) {
  return value === true || value === "true" || value === "success";
}

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const incomingFormData = await request.formData();
    const outboundFormData = new FormData();

    for (const [key, value] of incomingFormData.entries()) {
      outboundFormData.set(key, getStringValue(value));
    }

    const email = getStringValue(incomingFormData.get("email")).trim();
    const company = getStringValue(incomingFormData.get("company")).trim();
    const pageUrl = getStringValue(incomingFormData.get("page_url")) || request.headers.get("referer") || siteConfig.siteUrl;
    const subject = `Free Growth Audit Request${company ? ` - ${company}` : ""}`;

    outboundFormData.set("_subject", subject);
    outboundFormData.set("_template", "table");
    outboundFormData.set("_honey", "");
    outboundFormData.set("_captcha", "false");
    outboundFormData.set("_replyto", email);
    outboundFormData.set("_url", pageUrl);
    outboundFormData.set("page_url", pageUrl);
    outboundFormData.set(
      "_autoresponse",
      "Thank you. We received your free growth audit request and will review it shortly."
    );

    const origin = request.headers.get("origin") || new URL(pageUrl).origin;
    const referer = request.headers.get("referer") || pageUrl;

    const upstreamResponse = await fetch(siteConfig.formSubmitAction, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Origin: origin,
        Referer: referer,
      },
      body: outboundFormData,
      cache: "no-store",
    });

    const rawBody = await upstreamResponse.text();
    let parsed: UpstreamResponse | null = null;
    const normalizedBody = rawBody.toLowerCase();

    try {
      parsed = JSON.parse(rawBody) as UpstreamResponse;
    } catch {
      parsed = null;
    }

    if (!upstreamResponse.ok || !isSuccess(parsed?.success)) {
      const upstreamMessage = parsed?.message || rawBody || "Form submission failed";
      const normalizedMessage = upstreamMessage.toLowerCase();
      const cleanedMessage = stripHtml(upstreamMessage);

      if (normalizedMessage.includes("activation") || normalizedBody.includes("activation")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "FormSubmit still needs one-time activation for the current live domain. Please open the latest activation email from FormSubmit and click the activation link once.",
          },
          { status: 503 }
        );
      }

      if (normalizedMessage.includes("make sure you open this page through a web server") || normalizedBody.includes("make sure you open this page through a web server")) {
        return NextResponse.json(
          {
            success: false,
            message: "The upstream form service rejected this request unexpectedly. Please try again in a moment.",
          },
          { status: 502 }
        );
      }

      if (
        normalizedBody.includes("<!doctype html") ||
        normalizedBody.includes("<html") ||
        normalizedBody.includes("just a moment") ||
        normalizedBody.includes("cloudflare")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "The form service is temporarily blocking the request. Please try again in a minute, or use the direct email option below.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            cleanedMessage && cleanedMessage.length < 220
              ? cleanedMessage
              : "We could not deliver the request right now. Please try again in a moment, or use the direct email option below.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "We could not process your request right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
