import { CustomKafka } from '../../utils/kafkaHelper';
import constants from '../../utils/constants';

const kafka = new CustomKafka({
  clientId: 'producer1',
  brokers: ['localhost:9092'],
});

const admin = kafka.getAdmin();
admin.createTopicIfNotExists(constants.SWORDS_TOPIC);
admin.createTopicIfNotExists(constants.LIST_TOPIC);

export const getSwordFromServer2 = async () => {
  try {
    const producer = await kafka.getProducer();
    await producer.send({
      topic: constants.SWORDS_TOPIC,
      messages: [{ value: 'getSword' }],
    });
  } catch (error) {
    console.log(error);
  }
};
