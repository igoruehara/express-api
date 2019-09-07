const nodemailer = require('nodemailer');
const expgbs = require('express-handlebars');
const nodemailerhbs = require('nodemailer-express-handlebars');
const { resolve } = require('path');
const mailConfig = require('../../config/mail');

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig);

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(
      __dirname,
      '..',
      '..',
      'resource',
      'views',
      'emails'
    );

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: expgbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  async sendMail(message) {
    console.log(`Send mail to: ${message.context.data.name}`);
    const info = await this.transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
    return info;
  }
}

module.exports = new Mail();
