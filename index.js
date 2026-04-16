const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const errorHandler = require('./Middlewares/errorHandler');
const newsRouter = require('./Routes/newsRouter');
const authRouter = require('./Routes/authRouter');
const facebookRouter = require('./Routes/facebookRouter');
const galleryRouter = require('./Routes/galleryRouter');
dotenv.config()

const connectToDb = require("./Config/connectToDb");
// require("./Services/Nodemailer/transporter");
// const newsRouter = require('./Routes/newsRouter');


const clientDomain = process.env.client_domain

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

// Database connection handling
const startServer = async () => {
  try {
    await connectToDb();
    // Only listen on a port if not in a Vercel/Production environment
    if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
      const port = process.env.PORT || 500;
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    }
  } catch (error) {
    console.error("Failed to connect to Database", error);
  }
};

// Initiate connection
startServer();

//Routes
app.get("/", (req, res)=>{ res.send("Welcome to Iwo Website Api version 1.00") })


app.use("/api/news", newsRouter);
app.use("/api/auth", authRouter);
app.use("/api/facebook", facebookRouter);
app.use("/api/gallery", galleryRouter);

app.all("/{*any}", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server.`)
})
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store');
//   next();
// });

app.use(errorHandler);

module.exports = app;