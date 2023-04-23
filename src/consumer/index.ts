import { CustomKafka } from '../utils/kafkaHelper';
import constants from '../utils/constants';

const kafka = new CustomKafka({
  clientId: 'producer1',
  brokers: ['localhost:9092'],
});

const run = async () => {
  // Consuming
  const consumer = await kafka.getConsumer('test-group', {
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
