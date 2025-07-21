# Event Calendar Application

A dynamic, interactive event calendar built with React and Vite that allows users to manage their schedule with advanced features like drag-and-drop rescheduling, recurring events, and event conflict management.

## Features

### ✨ Core Features
- **Monthly Calendar View**: Traditional calendar layout with clear day-by-day organization
- **Current Day Highlighting**: Today's date is prominently highlighted
- **Month Navigation**: Easy navigation between months with arrow controls

### 📅 Event Management
- **Add Events**: Click on any day to create new events with comprehensive details
- **Edit Events**: Click on existing events to modify their details
- **Delete Events**: Remove events directly from the calendar or edit form
- **Event Details Include**:
  - Event Title
  - Date and Time with time picker
  - Duration (in minutes)
  - Description
  - Category/Color coding
  - Recurrence options

### 🔄 Recurring Events
- **Daily Recurrence**: Repeat events every day
- **Weekly Recurrence**: Repeat events weekly
- **Monthly Recurrence**: Repeat events on the same date each month
- **Custom Recurrence**: Set custom intervals (e.g., every 2 weeks, every 3 days)

### 🎯 Drag-and-Drop Functionality
- **Event Rescheduling**: Drag events between days to reschedule
- **Visual Feedback**: Smooth animations and hover states during drag operations
- **Conflict Prevention**: Smart handling of scheduling conflicts

### ⚠️ Event Conflict Management
- **Overlap Detection**: Automatically detects time conflicts between events
- **Conflict Warnings**: Displays warnings when attempting to create conflicting events
- **Smart Validation**: Prevents double-booking at the same time

### 🔍 Search and Filter
- **Search Functionality**: Search events by title or description
- **Category Filtering**: Filter events by category (Work, Personal, Health, Social, Other)
- **Real-time Results**: Instant filtering as you type
- **Active Filter Display**: Clear indication of current search terms and filters

### 💾 Data Persistence
- **Local Storage**: All events are automatically saved to browser localStorage
- **Session Persistence**: Events remain available after page refresh
- **Automatic Sync**: Changes are immediately saved without manual intervention

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Color-coded Categories**: Visual organization with different colors for each category
- **Intuitive Interface**: Clean, modern design with clear visual hierarchy
- **Accessibility**: Proper focus states and keyboard navigation support

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **Drag & Drop**: react-dnd with HTML5 backend
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context + useReducer
- **Storage**: localStorage API
- **Unique IDs**: UUID

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-calendar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173` to view the application

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Usage Guide

### Adding Events
1. Click on any day in the calendar
2. Fill out the event form with title, time, description, etc.
3. Choose recurrence options if needed
4. Click "Add Event" to save

### Editing Events
1. Click on an existing event
2. Modify any details in the form
3. Click "Update Event" to save changes

### Rescheduling Events
1. Simply drag an event from one day to another
2. The event will be automatically moved to the new date
3. Time and other details remain unchanged

### Search and Filter
1. Use the search bar to find events by title or description
2. Use the category dropdown to filter by event type
3. Clear filters by clicking the X button on active filter tags

### Managing Recurring Events
1. When creating/editing an event, select a recurrence pattern
2. Choose from Daily, Weekly, Monthly, or Custom options
3. For custom recurrence, specify the interval and unit
4. All recurring instances will be automatically generated

## Project Structure

```
src/
├── components/          # React components
│   ├── Calendar.jsx     # Main calendar component
│   ├── CalendarDay.jsx  # Individual day component
│   ├── Event.jsx        # Event display component
│   ├── EventForm.jsx    # Event creation/editing form
│   └── SearchAndFilter.jsx # Search and filter controls
├── contexts/           # React context providers
│   └── EventContext.jsx # Event state management
├── hooks/              # Custom React hooks
│   └── useEvents.js    # Event context hook
├── utils/              # Utility functions
│   ├── dateUtils.js    # Date manipulation utilities
│   └── storage.js      # localStorage utilities
├── App.jsx             # Main application component
├── App.css             # Application styles
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## Key Features Implementation

### State Management
- Uses React Context API with useReducer for complex state management
- Centralized event storage and manipulation
- Efficient re-rendering with proper state updates

### Date Handling
- Comprehensive date utilities using date-fns library
- Proper timezone handling and date formatting
- Calendar grid generation with proper week boundaries

### Drag and Drop
- Implemented with react-dnd for smooth drag operations
- HTML5 backend for cross-browser compatibility
- Visual feedback during drag operations

### Event Recurrence
- Flexible recurrence pattern system
- Automatic generation of recurring event instances
- Smart handling of recurrence boundaries

### Conflict Detection
- Time-based overlap detection algorithm
- User-friendly conflict warnings
- Prevention of double-booking scenarios

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Performance Considerations

- Efficient event filtering and searching
- Optimized re-rendering with proper React patterns
- Lazy loading of recurring events
- Minimal localStorage operations

## Future Enhancements

Potential features for future development:
- Export/import calendar data
- Integration with external calendar services (Google Calendar, Outlook)
- Email notifications and reminders
- Team calendar sharing
- Event templates
- Advanced recurrence patterns
- Mobile app version
- Offline synchronization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the excellent framework
- date-fns contributors for robust date handling
- Tailwind CSS team for the utility-first CSS framework
- React DnD team for drag-and-drop functionality+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
