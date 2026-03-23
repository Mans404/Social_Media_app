import express, { Express, Request, Response } from "express";
import { DbService } from "./services/DbService";

export class Server {
  private app: Express;
  private db: DbService;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.db = DbService.getInstance();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("API is running...");
    });

    // Test DB route
    this.app.get("/db-test", async (req: Request, res: Response) => {
      try {
        const result = await this.db.query("SELECT NOW()");
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: "Database error" });
      }
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
