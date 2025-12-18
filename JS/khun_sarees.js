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
    description: "Vibrant khan saree with a royal look, ideal for haldi, pujas and family events."
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
    description: "Graceful khan saree that combines traditional patterns with everyday comfort."
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
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full relative">

          ${isOut ? `
            <span class="absolute z-10 top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded hover:cursor-pointer">
              OUT OF STOCK
            </span>` : ''}

          <a class="block relative h-150 rounded overflow-hidden">
            <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="webp_images/${item.type}/${item.img}">
          </a>

          <div class="mt-4">
            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${item.code}</h3>
            <h2 class="text-gray-900 title-font text-lg font-semibold">${item.name}</h2>
            <p class="text-gray-700 text-sm leading-snug mt-1">${item.description}</p>
            <p class="mt-2 text-base font-semibold text-gray-900">${item.price}</p>

            ${isOut
          ? `<div class="bg-gray-400 text-white px-4 py-2 rounded-lg block text-center mt-3 cursor-not-allowed select-none">Buy Now</div>`
          : `<a href="${whatsappURL}" target="_blank"
   class="block text-center mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2 rounded-lg">
   Buy Now
</a>`
        }
          </div>
        </div>
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
