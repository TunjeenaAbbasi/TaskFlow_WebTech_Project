import express, {
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */
app.use('/tasks', taskRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'TaskFlow API Running',
  });
});

/* Global Error Handler */
app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    console.error(err);

    res.status(500).json({
      message: err.message || 'Internal server error',
    });
  },
);

export default app;