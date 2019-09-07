const Bull = require('bull');
const redisConfig = require('../../config/redis');

const Mail = require('../services/Mail');

class TestSendEmailJob {
  constructor() {
    this.queue = new Bull('TestSendEmailJob', redisConfig);
    this.process();
  }

  init(name = null, data = null, options = null) {
    this.queue.add(name, data, options);
    return { status: () => this.status() };
  }

  process() {
    this.queue.process('*', async (job, done) => {
      try {
        job.progress(1);
        const response = await Mail.sendMail({
          from: '<foo@example.com>',
          to: 'baz@example.com',
          subject: 'Teste de Email',
          template: 'test/content',
          context: {
            data: job.data,
          },
        });
        job.progress(100);
        done(null, response);
      } catch (error) {
        throw new Error('Algo deu muito errado aqui');
      }
    });
  }

  status() {
    const { log } = console;
    this.queue
      .on('waiting', jobId => log('Waiting to execute: ', jobId))
      .on('progress', (job, progress) =>
        log(`Progress: ${job.name} - ${job.id} ==> ${progress}%`)
      )
      .on('completed', (job, result) => log('Response: ', result))
      .on('failed', (job, err) => log('Error: ', err));
  }
}

module.exports = new TestSendEmailJob();
