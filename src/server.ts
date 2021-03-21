import express from "express";
import { CreatePersonAction } from "./controller_w_di";

const app = express();
app.use(express.json());

const port = 3000;

app.post("/", CreatePersonAction());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
