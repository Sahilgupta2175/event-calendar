import React, { createContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveEvents, loadEvents } from '../utils/storage';
import { generateRecurringEvents, checkEventConflict } from '../utils/dateUtils';
import { generateSampleData, hasSampleData } from '../utils/sampleData';

export const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_EVENTS':
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    
    case 'ADD_EVENT': {
      const newEvent = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString()
      };
      
      // Check for conflicts
      const conflicts = checkEventConflict(newEvent, state.events);
      if (conflicts && !action.payload.ignoreConflicts) {
        return {
          ...state,
          error: 'Event conflicts with existing event'
        };
      }
      
      // Generate recurring events if needed
      const eventsToAdd = generateRecurringEvents(newEvent);
      
      return {
        ...state,
        events: [...state.events, ...eventsToAdd],
        error: null
      };
    }
    
    case 'UPDATE_EVENT': {
      const updatedEvents = state.events.filter(event => 
        event.originalId !== action.payload.id && event.id !== action.payload.id
      );
      
      // Check for conflicts with other events
      const conflicts = checkEventConflict(action.payload, updatedEvents);
      if (conflicts && !action.payload.ignoreConflicts) {
        return {
          ...state,
          error: 'Event conflicts with existing event'
        };
      }
      
      // Generate new recurring events if needed
      const eventsToAdd = generateRecurringEvents(action.payload);
      
      return {
        ...state,
        events: [...updatedEvents, ...eventsToAdd],
        error: null
      };
    }
    
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => 
          event.originalId !== action.payload && event.id !== action.payload
        )
      };
    
    case 'DELETE_ALL_EVENTS':
      return {
        ...state,
        events: []
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

const initialState = {
  events: [],
  loading: true,
  error: null,
  filter: null,
  searchTerm: ''
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = loadEvents();
    
    // If no saved events exist, load sample data
    if (savedEvents.length === 0 || !hasSampleData(savedEvents)) {
      const sampleEvents = generateSampleData();
      dispatch({ type: 'LOAD_EVENTS', payload: sampleEvents });
    } else {
      dispatch({ type: 'LOAD_EVENTS', payload: savedEvents });
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (!state.loading) {
      saveEvents(state.events);
    }
  }, [state.events, state.loading]);

  const addEvent = (event) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  };

  const updateEvent = (event) => {
    dispatch({ type: 'UPDATE_EVENT', payload: event });
  };

  const deleteEvent = (eventId) => {
    dispatch({ type: 'DELETE_EVENT', payload: eventId });
  };

  const deleteAllEvents = () => {
    dispatch({ type: 'DELETE_ALL_EVENTS' });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getFilteredEvents = () => {
    let filtered = state.events;

    if (state.filter) {
      filtered = filtered.filter(event => event.category === state.filter);
    }

    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        (event.description && event.description.toLowerCase().includes(term))
      );
    }

    return filtered;
  };

  const value = {
    ...state,
    addEvent,
    updateEvent,
    deleteEvent,
    deleteAllEvents,
    setFilter,
    setSearchTerm,
    clearError,
    getFilteredEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
