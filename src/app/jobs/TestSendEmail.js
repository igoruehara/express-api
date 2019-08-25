const Mail = require('../libs/Mail');

class TestSendEmail {
  get key() {
    return 'TestSendEmail';
  }

  async handle(job) {
    const { content } = job.data;
    console.log('passou aqui');
    Mail.sendMail({
      from: '<foo@example.com>', // sender address
      to: 'baz@example.com', // list of receivers
      subject: 'Teste de Email', // Subject line
      template: 'test/content',
      context: {
        data: content,
      },
    });
  }
}

module.exports = new TestSendEmail();
