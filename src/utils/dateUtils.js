import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday,
  addDays,
  addWeeks,
  parseISO,
  isAfter,
  isBefore,
  addMinutes,
  parse
} from 'date-fns';

export const getCalendarDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const formatDate = (date, formatStr = 'yyyy-MM-dd') => {
  return format(date, formatStr);
};

export const formatTime = (date) => {
  return format(date, 'HH:mm');
};

export const formatDateTime = (date) => {
  return format(date, 'yyyy-MM-dd HH:mm');
};

export const parseDateTime = (dateTimeStr) => {
  return parseISO(dateTimeStr);
};

export const generateRecurringEvents = (event, endDate = addMonths(new Date(), 12)) => {
  const events = [];
  let currentDate = parseISO(event.date);
  const eventEndDate = endDate;

  if (!event.recurrence || event.recurrence === 'none') {
    return [event];
  }

  while (isBefore(currentDate, eventEndDate) || isSameDay(currentDate, eventEndDate)) {
    const recurringEvent = {
      ...event,
      id: `${event.id}-${formatDate(currentDate)}`,
      date: formatDate(currentDate),
      isRecurring: true,
      originalId: event.id
    };
    events.push(recurringEvent);

    switch (event.recurrence) {
      case 'daily':
        currentDate = addDays(currentDate, 1);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, 1);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
      case 'custom': {
        const interval = event.customInterval || 1;
        const unit = event.customUnit || 'weeks';
        if (unit === 'days') {
          currentDate = addDays(currentDate, interval);
        } else if (unit === 'weeks') {
          currentDate = addWeeks(currentDate, interval);
        } else if (unit === 'months') {
          currentDate = addMonths(currentDate, interval);
        }
        break;
      }
      default:
        return events;
    }
  }

  return events;
};

export const checkEventConflict = (newEvent, existingEvents) => {
  const newEventDate = parseISO(newEvent.date);
  const newEventStart = parse(newEvent.time, 'HH:mm', newEventDate);
  const newEventEnd = addMinutes(newEventStart, newEvent.duration || 60);

  return existingEvents.some(event => {
    if (event.id === newEvent.id) return false;
    
    const eventDate = parseISO(event.date);
    if (!isSameDay(newEventDate, eventDate)) return false;

    const eventStart = parse(event.time, 'HH:mm', eventDate);
    const eventEnd = addMinutes(eventStart, event.duration || 60);

    return (
      (isAfter(newEventStart, eventStart) && isBefore(newEventStart, eventEnd)) ||
      (isAfter(newEventEnd, eventStart) && isBefore(newEventEnd, eventEnd)) ||
      (isBefore(newEventStart, eventStart) && isAfter(newEventEnd, eventEnd))
    );
  });
};

export {
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth
};

