const desiginer_sarees = [
    {
    type: "designer sarees",
    img: "d10001.webp",
    name: "Designer Collection",
    price: "₹2200",
    code: "DS1",
    description: "A stylish designer saree with a modern touch, perfect for parties and evening events."
  },
  {
    type: "designer sarees",
    img: "d10002.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS2",
    description: "Glamorous designer saree that adds instant sparkle to your festive wardrobe."
  }, {
    type: "designer sarees",
    img: "d10003.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS3",
    description: "Trendy designer piece with a graceful fall, ideal for receptions and celebrations."
  }, {
    type: "designer sarees",
    img: "d10004.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS4",
    description: "A statement designer saree crafted to make you stand out at any function."
  }, {
    type: "designer sarees",
    img: "d10005.webp",
    name: "Designer Collection",
    price: "₹2100",
    code: "DS5",
    description: "Elegant designer saree with a rich look, perfect for sangeet nights and cocktail parties."
  },
  //  {
  //   type: "designer sarees",
  //   img: "d10006.webp",
  //   name: "Designer Collection",
  //   price: "₹1499",
  //   code: "DS6",
  //   description: "Chic designer drape that blends traditional charm with contemporary style."
  // },
  {
    type: "designer sarees",
    img: "d10007.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS7",
    description: "Eye-catching designer saree, ideal for festive gatherings and special occasions."
  }, {
    type: "designer sarees",
    img: "d10008.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS8",
    description: "A sophisticated designer saree that instantly elevates your party look."
  }, {
    type: "designer sarees",
    img: "d10009.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS9",
    description: "Graceful designer saree with a premium finish, perfect for evening wear."
  }, {
    type: "designer sarees",
    img: "d10010.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS10",
    description: "Beautifully detailed designer saree made for celebrations and memorable moments."
  }, {
    type: "designer sarees",
    img: "d10011.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS11",
    description: "Stylish and refined, this designer saree is perfect for functions and family events."
  }, {
    type: "designer sarees",
    img: "d10012 (2).webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS12",
    description: "A classy designer saree that pairs well with statement jewelry for a grand look."
  }, {
    type: "designer sarees",
    img: "d10013 (1).webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS13",
    description: "Modern designer saree with a rich drape, ideal for festive nights and receptions."
  }, {
    type: "designer sarees",
    img: "d10015.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS14",
    description: "Trendy designer saree that brings together comfort and high-fashion appeal."
  }, {
    type: "designer sarees",
    img: "d10016.webp",
    name: "Designer Collection",
    price: "₹1999",
    code: "DS15",
    description: "A graceful designer piece for women who love subtle yet striking ethnic wear."
  }, 
  {
    type: "designer sarees",
    img: "d100018.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS17",
    description: "A festive-ready designer saree that adds shimmer and style to your celebrations."
  }, {
    type: "designer sarees",
    img: "d100019.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS18",
    description: "Elegant designer saree with a luxurious feel, ideal for weddings and special functions."
  },
 
];

// 🪄 Reference to single container (id only) and deferred render
function renderDesiginer() {
  const container = document.getElementById('product-container-desiginer');
  if (!container) {
    console.warn('No container found for cotton-silk products (id: product-container-cotton_silk)');
    return;
  }

  // console.debug('Rendering cotton_silk, count:', desiginer_sarees.length);
  container.innerHTML = '';

  desiginer_sarees.forEach((item, i) => {
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
          : `<a href="${whatsappURL}" target="_blank" class="bg-green-600 text-white px-4 py-2 rounded-lg block text-center mt-3">Buy Now</a>`
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
  document.addEventListener('DOMContentLoaded', renderDesiginer);
} else {
  renderDesiginer();
}
