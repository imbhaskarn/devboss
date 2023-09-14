import * as nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
const sendMail = async (to: string, subject: string, html: string) => {
    await transport.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
    });
};
export default sendMail;
