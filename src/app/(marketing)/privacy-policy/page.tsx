import type { Metadata } from 'next';
import { Section, Container, FadeUp } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Point LLC',
  description:
    'Privacy Policy for Digital Point LLC. Learn how we collect, use, and protect your information when you visit digitalpointllc.com.',
  alternates: {
    canonical: 'https://digitalpointllc.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Digital Point LLC',
    description:
      'Privacy Policy for Digital Point LLC. Learn how we collect, use, and protect your information.',
    url: 'https://digitalpointllc.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-32 pb-20">
      <Container>
        <FadeUp>
          <div className="mb-8">
            <Breadcrumbs
              items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]}
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#9080a0] text-sm mb-12">
              Last updated: March 23, 2026
            </p>

            <div className="space-y-10 text-[#b794c7] leading-relaxed">
              <p>
                Digital Point LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website
                digitalpointllc.com (the &quot;Site&quot;). This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our Site. By using the Site, you agree to the practices
                described in this policy.
              </p>

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Information We Collect
                </h2>
                <p className="mb-4">
                  We may collect the following types of information when you
                  interact with our Site:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-medium text-white">Analytics Data:</span>{' '}
                    We use Google Analytics 4 (GA4) to collect anonymized usage
                    data, including pages visited, session duration, referral
                    sources, device type, browser type, and approximate
                    geographic location. This data is aggregated and does not
                    personally identify you.
                  </li>
                  <li>
                    <span className="font-medium text-white">Contact Information:</span>{' '}
                    When you submit a contact form, subscribe to our newsletter,
                    or otherwise voluntarily provide information, we may collect
                    your name, email address, company name, and any message
                    content you include.
                  </li>
                  <li>
                    <span className="font-medium text-white">Cookies and Tracking Technologies:</span>{' '}
                    We use cookies, pixels, and similar technologies to enhance
                    your browsing experience, analyze site traffic, and serve
                    relevant advertisements. See the Cookie Policy section below
                    for details.
                  </li>
                </ul>
              </div>

              {/* Google AdSense & Advertising Cookies */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Google AdSense and Advertising Cookies
                </h2>
                <p className="mb-4">
                  We use Google AdSense to display advertisements on our Site.
                  Google AdSense uses cookies to serve ads based on your prior
                  visits to our Site and other websites. Google&apos;s use of
                  advertising cookies enables it and its partners to serve ads
                  based on your browsing patterns.
                </p>
                <p className="mb-4">
                  Third-party vendors, including Google, use cookies to serve ads
                  based on your prior visits to this website or other websites.
                  You may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or the{' '}
                  <a
                    href="https://optout.networkadvertising.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                  >
                    Network Advertising Initiative opt-out page
                  </a>
                  .
                </p>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  How We Use Information
                </h2>
                <p className="mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>To operate, maintain, and improve our Site</li>
                  <li>To respond to your inquiries and fulfill your requests</li>
                  <li>
                    To send periodic emails related to our services, if you have
                    opted in to receive communications
                  </li>
                  <li>
                    To analyze usage trends and measure the effectiveness of our
                    content and marketing efforts
                  </li>
                  <li>To serve relevant advertisements via Google AdSense</li>
                  <li>
                    To detect, prevent, and address technical issues or security
                    threats
                  </li>
                </ul>
              </div>

              {/* Third-Party Services */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Third-Party Services
                </h2>
                <p className="mb-4">
                  We rely on the following third-party services to operate and
                  improve our Site. Each service has its own privacy policy
                  governing data collection and use:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-medium text-white">Google Analytics 4 (GA4):</span>{' '}
                    Used for website analytics and traffic measurement. Data is
                    processed by Google LLC. See{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                    >
                      Google&apos;s Privacy Policy
                    </a>
                    .
                  </li>
                  <li>
                    <span className="font-medium text-white">Google AdSense:</span>{' '}
                    Used to display advertisements. Google may use cookies and
                    tracking technologies to personalize ads. See{' '}
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                    >
                      Google&apos;s Advertising Policies
                    </a>
                    .
                  </li>
                  <li>
                    <span className="font-medium text-white">Vercel:</span>{' '}
                    Our Site is hosted on Vercel. Vercel may collect server logs,
                    including IP addresses and request metadata, as part of
                    standard hosting operations. See{' '}
                    <a
                      href="https://vercel.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                    >
                      Vercel&apos;s Privacy Policy
                    </a>
                    .
                  </li>
                </ul>
              </div>

              {/* Cookie Policy */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Cookie Policy
                </h2>
                <p className="mb-4">
                  Cookies are small text files placed on your device when you
                  visit a website. We use the following types of cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-medium text-white">Essential Cookies:</span>{' '}
                    Required for the Site to function properly, such as session
                    management and security.
                  </li>
                  <li>
                    <span className="font-medium text-white">Analytics Cookies:</span>{' '}
                    Used by Google Analytics to understand how visitors interact
                    with our Site. These cookies collect anonymized data about
                    page views, session duration, and navigation paths.
                  </li>
                  <li>
                    <span className="font-medium text-white">Advertising Cookies:</span>{' '}
                    Used by Google AdSense and its partners to deliver relevant
                    ads and measure ad performance.
                  </li>
                </ul>
                <p className="mt-4">
                  You can manage or disable cookies through your browser
                  settings. Note that disabling certain cookies may affect the
                  functionality of the Site.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Data Retention
                </h2>
                <p>
                  We retain personal information (such as email addresses
                  collected through forms) only for as long as necessary to
                  fulfill the purpose for which it was collected or as required
                  by law. Analytics data collected through Google Analytics is
                  retained according to our GA4 data retention settings, which
                  is typically 14 months. You may request deletion of your
                  personal data at any time by contacting us.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Your Rights
                </h2>
                <p className="mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal data, including:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-medium text-white">Opt out of personalized advertising:</span>{' '}
                    You can opt out of personalized ads by visiting{' '}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                    >
                      Google Ads Settings
                    </a>{' '}
                    or by adjusting your browser&apos;s cookie preferences.
                  </li>
                  <li>
                    <span className="font-medium text-white">Unsubscribe from emails:</span>{' '}
                    Every marketing email we send includes an unsubscribe link.
                    You may also contact us directly to be removed from our
                    mailing list.
                  </li>
                  <li>
                    <span className="font-medium text-white">Access and deletion:</span>{' '}
                    You may request access to the personal data we hold about
                    you, or request that we delete it, by emailing us at the
                    address below.
                  </li>
                </ul>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Children&apos;s Privacy
                </h2>
                <p>
                  Our Site is not directed to children under the age of 13. We
                  do not knowingly collect personal information from children
                  under 13. If we become aware that we have inadvertently
                  collected personal data from a child under 13, we will take
                  steps to delete that information as quickly as possible. If you
                  believe a child under 13 has provided us with personal
                  information, please contact us at{' '}
                  <a
                    href="mailto:info@digitalpointllc.com"
                    className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                  >
                    info@digitalpointllc.com
                  </a>
                  .
                </p>
              </div>

              {/* Changes to This Policy */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technology, legal requirements, or
                  other factors. When we make changes, we will update the
                  &quot;Last updated&quot; date at the top of this page. We encourage
                  you to review this page periodically to stay informed about
                  how we protect your information.
                </p>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                  <p className="font-medium text-white">Digital Point LLC</p>
                  <p className="mt-1">
                    Email:{' '}
                    <a
                      href="mailto:info@digitalpointllc.com"
                      className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                    >
                      info@digitalpointllc.com
                    </a>
                  </p>
                  <p className="mt-1">
                    Website:{' '}
                    <a
                      href="https://digitalpointllc.com"
                      className="text-white underline underline-offset-2 hover:text-[#b794c7] transition-colors"
                    >
                      digitalpointllc.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
