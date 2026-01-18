const artSilk_sarees = [
    {
        type: "art silk",
        img: "art (1).webp",
        name: "Destroyer Art",
        price: "₹1299",
        code: "ART1",
        description: "Sheer net saree with a delicate look, perfect for parties and evening outings."
    },
    {
        type: "art silk",
        img: "art (2).webp",
        name: "Destroyer Art",
        price: "₹1299",
        code: "ART2",
        description: "Sheer net saree with a delicate look, perfect for parties and evening outings.",
        stock: false
    },
    {
        type: "art silk",
        img: "art (3).webp",
        name: "Destroyer Art",
        price: "₹1299",
        code: "ART3",
        description: "Sheer net saree with a delicate look, perfect for parties and evening outings."
    },
    {
        type: "art silk",
        img: "art (4).webp",
        name: "Destroyer Art",
        price: "₹1299",
        code: "ART4",
        description: "Sheer net saree with a delicate look, perfect for parties and evening outings."
    },
    {
        type: "art silk",
        img: "art (5).webp",
        name: "Destroyer Art",
        price: "₹1299",
        code: "ART5 ",
        description: "Sheer net saree with a delicate look, perfect for parties and evening outings."
    },

];

// 🪄 Reference to single container (id only) and deferred render
function render_art_silk() {
    const container = document.getElementById('product-container-art_silk');
    if (!container) {
        console.warn('No container found for cotton-silk products (id: product-container-net)');
        return;
    }

    console.debug('Rendering artSilk_sarees, count:', artSilk_sarees.length);
    container.innerHTML = '';

    artSilk_sarees.forEach((item, i) => {
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
                    : `<a href="${whatsappURL}"
                   target="_blank"
                  class="block text-center mt-3 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 px-4 py-2 rounded-lg">
                  Buy Now
                </a>`
                }
          </div>
        </div>
      `;

            container.insertAdjacentHTML('beforeend', card);
        } catch (err) {
            console.error('Failed to render artSilk_sarees item at index', i, err);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render_art_silk

    );
} else {
    render_art_silk
        ();
}
