import express from "express";
import dotenv from "dotenv";
import consumerRouter from "./routes/consumer.routes.js";
import { WebSocketServer } from "ws";
import http from "http";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use("/api/v1/consumer", consumerRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("close", () => {
    console.log("client disconnected!");
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({ messsage: "Home" });
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export { wss };
