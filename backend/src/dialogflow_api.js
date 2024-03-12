import dotenv from "dotenv";
import dialogflow from "@google-cloud/dialogflow";

dotenv.config();

// Service Account Credentials
const CREDENTIALS = JSON.parse(process.env.DIALOGFLOW_CREDENTIALS);

// Project ID
const PROJECT_ID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
  credentials: {
    client_email: CREDENTIALS["client_email"],
    private_key: CREDENTIALS["private_key"],
  },
};

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Detect Intent from the text
export async function detectIntent(sessionId, query, languageCode) {
  let sessionPath = sessionClient.projectAgentSessionPath(
    PROJECT_ID,
    sessionId
  );

  // The text query request.
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: query.content,
        // The language used by the client
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  try {
    const responses = await sessionClient.detectIntent(request);
    const result = {
      role: "assistant",
      content: responses[0].queryResult.fulfillmentText,
    };

    return {
      status: 0,
      text: result,
      intentName: responses[0].queryResult.intent.displayName,
    };
  } catch (error) {
    return {
      status: 1,
      text: error,
    };
  }
}
