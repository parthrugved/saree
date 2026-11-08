import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sareekraft | About Us",
  description: "Elegance redefined. Ready-to-wear sarees draped in 15 seconds, combining traditional craftsmanship with modern convenience.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="https://picsum.photos/seed/saree-about-1/2000/1000"
            alt="Craftsmanship"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Story</h1>
          <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
           Preserving tradition while embracing the modern woman&apos;s lifestyle.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">The Sareekraft Philosophy</h2>
            <p>
              For generations, the saree has been the epitome of grace and elegance. However, in today&apos;s fast-paced world, the art of draping a perfect saree is becoming a lost skill. We founded Sareekraft with a simple mission: to make wearing a saree as effortless as wearing a dress, without compromising on its traditional beauty.
            </p>
            <p>
              Our signature 15-second ready-to-wear sarees feature pre-stitched pleats and an adjustable waist mechanism that guarantees a perfect drape every single time.
            </p>
            <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/saree-about-2/800/800"
                  alt="Traditional Weaving"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/saree-about-3/800/800"
                  alt="Modern Draping"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">Craftsmanship Meets Convenience</h2>
            <p>
              Every Sareekraft piece is a labor of love. We work directly with weavers across India to source authentic, premium fabrics—from the rich silks of Kanchipuram to the breezy georgettes of Surat. These fabrics are then brought to our modern atelier, where expert tailors carefully construct the pre-stitched elements, ensuring that the final product feels custom-made for you.
            </p>
            <p>
              Join us in celebrating the saree, reimagined for the 21st century.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
