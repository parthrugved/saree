const khun_sarees = [
  {
    type: "khan sarees",
    img: "khan (1).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS1",
    description: "Traditional khan saree with rich borders, perfect for cultural and festive occasions."
  }, {
    type: "khan sarees",
    img: "khan (2).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS2",
    description: "Classic khun weave saree that reflects Maharashtrian heritage in a stylish way."
  }, {
    type: "khan sarees",
    img: "khan (3).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS3",
    description: "Vibrant khan saree with a royal look, ideal for haldi, pujas and family events.",
    stock: false
  }, {
    type: "khan sarees",
    img: "khan (4).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS4",
    description: "Elegant khun saree with a textured body and contrast pallu for a timeless ethnic look."
  }, {
    type: "khan sarees",
    img: "khan (5).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS5",
    description: "Graceful khan saree that combines traditional patterns with everyday comfort.",
    stock: false
  },

];


// 🪄 Reference to single container (id only) and deferred render
function khun_render() {
  const container = document.getElementById('product-container-khun');
  if (!container) {
    console.warn('No container found for cotton-silk products (id: product-container-khun)');
    return;
  }

  console.debug('Rendering khun_sarees, count:', khun_sarees.length);
  container.innerHTML = '';

  khun_sarees.forEach((item, i) => {
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
          <span class="text-lg font-bold text-red-700">
            ${item.price}
          </span>
          <span class="text-gray-400 line-through text-sm">
            ₹ 4,791
          </span>
          <span class="bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded text-xs">
            79% OFF
          </span>
        </div>

            ${isOut
                    ? `<div class="bg-gray-400 text-white px-4 py-2 rounded-lg block text-center mt-3 cursor-not-allowed select-none">Buy Now</div>`
                    : `<a href="${whatsappURL}" target="_blank"
   class="block text-center mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2 rounded-lg">
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
      console.error('Failed to render khun_sarees item at index', i, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', khun_render);
} else {
  khun_render();
}
