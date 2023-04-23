# Cador

Basic Event driven Node app via kafka with consumer and producer. Producer sends data about swords, consumer subscribes to sword topics and lists them.

## Tech Stack

- Node js Ts
- Apache Kafka
- Express (simple http server)
- Redis (key value db)

### Kafka

```sh
# Start Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# Start kafka
JMX_PORT=8004 bin/kafka-server-start.sh config/server.properties


# View a topic
bin/kafka-console-consumer.sh \
--bootstrap-server localhost:9092 \
--topic swords \
--from-beginning
```
