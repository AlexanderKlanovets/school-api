import { IncomingMessage } from 'http';

export const parseQuery = (url: string): Record<string, string> => {
  const queryPart = url.split('?', 2)[1];
  const query: Record<string, string> = {};

  new URLSearchParams(queryPart).forEach(
    (value, name) => {
      query[name] = value;
    },
  );

  return query;
};

export const receiveBody = async (req: IncomingMessage) => {
  const buffers: Buffer[] = [];

  /* eslint-disable-next-line */
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    return {
      body: JSON.parse(Buffer.concat(buffers).toString()),
      error: null,
    };
  } catch (error) {
    return {
      body: null,
      error,
    };
  }
};
