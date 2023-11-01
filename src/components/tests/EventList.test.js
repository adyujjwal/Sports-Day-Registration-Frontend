import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventList from '../sports-day/EventList';

describe('EventList Component', () => {
    const sampleEvents = [
        { id: 1, eventName: 'Event 1', eventCategory: 'Category 1' },
        { id: 2, eventName: 'Event 2', eventCategory: 'Category 2' },
        { id: 3, eventName: 'Event 3', eventCategory: 'Category 3' },
      ];

  it('renders event cards', () => {
    render(
      <EventList
        events={sampleEvents}
        onEventSelect={() => {}}
        selectedEvents={[]}
      />
    );

    sampleEvents.forEach((event) => {
      const eventCard = screen.getByText(event.eventName);
      expect(eventCard).toBeInTheDocument();
    });
  });   
});
