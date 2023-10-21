import React from 'react';
import Grid from '@mui/material/Grid';
import EventCard from './EventCard';

function EventList({ events, onEventSelect, selectedEvents }) {
    return (
        <Grid container spacing={3}>
            {events.map((event, index) => (
                <Grid item xs={6} key={event.id}>
                    <EventCard
                        key={event.id}
                        event={event}
                        onEventSelect={onEventSelect}
                        disabled={selectedEvents.some(selectedEvent => selectedEvent.id === event.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
export default EventList;