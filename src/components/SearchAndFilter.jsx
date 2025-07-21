import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Tag, Clock, Trash2, RefreshCw } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { generateSampleData } from '../utils/sampleData';

const SearchAndFilter = () => {
  const { searchTerm, filter, setSearchTerm, setFilter, deleteAllEvents, addEvent, events } = useEvents();
  const [showFilters, setShowFilters] = useState(true);

  const categories = [
    { value: '', label: 'All Categories', icon: Calendar, color: 'gray' },
    { value: 'work', label: 'Work', icon: Calendar, color: 'blue' },
    { value: 'personal', label: 'Personal', icon: Tag, color: 'green' },
    { value: 'health', label: 'Health', icon: Clock, color: 'red' },
    { value: 'social', label: 'Social', icon: Tag, color: 'purple' },
    { value: 'other', label: 'Other', icon: Tag, color: 'gray' }
  ];

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilter('');
  };

  const handleDeleteAllEvents = () => {
    if (events.length === 0) {
      alert('No events to delete!');
      return;
    }
    
    const confirmed = window.confirm(
      `Are you sure you want to delete all ${events.length} event(s)? This action cannot be undone.`
    );
    
    if (confirmed) {
      deleteAllEvents();
      clearAllFilters(); // Also clear any active filters
    }
  };

  const handleLoadSampleData = () => {
    const confirmed = window.confirm(
      'This will replace all current events with sample data. Are you sure?'
    );
    
    if (confirmed) {
      deleteAllEvents(); // Clear existing events first
      
      // Add sample events
      const sampleEvents = generateSampleData();
      sampleEvents.forEach(event => {
        // Remove the id and createdAt to let the context generate them
        const { id: _id, createdAt: _createdAt, ...eventData } = event;
        setTimeout(() => {
          addEvent(eventData);
        }, 100); // Small delay to ensure delete completes first
      });
      
      clearAllFilters();
    }
  };

  const hasActiveFilters = searchTerm || filter;

  return (
    <div className="search-filter">
      <div className="search-filter-header">
        <div className="search-filter-title">
          <Filter size={20} />
          <span>Search & Filter Events</span>
        </div>
        <div className="search-filter-actions">
          <button
            className="sample-data-btn"
            onClick={handleLoadSampleData}
            title="Load sample events for demonstration"
          >
            <RefreshCw size={16} />
            Load Sample Data
          </button>
          <button
            className="delete-all-btn"
            onClick={handleDeleteAllEvents}
            disabled={events.length === 0}
            title={events.length === 0 ? 'No events to delete' : `Delete all ${events.length} event(s)`}
          >
            <Trash2 size={16} />
            Delete All ({events.length})
          </button>
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      <div className="search-filter-content">
        {/* Search Input */}
        <div className="search-input-container">
          <div className="search-input">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-field"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Categories */}
        {showFilters && (
          <div className="filter-section">
            <h4 className="filter-section-title">
              <Tag size={16} />
              Filter by Category
            </h4>
            <div className="category-filters">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = filter === category.value;
                return (
                  <button
                    key={category.value}
                    onClick={() => setFilter(isActive ? '' : category.value)}
                    className={`category-filter ${isActive ? 'active' : ''} ${category.color}`}
                  >
                    <IconComponent size={16} />
                    <span>{category.label}</span>
                    {isActive && <X size={14} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="active-filters">
            <div className="active-filters-header">
              <span className="active-filters-title">Active Filters:</span>
              <button onClick={clearAllFilters} className="clear-all-btn">
                <X size={14} />
                Clear All
              </button>
            </div>
            <div className="active-filters-list">
              {searchTerm && (
                <span className="active-filter search-filter-tag">
                  <Search size={12} />
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {filter && (
                <span className="active-filter category-filter-tag">
                  <Tag size={12} />
                  {categories.find(cat => cat.value === filter)?.label}
                  <button onClick={() => setFilter('')}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
