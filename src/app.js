import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import router from './routes/authRoute.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api/auth', router);

app.get('/', (req, res)=>{
    res.json('API Running......');
})

export default app;