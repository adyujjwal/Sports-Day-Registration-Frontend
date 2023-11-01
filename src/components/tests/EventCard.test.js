import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from '../sports-day/EventCard';

// Mock event data for testing
const event = {
  eventCategory: 'Test Category',
  eventName: 'Test Event',
  startTime: '2023-10-31T14:30:00',
  endTime: '2023-10-31T15:30:00',
};

describe('EventCard', () => {
  it('renders the event information', () => {
    render(<EventCard event={event} />);

    // Assertions for event information rendering
    expect(screen.getByText('T')).toBeInTheDocument(); // First letter
    expect(screen.getByText('(Test Category)')).toBeInTheDocument();
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('2:30 PM - 3:30 PM')).toBeInTheDocument();
  });

  it('selects the event when the button is clicked', () => {
    const onEventSelect = jest.fn();
    render(<EventCard event={event} onEventSelect={onEventSelect} />);
  
    // Find the button by its attributes and click it
    const button = screen.getByText(/SELECT/i, { selector: 'button' });
    fireEvent.click(button);
  
    // Ensure the event is selected
    expect(onEventSelect).toHaveBeenCalledWith(event);
  
  });

  it('removes the event when the button is clicked', () => {
    const onEventSelect = jest.fn();
    render(<EventCard event={event} onEventSelect={onEventSelect} selected={true} />);
  
    // Find the button by its attributes and click it
    const button = screen.getByText(/REMOVE/i, { selector: 'button' });
    fireEvent.click(button);
  
    // Ensure the event is removed
    expect(onEventSelect).toHaveBeenCalledWith(event);

  });

  it('disables the button when disabled is true', () => {
    render(<EventCard event={event} disabled={true} />);
  
    // Use a custom text matcher function to find the button by its content
    const button = screen.getByRole('button', { name: /select/i });
  
    expect(button).toBeDisabled();
  })
});
