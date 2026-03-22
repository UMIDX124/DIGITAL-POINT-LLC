import type { Metadata } from 'next';
import { Section, Container } from '@/components/ui-dp/AnimatedElements';
import { FadeUp } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service | Digital Point LLC',
  description:
    'Terms of Service for Digital Point LLC. Review the terms governing your use of digitalpointllc.com, our marketing services, tools, and content.',
  alternates: {
    canonical: 'https://digitalpointllc.com/terms-of-service',
  },
};

const sectionHeadingClass =
  'font-display text-2xl md:text-3xl font-bold text-white mt-12 mb-4';

const bodyTextClass = 'text-[#b794c7] leading-relaxed mb-4';

const secondaryTextClass = 'text-[#9080a0] leading-relaxed mb-4';

export default function TermsOfServicePage() {
  return (
    <Section className="pt-32 pb-20">
      <Container size="narrow">
        <FadeUp>
          <Breadcrumbs
            items={[{ label: 'Terms of Service', href: '/terms-of-service' }]}
          />

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-4">
            Terms of Service
          </h1>
          <p className={secondaryTextClass}>
            Last updated: March 23, 2026
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="max-w-3xl">
            <p className={bodyTextClass}>
              Welcome to digitalpointllc.com. These Terms of Service
              (&quot;Terms&quot;) govern your access to and use of the website
              operated by Digital Point LLC (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;). By accessing or using our website, you agree to
              be bound by these Terms. If you do not agree, please do not use
              our website.
            </p>

            {/* Acceptance of Terms */}
            <h2 className={sectionHeadingClass}>1. Acceptance of Terms</h2>
            <p className={bodyTextClass}>
              By accessing, browsing, or using digitalpointllc.com, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms and our Privacy Policy. These Terms apply to all
              visitors, users, and others who access the website. If you are
              using the website on behalf of an organization, you represent that
              you have the authority to bind that organization to these Terms.
            </p>

            {/* Description of Services */}
            <h2 className={sectionHeadingClass}>2. Description of Services</h2>
            <p className={bodyTextClass}>
              Digital Point LLC is a performance marketing agency. Through our
              website and direct engagements, we offer the following services
              and resources:
            </p>
            <ul className="list-disc list-inside text-[#b794c7] leading-relaxed mb-4 space-y-2 pl-2">
              <li>
                <span className="text-white font-medium">
                  Performance Marketing
                </span>{' '}
                — Paid media management, campaign strategy, and data-driven
                advertising across search, social, display, and shopping
                channels.
              </li>
              <li>
                <span className="text-white font-medium">
                  Remote Workforce Solutions
                </span>{' '}
                — Dedicated remote marketing teams and operational support
                tailored to your business needs.
              </li>
              <li>
                <span className="text-white font-medium">
                  Systems &amp; Reporting
                </span>{' '}
                — Custom dashboards, analytics implementation, and reporting
                infrastructure to track and optimize performance.
              </li>
              <li>
                <span className="text-white font-medium">
                  Free Growth Audits
                </span>{' '}
                — Complimentary assessments of your current marketing
                performance with actionable recommendations.
              </li>
              <li>
                <span className="text-white font-medium">
                  Interactive Tools &amp; Calculators
                </span>{' '}
                — Free browser-based marketing tools and calculators available
                on our website for informational and estimation purposes.
              </li>
              <li>
                <span className="text-white font-medium">Blog Content</span> —
                Educational articles, guides, and industry insights published
                on our blog to help marketers and business owners make informed
                decisions.
              </li>
            </ul>
            <p className={bodyTextClass}>
              The availability, scope, and features of our services may change
              at any time without prior notice.
            </p>

            {/* Use of Website */}
            <h2 className={sectionHeadingClass}>3. Use of Website</h2>
            <p className={bodyTextClass}>
              You agree to use digitalpointllc.com only for lawful purposes and
              in accordance with these Terms.
            </p>
            <p className="text-white font-medium mb-2">Acceptable Use</p>
            <p className={bodyTextClass}>
              You may browse the website, use our free tools and calculators,
              read our blog content, subscribe to our newsletter, and submit
              inquiries through our contact forms for legitimate business or
              informational purposes.
            </p>
            <p className="text-white font-medium mb-2">Prohibited Conduct</p>
            <p className={bodyTextClass}>You agree not to:</p>
            <ul className="list-disc list-inside text-[#b794c7] leading-relaxed mb-4 space-y-2 pl-2">
              <li>
                Use the website in any way that violates applicable local,
                state, national, or international law or regulation.
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                website, its servers, or any connected systems or networks.
              </li>
              <li>
                Introduce viruses, trojans, worms, or other malicious or
                technologically harmful material.
              </li>
              <li>
                Scrape, data-mine, or use automated systems to extract content
                from the website without our written permission.
              </li>
              <li>
                Impersonate or attempt to impersonate Digital Point LLC, an
                employee, another user, or any other person or entity.
              </li>
              <li>
                Interfere with or disrupt the website or the servers and
                networks connected to it.
              </li>
            </ul>

            {/* Intellectual Property */}
            <h2 className={sectionHeadingClass}>4. Intellectual Property</h2>
            <p className={bodyTextClass}>
              All content on digitalpointllc.com, including but not limited to
              text, graphics, logos, images, audio, video, software, tools,
              calculators, and the overall design and layout, is the property of
              Digital Point LLC or its licensors and is protected by United
              States and international copyright, trademark, and other
              intellectual property laws.
            </p>
            <p className={bodyTextClass}>
              You may not reproduce, distribute, modify, create derivative
              works from, publicly display, publicly perform, republish,
              download, store, or transmit any material from our website without
              our prior written consent, except for temporary caching or as
              otherwise permitted by applicable law.
            </p>

            {/* Free Tools & Calculators */}
            <h2 className={sectionHeadingClass}>
              5. Free Tools &amp; Calculators
            </h2>
            <p className={bodyTextClass}>
              Digital Point LLC provides free interactive tools and calculators
              on our website for general informational and estimation purposes
              only. The outputs generated by these tools are based on the inputs
              you provide and general industry assumptions.
            </p>
            <p className={bodyTextClass}>
              These tools do not constitute financial, investment, legal, tax,
              or professional advice of any kind. You should not rely solely on
              the results from our tools to make business or financial
              decisions. We strongly recommend consulting with qualified
              professionals before acting on any information obtained through
              our tools.
            </p>
            <p className={bodyTextClass}>
              Digital Point LLC makes no representations or warranties regarding
              the accuracy, completeness, or reliability of the outputs produced
              by our tools and calculators.
            </p>

            {/* Newsletter & Communications */}
            <h2 className={sectionHeadingClass}>
              6. Newsletter &amp; Communications
            </h2>
            <p className={bodyTextClass}>
              By subscribing to our newsletter or submitting your contact
              information through our website, you consent to receive periodic
              emails from Digital Point LLC, including marketing communications,
              industry insights, and company updates. You may unsubscribe at any
              time by clicking the unsubscribe link included in every email or
              by contacting us directly at info@digitalpointllc.com.
            </p>
            <p className={bodyTextClass}>
              We will handle your personal information in accordance with our
              Privacy Policy.
            </p>

            {/* Third-Party Links */}
            <h2 className={sectionHeadingClass}>7. Third-Party Links</h2>
            <p className={bodyTextClass}>
              Our website may contain links to third-party websites, services,
              or resources that are not owned or controlled by Digital Point
              LLC. We have no control over and assume no responsibility for the
              content, privacy policies, or practices of any third-party
              websites or services. You acknowledge and agree that Digital Point
              LLC shall not be responsible or liable, directly or indirectly,
              for any damage or loss caused or alleged to be caused by or in
              connection with the use of any such third-party content, goods, or
              services.
            </p>

            {/* Limitation of Liability */}
            <h2 className={sectionHeadingClass}>8. Limitation of Liability</h2>
            <p className={bodyTextClass}>
              To the fullest extent permitted by applicable law, Digital Point
              LLC and its officers, directors, employees, agents, and affiliates
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to
              loss of profits, data, business opportunities, or goodwill,
              arising out of or related to your use of or inability to use the
              website, our tools, or any content or services provided through
              the website.
            </p>
            <p className={bodyTextClass}>
              In no event shall our total liability to you for all claims
              arising from or related to your use of the website exceed the
              amount you paid to Digital Point LLC, if any, during the twelve
              (12) months preceding the claim.
            </p>

            {/* Disclaimer of Warranties */}
            <h2 className={sectionHeadingClass}>
              9. Disclaimer of Warranties
            </h2>
            <p className={bodyTextClass}>
              The website and all content, tools, calculators, and services
              provided through it are offered on an &quot;as is&quot; and
              &quot;as available&quot; basis without warranties of any kind,
              whether express or implied, including but not limited to implied
              warranties of merchantability, fitness for a particular purpose,
              non-infringement, or course of performance.
            </p>
            <p className={bodyTextClass}>
              Digital Point LLC does not warrant that the website will be
              uninterrupted, error-free, secure, or free of viruses or other
              harmful components. We do not guarantee the accuracy or
              completeness of any information, tools, or content on the website.
            </p>

            {/* Governing Law */}
            <h2 className={sectionHeadingClass}>10. Governing Law</h2>
            <p className={bodyTextClass}>
              These Terms shall be governed by and construed in accordance with
              the laws of the United States. Any disputes arising out of or
              relating to these Terms or your use of the website shall be
              resolved in the courts of competent jurisdiction within the United
              States.
            </p>

            {/* Changes to Terms */}
            <h2 className={sectionHeadingClass}>11. Changes to Terms</h2>
            <p className={bodyTextClass}>
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. If we make material changes, we will
              update the &quot;Last updated&quot; date at the top of this page.
              Your continued use of the website after any changes constitutes
              acceptance of the new Terms. We encourage you to review these
              Terms periodically.
            </p>

            {/* Contact Information */}
            <h2 className={sectionHeadingClass}>12. Contact Information</h2>
            <p className={bodyTextClass}>
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="mt-2 mb-8">
              <p className="text-white font-medium">Digital Point LLC</p>
              <p className={secondaryTextClass}>
                Email:{' '}
                <a
                  href="mailto:info@digitalpointllc.com"
                  className="text-[#c77dff] hover:text-[#e0aaff] transition-colors underline"
                >
                  info@digitalpointllc.com
                </a>
              </p>
              <p className={secondaryTextClass}>
                Website:{' '}
                <a
                  href="https://digitalpointllc.com"
                  className="text-[#c77dff] hover:text-[#e0aaff] transition-colors underline"
                >
                  digitalpointllc.com
                </a>
              </p>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
