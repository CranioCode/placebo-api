import nodemailer from "nodemailer";

/**
 * @description Sends an email with the
 * specified data.
 *
 * @param options The data
 * required to send the mail
 */
async function sendMail(options) {
  try {
    const { email, subject, html } = options;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: email,
      from: `"Placebo" <${process.env.MAIL_ID}>`,
      subject,
      html,
    });
  } catch (err) {
    console.log(err);
  }
}

export { sendMail };
