import express from "express";
import { createPersonAction } from "./controller";
import { buildCreatePersonAction } from "./controller_w_di";

const app = express();
app.use(express.json());

const port = 3000;

app.post("/di", buildCreatePersonAction());
app.post("/no_di", createPersonAction);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
