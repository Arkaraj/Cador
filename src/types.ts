enum constants {
  SWORDS_TOPIC = 'SWORDS_TOPIC',
  SWORDS = 'SWORDS',
}

export type Dict<T> = {
  [key in constants]: T;
};
