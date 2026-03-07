export type CheckoutData = {
    cartItems: {
        product_id: number;
        product_name: string;
        product_price: number;
        quantity: number;
        image: string;
    }[];
    shipping_fee: number;
    discount_applied: number;
};

const mockCheckoutData: CheckoutData = {
    cartItems: [
        {
            product_id: 101,
            product_name: "Bamboo Toothbrush (Pack of 4)",
            product_price: 299,
            quantity: 2,
            image: "/images/toothbrush.png"
        },
        {
            product_id: 102,
            product_name: "Reusable Cotton Produce Bags",
            product_price: 450,
            quantity: 1,
            image: "/images/produce-bags.png"
        }
    ],
    shipping_fee: 50,
    discount_applied: 0
};

export async function fetchCheckoutData(): Promise<CheckoutData> {
    // Simulate network delay for SSR 
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCheckoutData);
        }, 500);
    });
}
