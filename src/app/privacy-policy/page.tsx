import React from "react";
import Layout from "@/components/Layout";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6 p-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>

        <p>
          STEAMer Academy (“we,” “us,” “our”) is committed to protecting the
          privacy of individuals who visit our website, engage with our
          services, or participate in our knowledge-sharing community. This
          Privacy Policy explains what information we collect, how we use it,
          and your rights concerning your data.
        </p>

        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>We collect information in the following ways:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Personal Information:</strong> When you voluntarily provide
            it, such as when signing up for our newsletter, contacting us, or
            participating in events, we may collect:
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Identifiers:</strong> such as your name and email
                address.
              </li>
            </ul>
          </li>
          <li>
            <strong>Usage Data:</strong> Automatically collected when you visit
            our website through cookies or similar technologies, such as:
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, and device information.
              </li>
              <li>
                <strong>Analytics Information:</strong> Pages visited, time
                spent, and interactions with our website.
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
        <p>
          We use the information we collect for purposes consistent with our
          mission and activities, including:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Knowledge Sharing:</strong> To enhance and tailor the
            content we provide, ensuring it aligns with our audience’s
            interests.
          </li>
          <li>
            <strong>Service Improvement:</strong> To understand how our website
            and services are used, allowing us to improve user experience.
          </li>
          <li>
            <strong>Communication:</strong> To send you updates about our
            organization, events, newsletters, and other relevant information.
            You can opt out of these communications at any time.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">3. How We Share Information</h2>
        <p>
          We do not sell, rent, or trade your personal information to third
          parties. However, we may share data in the following ways:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Service Providers:</strong> With third-party providers that
            help us operate our website and provide services (e.g., website
            hosting, analytics, and email marketing platforms). These partners
            are bound to protect your data and use it only for the intended
            purpose.
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required by law or in
            response to valid requests by public authorities.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">
          4. Data Protection and Retention
        </h2>
        <p>
          We take reasonable measures to protect the data we collect, including
          encryption and secure servers. We retain personal data only as long as
          necessary to fulfill our mission and meet legal requirements.
        </p>

        <h2 className="text-2xl font-semibold">5. Your Rights and Choices</h2>
        <p>You have the right to:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Access, Update, or Delete</strong> your personal
            information. If you wish to do so, please contact us using the
            details below.
          </li>
          <li>
            <strong>Opt-Out:</strong> If you no longer want to receive
            communications, you can opt out via the unsubscribe link in emails
            or by contacting us.
          </li>
          <li>
            <strong>Manage Cookies:</strong> You can adjust your cookie
            preferences through your browser settings.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">6. Cookies and Tracking</h2>
        <p>
          Our website uses cookies to improve your experience. Cookies help us
          understand how visitors engage with our content and allow us to
          customize certain website features. You can manage or disable cookies
          through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold">
          7. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any significant
          changes will be posted on this page, and we will notify you by email
          or through our website if required.
        </p>

        <h2 className="text-2xl font-semibold">8. Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, or if you
          wish to exercise your rights, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> support@steameracademy.me <br />
          <strong>Mailing Address:</strong> Dhaka, Bangladesh
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
