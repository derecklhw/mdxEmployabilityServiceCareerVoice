import express from "express";
import { detectIntent } from "./dialogflow_api.js";
import { completion } from "./openai_api.js";

const app = express();
app.use(express.json());

app.post("/dialogflow", async (req, res) => {
  const { message, sessionId } = req.body;
  const response = await detectIntent(sessionId, message, "en");
  if (response.status === 0) {
    res.status(500).send(response.text);
  } else {
    res.send("Error: " + response.text);
  }
});

app.post("/openai", async (req, res) => {
  const { message } = req.body;
  const response = await completion(message);
  res.send(response);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
