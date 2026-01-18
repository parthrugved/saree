import React from 'react'

export const metadata = {
  title: "Exhibition | SareeKraft",
  description: "Shop premium ready-to-wear sarees at SareeKraft. Discover designer sarees, cotton sarees, khan sarees, net sarees and more. Beautiful, affordable, and crafted with elegance.",
  keywords: "sarees, ready to wear saree, saree online, designer saree, cotton saree, saree shop India"
};

const page = () => {
  const exhibitions = [
    {
      title: "Nashik Exhibition",
      imageUrl: "https://scontent.cdninstagram.com/v/t51.82787-15/610131673_17917355244250388_128821777666694936_n.webp?_nc_cat=111&ig_cache_key=MzgwMTc1NDk1MzMxNzE5MTAwMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=sToBbz5l0twQ7kNvwHRDzcx&_nc_oc=Adk5uETH7w2xxy4gh0U1xcdB8BYsz68xQhRi8dJGzBz7hR9g7UhOJoX2b9kWHjPnCpA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=UJvemxfiMhVN2E2yJOXV4A&oh=00_AfpySGQk6dL9uMy9pqL6t5_jA-ca3l3U4TMffxNptE39CA&oe=6970EF3A",
      description:
        "Star power at our stall! 🌟 It was a pleasure hosting the lovely Shivani Naik at the Nashik Exhibition today. She loved our collection, and her energy was amazing! Thanks for stopping by, Shivani!",
    },
  ];

  return (
    <>
      <div className=''>
        <div className="flex items-center justify-center space-x-4 my-6">
          <div className="h-px bg-gray-300 w-12"></div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-700">
            Exhibitions
          </h1>
          <div className="h-px bg-gray-300 w-12"></div>
        </div>
      </div>

      <div className="flex flex-wrap ">
        {exhibitions.map((exhibition, index) => (
          <div key={index} className="card m-10 items-center bg-amber-50 w-78 h-[70vh] p-10 rounded-2xl shadow-lg">
            <div className="img"><img className='rounded-2xl' width={250} height={250} src={exhibition.imageUrl} alt="" /></div>

            <div className="description items-center ">
              <div className="title font-bold flex items-center text-center justify-center flex-col mt-3 text-lg">{exhibition.title}</div>
              <div className="text mt-4 text-shadow-gray-600 ">{exhibition.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default page
