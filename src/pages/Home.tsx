import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { mockEvents } from '../data/mockData';
import { Event } from '../types';

const Home: React.FC = () => {
  const [events] = useState<Event[]>(mockEvents);
  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
            Upcoming Events
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl sm:mt-4">
            Discover and register for exciting events happening near you
          </p>
        </div>

        <div className="grid grid-cols-1 grid-cols-2-md grid-cols-3-lg gap-8">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={() => handleEventClick(event.id)} 
            />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No events</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No events are currently available. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;