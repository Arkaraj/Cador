import { CustomKafka } from '../../utils/kafkaHelper';
import constants from '../../utils/constants';

const kafka = new CustomKafka({
  clientId: 'producer1',
  brokers: ['localhost:9092'],
});

const run = async () => {
  // Consuming
  const consumer = await kafka.getConsumer(constants.TEST_GROUP, {
    topic: constants.LIST_TOPIC,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic == constants.LIST_TOPIC) {
        console.log(message?.value?.toString());
      }
    },
  });
};

run().catch(console.error);
