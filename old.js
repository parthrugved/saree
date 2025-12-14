// alert("Note: The Product images may take some time to load. Please co-oprate and wait till the images load")
// 🧵 Product data map
const sarees = [
  {
    type: "casual wear",
    img: "ci1.webp",
    name: "Everyday Elegance",
    price: "₹1600",
    code: "Code - CI1",
    description: "A chic everyday saree with a soft drape and modern flair, perfect for effortless daily style.",
    
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
  // Cotton 
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
  //desiginer sarees 
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
  }, {
    type: "designer sarees",
    img: "d10017.webp",
    name: "Designer Collection",
    price: "₹1999",
    code: "DS16",
    description: "Perfect designer saree for parties, giving you a polished and glamorous appearance.",
    stock: false
  },  {
    type: "designer sarees",
    img: "d100018.webp",
    name: "Designer Collection",
    price: "₹1499",
      code: "DS17",
    description: "A festive-ready designer saree that adds shimmer and style to your celebrations."
  },  {
    type: "designer sarees",
    img: "d100019.webp",
    name: "Designer Collection",
    price: "₹1499",
    code: "DS18",
    description: "Elegant designer saree with a luxurious feel, ideal for weddings and special functions."
  },
  //khun sarees
  {
    type: "khan sarees",
    img: "khan (1).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS1",
    description: "Traditional khan saree with rich borders, perfect for cultural and festive occasions."
  },{
    type: "khan sarees",
    img: "khan (2).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS2",
    description: "Classic khun weave saree that reflects Maharashtrian heritage in a stylish way."
  },{
    type: "khan sarees",
    img: "khan (3).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS3",
    description: "Vibrant khan saree with a royal look, ideal for haldi, pujas and family events."
  },{
    type: "khan sarees",
    img: "khan (4).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS4",
    description: "Elegant khun saree with a textured body and contrast pallu for a timeless ethnic look."
  },{
    type: "khan sarees",
    img: "khan (5).webp",
    name: "Heritage Weave",
    price: "₹1499",
    code: "KS5",
    description: "Graceful khan saree that combines traditional patterns with everyday comfort."
  },
  //net sarees
  {
    type: "net sarees",
    img: "net (1).webp",
    name: "Sheer Glamour",
    price: "₹1499",
    code: "NET1",
    description: "Sheer net saree with a delicate look, perfect for parties and evening outings."
  }, {
    type: "net sarees",
    img: "net (2).webp",
    name: "Sheer Glamour",
    price: "₹1499",
    code: "NET2",
    description: "Stylish net saree that adds a glamorous, lightweight layer to your festive style."
  },{
    type: "net sarees",
    img: "net (3).webp",
    name: "Sheer Glamour",
    price: "₹1499",
    code: "NET3",
    description: "Elegant net drape ideal for receptions, cocktail nights and special celebrations."
  },{
    type: "net sarees",
    img: "net (4).webp",
    name: "Sheer Glamour",
    price: "₹1499",
    code: "NET4",
    description: "Soft net saree with a graceful fall, perfect for a subtle yet stylish party look."
  },{
    type: "net sarees",
    img: "net (5).webp",
    name: "Sheer Glamour",
    price: "₹1499",
    code: "NET5",
    description: "Trendy net saree that pairs beautifully with a designer blouse for functions."
  },{
    type: "net sarees",
    img: "net (6).webp",
    name: "Sheer Glamour",
    price: "₹1499",
    code: "NET6",
    description: "A chic net saree made for modern festive wear with a touch of shimmer."
  },
  //wedding sarees
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
  },{
    type: "wedding sarees",
    img: "wedding  (3).webp",
    name: "Bridal Collection",
    price: "₹2700",
    code: "WS3",
    description: "Regal wedding saree that adds a royal touch to your special day wardrobe."
  },{
    type: "wedding sarees",
    img: "wedding  (4).webp",
    name: "Bridal Collection",
    price: "₹2700",
    code: "WS4",
    description: "Beautifully crafted wedding saree designed for festive rituals and ceremonies."
  },{
    type: "wedding sarees",
    img: "wedding  (5).webp",
    name: "Bridal Collection",
    price: "₹3100",
    code: "WS5",
    description: "An elegant wedding saree with a luxurious feel, perfect for bridal events."
  },{
    type: "wedding sarees",
    img: "wedding  (6).webp",
    name: "Bridal Collection",
    price: "₹2700",
    code: "WS6",
    description: "Classic wedding saree that gives a rich, traditional look for auspicious occasions."
  },{
    type: "wedding sarees",
    img: "wedding  (7).webp",
    name: "Bridal Collection",
    price: "₹2499",
    code: "WS7",
    description: "Graceful wedding saree ideal for family weddings, receptions and grand functions."
  },{
    type: "wedding sarees",
    img: "wedding  (8).webp",
    name: "Bridal Collection",
    price: "₹2499",
    code: "WS8",
    description: "A festive wedding saree with a stunning presence, perfect for important ceremonies."
  },{
    type: "wedding sarees",
    img: "wedding  (9).webp",
    name: "Bridal Collection",
    price: "₹3300",
    code: "WS9",
    description: "Traditional yet stylish wedding saree crafted to make you stand out at any celebration."
  },
  
];

// 🪄 Reference to container

const container = document.getElementById("product-container");

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
        <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="webp_images/${item.type}/${item.img}">
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
