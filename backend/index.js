import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import soilNutrientsRoute from './routes/SoilNutrientsSensor/soilNutrientsSensor.js';
import connectDB from './db/connection.js';
import soilDataRoutes from "./routes/soilDataRoutes/soilDataRoutes.js";
import storeRecommendationFertilizerRoutes from "./routes/StoreRecommendationFertilizer/StoreRecommendationFertilizer.js";
import storeRecommendationCropRoutes from "./routes/StoreRecommedationCrop/StoreRecommendationCrop.js";
import UserRouter from "./routes/user/user.js";
import { SerialPort, ReadlineParser } from 'serialport';

const app = express();
app.use(cors());
app.use(express.json());


const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

app.use('/soil-nutrients-sensor', soilNutrientsRoute);
app.use("/soil-data", soilDataRoutes);
app.use("/store-recommendation-crop", storeRecommendationCropRoutes);
app.use("/store-recommendation-fertilizer", storeRecommendationFertilizerRoutes);
app.use("/auth", UserRouter);
app.use(errorHandler);


app.get("/fetch-sensor-data", (req, res) => {
    console.log("Fetching sensor data...");

   port.write("FETCH\n", (err) => {
        if (err) {
            console.error("Error sending FETCH command:", err.message);
            return res.status(500).json({ error: "Failed to request data from Arduino" });
        }
    });

    const handleData = (data) => {
        const rawData = data.toString().trim();
        console.log("Raw data from Arduino:", rawData);

        if (!rawData.startsWith("{")) {
            console.warn("Ignoring non-JSON data:", rawData);
            return;
        }

        try {
            const parsedData = JSON.parse(rawData);
            console.log("Parsed JSON:", parsedData);
            
            res.json(parsedData); 
            parser.removeListener("data", handleData);
        } catch (error) {
            console.error("Invalid JSON received:", rawData);
            res.status(400).json({ error: "Invalid data from Arduino" });
            parser.removeListener("data", handleData);
        }
    };

    parser.on("data", handleData); 
});


app.get("/", (req, res) => {
    res.send("IOT and ML server is running");
});

const PORT = process.env.PORT || 4200;
connectDB().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    server.on('error', (err) => {
        console.error('Server error:', err.message);
        process.exit(1);
    });
});

export default app;
