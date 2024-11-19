import { IoIosArrowBack } from "react-icons/io";
import coffee from '../assets/coffee&code.png'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <a href="/" className=' flex items-center'><IoIosArrowBack/>back</a>
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="text-center text-gray-600">Effective Date: 2023-10-02</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
        <p className="text-gray-700  ">
          Welcome to  <span className=" w-32 h-10 font-semibold italic  items-center">  chill&code! </span>
          This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or use our services. By using our website, you agree to the collection and use of information in accordance with this policy.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed">
          We collect several types of information for various purposes to provide and improve our services to you. The information we may collect includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li><strong>Personal Data:</strong> This includes information like your name, email address, and phone number, which you provide when signing up for newsletters, contacting us, or making a purchase.</li>
          <li><strong>Usage Data:</strong> We may collect information about how the website is accessed and used, such as your IP address, browser type, and pages visited.</li>
          <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can choose to disable cookies in your browser settings.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed">
          We use the collected information for various purposes, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>To provide and maintain our services</li>
          <li>To notify you about changes to our website or services</li>
          <li>To allow you to participate in interactive features of our services</li>
          <li>To provide customer support and respond to your inquiries</li>
          <li>To gather analysis or valuable information to improve our services</li>
          <li>To monitor the usage of our website</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Sharing and Disclosure</h2>
        <p className="text-gray-700 leading-relaxed">
          We do not sell or rent your personal data to third parties. However, we may share information in the following cases:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our services, such as hosting providers, analytics services, and payment processors. These third parties have access to your personal data but are obligated not to disclose or use it for any other purpose.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your personal data if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We take the security of your personal information seriously and use reasonable measures to protect it from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Data Protection Rights</h2>
        <p className="text-gray-700 leading-relaxed">
          Depending on your location, you may have certain rights regarding your personal data, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4">
          <li>The right to access the personal data we hold about you.</li>
          <li>The right to request the correction of inaccurate data.</li>
          <li>The right to request the deletion of your personal data, under certain conditions.</li>
          <li>The right to object to or restrict processing of your personal data.</li>
          <li>The right to data portability, allowing you to transfer your data to another service provider.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          To exercise these rights, please contact us at the contact information provided below.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
        <p className="text-gray-700 leading-relaxed">
          Our website may contain links to external sites that are not operated by us. We are not responsible for the privacy practices or the content of third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Changes to This Privacy Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any updates. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-none mt-4">
          <li>Email: <a href="mailto:nathanleg23@gmail.com" className="text-blue-500 hover:underline">nathanleg23@gmail.com</a></li>
        </ul>
      </section>
    </div>
  )
}

export default PrivacyPolicy
