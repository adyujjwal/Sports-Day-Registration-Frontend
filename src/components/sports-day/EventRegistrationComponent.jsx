import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { retrieveAllEvents, retrieveSelectedEvents, registerForEvent, unregisterForEvent } from "./api/SportsDayApiService"
import { useAuth } from "./security/AuthContext"
import Grid from '@mui/material/Grid';
import EventList from './EventList';
import Container from '@mui/material/Container';
import SelectedEventsList from './SelectedEventsList';
import Divider from '@mui/material/Divider';

const EventRegistrationComponent = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const authContext = useAuth()
    const id = authContext.id

    useEffect(() => {

        retrieveAllEvents()
            .then((response) => {
                setEvents(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });

        retrieveSelectedEvents(id)
            .then((response) => {
                setSelectedEvents(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const doTimingsConflict = (selectedEvent, alreadySelectedEvents) => {
        // Convert alreadySelectedEvents to an array if it's not
        if (!Array.isArray(alreadySelectedEvents)) {
            alreadySelectedEvents = [alreadySelectedEvents];
        }

        // Convert the selected event's start and end times to Date objects
        const selectedEventStartTime = new Date(selectedEvent.startTime);
        const selectedEventEndTime = new Date(selectedEvent.endTime);

        // Check for conflicts with each already selected event
        for (const alreadySelectedEvent of alreadySelectedEvents) {
            // Convert the already selected event's start and end times to Date objects
            const alreadySelectedStartTime = new Date(alreadySelectedEvent.startTime);
            const alreadySelectedEndTime = new Date(alreadySelectedEvent.endTime);

            // Check if the selected event's start time is between the already selected event's start and end times
            if (
                selectedEventStartTime >= alreadySelectedStartTime &&
                selectedEventStartTime < alreadySelectedEndTime
            ) {
                return true; // Conflict found
            }

            // Check if the selected event's end time is between the already selected event's start and end times
            if (
                selectedEventEndTime > alreadySelectedStartTime &&
                selectedEventEndTime <= alreadySelectedEndTime
            ) {
                return true; // Conflict found
            }

            // Check if the selected event completely overlaps with the already selected event
            if (
                selectedEventStartTime <= alreadySelectedStartTime &&
                selectedEventEndTime >= alreadySelectedEndTime
            ) {
                return true; // Conflict found
            }
        }

        return false; // No conflicts found
    };




    const handleEventSelect = (event) => {
        console.log(event)
        if (selectedEvents.some(selectedEvent => doTimingsConflict(event, selectedEvent))) {
            if (selectedEvents.length === 3) {
                alert('You can select a maximum of 3 events.');
            }
            else {
                alert('Event timings conflict with a selected event.');
            }
        } else if (selectedEvents.length < 3) {
            registerForEvent(id, event.id)
                .then(() => {
                    setSelectedEvents([...selectedEvents, event]);
                })
                .catch((error) => {
                    console.error('Error registering event:', error);
                });
            //setSelectedEvents([...selectedEvents, event]);
        } else {
            alert('You can select a maximum of 3 events.');
        }
    };

    const handleEventDeselect = (event) => {
        unregisterForEvent(id, event.id) // Replace with the correct endpoint and request data
            .then(() => {
                const updatedSelectedEvents = selectedEvents.filter((selectedEvent) => selectedEvent.id !== event.id);
                setSelectedEvents(updatedSelectedEvents);
            })
            .catch((error) => {
                console.error('Error unregistering event:', error);
            });
    };

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item xs={5.5}>
                    <h2>All Events</h2>
                    <EventList events={events} onEventSelect={handleEventSelect} selectedEvents={selectedEvents} />
                </Grid>
                <Grid item xs={0.1}>
                    <Divider orientation="vertical" flexItem={true} style={{ backgroundColor: 'black', height: '100%' }} />
                </Grid>
                <Grid item xs={5.5}>
                    <h2>Selected Events</h2>
                    <SelectedEventsList selectedEvents={selectedEvents} onEventDeselect={handleEventDeselect} />
                </Grid>
            </Grid>


        </Container>
    );
}
export default EventRegistrationComponent