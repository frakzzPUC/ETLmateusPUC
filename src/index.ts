import express from 'express';
import { routes } from './routes';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

routes(app);

app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
