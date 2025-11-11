    
// 🧵 Product data map
const sarees = [
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
];

// 🪄 Reference to container
const container = document.getElementById("product-container");

// 🌀 Loop to render items
sarees.forEach((item) => {
  const card = `
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a class="block relative h-150 rounded overflow-hidden">
        <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="images/${item.type}/${item.img}">
      </a>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${item.category}</h3>
        <h2 class="text-gray-900 title-font text-lg font-medium">${item.name}</h2>
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">${item.description}</h3>
        <p class="mt-1">${item.price}</p>
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", card);
});