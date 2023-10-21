import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
const EventCard = ({ event, onEventSelect, selected, disabled }) => {

    const formatTime =(dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    const startTime = formatTime(event.startTime);
    const endTime = formatTime(event.endTime);
    const firstLetter = event.eventCategory.charAt(0);
    const category = '(' + event.eventCategory + ')';

    let cardBackgroundColor = 'lightyellow';
    if (selected) {
        cardBackgroundColor = 'lightgreen';
    } else if (disabled) {
        cardBackgroundColor = 'lightgrey';
    }
    
    return (
        <Card style={{ backgroundColor: cardBackgroundColor }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <h1>{firstLetter}</h1>
                </div>

                <Divider orientation="vertical" flexItem />

                <div style={{ flex: 2 }}>
                    <p><b>{event.eventName}</b></p>
                    <p>{category}</p>
                    <p style={{ fontSize: '15px' }}>{startTime} - {endTime}</p>
                    <Button
                        onClick={() => onEventSelect(event)}
                        variant="contained"
                        color={selected ? 'error' : 'success'}
                        disabled={disabled}
                    >
                        {selected ? 'REMOVE' : 'SELECT'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
export default EventCard;