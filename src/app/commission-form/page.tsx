import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commission Form | Jeanette S. Robison',
  description: 'Submit your portrait commission request',
};

export default function CommissionForm() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#2c392c] mb-4">Portrait Commission Request</h1>
          <p className="text-lg text-[#2c392c]/80">
            Please fill out the form below with your portrait requirements. I will contact you to discuss the details and next steps.
          </p>
        </div>

        {/* Commission Form */}
        <form className="bg-white rounded-lg shadow-lg p-8">
          {/* Contact Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-serif text-[#2c392c] mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-[#2c392c] mb-2">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-[#2c392c] mb-2">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#2c392c] mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[#2c392c] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                />
              </div>
            </div>
          </div>

          {/* Portrait Details */}
          <div className="mb-10">
            <h2 className="text-2xl font-serif text-[#2c392c] mb-6">Portrait Details</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="medium" className="block text-[#2c392c] mb-2">Preferred Medium *</label>
                <select
                  id="medium"
                  name="medium"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                >
                  <option value="">Select a medium</option>
                  <option value="pastel">Pastel Portrait</option>
                  <option value="acrylic">Acrylic Portrait</option>
                  <option value="oil">Oil Portrait</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className="block text-[#2c392c] mb-2">Portrait Size *</label>
                <select
                  id="size"
                  name="size"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                >
                  <option value="">Select a size</option>
                  <option value="8x10">8x10"</option>
                  <option value="11x14">11x14"</option>
                  <option value="16x20">16x20"</option>
                  <option value="18x24">18x24"</option>
                </select>
              </div>
              <div>
                <label htmlFor="subjects" className="block text-[#2c392c] mb-2">Number of Subjects *</label>
                <select
                  id="subjects"
                  name="subjects"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                >
                  <option value="1">1 (Base Price)</option>
                  <option value="2">2 (+50%)</option>
                  <option value="3">3 (+100%)</option>
                  <option value="4">4 (+150%)</option>
                  <option value="more">5 or more (Contact for pricing)</option>
                </select>
              </div>
              <div>
                <label htmlFor="style" className="block text-[#2c392c] mb-2">Portrait Style *</label>
                <select
                  id="style"
                  name="style"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                >
                  <option value="head">Head and Shoulders (Base Price)</option>
                  <option value="full">Full Figure (+50%)</option>
                </select>
              </div>
              <div>
                <label htmlFor="background" className="block text-[#2c392c] mb-2">Background Style *</label>
                <select
                  id="background"
                  name="background"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                >
                  <option value="simple">Simple Background (Base Price)</option>
                  <option value="detailed">Detailed Background (+50%)</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-[#2c392c] mb-2">Additional Details</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Please describe any specific requirements, preferences, or questions you have about your portrait commission."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Photo Upload Note */}
          <div className="mb-10 p-4 bg-[#f4f1ea] rounded-md">
            <h3 className="text-lg font-medium text-[#2c392c] mb-2">Photo Reference</h3>
            <p className="text-[#2c392c]/80">
              After submitting this form, I will contact you with instructions for sharing your reference photo(s).
              Please note that the quality of your portrait depends significantly on the quality of the reference photos provided.
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#d4a373] text-white rounded-full
                       hover:bg-[#e6c29b] transition-colors text-lg font-medium"
            >
              Submit Commission Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 