const sarees = [
  {
    type: "wedding sarees",
    img: "wedding  (7).png",
    name: "Bridal Collection",
    price: "₹1499",
    code: "WS7",
    description:
      "Graceful wedding saree ideal for family weddings, receptions and grand functions.",
  },
  {
    type: "wedding sarees",
    img: "wedding  (8).png",
    name: "Bridal Collection",
    price: "₹1499",
    code: "WS8",
    description:
      "A festive wedding saree with a stunning presence, perfect for important ceremonies.",
  },
  {
    type: "wedding sarees",
    img: "wedding  (9).png",
    name: "Bridal Collection",
    price: "₹1499",
    code: "WS9",
    description:
      "Traditional yet stylish wedding saree crafted to make you stand out at any celebration.",
    stock: false,
  },
];

// Reference to container
const container = document.getElementById("product-container-test");
if (container) {
  console.log("true")
}

// old.js style rendering, with stock handling for button/label
sarees.forEach((item) => {
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
        <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="images/${item.type}/${item.img}">
      </a>

      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${item.code}</h3>
        <h2 class="text-gray-900 title-font text-lg font-semibold">${item.name}</h2>
        <p class="text-gray-700 text-sm leading-snug mt-1">${item.description}</p>
        <p class="mt-2 text-base font-semibold text-gray-900">${item.price}</p>

        ${
          isOut
            ? `<div class="bg-gray-400 text-white px-4 py-2 rounded-lg block text-center mt-3 cursor-not-allowed select-none">
                  Buy Now
               </div>`
            : `<a href="${whatsappURL}"
                  target="_blank"
                  class="bg-green-600 text-white px-4 py-2 rounded-lg block text-center mt-3">
                  Buy Now
               </a>`
        }
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", card);
});
