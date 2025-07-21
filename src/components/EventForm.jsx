import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Type, FileText, Repeat, Palette } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const EventForm = ({ event, onSave, onCancel, initialDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: formatDate(initialDate || new Date()),
    time: '09:00',
    description: '',
    category: 'personal',
    recurrence: 'none',
    customInterval: 1,
    customUnit: 'weeks',
    duration: 60
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        time: event.time || '09:00',
        duration: event.duration || 60,
        customInterval: event.customInterval || 1,
        customUnit: event.customUnit || 'weeks'
      });
    }
  }, [event]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (formData.recurrence === 'custom') {
      if (!formData.customInterval || formData.customInterval < 1) {
        newErrors.customInterval = 'Interval must be at least 1';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button
            onClick={onCancel}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#6b7280' 
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Type size={16} />
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="form-input"
              style={{ borderColor: errors.title ? '#ef4444' : '#d1d5db' }}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.title}</p>
            )}
          </div>

          {}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} />
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="form-input"
                style={{ borderColor: errors.date ? '#ef4444' : '#d1d5db' }}
              />
              {errors.date && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.date}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} />
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="form-input"
                style={{ borderColor: errors.time ? '#ef4444' : '#d1d5db' }}
              />
              {errors.time && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.time}</p>
              )}
            </div>
          </div>

          {}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} />
              Duration (minutes)
            </label>
            <input
              type="number"
              min="15"
              step="15"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              className="form-input"
            />
          </div>

          {}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Palette size={16} />
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="form-input"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="health">Health</option>
              <option value="social">Social</option>
              <option value="other">Other</option>
            </select>
          </div>

          {}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Repeat size={16} />
              Recurrence
            </label>
            <select
              value={formData.recurrence}
              onChange={(e) => handleChange('recurrence', e.target.value)}
              className="form-input"
            >
              <option value="none">No Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {}
          {formData.recurrence === 'custom' && (
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Interval
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.customInterval}
                  onChange={(e) => handleChange('customInterval', parseInt(e.target.value))}
                  className="form-input"
                  style={{ borderColor: errors.customInterval ? '#ef4444' : '#d1d5db' }}
                />
                {errors.customInterval && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.customInterval}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">
                  Unit
                </label>
                <select
                  value={formData.customUnit}
                  onChange={(e) => handleChange('customUnit', e.target.value)}
                  className="form-input"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          )}

          {}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} />
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="form-input form-textarea"
              placeholder="Enter event description"
            />
          </div>

          {}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem' }}>
            <button
              type="submit"
              className="button button-primary"
              style={{ flex: 1 }}
            >
              {event ? 'Update Event' : 'Add Event'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="button button-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;

