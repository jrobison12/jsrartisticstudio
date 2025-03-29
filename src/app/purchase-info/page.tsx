import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Information | Jeanette S. Robison',
  description: 'Commission pricing and information for portrait artwork by Jeanette S. Robison',
};

export default function PurchaseInfo() {
  const portraitTypes = [
    {
      name: 'Pastel Portrait',
      description: 'Classic, soft-textured portraits with rich colors',
      timeframe: '1 week',
      prices: [
        { size: '8x10', price: 100 },
        { size: '11x14', price: 175 },
        { size: '16x20', price: 250 },
        { size: '18x24', price: 375 },
      ],
      accent: 'bg-[#d4a373]',
    },
    {
      name: 'Acrylic Portrait',
      description: 'Vibrant, versatile portraits with bold colors',
      timeframe: '2 weeks',
      prices: [
        { size: '8x10', price: 250 },
        { size: '11x14', price: 450 },
        { size: '16x20', price: 650 },
        { size: '18x24', price: 850 },
      ],
      accent: 'bg-[#465446]',
    },
    {
      name: 'Oil Portrait',
      description: 'Rich, timeless portraits with exceptional depth',
      timeframe: '4 weeks',
      prices: [
        { size: '8x10', price: 400 },
        { size: '11x14', price: 600 },
        { size: '16x20', price: 800 },
        { size: '18x24', price: 1000 },
      ],
      accent: 'bg-[#2c392c]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f1ea] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-[#2c392c] mb-4">Portrait Commission Pricing</h1>
          <p className="text-lg text-[#2c392c]/80 max-w-2xl mx-auto">
            Each portrait is carefully crafted to capture the essence and personality of your subject.
            Choose from three distinctive mediums, each offering unique characteristics and beauty.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {portraitTypes.map((type) => (
            <div key={type.name} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col min-w-[300px]">
              <div className={`${type.accent} px-8 py-4`}>
                <h2 className="text-2xl font-serif text-white whitespace-nowrap">{type.name}</h2>
                <p className="text-white/90 mt-1 whitespace-nowrap">Completion: {type.timeframe}</p>
              </div>
              <div className="p-8 flex-grow">
                <p className="text-[#2c392c]/80 mb-8 min-h-[48px]">{type.description}</p>
                <div className="space-y-4">
                  {type.prices.map((price) => (
                    <div key={price.size} className="flex justify-between items-center whitespace-nowrap">
                      <span className="text-[#2c392c] text-lg">{price.size}&quot;</span>
                      <span className="text-lg font-medium text-[#2c392c] ml-8">${price.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-serif text-[#2c392c] mb-6">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-[#2c392c] mb-3">Portrait Options</h3>
              <ul className="space-y-2 text-[#2c392c]/80">
                <li>• Base price includes single head and shoulders image</li>
                <li>• Additional subjects: +50% per subject</li>
                <li>• Full figure portraits: +50%</li>
                <li>• Detailed backgrounds: +50%</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#2c392c] mb-3">Commission Process</h3>
              <ul className="space-y-2 text-[#2c392c]/80">
                <li>• 50% deposit required with photo reference</li>
                <li>• Remaining balance due upon completion</li>
                <li>• 25% non-refundable cancellation fee</li>
                <li>• Tax not included in listed prices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-serif text-[#2c392c] mb-4">Ready to Commission a Portrait?</h2>
          <p className="text-[#2c392c]/80 mb-6">
            Contact me to discuss your portrait requirements or to schedule a consultation.
          </p>
          <a 
            href="/commission-form"
            className="inline-block px-6 py-3 bg-[#d4a373] text-white rounded-full
                     hover:bg-[#e6c29b] transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
} 