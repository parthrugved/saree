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
      imageUrl: "/shivini naki exhibition.webp",
      description:
        "Star power at our stall! 🌟 It was a pleasure hosting the lovely Shivani Naik at the Nashik Exhibition today. She loved our collection, and her energy was amazing! Thanks for stopping by, Shivani!",
    },
    
  ];

  return (
    <>
      <div className='items-center flex flex-col'>
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
            <div key={index} className="card m-10 items-center bg-amber-50 w-96 flex flex-col h-[70vh] p-10 rounded-2xl shadow-lg">
              <div className="img"><a href={exhibition.imageUrl} target='_blank'><img className='rounded-2xl cursor-pointer' width={250} height={250} src={exhibition.imageUrl} alt="" /></a></div>

              <div className="description items-center ">
                <div className="title font-bold flex items-center text-center justify-center flex-col mt-3 text-lg">{exhibition.title}</div>
                <div className="text mt-4 text-shadow-gray-600 ">{exhibition.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default page
