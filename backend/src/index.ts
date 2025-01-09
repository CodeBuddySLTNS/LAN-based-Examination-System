import express from 'express';
import cors from 'cors';

const port = 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`Listening on port ${port}.`)
})
