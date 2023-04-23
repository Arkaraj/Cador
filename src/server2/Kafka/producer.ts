import constants from '../../utils/constants';
import { Redis } from '../../utils/redisHelper';
import { getRandomValueFromArray } from '../../utils/producerHelper';
import { Producer } from 'kafkajs';

export const getSwords = async (producer: Producer) => {
  try {
    // connect to redis, for key value db purposes
    const redis = new Redis();
    let sword = await redis.getOrSet(
      'sword',
      () => {
        return getRandomValueFromArray(constants.SWORDS);
      },
      10
    );
    console.log('sword: ', sword);
    await producer.send({
      topic: constants.LIST_TOPIC,
      messages: [{ value: sword }],
    });
  } catch (error) {
    console.log(error);
  }
};
