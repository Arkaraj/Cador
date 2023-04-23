const constants = {
  SWORDS_TOPIC: 'swords',
  LIST_TOPIC: 'test',
  TEST_GROUP: 'test-group',
  SWORDS: [
    'Jian',
    'Longsword',
    'Spatha',
    'Broadsword',
    'Shortswords and daggers',
    'Basket-hilted sword',
    'Xiphos',
    'Rapier',
    'Backsword',
    'Dao',
    'Khopesh',
    'Katana',
    'Sabre',
  ],
  REDIS_EXPIRATION: process.env?.REDIS_EXPIRATION || 1440,
};

export default constants;
