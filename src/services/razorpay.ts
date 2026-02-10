import api from './api';

export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const processPayment = async (orderData: { amount: number; planId: string }) => {
    try {
        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // 1. Create Order in Backend
        const response = await api.post('/payments/create-order', orderData);
        const order = response.data;

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'AutoSAAS',
            description: `Plan Upgrade: ${orderData.planId}`,
            order_id: order.id,
            handler: async function (response: any) {
                // 2. Verify Payment in Backend
                const verifyRes = await api.post('/payments/verify', {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (verifyRes.data.success) {
                    alert('Payment Successful! Your plan has been updated.');
                    window.location.reload();
                }
            },
            prefill: {
                name: 'User Name',
                email: 'user@example.com',
            },
            theme: {
                color: '#ea580c',
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
    } catch (error: any) {
        console.error('Payment failed:', error.message);
        alert('Something went wrong during payment initialization.');
    }
};
