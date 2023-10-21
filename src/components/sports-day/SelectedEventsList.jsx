import React from 'react';
import Grid from '@mui/material/Grid';
import EventCard from './EventCard';

function SelectedEventsList({ selectedEvents, onEventDeselect }) {
    return (
        <Grid container spacing={3}>
            {selectedEvents.map((event) => (
                <Grid item xs={6} key={event.id}>
                    <EventCard
                        event={event}
                        onEventSelect={() => onEventDeselect(event)}
                        selected={true}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
export default SelectedEventsList;