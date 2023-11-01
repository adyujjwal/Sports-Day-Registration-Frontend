import React, { useState, useEffect } from "react"
import { retrieveAllEvents, retrieveSelectedEvents, registerForEvent, unregisterForEvent } from "./api/SportsDayApiService"
import { useAuth } from "./security/AuthContext"
import Grid from '@mui/material/Grid';
import EventList from './EventList';
import Container from '@mui/material/Container';
import SelectedEventsList from './SelectedEventsList';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'


const EventRegistrationComponent = () => {
    const [open, setOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
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

    const handleClose = () => {
        setOpen(false);
    };

    const doTimingsConflict = (selectedEvent, alreadySelectedEvents) => {
        if (!Array.isArray(alreadySelectedEvents)) {
            alreadySelectedEvents = [alreadySelectedEvents];
        }

        const selectedEventStartTime = new Date(selectedEvent.startTime);
        const selectedEventEndTime = new Date(selectedEvent.endTime);

        for (const alreadySelectedEvent of alreadySelectedEvents) {
            const alreadySelectedStartTime = new Date(alreadySelectedEvent.startTime);
            const alreadySelectedEndTime = new Date(alreadySelectedEvent.endTime);

            if (
                selectedEventStartTime >= alreadySelectedStartTime &&
                selectedEventStartTime < alreadySelectedEndTime
            ) {
                return true;
            }

            if (
                selectedEventEndTime > alreadySelectedStartTime &&
                selectedEventEndTime <= alreadySelectedEndTime
            ) {
                return true;
            }

            if (
                selectedEventStartTime <= alreadySelectedStartTime &&
                selectedEventEndTime >= alreadySelectedEndTime
            ) {
                return true; 
            }
        }

        return false;
    };


    const handleEventSelect = (event) => {
        console.log(event)
        if (selectedEvents.some(selectedEvent => doTimingsConflict(event, selectedEvent))) {
            if (selectedEvents.length === 3) {
                setModalHeader('Maximum Registrations Reached');
                setModalBody('You can select a maximum of 3 events.')
                setOpen(true);
            }
            else {
                setModalHeader('Conflict detected');
                setModalBody('Event timings conflict with a selected event.')
                setOpen(true);
            }
        } else if (selectedEvents.length < 3) {
            registerForEvent(id, event.id)
                .then(() => {
                    setSelectedEvents([...selectedEvents, event]);
                })
                .catch((error) => {
                    console.error('Error registering event:', error);
                });
        } else {
            console.log("test")
            setModalHeader('Maximum Registrations Reached');
                setModalBody('You can select a maximum of 3 events.')
                setOpen(true);
        }
    };

    const handleEventDeselect = (event) => {
        unregisterForEvent(id, event.id)
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
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        {modalHeader}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {modalBody}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>
    );
}
export default EventRegistrationComponent