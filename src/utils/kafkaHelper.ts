import { Kafka, KafkaConfig, Admin, Producer, Consumer } from 'kafkajs';

class KafkaAdmin {
  private _admin: Admin;
  constructor(kafka: Kafka) {
    this._admin = kafka.admin();
  }

  public get admin(): Admin {
    return this._admin;
  }

  private async connect() {
    await this._admin.connect();
  }

  async createTopicIfNotExists(topicName: string) {
    this.connect();
    const topicExists = await this._admin
      .listTopics()
      .then((topics) => topics.includes(topicName));
    if (!topicExists) {
      await this._admin.createTopics({
        topics: [
          {
            topic: topicName,
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
      console.log(`Topic "${topicName}" created successfully!`);
    } else {
      console.log(`Topic "${topicName}" already exists!`);
    }
    this.disconnect();
  }

  async deleteTopic(topicName: string) {
    return this._admin.deleteTopics({ topics: [topicName] });
  }

  private async disconnect() {
    await this._admin.disconnect();
  }
}

export class CustomKafka {
  private _kafka: Kafka;
  constructor(config: KafkaConfig) {
    this._kafka = new Kafka(config);
  }

  public async getProducer() {
    const producer = this._kafka.producer();
    await producer.connect();
    return producer;
  }

  public async getConsumer(
    groupId: string,
    config = { topic: '', fromBeginning: true }
  ) {
    const consumer = this._kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe(config);
    return consumer;
  }

  public getAdmin() {
    return new KafkaAdmin(this._kafka);
  }

  public get kafka(): Kafka {
    return this._kafka;
  }

  public async disconnect(process: Producer | Consumer) {
    await process.disconnect();
  }
}
