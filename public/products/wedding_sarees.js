const wedding_sarees = [
  {
    type: "wedding sarees",
    img: "wedding  (1).webp",
    name: "Bridal Collection",
    price: "₹1499",
    code: "WS1",
    description: "A rich wedding saree with a grand look, perfect for bridesmaids and close family."
  }, {
    type: "wedding sarees",
    img: "wedding  (2).webp",
    name: "Bridal Collection",
    price: "₹3100",
    code: "WS2",
    description: "Traditional wedding saree ideal for engagement, haldi or reception functions."
  }, {
    type: "wedding sarees",
    img: "wedding  (3).webp",
    name: "Bridal Collection",
    price: "₹2700",
    code: "WS3",
    description: "Regal wedding saree that adds a royal touch to your special day wardrobe."
  }, {
    type: "wedding sarees",
    img: "wedding  (4).webp",
    name: "Bridal Collection",
    price: "₹2700",
    code: "WS4",
    description: "Beautifully crafted wedding saree designed for festive rituals and ceremonies."
  }, {
    type: "wedding sarees",
    img: "wedding  (5).webp",
    name: "Bridal Collection",
    price: "₹3100",
    code: "WS5",
    description: "An elegant wedding saree with a luxurious feel, perfect for bridal events."
  }, {
    type: "wedding sarees",
    img: "wedding  (6).webp",
    name: "Bridal Collection",
    price: "₹2700",
    code: "WS6",
    description: "Classic wedding saree that gives a rich, traditional look for auspicious occasions."
  }, {
    type: "wedding sarees",
    img: "wedding  (7).webp",
    name: "Bridal Collection",
    price: "₹2499",
    code: "WS7",
    description: "Graceful wedding saree ideal for family weddings, receptions and grand functions."
  }, {
    type: "wedding sarees",
    img: "wedding  (8).webp",
    name: "Bridal Collection",
    price: "₹2499",
    code: "WS8",
    description: "A festive wedding saree with a stunning presence, perfect for important ceremonies."
  }, {
    type: "wedding sarees",
    img: "wedding  (9).webp",
    name: "Bridal Collection",
    price: "₹3300",
    code: "WS9",
    description: "Traditional yet stylish wedding saree crafted to make you stand out at any celebration."
  },
];

// 🪄 Reference to single container (id only) and deferred render
function render_wedding() {
  const container = document.getElementById('product-container-wedding');
  if (!container) {
    console.warn('No container found for cotton-silk products (id: product-container-wedding)');
    return;
  }

  console.debug('Rendering wedding_sarees, count:', wedding_sarees.length);
  container.innerHTML = '';

  wedding_sarees.forEach((item, i) => {
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
      console.error('Failed to render wedding_sarees item at index', i, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render_wedding);
} else {
  render_wedding();
}
