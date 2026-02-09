const silk_sarees = [
  {
    type: "silk",
    img: "silk (1).webp",
    name: "Pure Comfort",
    price: "₹1599",
    code: "SILK1",
    description: "Simple yet elegant cotton saree that suits both everyday use and small functions."
  }
];

// 🪄 Reference to single container (id only) and deferred render
function renderSilk() {
  const container = document.getElementById('product-container-silk');
  if (!container) {
    console.warn('No container found for silk saree products (id: product-container-silk)');
    return;
  }

  console.debug('Rendering silk_sarees, count:', silk_sarees.length);
  container.innerHTML = '';

  silk_sarees.forEach((item, i) => {
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
      console.error('Failed to render silk item at index', i, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSilk);
} else {
  renderSilk();
}
