import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';


// Initializing app // 
const app = express();
dotenv.config();




// setting bodyParser to specify the requests //
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);


// connecting with MongoDB Atlas database //
// const CONNECTION_URL = 'mongodb+srv://<user>:<password>@cluster0.nas2z.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 3000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);

