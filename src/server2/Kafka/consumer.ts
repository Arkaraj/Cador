import { CustomKafka } from '../../utils/kafkaHelper';
import constants from '../../utils/constants';
import { getSwords } from './producer';

const kafka = new CustomKafka({
  clientId: 'producer1',
  brokers: ['localhost:9092'],
});

const run = async () => {
  // Consuming
  const consumer = await kafka.getConsumer(constants.TEST_GROUP, {
    topic: constants.SWORDS_TOPIC,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      let value = message?.value?.toString();
      if (value == 'getSword') {
        console.log('server1 sent message to get a swords!!');
        const producer = await kafka.getProducer();
        getSwords(producer);
      }
    },
  });
};

run().catch(console.error);
