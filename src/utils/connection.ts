import { createConnection } from "typeorm";
import User from "../models/User";
import Feedback from "../models/Feedback";
import Products from "../models/Products";
import Upvote from "../models/Upvote";

export default createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "commentApp",
  entities: [Feedback, User , Products , Upvote ],
  synchronize: true,
  logging: true,
})
  .then((connection) => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
