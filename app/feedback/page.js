import React from 'react';

const Feedback = () => {
  const testimonials = [
    {
      "name": "Rajashree Ashtekar",
      "role": "Our Happy Customer",
      "stars": "⭐⭐⭐⭐⭐",
      "text": "I ordered both a ready-to-wear saree and a traditional saree from Sareekraft. Both pieces are elegant, beautiful, and reasonably priced. The ready-to-wear saree was stitched perfectly to my size and delivered on time. I am very impressed with their prompt and high-quality service!",
      "img": "https://dummyimage.com/109x109"
    },
    {
      name: "Tanvi Dashasahastra",
      role: "Our Happy Customer",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "This saree exceeded my expectations! The quality and stitching are perfect, and the design has such a modern yet traditional vibe. SareeKraft has truly mastered elegance!",
      img: "https://dummyimage.com/106x106"
    },
    {
      name: "Sneha Dixit",
      role: "Our Happy Customer",
      stars: "⭐️⭐️⭐️⭐️",
      text: "I absolutely loved my SareeKraft saree! The fabric is soft, lightweight, and so comfortable to wear all day. The colors are even more vibrant in person — I got so many compliments at my cousin’s wedding!",
      img: "https://dummyimage.com/107x107"
    },
    {
      name: "Mrummai Dixit",
      role: "Our Happy Customer",
      stars: "⭐️⭐️⭐️⭐️⭐️",
      text: "The detailing and craftsmanship are just beautiful. It arrived quickly, nicely packed, and looked even better than the photos. SareeKraft is now my go-to saree brand!",
      img: "https://dummyimage.com/108x108"
    },

    {
      "name": "Prachiti Sonawane",
      "role": "Our Happy Customer",
      "stars": "⭐⭐⭐⭐⭐",
      "text": "Very beautiful collection of ready-to-wear sarees.",
      "img": "https://dummyimage.com/109x109"
    },

  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
          ✨ Our Happy Customers ✨
        </h1>

        <div className="flex flex-wrap -m-4">
          {testimonials.map((item, index) => (
            <div key={index} className="p-4 md:w-1/2 lg:w-1/3 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                {/* Quote SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="block w-5 h-5 text-gray-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
                </svg>

                <p className="leading-relaxed mb-6">
                  {item.stars}<br />
                  “{item.text}”
                </p>

                <div className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src={item.img}
                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">{item.name}</span>
                    <span className="text-gray-500 text-sm">{item.role}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;

export const metadata = {
  title: "Feedback | SareeKraft",
  description: "Premium ready-to-wear sarees crafted with elegance.",
};