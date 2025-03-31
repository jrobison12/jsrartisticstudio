import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Showcase Spotlight | Award-Winning Artwork by Jeanette S. Robison',
  description: 'Explore award-winning artwork and recognized pieces from various exhibitions and contests by Jeanette S. Robison.',
};

interface ShowcasePiece {
  id: number;
  title: string;
  image: string;
  award: string;
  exhibition: string;
  year: string;
  medium: string;
  description: string;
}

// This would typically come from a database or CMS
const showcasePieces: ShowcasePiece[] = [
  {
    id: 1,
    title: "Morning Mist at McConnells Mill",
    image: "/images/showcase/morning-mist.jpg",
    award: "First Place - Nature Photography",
    exhibition: "Pennsylvania State Photography Exhibition",
    year: "2023",
    medium: "Digital Photography",
    description: "Capturing the ethereal morning mist rising over McConnells Mill State Park, this photograph showcases the natural beauty of Pennsylvania's landscape."
  },
  {
    id: 2,
    title: "Portrait of Grace",
    image: "/images/showcase/portrait-grace.jpg",
    award: "Best in Show",
    exhibition: "Lawrence County Art Association Annual Exhibition",
    year: "2023",
    medium: "Pastel on Paper",
    description: "A detailed portrait study that captures both the physical likeness and inner spirit of the subject, demonstrating mastery of pastel techniques."
  },
  // Add more showcase pieces as needed
];

export default function ShowcaseSpotlight() {
  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Hero Section */}
      <section className="relative bg-[#2c392c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-[#e9e2d3] mb-6">
            Showcase Spotlight
          </h1>
          <p className="text-xl text-[#e9e2d3]/90 max-w-3xl mx-auto">
            Celebrating artistic excellence through award-winning pieces and recognized works
            from various exhibitions and contests.
          </p>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            {showcasePieces.map((piece) => (
              <div
                key={piece.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative h-[400px]">
                    <Image
                      src={piece.image}
                      alt={piece.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-3xl font-serif text-[#2c392c] mb-2">
                        {piece.title}
                      </h2>
                      <p className="text-[#d4a373] font-semibold mb-1">
                        {piece.award}
                      </p>
                      <p className="text-[#2c392c]/60 text-sm">
                        {piece.exhibition} • {piece.year}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-[#2c392c] mb-1">Medium</h3>
                        <p className="text-[#2c392c]/80">{piece.medium}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#2c392c] mb-1">About this Piece</h3>
                        <p className="text-[#2c392c]/80">{piece.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#2c392c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif text-[#e9e2d3] mb-6">
            Interested in Commissioning a Piece?
          </h2>
          <p className="text-[#e9e2d3]/80 mb-8">
            Let's create something extraordinary together. Commission a custom piece
            that captures your vision with award-winning artistry.
          </p>
          <a
            href="/commission-form"
            className="inline-block px-6 py-3 bg-[#d4a373] text-white rounded-full
                     hover:bg-[#e6c29b] transition-colors"
          >
            Start Your Commission
          </a>
        </div>
      </section>
    </div>
  );
} 