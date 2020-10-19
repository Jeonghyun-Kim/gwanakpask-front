import mailer from '@sendgrid/mail';

const KEY = process.env.SEND_GRID_KEY ?? '';

mailer.setApiKey(KEY);

export const sendEmail: (
  title: string,
  html: string,
  mailTo?: string,
) => Promise<void> = async (title, html, mailTo) => {
  const toEmail = process.env.MAILTO ?? 'kimjh@bawi.org';
  const mailOptions = {
    to: mailTo ?? toEmail,
    from: process.env.SEND_GRID_FROM ?? 'ondisplay.art@gmail.com',
    subject: title,
    html,
  };
  await mailer.send(mailOptions);
};

export default {
  sendEmail,
};
