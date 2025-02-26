import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import soilNutrientsRoute from './routes/SoilNutrients/soilNutrients.js';
import connectDB from './db/connection.js';
const app = express();
app.use(cors());
app.use(express.json())

app.use('/soil-nutrients', soilNutrientsRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 4200;
connectDB().then(() => {
    const server=app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on('error', (err) => {
      console.error('Server error:', err.message);
      process.exit(1);
    });
  });

export default app;