import React from 'react'
import "./shop.css";
import Script from 'next/script';

const Shop = () => {
  return (
   <>
   <main>
    <section>
      <ul>
        <li>
          <details>
            <summary>Casual Wear</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-casual" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
            <Script src="/products/casual_wear.js" strategy="afterInteractive" />
          </details>
        </li>
      
        <li>
          <details>
            <summary>Cotton Sarees</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-cotton" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
           <Script src="/products/cotton_sarees.js" strategy="afterInteractive" />
          </details>
        </li>
        <li>
          <details>
            <summary>Cotton Silk</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-cotton_silk" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
             <Script src="/products/cotton_silk.js" strategy="afterInteractive" />
          </details>
        </li>
        <li>
        <details>
            <summary>Art Silk</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-art_silk" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
            <Script src="/products/art_silk.js" strategy="afterInteractive" /> 
          </details>
        </li>
        <li>
          <details>
            <summary>Desiginer Sarees</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-desiginer" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
            <Script src="/products/desiginer_sarees.js" strategy="afterInteractive" />  
          </details>
        </li>
        <li>
          <details>
            <summary>khun sarees (खण)</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-khun" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
            <Script src="/products/khun_sarees.js" strategy="afterInteractive" />
          </details>
        </li>
        <li>
          <details>
            <summary>Net Sarees</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-net" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
            <Script src="/products/net_sarees.js" strategy="afterInteractive" />  
          </details>
        </li>
        <li>
          <details>
            <summary>Wedding Sarees</summary>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div id="product-container-wedding" className="flex flex-wrap -m-4">
                 
                </div>
              </div>

            </section>
            <Script src="/products/wedding_sarees.js" strategy="afterInteractive" />    
          </details>
        </li>
      </ul>
    </section>


  </main>
   </>
  )
}

export default Shop

export const metadata = {
  title: "Shop | SareeKraft",
  description: "Shop premium ready-to-wear sarees at SareeKraft. Discover designer sarees, cotton sarees, khan sarees, net sarees and more. Beautiful, affordable, and crafted with elegance.",
  keywords: "sarees, ready to wear saree, saree online, designer saree, cotton saree, saree shop India, khun saree, net saree, wedding saree, affordable sarees, SareeKraft",
};
