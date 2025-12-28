const casual_wear = [
    {
        type: "casual wear",
        img: "ci1.webp",
        name: "Everyday Elegance",
        price: "₹1600",
        code: "Code - CI1",
        description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look."

    },
    {
        type: "casual wear",
        img: "ci2.webp",
        name: "Everyday Elegance",
        price: "₹1600",
        code: "Code - CI2",
        description: "Lightweight and easy to carry, this casual saree adds a subtle sparkle to your everyday look.",
        stock: false
    },
    {
        type: "casual wear",
        img: "ci3.webp",
        name: "Everyday Elegance",
        price: "₹1500",
        code: "Code - CI3",
        description: "A dreamy casual saree with gentle tones that make it ideal for relaxed outings and get-togethers.",
        stock: false

    },
    {
        type: "casual wear",
        img: "ci4.webp",
        name: "Everyday Elegance",
        price: "₹1500",
        code: "Code - CI4",
        description: "A stylish casual saree with a graceful fall, designed for comfort and all-day wear.",
        stock: false
    },
    {
        type: "casual wear",
        img: "ci5.webp",
        name: "Everyday Elegance",
        price: "₹1500",
        code: "Code - CI5",
        description: "Soft, flowy and breathable, this saree is perfect for casual brunches and daily wear."
    },
    {
        type: "casual wear",
        img: "ci6.webp",
        name: "Everyday Elegance",
        price: "₹1500",
        code: "Code - CI6",
        description: "A light and comfortable saree that brings a hint of elegance to your everyday wardrobe."
    },
    {
        type: "casual wear",
        img: "ci7.webp",
        name: "Everyday Elegance",
        price: "₹1500",
        code: "Code - CI7",
        description: "An easygoing saree with a simple yet classy look, ideal for office and casual meets."
    },

    {
        type: "casual wear",
        img: "ci8.webp",
        name: "Everyday Elegance",
        price: "₹1500",
        code: "Code - CI8",
        description: "A versatile casual saree that pairs beautifully with minimal jewelry for a neat, polished look."
    },
    {
        type: "casual wear",
        img: "ci9.webp",
        name: "Everyday Elegance",
        price: "₹1200",
        code: "Code - CI9",
        description: "Budget-friendly and stylish, this saree is perfect for regular use without compromising on charm."
    },
    {
        type: "casual wear",
        img: "ci10.webp",
        name: "Everyday Elegance",
        price: "₹1200",
        code: "Code - CI10",
        description: "A soft, comfortable saree with a subtle design, ideal for daily errands and casual gatherings."
    },
    {
        type: "casual wear",
        img: "ci11.webp",
        name: "Everyday Elegance",
        price: "₹1200",
        code: "Code - CI11",
        description: "A graceful casual saree that offers a clean, refined look for everyday wear."
    },

    {
        type: "casual wear",
        img: "ci12.webp",
        name: "Everyday Elegance",
        price: "₹1599",
        code: "Code - CI12",
        description: "A slightly premium casual saree with a smooth fall, great for kitty parties and small functions."
    },

    {
        type: "casual wear",
        img: "ci13.webp",
        name: "Everyday Elegance",
        price: "₹1599",
        code: "Code - CI13",
        description: "A smart and elegant casual saree that balances everyday comfort with a touch of sophistication.",
        stock: false
    },
];

// 🪄 Reference to container

const container = document.getElementById("product-container-casual");

// Guard: if container missing, abort silently
if (!container) {
    console.warn('No container found for casual wear products (id: product-container-casual)');
} else {
    // old.js style rendering, with stock handling for button/label
    casual_wear.forEach((item) => {
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
