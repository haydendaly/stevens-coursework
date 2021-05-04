import express from 'express';
import cookieParser from 'cookie-parser';

import router from './routes/index';
import middleware from './functions/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(middleware.countReq);
app.use(middleware.logReq);
app.use(middleware.trackURL);
app.use(middleware.displayReq);

app.use('/api/', router);

// catch 404
app.use((req, res) => {
  res
    .status(404)
    .send({ message: `Route ${req.method} ${req.originalUrl} not found.` });
});

app.listen(3000, () => {
  console.log('Listening on port', 3000);
});
