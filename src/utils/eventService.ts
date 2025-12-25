import { Event } from '../types';

// In a real application, this would connect to an actual API
// For this demo, we'll use localStorage to persist data

const EVENTS_STORAGE_KEY = 'eventRegistrationEvents';

// Initialize with mock data if no events exist
const initializeEvents = (): Event[] => {
  const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (storedEvents) {
    return JSON.parse(storedEvents);
  }
  
  // Use mock events as initial data
  const mockEvents = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: '2024-12-15',
      time: '09:00 AM - 05:00 PM',
      location: 'Convention Center, New York',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders, workshops, and networking opportunities.',
      bannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      capacity: 500,
      registeredCount: 342,
      createdAt: '2024-10-01',
    },
    {
      id: '2',
      title: 'AI & Machine Learning Summit',
      date: '2024-12-20',
      time: '10:00 AM - 04:00 PM',
      location: 'Tech Park, San Francisco',
      description: 'Explore the latest advancements in AI and machine learning with hands-on workshops and expert sessions.',
      bannerImage: 'https://images.unsplash.com/photo-1677442135722-5f11f06a1e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      capacity: 300,
      registeredCount: 287,
      createdAt: '2024-10-05',
    },
    {
      id: '3',
      title: 'Cybersecurity Workshop',
      date: '2024-12-25',
      time: '02:00 PM - 06:00 PM',
      location: 'University Hall, Boston',
      description: 'Learn essential cybersecurity practices and tools to protect digital assets in today\'s threat landscape.',
      bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      capacity: 150,
      registeredCount: 112,
      createdAt: '2024-11-01',
    },
    {
      id: '4',
      title: 'Cloud Computing Bootcamp',
      date: '2025-01-05',
      time: '09:30 AM - 05:30 PM',
      location: 'Online Event',
      description: 'Master cloud computing concepts with practical exercises using AWS, Azure, and Google Cloud Platform.',
      bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      capacity: 400,
      registeredCount: 321,
      createdAt: '2024-11-15',
    },
    {
      id: '5',
      title: 'Data Science Symposium',
      date: '2025-01-10',
      time: '11:00 AM - 03:00 PM',
      location: 'Research Institute, Chicago',
      description: 'Discover cutting-edge data science techniques and their applications across various industries.',
      bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      capacity: 250,
      registeredCount: 198,
      createdAt: '2024-11-20',
    },
    {
      id: '6',
      title: 'Web Development Workshop',
      date: '2025-01-15',
      time: '10:00 AM - 04:00 PM',
      location: 'Innovation Hub, Seattle',
      description: 'Build modern web applications using React, Node.js, and the latest development tools and practices.',
      bannerImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      capacity: 200,
      registeredCount: 145,
      createdAt: '2024-12-01',
    }
  ];
  
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(mockEvents));
  return mockEvents;
};

export const getAllEvents = (): Event[] => {
  return initializeEvents();
};

export const getEventById = (id: string): Event | undefined => {
  const events = getAllEvents();
  return events.find(event => event.id === id);
};

export const createEvent = (eventData: Omit<Event, 'id' | 'registeredCount' | 'createdAt'>): Event => {
  const events = getAllEvents();
  const newEvent: Event = {
    ...eventData,
    id: Date.now().toString(), // In a real app, this would be a proper UUID
    registeredCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  events.push(newEvent);
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  return newEvent;
};

export const updateEvent = (id: string, eventData: Partial<Omit<Event, 'id' | 'registeredCount' | 'createdAt'>>): boolean => {
  const events = getAllEvents();
  const eventIndex = events.findIndex(event => event.id === id);
  
  if (eventIndex === -1) return false;
  
  events[eventIndex] = { ...events[eventIndex], ...eventData } as Event;
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  return true;
};

export const deleteEvent = (id: string): boolean => {
  const events = getAllEvents();
  const initialLength = events.length;
  const filteredEvents = events.filter(event => event.id !== id);
  
  if (filteredEvents.length === initialLength) return false; // Event not found
  
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(filteredEvents));
  return true;
};