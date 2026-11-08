import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Star, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image
            src="https://picsum.photos/seed/saree-hero/2000/1000"
            alt="Beautiful saree draped elegantly"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Draped in 15 Seconds.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light drop-shadow-md">
            Experience the elegance of traditional sarees with the convenience of ready-to-wear modern design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-amber-600/50 flex items-center justify-center gap-2"
            >
              Shop Collection <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/about" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center justify-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mb-6 text-amber-600 dark:text-amber-500">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">Ready in 15 Seconds</h3>
              <p className="text-gray-600 dark:text-gray-400">Pre-stitched pleats and adjustable waistbands mean you get the perfect drape instantly, every time.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mb-6 text-amber-600 dark:text-amber-500">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">Premium Fabrics</h3>
              <p className="text-gray-600 dark:text-gray-400">From pure Kanjivaram silk to lightweight georgette, we source only the finest materials.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mb-6 text-amber-600 dark:text-amber-500">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">Flawless Fit</h3>
              <p className="text-gray-600 dark:text-gray-400">Custom tailored feel with standard sizing, accommodating varying body types gracefully.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Preview */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Featured Collections</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">Discover our most loved ready-to-wear pieces, handpicked for your next special occasion.</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Placeholder Products */}
            {[1, 2, 3, 4,].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-96 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-white text-black py-3 rounded-full font-medium hover:bg-gray-100 shadow-lg">
                      Quick View
                    </button>
                  </div>
                  <Image
                    src={`/products/linen%20cotton/linen${i}.png`}
                    alt="Saree"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">Midnight Blue Silk</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">One-Minute Pre-Stitched</p>
                  <p className="font-semibold text-amber-600">₹1,499</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 md:hidden flex justify-center">
            <Link href="/shop" className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium px-6 py-3 border border-amber-600 rounded-full">
              View All Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
