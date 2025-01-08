import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import userRoutes from './src/routes/user/userRoute.js'

const PORT = process.env.SERVER_PORT || 5501;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));