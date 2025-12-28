const cotton_sarees = [
  {
    type: "cotton sarees",
    img: "c (1).webp",
    name: "Pure Comfort",
    price: "₹1200",
    code: "CO1",
    description: "Pure cotton comfort saree, perfect for hot days and everyday office wear."
  }, {
    type: "cotton sarees",
    img: "c (2).webp",
    name: "Pure Comfort",
    price: "₹2399",
    code: "CO2",
    description: "Premium cotton saree with rich detailing, ideal for festive days and special meetings."
  }, {
    type: "cotton sarees",
    img: "c (3).webp",
    name: "Pure Comfort",
    price: "₹1200",
    code: "CO3",
    description: "Soft, breathable cotton saree that keeps you cool and stylish all day long."
  }, {
    type: "cotton sarees",
    img: "c (4).webp",
    name: "Pure Comfort",
    price: "₹1200",
    code: "CO4",
    description: "Lightweight cotton saree with a neat finish, perfect for school or college functions.",
    stock: false
  }, {
    type: "cotton sarees",
    img: "c (5).webp",
    name: "Pure Comfort",
    price: "₹2399",
    code: "CO5",
    description: "Elegant cotton saree with a slightly grand look, great for poojas and family gatherings."
  }, {
    type: "cotton sarees",
    img: "c (6).webp",
    name: "Pure Comfort",
    price: "₹2399",
    code: "CO6",
    description: "Classic cotton saree with a refined design for a sophisticated, everyday ethnic look."
  }, {
    type: "cotton sarees",
    img: "c (7).webp",
    name: "Pure Comfort",
    price: "₹2399",
    code: "CO7",
    description: "Rich cotton weave saree that offers both comfort and a graceful, traditional appeal."
  },
  {
    type: "cotton sarees",
    img: "c (8).webp",
    name: "Pure Comfort",
    price: "₹2499",
    code: "CO8",
    description: "Soft, high-quality cotton saree ideal for long hours of wear at work or social events."
  }, {
    type: "cotton sarees",
    img: "c (9).webp",
    name: "Pure Comfort",
    price: "₹2499",
    code: "CO9",
    description: "Beautifully woven cotton saree that blends daily comfort with a festive touch."
  }, {
    type: "cotton sarees",
    img: "c (10).webp",
    name: "Pure Comfort",
    price: "₹2499",
    code: "CO10",
    description: "A versatile cotton saree that looks equally good for office, temple visits and casual outings."
  }, {
    type: "cotton sarees",
    img: "c (11).webp",
    name: "Pure Comfort",
    price: "₹2200",
    code: "CO11",
    description: "Easy-to-drape cotton saree with a soothing look, perfect for everyday elegance."
  }, {
    type: "cotton sarees",
    img: "c (12).webp",
    name: "Pure Comfort",
    price: "₹2200",
    code: "CO12",
    description: "Comfortable cotton saree designed for regular use with a simple, classy feel."
  },
  {
    type: "cotton sarees",
    img: "c (13).webp",
    name: "Pure Comfort",
    price: "₹2200",
    code: "CO13",
    description: "A graceful cotton saree that gives a neat, traditional appearance for day-to-day wear."
  }, {
    type: "cotton sarees",
    img: "c (14).webp",
    name: "Pure Comfort",
    price: "₹2200",
    code: "CO14",
    description: "Soft-touch cotton saree with a clean design, ideal for minimal, elegant styling."
  }, {
    type: "cotton sarees",
    img: "c (15).webp",
    name: "Pure Comfort",
    price: "₹1499",
    code: "CO15",
    description: "Budget-friendly cotton saree offering comfort, breathability and a timeless look."
  }, {
    type: "cotton sarees",
    img: "c (16).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO16",
    description: "Light, airy cotton saree perfect for summer days and casual family functions.",
    stock: false
  }, {
    type: "cotton sarees",
    img: "c (17).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO17",
    description: "Everyday cotton saree with a simple pattern that pairs well with contrast blouses."
  }, {
    type: "cotton sarees",
    img: "c (18).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO18",
    description: "A classic cotton saree that is easy to maintain and perfect for daily use.",
    stock: false
  }, {
    type: "cotton sarees",
    img: "c (19).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO19",
    description: "Comfort-first cotton saree that keeps you cool while looking effortlessly traditional."
  }, {
    type: "cotton sarees",
    img: "c (20).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO20",
    description: "Soft cotton drape ideal for teachers, working women and daily errands."
  },
  {
    type: "cotton sarees",
    img: "c (21).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO21",
    description: "A charming cotton saree with a subtle look, perfect for homely and casual occasions."
  }, {
    type: "cotton sarees",
    img: "c (22).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO22",
    description: "Breathable cotton saree designed for all-day comfort in any season."
  },
  {
    type: "cotton sarees",
    img: "c (23).webp",
    name: "Pure Comfort",
    price: "₹1299",
    code: "CO23",
    description: "Simple yet elegant cotton saree that suits both everyday use and small functions."
  },

];

// 🪄 Reference to single container (id only) and deferred render
function renderCotton() {
  const container = document.getElementById('product-container-cotton');
  if (!container) {
    console.warn('No container found for cotton saree products (id: product-container-cotton)');
    return;
  }

  console.debug('Rendering cotton_sarees, count:', cotton_sarees.length);
  container.innerHTML = '';

  cotton_sarees.forEach((item, i) => {
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
   class="block text-center mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2 rounded-lg">
   Buy Now
</a>
`
        }
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', card);
    } catch (err) {
      console.error('Failed to render cotton item at index', i, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCotton);
} else {
  renderCotton();
}
