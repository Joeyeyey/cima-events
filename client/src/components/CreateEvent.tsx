import React, { useState } from 'react';
import { API_URL } from '../api/config';
import DatePicker from 'react-datepicker';
import { EventDocument } from '../../../server/src/models/Event';

interface EventProps {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

interface CreateEventProps {
  onCreateEvent: (event: EventDocument) => void;
}

export function CreateEvent({ onCreateEvent }: CreateEventProps) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const confirmed = window.confirm(`Are you sure you want to create "${title}"?`);
    if (confirmed) {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, startDate, endDate, location }),
            });
            if (response.ok) {
                const event = await response.json();
                onCreateEvent(event);
            } else {
                console.error('Failed to create event:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Failed to create event:', error);
        }
    }

  };

  const handleTimeChange = (isStartTime: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
    const localDateTime = event.target.value;
    const localDateTimeInMs = new Date(localDateTime).getTime();
    const timeZoneOffsetInMs = new Date().getTimezoneOffset() * 60 * 1000;
    const dateInLocalTimezone = new Date(localDateTimeInMs - timeZoneOffsetInMs);
    isStartTime ? setStartDate(dateInLocalTimezone) : setEndDate(dateInLocalTimezone);
  }

  return (
    <>
    <h2>Create an event?</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="startDate">Start date:</label>
        <input
          type="datetime-local"
          id="startDate"
          value={startDate ? startDate.toISOString().slice(0, -8) : ''}
          onChange={(e) => {handleTimeChange(true, e)}}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">End date:</label>
        <input
          type="datetime-local"
          id="endDate"
          value={endDate ? endDate.toISOString().slice(0, -8) : ''}
          onChange={(e) => {handleTimeChange(false, e)}}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={(event) => setLocation(event.target.value)} required />
      </div>
      <button type="submit">Create Event</button>
    </form>
</>
  );
}
