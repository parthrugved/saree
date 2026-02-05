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
                    <ul className="">
                        <li className="">

                            {/* Casual Wear */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-casual" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/casual_wear.js" strategy="afterInteractive" />

                        </li>

                        <li className="">

                            {/* Cotton Sarees */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-cotton" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/cotton_sarees.js" strategy="afterInteractive" />

                        </li>
                        <li className="">

                            {/* Cotton Silk */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-cotton_silk" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/cotton_silk.js" strategy="afterInteractive" />

                        </li>
                        <li>

                            {/*  Silk */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-silk" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/silk.js" strategy="afterInteractive" />

                        </li>
                        <li>

                            {/* Art Silk */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-art_silk" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/art_silk.js" strategy="afterInteractive" />

                        </li>
                        <li>

                            {/* Desiginer Sarees */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-desiginer" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/desiginer_sarees.js" strategy="afterInteractive" />

                        </li>
                        <li>

                            {/* khun sarees (खण) */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-khun" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/khun_sarees.js" strategy="afterInteractive" />

                        </li>
                        <li>

                            {/* Net Sarees */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-net" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/net_sarees.js" strategy="afterInteractive" />

                        </li>
                        <li>

                            {/* Dola Silk */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-dola_silk" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>
                            </section>
                            <Script src="/products/dola_silk.js" strategy="afterInteractive" />

                        </li>
                        <li>

                            {/* Wedding Sarees */}
                            <section className="text-gray-600 body-font">
                                <div className="container px-5 py-24 mx-auto">
                                    <div id="product-container-wedding" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                                    </div>
                                </div>

                            </section>
                            <Script src="/products/wedding_sarees.js" strategy="afterInteractive" />

                            <a href="#top" className="bg-blue-500 text-[15px] p-3 text-white rounded-lg items-center justify-center flex w-[150px] text-center mx-auto">Scroll To Top</a>

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
