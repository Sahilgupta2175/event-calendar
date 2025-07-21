// Sample data for the event calendar
import { v4 as uuidv4 } from 'uuid';
import { format, addDays, subDays, startOfWeek } from 'date-fns';

export const generateSampleData = () => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);

  return [
    // Work Events
    {
      id: uuidv4(),
      title: "Team Standup Meeting",
      description: "Daily team sync to discuss progress and blockers",
      date: format(today, 'yyyy-MM-dd'),
      time: "09:00",
      category: "work",
      recurrence: "daily",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Project Review",
      description: "Quarterly project review with stakeholders",
      date: format(addDays(today, 2), 'yyyy-MM-dd'),
      time: "14:00",
      category: "work",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Client Presentation",
      description: "Present Q3 deliverables to the client",
      date: format(addDays(today, 5), 'yyyy-MM-dd'),
      time: "10:30",
      category: "work",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    },

    // Personal Events
    {
      id: uuidv4(),
      title: "Morning Workout",
      description: "Gym session - cardio and strength training",
      date: format(today, 'yyyy-MM-dd'),
      time: "06:30",
      category: "personal",
      recurrence: "weekly",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Grocery Shopping",
      description: "Weekly grocery shopping at the local market",
      date: format(addDays(startOfCurrentWeek, 6), 'yyyy-MM-dd'),
      time: "11:00",
      category: "personal",
      recurrence: "weekly",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Family Dinner",
      description: "Sunday family dinner at mom's house",
      date: format(addDays(startOfCurrentWeek, 6), 'yyyy-MM-dd'),
      time: "18:00",
      category: "personal",
      recurrence: "weekly",
      originalId: null,
      createdAt: new Date().toISOString()
    },

    // Health Events
    {
      id: uuidv4(),
      title: "Doctor Appointment",
      description: "Annual health checkup with Dr. Smith",
      date: format(addDays(today, 7), 'yyyy-MM-dd'),
      time: "15:30",
      category: "health",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Meditation Session",
      description: "Daily mindfulness and meditation practice",
      date: format(today, 'yyyy-MM-dd'),
      time: "07:00",
      category: "health",
      recurrence: "daily",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Yoga Class",
      description: "Evening yoga class at the community center",
      date: format(addDays(today, 1), 'yyyy-MM-dd'),
      time: "19:00",
      category: "health",
      recurrence: "weekly",
      originalId: null,
      createdAt: new Date().toISOString()
    },

    // Social Events
    {
      id: uuidv4(),
      title: "Book Club Meeting",
      description: "Monthly book club discussion - 'The Psychology of Money'",
      date: format(addDays(today, 10), 'yyyy-MM-dd'),
      time: "19:30",
      category: "social",
      recurrence: "monthly",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Coffee with Sarah",
      description: "Catch up with college friend at downtown cafe",
      date: format(addDays(today, 3), 'yyyy-MM-dd'),
      time: "16:00",
      category: "social",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Game Night",
      description: "Weekly board game night with friends",
      date: format(addDays(startOfCurrentWeek, 5), 'yyyy-MM-dd'),
      time: "20:00",
      category: "social",
      recurrence: "weekly",
      originalId: null,
      createdAt: new Date().toISOString()
    },

    // Other Events
    {
      id: uuidv4(),
      title: "Car Service",
      description: "Regular maintenance and oil change",
      date: format(addDays(today, 4), 'yyyy-MM-dd'),
      time: "13:00",
      category: "other",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Online Course",
      description: "React Advanced Patterns course on Udemy",
      date: format(today, 'yyyy-MM-dd'),
      time: "20:30",
      category: "other",
      recurrence: "daily",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Weekend Trip Planning",
      description: "Plan and book upcoming weekend getaway",
      date: format(addDays(today, 1), 'yyyy-MM-dd'),
      time: "21:00",
      category: "other",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    },

    // Past Events (to show variety)
    {
      id: uuidv4(),
      title: "Dentist Appointment",
      description: "Routine dental cleaning and checkup",
      date: format(subDays(today, 2), 'yyyy-MM-dd'),
      time: "14:30",
      category: "health",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Team Building Activity",
      description: "Company team building event at the park",
      date: format(subDays(today, 5), 'yyyy-MM-dd'),
      time: "15:00",
      category: "work",
      recurrence: "none",
      originalId: null,
      createdAt: new Date().toISOString()
    }
  ];
};

export const hasSampleData = (events) => {
  return events.some(event => 
    event.title === "Team Standup Meeting" || 
    event.title === "Morning Workout" ||
    event.title === "Meditation Session"
  );
};
