"use client";
import data from "@/src/data/admin-products.json";
import Link from "next/link";
import Script from "next/script";
import "./shop.css";

export default function ShopClient() {
    return (
        <>
            <div className="top"></div>
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
                            <summary>Dola Silk</summary>
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-dola_silk" className="flex flex-wrap -m-4">

                                    </div>
                                </div>
                            </section>
                            <Script src="/products/dola_silk.js" strategy="afterInteractive" />
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
                                
                                <a href="#top" className="bg-blue-500 text-[15px] p-3 text-white rounded-lg items-center justify-center flex w-[150px] text-center mx-auto">Scroll To Top</a>
                            </details>
                        </li>
                    </ul>
                </section>
            </main>
            {/* <Link href="#top">
                                    <button type="button" className=" items-center text-center flex mx-auto bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Scroll To Top</button>
            </Link> */}

        </>
    );
}
