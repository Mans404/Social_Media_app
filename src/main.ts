import "dotenv/config";
import express from "express";
import router from "./routes";
import { DbService } from "./services/DbService";

const app = express();
app.use(express.json());
app.use("/", router);

async function bootstrap() {
  await DbService.getInstance().initializeTables();
  app.listen(process.env.PORT || 8080, () =>
    console.log("🚀 Server running on port", process.env.PORT || 8080)
  );
}

bootstrap();
