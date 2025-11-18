    
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

// 🪄 References to containers
const primaryContainer = document.getElementById("product-container");
const secondaryContainer = document.getElementById("product-container-secondary");
const designerContainer = document.getElementById("product-container-designer");

// 🔧 Card builder
function buildCardHtml(item) {
  return `
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
}

// 🌀 Render casual wear items into the primary container (Casual Wear)
if (primaryContainer) {
  sarees.filter((item) => item.type === "casual wear").forEach((item) => {
    primaryContainer.insertAdjacentHTML("beforeend", buildCardHtml(item));
  });
}

// ➕ Render all items into the secondary container (Normal Wear)
if (secondaryContainer) {
  sarees.forEach((item) => {
    secondaryContainer.insertAdjacentHTML("beforeend", buildCardHtml(item));
  });
}

// ✨ Render designer sarees into the designer container
if (designerContainer) {
  sarees.filter((item) => item.category === "DESIGNER").forEach((item) => {
    designerContainer.insertAdjacentHTML("beforeend", buildCardHtml(item));
  });
}