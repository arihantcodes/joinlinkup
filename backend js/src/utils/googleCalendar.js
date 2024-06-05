import { google } from 'googleapis';

export async function createGoogleMeetEvent(auth, summary, description, startTime, endTime, attendees) {
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary,
    description,
    start: {
      dateTime: startTime,
      timeZone: 'Asia/Kolkata', // Updated to Indian time zone
    },
    end: {
      dateTime: endTime,
      timeZone: 'Asia/Kolkata', // Updated to Indian time zone
    },
    attendees: attendees.map(email => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: 'sample123',
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        },
        status: {
          statusCode: 'success'
        }
      }
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data;
}