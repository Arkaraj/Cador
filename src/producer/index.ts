import { CustomKafka } from '../utils/kafkaHelper';
import constants from '../utils/constants';
import { getRandomValueFromArray } from '../utils/producerHelper';

const kafka = new CustomKafka({
  clientId: 'producer1',
  brokers: ['localhost:9092'],
});

const admin = kafka.getAdmin();
admin.createTopicIfNotExists(constants.SWORDS_TOPIC);

const sendSwords = async () => {
  try {
    const producer = await kafka.getProducer();
    await producer.send({
      topic: constants.SWORDS_TOPIC,
      messages: [{ value: getRandomValueFromArray(constants.SWORDS) }],
    });
  } catch (error) {
    console.log(error);
  }
};

const run = async () => {
  // Producing
  setInterval(sendSwords, 2000);
};

run();
