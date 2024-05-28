// app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());


app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

import userrouter from './routes/authRoutes';

app.use('/api/v1/auth', userrouter);

app.on("error", (error) => {
  console.log("Error on the server", error);
});


export default app;
