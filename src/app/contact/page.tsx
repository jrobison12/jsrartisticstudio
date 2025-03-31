import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact | Jeanette S. Robison',
  description: 'Get in touch with Jeanette S. Robison for portrait commissions, artwork inquiries, or general questions.',
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Hero Section */}
      <section className="relative bg-[#2c392c] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#e9e2d3] mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-[#e9e2d3]/90 leading-relaxed mb-8">
              I'd love to hear from you about portrait commissions, artwork inquiries, or any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Direct Contact */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-serif text-[#2c392c] mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#d4a373]">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#2c392c]/80">(724) 674-8757</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#d4a373]">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                  <p className="text-[#2c392c]/80">jsrartisticstudios@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#d4a373]">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#2c392c]/80">New Castle, Pennsylvania</p>
                </div>
              </div>
            </div>

            {/* Commission Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-serif text-[#2c392c] mb-6">Portrait Commissions</h2>
              <p className="text-[#2c392c]/80 mb-6">
                Interested in commissioning a portrait? Fill out our commission request form to get started. 
                I'll review your requirements and get back to you to discuss the details.
              </p>
              <Link
                href="/commission-form"
                className="inline-block px-6 py-3 bg-[#d4a373] text-white rounded-full
                         hover:bg-[#e6c29b] transition-colors"
              >
                Start Commission Request
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-16 bg-[#2c392c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif text-[#e9e2d3] mb-4">Response Time</h2>
          <p className="text-[#e9e2d3]/80">
            I typically respond to inquiries within 1-2 business days. For urgent matters, 
            please feel free to call during business hours (9 AM - 5 PM EST).
          </p>
        </div>
      </section>
    </div>
  );
} 