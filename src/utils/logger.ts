import pino from 'pino-http';

const logger = pino({
  customLogLevel: (res: any, err: any) => {
    if (res.statusCode >= 400 && res.statusCode <= 499) {
      return 'warn';
    }
    if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      responseTime: res.responseTime,
    }),
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

export default logger;
