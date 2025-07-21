import React from 'react';
import { useDrop } from 'react-dnd';
import { isSameDay, isSameMonth, isToday } from '../utils/dateUtils';
import Event from './Event';

const CalendarDay = ({ 
  date, 
  currentMonth, 
  events, 
  onDayClick, 
  onEventEdit, 
  onEventDelete, 
  onEventMove 
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item) => {
      if (!isSameDay(new Date(item.event.date), date)) {
        onEventMove(item.event, date);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const dayEvents = events.filter(event => 
    isSameDay(new Date(event.date), date)
  );

  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isCurrentDay = isToday(date);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday

  return (
    <div
      ref={drop}
      className={`calendar-day ${isOver ? 'drag-over' : ''} ${!isCurrentMonth ? 'other-month' : ''} ${isWeekend ? 'weekend' : ''}`}
      onClick={() => onDayClick(date)}
    >
      <div className="day-header">
        <span
          className={`day-number ${isCurrentDay ? 'today' : ''} ${!isCurrentMonth ? 'other-month' : ''}`}
        >
          {date.getDate()}
        </span>
      </div>
      
      <div className="events-container">
        {dayEvents.slice(0, 3).map(event => (
          <Event
            key={event.id}
            event={event}
            onEdit={onEventEdit}
            onDelete={onEventDelete}
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="more-events">
            +{dayEvents.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
