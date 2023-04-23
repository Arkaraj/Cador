import { Response, Request } from 'express';
import { getSwordFromServer2 } from '../Kafka/producer';

export default {
  getASword: async (_req: Request, res: Response) => {
    try {
      getSwordFromServer2();
      res.status(200).json({
        success: true,
        message: 'Triggered Event, should fetch sword in a while',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
