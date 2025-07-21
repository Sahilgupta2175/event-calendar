import React from 'react';
import { EventProvider } from './contexts/EventContext';
import Calendar from './components/Calendar';
import SearchAndFilter from './components/SearchAndFilter';
import { Calendar as CalendarIcon, Sparkles, Github, Heart } from 'lucide-react';

function App() {
  return (
    <EventProvider>
      <div className="calendar-container">
        <div className="calendar-wrapper">
          <header className="calendar-header">
            <div className="header-content">
              <div className="header-icon">
                <CalendarIcon size={40} />
                <Sparkles size={20} className="sparkle-icon" />
              </div>
              <h1 className="calendar-title">
                Event Calendar
              </h1>
              <p className="calendar-subtitle">
                Organize your life with beautiful, intuitive event management. 
                Create, edit, and manage your events with drag-and-drop simplicity.
              </p>
              <div className="feature-badges">
                <span className="feature-badge">
                  <CalendarIcon size={16} />
                  Monthly View
                </span>
                <span className="feature-badge">
                  <Sparkles size={16} />
                  Drag & Drop
                </span>
                <span className="feature-badge">
                  <Heart size={16} />
                  Beautiful UI
                </span>
              </div>
            </div>
          </header>
          
          <SearchAndFilter />
          <Calendar />
          
          <footer className="calendar-footer">
            <div className="footer-content">
              <p className="footer-text">
                Built with ❤️ using React & Vite
              </p>
              <div className="footer-links">
                <a href="https://github.com" className="footer-link">
                  <Github size={16} />
                  GitHub
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </EventProvider>
  );
}

export default App;

