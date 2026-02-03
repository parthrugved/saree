const dola_silk = [
  {
    type: "dola silk",
    img: "do1.webp",
    name: "Dola Silk Beauty",
    price: "₹1575",
    code: "Code - DOLA1",
    description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."

  },

  {
    type: "dola silk",
    img: "do2.webp",
    name: "Dola Silk Beauty",
    price: "₹1575",
    code: "Code - DOLA2",
    description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."

  },
  {
    type: "dola silk",
    img: "do3.webp",
    name: "Dola Silk Beauty",
    price: "₹1575",
    code: "Code - DOLA3",
    description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."

  },
  {
    type: "dola silk",
    img: "do4.webp",
    name: "Dola Silk Beauty",
    price: "₹1575",
    code: "Code - DOLA4",
    description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."
  },
  {
    type: "dola silk",
    img: "do5.webp",
    name: "Dola Silk Beauty",
    price: "₹1575",
    code: "Code - DOLA5",
    description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."

  },
  {
    type: "dola silk",
    img: "do6.webp",
    name: "Dola Silk Beauty",
    price: "₹1575",
    code: "Code - DOLA6",
    description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."

  },
  {
    type: "dola silk",
    img: "do7.webp",
    name: "Dola Silk Beauty",
    price: "₹1575",
    code: "Code - DOLA7",
    description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."

  },




];

// 🪄 Reference to container
// Prevent duplicate initialization in development with hot reload
if (typeof window !== 'undefined' && !window._dolaContainerInitialized) {
  window._dolaContainerInitialized = true;
  const container = document.getElementById("product-container-dola_silk");

  // Guard: if container missing, abort silently
  if (!container) {
    console.warn('No container found for Dola silk products (id: product-container-dola_silk)');
  } else {
    // old.js style rendering, with stock handling for button/label
    dola_silk.forEach((item) => {
      const message =
        `Hello SareeKraft 👋%0A` +
        `I want to buy this saree:%0A%0A` +
        `✨ Name: ${item.name}%0A` +
        `💰 Price: ${item.price}%0A` +
        `🏷️ code: ${item.code}%0A%0A` +
        `Please confirm availability.`;

      const whatsappURL = `https://wa.me/918080674236?text=${message}`;

      const isOut = item.stock === false;

      const card = `
      <div class="lg:w-1/4 md:w-1/2 p-4 w-full relative">

        ${isOut ? `
          <span class="absolute z-10 top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded hover:cursor-pointer">
            OUT OF STOCK
          </span>` : ""}

        <a class="block relative h-150 rounded overflow-hidden">
          <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="/webp_images/${encodeURIComponent(item.type)}/${item.img}">
        </a>

        <div class="mt-4">
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${item.code}</h3>
          <h2 class="text-gray-900 title-font text-lg font-semibold">${item.name}</h2>
          <p class="text-gray-700 text-sm leading-snug mt-1">${item.description}</p>
          <p class="mt-2 text-base font-semibold text-gray-900">${item.price}</p>

          ${isOut
          ? `<div class="bg-gray-400 text-white px-4 py-2 rounded-lg block text-center mt-3 cursor-not-allowed select-none">
                    Buy Now
                 </div>`
          : `      <a href="${whatsappURL}"
                   target="_blank"
                  class="block text-center mt-3 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 px-4 py-2 rounded-lg">
                  Buy Now
                </a>

`
        }
        </div>
      </div>
    `;

      container.insertAdjacentHTML("beforeend", card);
    });
  }
}
