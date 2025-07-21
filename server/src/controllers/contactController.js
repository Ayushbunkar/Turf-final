import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/sendEmail.js';

export const submitContact = async (req, res) => {
  const { fullname, email, feedback } = req.body;
  try {
    const message = new Contact({ fullname, email, feedback });
    await message.save();

    await sendEmail(
      process.env.EMAIL_USER,
      'New Contact Message',
      `<h3>${fullname}</h3><p>${feedback}</p><p><strong>From:</strong> ${email}</p>`
    );

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Contact failed', error: err.message });
  }
};
