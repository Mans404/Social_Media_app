import express, { Express } from "express";
import { GetStudent } from "./routes/GetStudent";
import { PostStudent } from "./routes/PostStudent";

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.setupRoutes();
  }

  private setupRoutes() {
    /**
     * /student <GET>
     */
    this.app.get("/student", (req, res) => {
      const getStudentsRoute = new GetStudent();
      getStudentsRoute.handleRequest(req, res);
    });

    /**
     * /student <POST>
     */
    this.app.post("/student", (req, res) => {
      const postStudentRoute = new PostStudent();
      postStudentRoute.handleRequest(req, res);
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

export default Server;
