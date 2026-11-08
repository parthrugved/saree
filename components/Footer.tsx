import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950 text-gray-600 dark:text-gray-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4 text-amber-700 dark:text-amber-500">Sareekraft</h3>
          <p className="text-sm leading-relaxed">
            Elegance redefined. Ready-to-wear sarees draped in 15 seconds, combining traditional craftsmanship with modern convenience.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Shop</h4>
          <ul className="space-y-2 text-sm flex flex-col">
            <Link href="/shop?type=Pleated" className="hover:text-amber-600 transition-colors">Pleated Sarees</Link>
            <Link href="/shop?type=One-minute" className="hover:text-amber-600 transition-colors">One-Minute Pre-Stitched</Link>
            <Link href="/shop?fabric=Silk" className="hover:text-amber-600 transition-colors">Silk Collection</Link>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-2 text-sm flex flex-col">
            <Link href="/about" className="hover:text-amber-600 transition-colors">Our Story</Link>
            <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact Us</Link>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Find Us On</h4>
          <ul className="space-y-2 text-sm flex flex-col">
            <Link href="https://www.youtube.com/@Sareekraft/shorts"target="_blank" className="hover:text-amber-600 transition-colors">Youtube</Link>
            {/* <Link href="/shop?type=One-minute" className="hover:text-amber-600 transition-colors">Instagram</Link> */}
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Sareekraft. All rights reserved.</p>
      </div>
    </footer>
  );
}
