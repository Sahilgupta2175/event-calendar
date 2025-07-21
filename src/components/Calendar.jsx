import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  getCalendarDays, 
  addMonths, 
  subMonths, 
  formatDate,
  startOfMonth 
} from '../utils/dateUtils';
import { format } from 'date-fns';
import { useEvents } from '../hooks/useEvents';
import CalendarDay from './CalendarDay';
import EventForm from './EventForm';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const { 
    getFilteredEvents, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    error, 
    clearError 
  } = useEvents();

  const events = getFilteredEvents();
  const calendarDays = getCalendarDays(currentDate);
  const monthStart = startOfMonth(currentDate);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDeleteEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?${event.recurrence && event.recurrence !== 'none' ? '\n\nThis will delete all recurring instances of this event.' : ''}`
    );

    if (confirmed) {
      deleteEvent(eventId);
    }
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEventEdit = (event) => {
    setEditingEvent(event);
    setSelectedDate(new Date(event.date));
    setShowEventForm(true);
  };

  const handleEventSave = (eventData) => {
    if (editingEvent) {
      updateEvent({ ...eventData, id: editingEvent.id });
    } else {
      addEvent(eventData);
    }
    setShowEventForm(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleEventMove = (event, newDate) => {
    const updatedEvent = {
      ...event,
      date: formatDate(newDate)
    };
    updateEvent(updatedEvent);
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
    setEditingEvent(null);
    setSelectedDate(null);
    if (error) {
      clearError();
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar">
        {/* Calendar Header */}
        <div className="calendar-nav">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePreviousMonth}
              className="nav-button"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextMonth}
              className="nav-button"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Week Day Headers */}
        <div className="weekday-headers">
          {weekDays.map(day => (
            <div
              key={day}
              className="weekday-header"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {calendarDays.map((date, index) => (
            <CalendarDay
              key={index}
              date={date}
              currentMonth={monthStart}
              events={events}
              onDayClick={handleDayClick}
              onEventEdit={handleEventEdit}
              onEventDelete={handleDeleteEvent}
              onEventMove={handleEventMove}
            />
          ))}
        </div>

        {/* Event Form Modal */}
        {showEventForm && (
          <EventForm
            event={editingEvent}
            initialDate={selectedDate}
            onSave={handleEventSave}
            onCancel={handleCloseForm}
          />
        )}

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{error}</span>
              <button
                onClick={clearError}
                style={{ 
                  marginLeft: '0.5rem', 
                  background: 'none', 
                  border: 'none', 
                  color: 'white', 
                  cursor: 'pointer',
                  fontSize: '1.25rem'
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Calendar;
