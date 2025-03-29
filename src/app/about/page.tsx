import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About the Artist | Jeanette S. Robison',
  description: 'Learn about Jeanette S. Robison, a passionate artist specializing in portraits and nature photography',
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Hero Section */}
      <section className="relative bg-[#2c392c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif text-[#e9e2d3] mb-6">
                Meet Jeanette S. Robison
              </h1>
              <p className="text-xl text-[#e9e2d3]/90 leading-relaxed">
                Artist, Photographer, and Nature Enthusiast
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              {/* Replace the src with an actual image of your mom */}
              <Image
                src="/images/artist-portrait.jpg"
                alt="Jeanette S. Robison"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Artist Statement */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif text-[#2c392c] mb-6">Artist Statement</h2>
            <div className="prose prose-lg text-[#2c392c]/80">
              <p className="mb-4">
                Art has always been my way of capturing the beauty and wonder of the natural world. 
                Through my work, I strive to share the intimate moments and hidden treasures that nature 
                reveals to those who take the time to observe and appreciate its magnificence.
              </p>
              <p>
                Whether I'm creating portraits that capture the essence of my subjects or photographing 
                the delicate interplay of light and shadow in nature, my goal is to create works that 
                resonate with emotion and authenticity.
              </p>
            </div>
          </div>

          {/* Artistic Journey */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif text-[#2c392c] mb-6">Artistic Journey</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6 text-[#2c392c]/80">
                <p>
                  My artistic journey began with a deep appreciation for the natural world and a desire 
                  to capture its beauty through various mediums. Over the years, I've developed expertise 
                  in multiple artistic techniques, including:
                </p>
                <ul className="grid md:grid-cols-2 gap-4 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4a373] opacity-60 text-sm mt-[6px]">●</span>
                    <span>Portrait artistry in pastel, acrylic, and oil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4a373] opacity-60 text-sm mt-[6px]">●</span>
                    <span>Nature and wildlife photography</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4a373] opacity-60 text-sm mt-[6px]">●</span>
                    <span>Landscape composition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#d4a373] opacity-60 text-sm mt-[6px]">●</span>
                    <span>Wildlife observation and documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif text-[#2c392c] mb-6">Artistic Focus</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-serif text-[#2c392c] mb-4">Portrait Art</h3>
                <p className="text-[#2c392c]/80">
                  Creating timeless portraits that capture not just appearances, but the spirit and 
                  character of my subjects.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-serif text-[#2c392c] mb-4">Nature Photography</h3>
                <p className="text-[#2c392c]/80">
                  Documenting the beauty of Pennsylvania's wildlife and landscapes through the lens 
                  of my camera.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-serif text-[#2c392c] mb-4">Wildlife Studies</h3>
                <p className="text-[#2c392c]/80">
                  Observing and capturing the intimate moments of wildlife in their natural habitats.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Note */}
          <div className="bg-[#d4a373]/20 rounded-lg p-8">
            <h2 className="text-3xl font-serif text-[#2c392c] mb-6">A Personal Note</h2>
            <div className="text-[#2c392c]/80 space-y-4">
              <p>
                Based in New Castle, Pennsylvania, I find endless inspiration in the region's diverse 
                landscapes and wildlife. When I'm not in my studio creating portraits or processing 
                photographs, you'll likely find me exploring nature, camera in hand, ready to capture 
                the next beautiful moment.
              </p>
              <p>
                I believe that art has the power to connect people with nature and help them see the 
                world through new eyes. Through my work, I hope to share this vision and inspire others 
                to appreciate the beauty that surrounds us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#2c392c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif text-[#e9e2d3] mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-[#e9e2d3]/80 mb-8">
            Whether you're interested in commissioning a portrait or exploring my nature photography, 
            I'd love to connect with you.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/commission-form"
              className="px-6 py-3 bg-[#d4a373] text-white rounded-full
                       hover:bg-[#e6c29b] transition-colors"
            >
              Commission a Portrait
            </a>
            <a
              href="/gallery"
              className="px-6 py-3 bg-transparent border-2 border-[#d4a373] text-[#e9e2d3] rounded-full
                       hover:bg-[#d4a373] hover:text-white transition-colors"
            >
              View Gallery
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 