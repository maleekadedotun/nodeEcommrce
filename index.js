const express = require ("express");
const { default: mongoose } = require("mongoose");
const app= express();
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

const dotenv = require("dotenv");


// const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const ProductRoute = require("./routes/product");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
// const StripeRoute = require("./routes/paymentStripe");
 const cors = require("cors")
dotenv.config();




mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Db connection successfully!"))
.catch((err) => console.log(err))

app.use(express.json());
// app.use("/api/v1/categories", categoryRouter);
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", ProductRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/carts", CartRoute);
// app.use("api/checkout", StripeRoute);


// app.use((req, res, next) => {

//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, Accept, Accept-Version,Set-Cookie, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
//     );
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//     res.header("Content-Type", "application/json");
//     res.header("Access-Control-Allow-Credentials", true);
  
//     if (req.method === 'OPTIONS') 
//       res.status(200).send();
//     else
//       next();     
// });

const allowedOrigins = [
  "http://localhost:3000",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin && dev) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// const router = require("express").Router;

app.get("/", (req, res) =>{
  res.send("stripe method payment")
});

// app.post("/create-payment-intent") =>{
  
// }

app.post('/payment', async (req, res) => {
  console.log(req.body)
  try {
    const { amount, token } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: token._id,
      confirm: true,
    });

    res.json({client_secret: paymentIntent.client_secret });
    console.log(paymentIntent)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(process.env.PORT || 5000,() =>{
  console.log("BackEnd server is running node port 5000");
});