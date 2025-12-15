    
// 🧵 Product data map
const sarees1 = [
  {
    type: "casual wear",
    img: "ci1.png",
    name: "The Catalyzer",
    price: "₹1600",
    category: "CATEGORY",
    description: "This is a very good saree"
  },
  {
    type: "casual wear",
    img: "ci2.png",
    name: "Shooting Stars",
    price: "₹2100.15",
    category: "CATEGORY",
    description: "This is a saree"
  },
  {
    type: "casual wear",
    img: "ci3.png",
    name: "Nebula Dream",
    price: "₹1899.00",
    category: "CATEGORY",
    description: "This is a saree"
  },
  {
    type: "casual wear",
    img: "ci4.png",
    name: "Cosmic Charm",
    price: "₹2499.99",
    category: "CATEGORY",
    description: "This is a saree"
  },
  {
    type: "casual wear",
    img: "ci5.png",
    name: "Celestial Flow",
    price: "₹2599.50",
    category: "CATEGORY",
    description: "This is a saree"
  },
  {
    type: "casual wear",
    img: "ci6.png",
    name: "Starry Mist",
    price: "₹1799.99",
    category: "CATEGORY",
    description: "This is a saree"
  },
  {
    type: "designer sarees",
    img: "d10001.png",
    name: "Designer Elegance",
    price: "₹3499.99",
    category: "DESIGNER",
    description: "Exquisite designer saree with intricate work"
  },
  {
    type: "designer sarees",
    img: "d10002.png",
    name: "Designer Royal",
    price: "₹3999.99",
    category: "DESIGNER",
    description: "Premium designer saree for special occasions"
  }
  
];


const container = document.getElementById("product-container");
// container.innerHTML = ""
 // clear before rendering

sarees1.forEach((item) => {
  const message = `Hello SareeKraft 👋%0A` +
    `I want to buy this saree:%0A%0A` +
    `✨ Name: ${item.name}%0A` +
    `💰 Price: ${item.price}%0A` +
    `🏷️ code: ${item.code}%0A%0A` +
    `Please confirm availability.`;

  const whatsappURL = `https://wa.me/91808067xxxx?text=${message}`;

  const buttonHTML = item.stock === false
    ? `<div class="bg-gray-400 text-white px-4 py-2 rounded-lg block text-center mt-3 cursor-not-allowed select-none" aria-disabled="true">
         Buy Now
       </div>`
    : `<a href="${whatsappURL}" target="_blank" class="bg-green-600 text-white px-4 py-2 rounded-lg block text-center mt-3">
         Buy Now
       </a>`;

  const card = `
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full relative">
      ${item.stock === false ? `<span class="absolute z-10 top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">OUT OF STOCK</span>` : ""}
      <a class="block relative h-150 rounded overflow-hidden">
        <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="webp_images/${item.type}/${item.img}">
      </a>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${item.code}</h3>
        <h2 class="text-gray-900 title-font text-lg font-semibold">${item.name}</h2>
        <p class="text-gray-700 text-sm leading-snug mt-1">${item.description}</p>
        <p class="mt-2 text-base font-semibold text-gray-900">${item.price}</p>
        ${buttonHTML}
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", card);
});