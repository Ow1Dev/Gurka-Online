import express from 'express';

const app: express.Application = express();

app.get('/', (req, res) => {
  res.json({
    messeage: 'Hello World',
  });
});

const PORT: any = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
