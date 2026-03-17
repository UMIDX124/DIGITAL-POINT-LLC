"use client";

import { useEffect, useRef, useState } from "react";

import { CTAButton } from "@/components/ui/cta-button";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/content";

type SubmitState = "idle" | "submitting" | "success" | "error";

type StatusContent = {
  title: string;
  body: string;
  support?: string;
};

const serviceOptions = [
  "Growth Systems",
  "Revenue Marketing",
  "Remote Execution",
  "Need help deciding",
];

export function StrategyCallForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusContent, setStatusContent] = useState<StatusContent>({
    title: "Request your free growth audit.",
    body: "Submit the form and request your free growth audit without leaving the page.",
    support: "You will stay on the same page and see confirmation here once everything is sent.",
  });
  const [currentUrl, setCurrentUrl] = useState(siteConfig.siteUrl);
  const hasTrackedStart = useRef(false);
  const [attribution, setAttribution] = useState({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    referrer: "",
  });

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const searchParams = new URLSearchParams(window.location.search);

    setAttribution({
      utmSource: searchParams.get("utm_source") ?? "",
      utmMedium: searchParams.get("utm_medium") ?? "",
      utmCampaign: searchParams.get("utm_campaign") ?? "",
      utmTerm: searchParams.get("utm_term") ?? "",
      utmContent: searchParams.get("utm_content") ?? "",
      referrer: document.referrer || "",
    });
  }, []);

  const handleFormStart = () => {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent("lead_form_start", {
      section: "final_cta",
      form_type: "free_growth_audit",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const subject = `Free Growth Audit Request${company ? ` - ${company}` : ""}`;

    formData.set("_subject", subject);
    formData.set("_template", "table");
    formData.set("_honey", "");
    formData.set("_captcha", "false");
    formData.set("_replyto", email);
    formData.set("_url", currentUrl);
    formData.set("page_url", currentUrl);
    formData.set("utm_source", attribution.utmSource);
    formData.set("utm_medium", attribution.utmMedium);
    formData.set("utm_campaign", attribution.utmCampaign);
    formData.set("utm_term", attribution.utmTerm);
    formData.set("utm_content", attribution.utmContent);
    formData.set("referrer", attribution.referrer);
    formData.set(
      "_autoresponse",
      "Thank you. We received your free growth audit request and will review it shortly."
    );

    setSubmitState("submitting");
    setStatusContent({
      title: "Sending your request...",
      body: "We are securely sending your details now.",
      support: "This usually takes just a moment.",
    });

    try {
      const response = await fetch(siteConfig.formSubmitAction, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = (await response.json()) as { success?: string | boolean; message?: string };

      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error(result.message || "Form submission failed");
      }

      form.reset();
      setSubmitState("success");
      setStatusContent({
        title: "Thanks — your request was received.",
        body: "We will review your details and follow up with practical next steps shortly.",
        support: "This is a no-pressure review. If there is a fit, we will show you where to focus first.",
      });
      trackEvent("lead_form_submit_success", {
        section: "final_cta",
        form_type: "free_growth_audit",
        primary_focus_area: String(formData.get("service") ?? ""),
      });
    } catch {
      setSubmitState("error");
      setStatusContent({
        title: "We could not send your request.",
        body: "Please try again in a moment, or use the direct email option below.",
        support: "Your details are not lost unless the request is successfully submitted.",
      });
    }
  };

  return (
    <form
      id="strategy-call-form"
      onSubmit={handleSubmit}
      tabIndex={-1}
      onFocusCapture={handleFormStart}
      onInputCapture={handleFormStart}
      className="scroll-mt-32 rounded-[30px] border border-white/12 bg-white/8 p-8 text-white shadow-[0_24px_80px_rgba(18,9,35,0.18)] backdrop-blur-md sm:scroll-mt-36"
    >
      <div className="flex flex-col gap-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/56">Free growth audit</p>
        <h3 className="text-[28px] font-semibold leading-[1.16] tracking-[-0.04em] text-white">Request a direct founder-led review.</h3>
        <p className="text-[15px] leading-[1.8] text-white/68">
          Share a few details and we will review your current growth bottlenecks, systems gaps, and best next step without redirecting you away from the page.
        </p>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {[
            "No-pressure audit",
            "Practical recommendations",
            "Clear next steps",
          ].map((item) => (
            <div key={item} className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-[13px] font-medium text-white/78">
              {item}
            </div>
          ))}
        </div>
      </div>

      <input type="hidden" name="_honey" value="" />
      <input type="hidden" name="_url" value={currentUrl} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="utm_source" value={attribution.utmSource} />
      <input type="hidden" name="utm_medium" value={attribution.utmMedium} />
      <input type="hidden" name="utm_campaign" value={attribution.utmCampaign} />
      <input type="hidden" name="utm_term" value={attribution.utmTerm} />
      <input type="hidden" name="utm_content" value={attribution.utmContent} />
      <input type="hidden" name="referrer" value={attribution.referrer} />
      <input type="hidden" name="page_url" value={currentUrl} />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-white">Full name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 placeholder:text-white/36 focus:border-white/28"
            placeholder="Your full name"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-white">Work email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 placeholder:text-white/36 focus:border-white/28"
            placeholder="you@company.com"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-white">Company</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            required
            className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 placeholder:text-white/36 focus:border-white/28"
            placeholder="Company name"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-white">Website</span>
          <input
            name="website"
            type="url"
            autoComplete="url"
            className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 placeholder:text-white/36 focus:border-white/28"
            placeholder="https://yourcompany.com"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-white">Primary focus area</span>
          <select
            name="service"
            required
            defaultValue=""
            className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 focus:border-white/28"
          >
            <option value="" disabled className="text-ink">
              Select the closest fit
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option} className="text-ink">
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium text-white">Monthly revenue or team size</span>
          <input
            name="companyScale"
            type="text"
            className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 placeholder:text-white/36 focus:border-white/28"
            placeholder="e.g. 10-25 employees or $100k/mo"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[14px] font-medium text-white">Biggest bottleneck right now</span>
          <input
            name="bottleneck"
            type="text"
            required
            className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 placeholder:text-white/36 focus:border-white/28"
            placeholder="e.g. poor lead handoff, weak reporting, founder bottleneck, inconsistent pipeline"
          />
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-[14px] font-medium text-white">What would a good outcome look like?</span>
          <textarea
            name="goals"
            rows={5}
            required
            className="min-h-32 rounded-[24px] border border-white/12 bg-white/8 px-4 py-3 text-base text-white outline-none transition-colors duration-150 placeholder:text-white/36 focus:border-white/28"
            placeholder="Tell us what you want to improve over the next 90 days and where support would be most useful."
          />
        </label>
      </div>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CTAButton type="submit" className="min-w-[220px]" disabled={submitState === "submitting"}>
          {submitState === "submitting"
            ? "Sending Audit Request..."
            : submitState === "success"
              ? "Request Received"
              : "Request Free Growth Audit"}
        </CTAButton>
        <a
          href={siteConfig.bookingEmailHref}
          className="text-[14px] leading-[1.7] text-[#FFCAD7] transition-colors duration-150 hover:text-white"
        >
          Prefer direct email? {siteConfig.email}
        </a>
      </div>

      <p className="mt-4 text-[13px] leading-[1.7] text-white/54">
        No-pressure review. If there is a fit, we will share practical recommendations and a clear next step.
      </p>

      <div
        aria-live="polite"
        aria-atomic="true"
        className={`mt-4 rounded-2xl border px-4 py-4 text-[14px] leading-[1.7] ${
          submitState === "success"
            ? "border-emerald-400/22 bg-emerald-400/10 text-emerald-50"
            : submitState === "error"
              ? "border-rose-300/20 bg-rose-300/10 text-rose-100"
              : submitState === "submitting"
                ? "border-white/14 bg-white/8 text-white/76"
                : "border-white/10 bg-white/6 text-white/56"
        }`}
      >
        <p className="font-medium text-inherit">{statusContent.title}</p>
        <p className="mt-1 text-inherit/90">{statusContent.body}</p>
        {statusContent.support ? <p className="mt-2 text-[13px] text-inherit/75">{statusContent.support}</p> : null}
      </div>
    </form>
  );
}
