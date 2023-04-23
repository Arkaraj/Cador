import { Kafka } from 'kafkajs';
import { KafkaAdmin } from './kafka-admin';
import constants from '../utils/constants';
import { getRandomValueFromArray } from '../utils/producerHelper';

const kafka = new Kafka({
  clientId: 'producer1',
  brokers: ['localhost:9092'],
});

const admin = new KafkaAdmin(kafka);
admin.createTopicIfNotExists(constants.SWORDS_TOPIC);

const producer = kafka.producer();

const sendSwords = async () => {
  try {
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
  await producer.connect();
  setInterval(sendSwords, 2000);
};

run().catch(console.error);
