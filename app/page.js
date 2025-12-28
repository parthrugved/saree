import React from "react";
import Image from "next/image";

export const metadata = {
  title: "Home | SareeKraft",
  description: "Shop premium ready-to-wear sarees at SareeKraft. Discover designer sarees, cotton sarees, khan sarees, net sarees and more. Beautiful, affordable, and crafted with elegance.",
  keywords: "sarees, ready to wear saree, saree online, designer saree, cotton saree, saree shop India"
};

export default function Home() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
            <div className="w-full sm:p-4 px-4 mb-6">
              <h1 className="title-font font-medium text-xl mb-2 text-gray-900">
                ✨ SareeKraft Elegance Series
              </h1>
              <div className="leading-relaxed">
                Drape yourself in timeless elegance with this exquisite saree
                from SareeKraft. Crafted for the modern woman who cherishes
                tradition, this saree blends heritage artistry with contemporary
                finesse. The fabric flows gracefully, offering effortless
                comfort while highlighting intricate craftsmanship in every
                weave.
              </div>
            </div>
            {/* <div className="stats flex gap-4">
              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Users
                </h2>
                <p className="leading-relaxed">283 *</p>
              </div>

              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Products
                </h2>
                <p className="leading-relaxed">95 +</p>
              </div>

              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Catogery
                </h2>
                <p className="leading-relaxed">8</p>
              </div>

              <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                <h2 className="title-font font-medium text-3xl text-gray-900">

                </h2>
                <p className="leading-relaxed"></p>
              </div>
            </div> */}

          </div>

          <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
            <img
              className="object-cover object-center w-full h-full"
              src="https://thumbs.dreamstime.com/b/indian-saree-design-19704685.jpg"
              alt="stats"
            />
          </div>
        </div>
      </section>

      {/* HERO PRODUCT SECTION */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6  h-[120vh] mb-10 object-cover object-center rounded w-full "
            alt="hero"
            src="/Hero product.jpg"
          />

          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Our Best Seller :- The Ultimate Net Saree
            </h1>

            <p className="mb-8 leading-relaxed">
              This elegant maroon saree features delicate golden buti work spread
              across the fabric, giving it a timeless and traditional charm. Its
              intricately woven golden border enhances the richness of the
              drape, while the soft, flowing material ensures a beautifully
              flattering fall. Paired with a matching embroidered blouse, the
              ensemble exudes sophistication and grace. Perfect for festivals,
              weddings, and special occasions, this saree seamlessly blends
              classic style with refined elegance.
            </p>

            <p className="mt-5 text-base font-semibold text-gray-900">₹2000</p>

            <div className="flex justify-center">
              <a
                href={`https://wa.me/918080674236?text=${encodeURIComponent(
                  `Hello SareeKraft 👋
I want to buy this saree:

✨ Name: Hero Product 1
💰 Price: ₹2000
🏷️ code: HeroProduct1

Please confirm availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg block text-center mt-3"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HAPPY CUSTOMERS */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
            Happy Customers
          </h1>

          <div className="flex flex-wrap -m-4">
            {/* CUSTOMER CARD */}
            {[
              {
                name: "Tanvi Dashasahastra",
                text:
                  "⭐️⭐️⭐️⭐️⭐️\n“This saree exceeded my expectations! The quality and stitching are perfect, and the design has such a modern yet traditional vibe. SareeKraft has truly mastered elegance!”",
              },
              {
                name: "Mrummai Dixit",
                text:
                  "⭐️⭐️⭐️⭐️⭐️\n“The detailing and craftsmanship are just beautiful. It arrived quickly, nicely packed, and looked even better than the photos. SareeKraft is now my go-to saree brand!”",
              },
              {
                name: "Sneha Dixit",
                text:
                  "⭐️⭐️⭐️⭐️\n“I absolutely loved my SareeKraft saree! The fabric is soft, lightweight, and so comfortable to wear all day. The colors are even more vibrant in person.”",
              },
            ].map((item, index) => (
              <div key={index} className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <p className="leading-relaxed mb-6 whitespace-pre-line">
                    {item.text}
                  </p>

                  <div className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://dummyimage.com/106x106"
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Our Happy Customer
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
