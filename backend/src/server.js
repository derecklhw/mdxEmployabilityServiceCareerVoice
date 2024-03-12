import express from "express";
import cors from "cors";
import { detectIntent } from "./dialogflow_api.js";
import { completion } from "./openai_api.js";
import { bookOnCalendar } from "./googleCalendar_api.js";
import { WebhookClient } from "dialogflow-fulfillment";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dialogflow", async (req, res) => {
  const { message, sessionId } = req.body;
  const mostRecentMessage = message[message.length - 1];
  const response = await detectIntent(sessionId, mostRecentMessage, "en");
  if (response.status === 0) {
    res.send(response.text);
  } else {
    res.send("Error: " + response.text);
  }
});

app.post("/dialogflow-webhook", async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add(
      "Hi there, I’m MDX Employability Service Career Voice. I can help you find an internship, book a 1:1 appointment with our advisors, improve your cv and more. In which one would you need assistance?"
    );
  }

  async function findAnInternship(agent) {
    let industry = agent.parameters.Industry;
    let prompt = [
      {
        role: "user",
        content: `"Name three ${industry} sector companies in Mauritius, separated by commas, without using unordered or ordered bullet points, just the names in one line."`,
      },
    ];
    let response = await completion(prompt);
    agent.add(
      `Here is a list of internships available in ${industry}: ${response.content}`
    );
  }

  async function bookAnAppointment(agent) {
    try {
      const response = await bookOnCalendar(agent);
      console.log(response);
      if (response === "Event already exists") {
        agent.add("Sorry, that time is already booked. Please choose another.");
      } else {
        const appointmentDate = new Date(
          response.data.start.dateTime
        ).toLocaleString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
        agent.add(
          `Your appointment has been successfully booked for ${appointmentDate}.`
        );
      }
    } catch (error) {
      agent.add(error);
    }
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Find an internship", findAnInternship);
  intentMap.set("Book 1:1 appointment", bookAnAppointment);
  agent.handleRequest(intentMap);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
