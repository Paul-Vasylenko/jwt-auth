const nodemailer = require("nodemailer");

class MailService {
  _getTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async _sendMail(options) {
    try {
      const transport = this._getTransporter();
      await transport.sendMail(options);
      return { success: true };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async sendActivationMail(to, link) {
    const result = await this._sendMail({
      from: process.env.EMAIL_ADRESS,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
          </div>
      `,
    });
    return result;
  }
}

module.exports = new MailService();
