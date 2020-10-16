import mailer from '@sendgrid/mail';

import { getDivisionKor } from './utils';

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

export const sendTemplate: (
  previewUrl: string,
  artwork: Artwork,
) => Promise<void> = async (previewUrl, artwork) => {
  try {
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email: artwork.email,
                name: artwork.nameKor,
              },
            ],
            dynamic_template_data: {
              previewUrl,
              artwork: {
                ...artwork,
                birth: artwork.birth.split('-').join('. '),
                division: getDivisionKor(artwork.division),
                description: artwork.description.split('\n').join('<br />'),
              },
            },
            subject: '2020 관악 강감찬 미술 공모전 접수 완료',
          },
        ],
        from: {
          email: process.env.SEND_GRID_FROM,
          name: '온디스플레이',
        },
        reply_to: {
          email: 'ondisplay.art@gmail.com',
          name: '온디스플레이',
        },
        template_id: process.env.SEND_GRID_TEMPLATE_ID,
      }),
    });
  } catch (err) {
    console.error(err);
  }
};

export default {
  sendEmail,
  sendTemplate,
};
