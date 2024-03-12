import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

// Google Calendar ID
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

// Service Account Credentials
const CREDENTIALS = JSON.parse(process.env.DIALOGFLOW_CREDENTIALS);

const serviceAccountAuth = new google.auth.JWT({
  email: CREDENTIALS.client_email,
  key: CREDENTIALS.private_key,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar("v3");

const timezone = "Mauritius Standard Time";
const timeZoneOffset = "+04:00";

export async function bookOnCalendar(agent) {
  let date = agent.parameters.date;
  let time = agent.parameters.time;

  let startTime = new Date(
    Date.parse(
      date.split("T")[0] +
        "T" +
        time.split("T")[1].split("+")[0] +
        timeZoneOffset
    )
  );

  let endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

  return createCalendarEvent(startTime, endTime).then(
    (event) => {
      return event;
    },
    (reason) => {
      return reason;
    }
  );
}

function createCalendarEvent(startTime, endTime) {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        auth: serviceAccountAuth,
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
      },
      (err, calendarResponse) => {
        if (err || calendarResponse.data.items.length > 0) {
          reject("Event already exists");
        } else {
          calendar.events.insert(
            {
              auth: serviceAccountAuth,
              calendarId: GOOGLE_CALENDAR_ID,
              resource: {
                summary: "1:1 Appointment with MDX Employability Service",
                start: { dateTime: startTime },
                end: { dateTime: endTime },
              },
            },
            (err, event) => {
              err ? reject(err) : resolve(event);
            }
          );
        }
      }
    );
  });
}
