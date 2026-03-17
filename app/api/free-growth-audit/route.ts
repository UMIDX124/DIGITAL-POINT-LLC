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

    try {
      parsed = JSON.parse(rawBody) as UpstreamResponse;
    } catch {
      parsed = null;
    }

    if (!upstreamResponse.ok || !isSuccess(parsed?.success)) {
      const upstreamMessage = parsed?.message || "Form submission failed";

      if (upstreamMessage.toLowerCase().includes("activation")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "The inbox connection needs one-time activation on the current live domain. Please activate the latest FormSubmit email once, then submissions will work normally.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: upstreamMessage,
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
