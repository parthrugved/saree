const desiginer_sarees = [
    {
    type: "designer sarees",
    img: "d10001.webp",
    name: "Designer Collection",
    price: "₹2200",
    code: "DS1",
    description: "A stylish designer saree with a modern touch, perfect for parties and evening events.",
    stock: false
  },
  {
    type: "designer sarees",
    img: "d10002.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS2",
    description: "Glamorous designer saree that adds instant sparkle to your festive wardrobe."
  }, {
    type: "designer sarees",
    img: "d10003.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS3",
    description: "Trendy designer piece with a graceful fall, ideal for receptions and celebrations."
  }, {
    type: "designer sarees",
    img: "d10004.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS4",
    description: "A statement designer saree crafted to make you stand out at any function."
  }, {
    type: "designer sarees",
    img: "d10005.webp",
    name: "Designer Collection",
    price: "₹2100",
    code: "DS5",
    description: "Elegant designer saree with a rich look, perfect for sangeet nights and cocktail parties."
  },
  //  {
  //   type: "designer sarees",
  //   img: "d10006.webp",
  //   name: "Designer Collection",
  //   price: "₹1499",
  //   code: "DS6",
  //   description: "Chic designer drape that blends traditional charm with contemporary style."
  // },
  {
    type: "designer sarees",
    img: "d10007.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS7",
    description: "Eye-catching designer saree, ideal for festive gatherings and special occasions."
  }, {
    type: "designer sarees",
    img: "d10008.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS8",
    description: "A sophisticated designer saree that instantly elevates your party look."
  }, {
    type: "designer sarees",
    img: "d10009.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS9",
    description: "Graceful designer saree with a premium finish, perfect for evening wear."
  }, {
    type: "designer sarees",
    img: "d10010.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS10",
    description: "Beautifully detailed designer saree made for celebrations and memorable moments."
  }, {
    type: "designer sarees",
    img: "d10011.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS11",
    description: "Stylish and refined, this designer saree is perfect for functions and family events."
  }, {
    type: "designer sarees",
    img: "d10012 (2).webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS12",
    description: "A classy designer saree that pairs well with statement jewelry for a grand look."
  }, {
    type: "designer sarees",
    img: "d10013 (1).webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS13",
    description: "Modern designer saree with a rich drape, ideal for festive nights and receptions."
  }, {
    type: "designer sarees",
    img: "d10015.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS14",
    description: "Trendy designer saree that brings together comfort and high-fashion appeal."
  }, {
    type: "designer sarees",
    img: "d10016.webp",
    name: "Designer Collection",
    price: "₹1999",
    code: "DS15",
    description: "A graceful designer piece for women who love subtle yet striking ethnic wear."
  }, 
  {
    type: "designer sarees",
    img: "d100018.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS17",
    description: "A festive-ready designer saree that adds shimmer and style to your celebrations."
  }, {
    type: "designer sarees",
    img: "d100019.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS18",
    description: "Elegant designer saree with a luxurious feel, ideal for weddings and special functions."
  },
 
];

// 🪄 Reference to single container (id only) and deferred render
function renderDesiginer() {
  const container = document.getElementById('product-container-desiginer');
  if (!container) {
    console.warn('No container found for cotton-silk products (id: product-container-cotton_silk)');
    return;
  }

  // console.debug('Rendering cotton_silk, count:', desiginer_sarees.length);
  container.innerHTML = '';

  desiginer_sarees.forEach((item, i) => {
    try {
      const message = `Hello SareeKraft 👋%0A` +
        `I want to buy this saree:%0A%0A` +
        `✨ Name: ${item.name}%0A` +
        `💰 Price: ${item.price}%0A` +
        `🏷️ code: ${item.code}%0A%0A` +
        `Please confirm availability.`;

      const whatsappURL = `https://wa.me/918080674236?text=${encodeURIComponent(message)}`;

      const isOut = item.stock === false;

      const card = `
        
<section class="relative flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
       ${isOut ? `
            <span class="absolute z-10 top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded hover:cursor-pointer">
              OUT OF STOCK
            </span>` : ''}

            <div class="w-full aspect-3/4">
            <a href="#">
             <img class="w-full h-full object-cover" src="/webp_images/${encodeURIComponent(item.type)}/${item.img}" alt="${item.name}" />
             </a>
            </div>

            <div class="p-4 flex flex-col grow">
        <h2 class="text-sm md:text-base font-semibold text-gray-800 mb-2">
            ${item.name}
        </h2>

        <div class="flex items-center gap-2 mt-auto">
          <span class="text-base font-bold text-red-700">
            ${item.price}
          </span>
          <span class="text-gray-400 line-through text-base">
            ₹4,791
          </span>
          <span class="bg-red-100 text-red-700 font-semibold px-0.5 py-0.5 rounded text-xs">
            79% OFF
          </span>
        </div>

            ${isOut
                    ? `<div class="bg-gray-400 text-white px-4 py-2 rounded-lg block text-center mt-3 cursor-not-allowed select-none text-xs">Buy Now</div>`
                    : `<a href="${whatsappURL}" target="_blank"
   class="block text-center mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2 rounded-lg text-xs">
   Buy Now
</a>
`
                }


                <div class="mt-2 flex items-center text-sm">
          <span class="text-yellow-500">★★★★★</span>
          <span class="ml-2 text-gray-500">(12)</span>
        </div>
      </div>
     
        </section>
      `;

      container.insertAdjacentHTML('beforeend', card);
    } catch (err) {
      console.error('Failed to render cotton_silk item at index', i, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderDesiginer);
} else {
  renderDesiginer();
}
