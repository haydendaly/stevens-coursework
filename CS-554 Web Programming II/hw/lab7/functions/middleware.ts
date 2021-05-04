import * as express from 'express';

let [count, bodies, urlObj] = [0, [], {}];

const countReq = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  count += 1;
  next();
};

const logReq = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  bodies.push(req.body);
  next();
};

const trackURL = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.originalUrl in urlObj) {
    urlObj[req.originalUrl] = urlObj[req.originalUrl] + 1;
  } else {
    urlObj[req.originalUrl] = 1;
  }
  next();
};

const displayReq = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(
    'Request Info:',
    `\nTotal Requests: ${count}
HTTP Request:   ${req.method} ${req.originalUrl}
Path Requests:  ${urlObj[req.originalUrl]}
Request Body:   ${JSON.stringify(req.body, null, '  ')}\n`
  );
  next();
};

export default {
  countReq,
  logReq,
  trackURL,
  displayReq
};
