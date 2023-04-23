import { Kafka } from 'kafkajs';
import constants from '../utils/constants';

const kafka = new Kafka({
  clientId: 'producer1',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({
    topic: constants.SWORDS_TOPIC,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
        topic,
      });
    },
  });
};

run().catch(console.error);
