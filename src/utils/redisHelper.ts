import RedisConn from 'ioredis';
import constants from './constants';

export class Redis {
  private redis: RedisConn;
  constructor() {
    this.redis = new RedisConn(6379); // Connect to 127.0.0.1:6379
  }

  /**
   * Gets and Sets cache
   * @param {string} key The key value to store
   * @param {any} cb A callback function for if cache miss occurs
   * @returns {Promise<string|null>}
   */
  async getOrSet(
    key: string,
    cb: any,
    expiry: string | number = constants.REDIS_EXPIRATION || 0
  ): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.redis.get(key, async (err, data) => {
        if (err) {
          return reject(err);
        }
        if (data != null) {
          return resolve(data);
        }
        const newData = cb();
        this.redis.setex(key, expiry, newData);
        resolve(newData);
      });
    });
  }

  async del(key: string) {
    try {
      let res = await this.redis.del(key);
      if (res) return res;
      return false;
    } catch (error) {
      return false;
    }
  }
}
