const kue = require('kue');
const redisConfig = require('../../config/redis');

const TestSendEmail = require('../jobs/TestSendEmail');

const Queue = kue.createQueue({ redis: redisConfig });

Queue.process(TestSendEmail.key, TestSendEmail.handle);

module.exports = Queue;
