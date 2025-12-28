const cotton_silk = [

  {
    type: "Cotton silk",
    img: "cos1.webp",
    name: "Pure Comfort",
    price: "₹1999",
    code: "COS1",
    description: "Simple yet elegant cotton saree that suits both everyday use and small functions."

  },

  {
    type: "Cotton silk",
    img: "cos2.webp",
    name: "Pure Comfort",
    price: "₹1999",
    code: "COS2",
    description: "Simple yet elegant cotton saree that suits both everyday use and small functions."

  },
];

// 🪄 Reference to single container (id only) and deferred render
console.log('cottton_silk.js loaded');
function renderCottonSilk() {
  const container = document.getElementById('product-container-cotton_silk');
  if (!container) {
    console.warn('No container found for cotton-silk products (id: product-container-cotton_silk)');
    return;
  }

  console.log('Rendering cotton_silk, count:', cotton_silk.length);
  container.innerHTML = '';

  cotton_silk.forEach((item, i) => {
    try {
      console.log('Inserting cotton_silk item:', i, item.name);
      const message = `Hello SareeKraft 👋%0A` +
        `I want to buy this saree:%0A%0A` +
        `✨ Name: ${item.name}%0A` +
        `💰 Price: ${item.price}%0A` +
        `🏷️ code: ${item.code}%0A%0A` +
        `Please confirm availability.`;

      const whatsappURL = `https://wa.me/918080674236?text=${encodeURIComponent(message)}`;

      const isOut = item.stock === false;
      const imgSrc = encodeURI(`webp_images/${item.type}/${item.img}`);

      const card = `
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full relative">

          ${isOut ? `
            <span class="absolute z-10 top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded hover:cursor-pointer">
              OUT OF STOCK
            </span>` : ''}

          <a class="block relative h-150 rounded overflow-hidden">
          <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="/webp_images/${encodeURIComponent(item.type)}/${item.img}">
        </a>


          <div class="mt-4">
            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${item.code}</h3>
            <h2 class="text-gray-900 title-font text-lg font-semibold">${item.name}</h2>
            <p class="text-gray-700 text-sm leading-snug mt-1">${item.description}</p>
            <p class="mt-2 text-base font-semibold text-gray-900">${item.price}</p>

            ${isOut
          ? `<div class="bg-gray-400 text-white px-4 py-2 rounded-lg block text-center mt-3 cursor-not-allowed select-none">Buy Now</div>`
          : `<a href="${whatsappURL}" target="_blank"
   class="block text-center mt-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 px-4 py-2 rounded-lg">
   Buy Now
</a>
`
        }
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', card);
    } catch (err) {
      console.error('Failed to render cotton_silk item at index', i, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCottonSilk);
} else {
  renderCottonSilk();
}
