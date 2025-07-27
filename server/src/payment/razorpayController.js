import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createOrder(req, res) {
  try {
    const { amount, turfId, turfName } = req.body;
    const options = {
      amount: Number(amount), // amount in paise
      currency: 'INR',
      receipt: `turf_${turfId}_${Date.now()}`,
      notes: { turfName },
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Razorpay order', details: err.message });
  }
}

export function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest('hex');
  if (razorpay_signature === expectedSign) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Invalid signature' });
  }
}
