import express, { Express } from "express";
import dotenv from "dotenv";
import connection from "./src/utils/connection";
import mainRoute from "./src/routes/routes";
var cors = require("cors");
const bodyParser = require("body-parser");
const router: Express = express();

dotenv.config();

router.use(cors());
router.use(bodyParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use("/", mainRoute);
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://edfry.co');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
router.use((req : any, res : any, next : any)  => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
   
    // if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    //     return res.status(200).json({});
    // }
    // next();
});

router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const PORT: any = process.env.PORT ?? 5000;
connection
  .then((data) => {
    router.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
