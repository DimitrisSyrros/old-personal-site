import nodemailer from 'nodemailer';

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stripNewlines = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ');

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({error: 'Method not allowed'});
    }

    const {firstName, lastName, email, subject, message} = req.body ?? {};
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({error: 'Missing required fields'});
    }

    const transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

    try {
        await transporter.sendMail({
            from: 'dsyrroscv@gmail.com',
            to: 'dimsyrr@gmail.com',
            subject: stripNewlines(`Contact form submission from ${firstName} ${lastName}`),
            html: `<p>You have new contact form submission</p><br>
            <p><strong>FirstName: </strong>${escapeHtml(firstName)}</p>
            <p><strong>LastName: </strong>${escapeHtml(lastName)}</p>
            <p><strong>Email: </strong>${escapeHtml(email)}</p>
            <p><strong>Subject: </strong>${escapeHtml(subject)}</p>
            <p>Message:  ${escapeHtml(message)}</p>`,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Failed to send message'});
    }
    return res.status(200).json({ok: true});
}
