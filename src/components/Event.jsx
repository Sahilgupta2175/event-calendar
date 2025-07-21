import React from 'react';
import { useDrag } from 'react-dnd';
import { Clock, Edit, Trash2, Repeat } from 'lucide-react';
import { formatTime } from '../utils/dateUtils';

const Event = ({ event, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'event',
    item: { id: event.id, event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getEventClass = (category) => {
    const baseClass = 'event';
    return `${baseClass} ${category}`;
  };

  return (
    <div
      ref={drag}
      className={`${getEventClass(event.category)} ${isDragging ? 'dragging' : ''}`}
      title={`${event.title}${event.description ? ` - ${event.description}` : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(event);
      }}
    >
      <div className="event-content">
        <div className="event-details">
          <div className="event-title">
            {event.title}
          </div>
          <div className="event-time">
            <Clock size={10} />
            <span>{formatTime(new Date(`2000-01-01T${event.time}`))}</span>
            {event.recurrence && event.recurrence !== 'none' && (
              <Repeat size={10} />
            )}
          </div>
        </div>
        <div className="event-actions">
          <button
            className="event-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event);
            }}
            title="Edit event"
          >
            <Edit size={12} />
          </button>
          <button
            className="event-action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
            title="Delete event"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      {event.description && (
        <div className="event-description">
          {event.description}
        </div>
      )}
    </div>
  );
};

export default Event;
