import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isFull = event.registeredCount >= event.capacity;

  return (
    <div className="card card-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {event.bannerImage ? (
          <img 
            src={event.bannerImage} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{formatDate(event.date)} | {event.time}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">
            <span className={`badge ${isFull ? 'badge-danger' : 'badge-success'}`}>
              {isFull ? 'Full' : `${event.registeredCount}/${event.capacity} Registered`}
            </span>
          </div>
        </div>
        
        <button
          onClick={onClick}
          disabled={isFull}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isFull 
              ? 'btn btn-outline cursor-not-allowed' 
              : 'btn btn-primary'
          }`}
        >
          {isFull ? 'Registration Full' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;