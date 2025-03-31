'use client';

import { useState, useRef } from 'react';

export default function CommissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/submit-commission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      setSubmitStatus('success');
      formRef.current?.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-[#2c392c] mb-2">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#2c392c] mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[#2c392c] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                >
                  <option value="" className="text-[#2c392c]">Select a medium</option>
                  <option value="pastel" className="text-[#2c392c]">Pastel Portrait</option>
                  <option value="acrylic" className="text-[#2c392c]">Acrylic Portrait</option>
                  <option value="oil" className="text-[#2c392c]">Oil Portrait</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className="block text-[#2c392c] mb-2">Portrait Size *</label>
                <select
                  id="size"
                  name="size"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                >
                  <option value="" className="text-[#2c392c]">Select a size</option>
                  <option value="8x10" className="text-[#2c392c]">8" x 10"</option>
                  <option value="11x14" className="text-[#2c392c]">11" x 14"</option>
                  <option value="16x20" className="text-[#2c392c]">16" x 20"</option>
                  <option value="18x24" className="text-[#2c392c]">18" x 24"</option>
                </select>
              </div>
              <div>
                <label htmlFor="subjects" className="block text-[#2c392c] mb-2">Number of Subjects *</label>
                <select
                  id="subjects"
                  name="subjects"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                >
                  <option value="1" className="text-[#2c392c]">1 (Base Price)</option>
                  <option value="2" className="text-[#2c392c]">2 (+50%)</option>
                  <option value="3" className="text-[#2c392c]">3 (+100%)</option>
                  <option value="4" className="text-[#2c392c]">4 (+150%)</option>
                  <option value="more" className="text-[#2c392c]">5 or more (Contact for pricing)</option>
                </select>
              </div>
              <div>
                <label htmlFor="style" className="block text-[#2c392c] mb-2">Portrait Style *</label>
                <select
                  id="style"
                  name="style"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                >
                  <option value="head" className="text-[#2c392c]">Head and Shoulders (Base Price)</option>
                  <option value="full" className="text-[#2c392c]">Full Figure (+50%)</option>
                </select>
              </div>
              <div>
                <label htmlFor="background" className="block text-[#2c392c] mb-2">Background Style *</label>
                <select
                  id="background"
                  name="background"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] text-[#2c392c]"
                >
                  <option value="simple" className="text-[#2c392c]">Simple Background (Base Price)</option>
                  <option value="detailed" className="text-[#2c392c]">Detailed Background (+50%)</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-[#2c392c] mb-2">Additional Details</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Please describe any specific requirements, preferences, or questions you have about your portrait commission."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-[#d4a373] 
                           text-[#2c392c] placeholder-[#2c392c]/70"
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
            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                Thank you for your commission request! I will review your details and get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                There was an error submitting your request. Please try again or contact me directly.
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#d4a373] text-white rounded-full
                       hover:bg-[#e6c29b] transition-colors text-lg font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Commission Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 