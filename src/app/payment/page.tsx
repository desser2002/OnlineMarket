'use client';





import React from "react";
import PaymentForm from "@/app/payment/components/PaymentForm";
import {OrderSummaryData} from "@/types/OrderSummaryData";
import OrderSummary from "@/components/OrderSummary/OrderSummary";

const orderSummary: OrderSummaryData =
    {
        originalPrice: 300,
        storePickup:10,
        tax:5,
        totalPrice: 315,
    };

export default function Page() {


    return (<div>
            <section className="bg-white py-8 min-h-screen antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <PaymentForm/>
                            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                                <OrderSummary summary={orderSummary}/>

                                <div className="mt-6 flex items-center justify-center gap-8">
                                    <img className="h-8 w-auto dark:hidden"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                                         alt=""/>
                                    <img className="hidden h-8 w-auto dark:flex"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                                         alt=""/>
                                    <img className="h-8 w-auto dark:hidden"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                                         alt=""/>
                                    <img className="hidden h-8 w-auto dark:flex"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                                         alt=""/>
                                    <img className="h-8 w-auto dark:hidden"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                                         alt=""/>
                                    <img className="hidden h-8 w-auto dark:flex"
                                         src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                                         alt=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
