import { useEffect, useState } from 'react'
import './App.css'
import { createDeck } from './api/createDeck'
import { CreateEvent } from './components/CreateEvent'
import EventCard from './components/EventCard'
import { API_URL } from './api/config'
import { EventDocument } from '../../server/src/models/Event'
import { Divider, Grid } from '@mui/material'

function App() {
  // Deck
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState<string>('');

  // Event
  const [events, setEvents] = useState<EventDocument[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();
      setEvents(data);
    }

    fetchEvents();
  }, []);

  async function handleCreateDeck(e: React.FormEvent) {
    // Default behavior after saving is to refresh page
    // Lets turn that off...
    e.preventDefault();
    const deck = await createDeck(title);
    setTitle('');
  }

  function renderAllCards() {
    const sortedEvents = [...events].sort((a, b) => {
      if (a.startDate && b.startDate) {
        const a_date: Date = new Date(a.startDate);
        const b_date: Date = new Date(b.startDate);
        return a_date.getTime() - b_date.getTime();
      }
      return -Infinity;
    });

    return (
      <Grid container spacing={2} columns={3}>
        {sortedEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <EventCard
              event={event}
              handleDeleteCard={(event) => { handleDeleteCard(event) }}
              handleEditCard={(event) => { handleEditCard(event) }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }


  const renderCreateEvent = () => {
    // Hide buttons in prod
    const isEditable: boolean = `${API_URL}`.includes('localhost');
    if (!isEditable) {
      return <></>;
    }

    return <CreateEvent onCreateEvent={handleCreateEvent} />;
  }

  const handleCreateEvent = (event: EventDocument) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const handleDeleteCard = (event: EventDocument) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${event.title}"?`);
    if (confirmed) {
      fetch(`${API_URL}/events/${event._id}`, {
        method: 'DELETE',
      })
        .catch((error) => console.error(error));

      setEvents(events.filter((ev) => ev._id !== event._id));
    }
  };

  const handleEditCard = (event: EventDocument) => {
    const confirmed = window.confirm('Coming soon!');
    // fetch(`${API_URL}/events/${event._id}`, {
    //   method: 'PUT',
    // })
    //   .catch((error) => console.error(error));

    // setEvents((prevEvents) => [...prevEvents, event]);
    //  TODO: Update events with edited event
  };

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Cookie clicker! {count}
        </button>
      </div>
      <div>
        <a href="https://www.google.com" target="_blank">
          <img src={'https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY.jpg?fit=700,467'} />
        </a>
      </div>
      {/* Hide in prod */}
      {renderCreateEvent()}
      <>
      <h2>Upcoming events!</h2>
      </>
      
      <Divider/>
      {renderAllCards()}
    </div>
  );
}

export default App
