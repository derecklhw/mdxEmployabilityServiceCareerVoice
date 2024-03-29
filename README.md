# mdxEmployabilityServiceCareerVoice

## Technology and API used

- [Dialogflow ES](https://dialogflow.cloud.google.com)
- [Node.js Client for Google Maps Services](https://github.com/googlemaps/google-maps-services-js?tab=readme-ov-file)
- [MapsEmbed API](https://developers.google.com/maps/documentation/embed/get-started)
- [Places API](https://developers.google.com/maps/documentation/places/web-service)
- [OpenAI API](https://platform.openai.com/docs/overview)

## Frontend

### Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run dev
```

## Backend

### Project setup

```bash
npm install
```

Create `.env` file in `backend/` directory and add the following

```env
DIALOGFLOW_CREDENTIALS = "dialogflow-credentials.json"
OPENAI_API_KEY = "openai-api"
DIALOGFLOW_KNOWLEDGEBASE_ID = "knowledgebase-id"
PORT = 3000
GOOGLE_CALENDAR_ID = "calendar-id"
GOOGLE_MAPS_API_KEY = "maps-api-key"
```

### Dialogflow ES

Create a Dialogflow ES agent and import the `dialogflow-agent.zip` file in the `dialogflow/` directory.

### Dialogflow ES Knowledge Base

Create a Dialogflow ES knowledge base and add the document `employabilityServiceKnowledgeBase` in the `dialogflow/` directory.

### Run REST API and dialog flow webhook server

Install and run [Ngrok](https://ngrok.com/) (unix system) or npm package [localhost](https://www.npmjs.com/package/localhost) to expose local server to the internet for Dialogflow webhook.

```bash
ngrok http 3000
```

Add the exposed local server URL to the Dialogflow ES webhook.

![Dialogflow ES webhook](images/dialogflowWebhookUrl.png)


Run the server

```bash
npm run dev
```

## Future Work

- Provide the user's location to the backend server to get the accurate location-based information.

## Reference

- [ Dialogflow API with NodeJS | Dialogflow Detect Intent Example | Dialogflow Custom Integartion ](https://www.youtube.com/watch?v=dFN79tEr_bc)
