import express from 'express';
import 'dotenv/config';

const PORT = process.env.SERVER_PORT || 5501;

const app = express();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));