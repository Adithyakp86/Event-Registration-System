import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Event, Participant } from '../types';
import { mockEvents, mockParticipants } from '../data/mockData';
import RegistrationForm from '../components/RegistrationForm';
import { RegistrationFormData } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCapacityFullModal, setShowCapacityFullModal] = useState(false);

  useEffect(() => {
    // Find the event by ID
    const foundEvent = mockEvents.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
      
      // Check if user is already registered for this event
      const registered = mockParticipants.some(p => p.eventId === id);
      setIsRegistered(registered);
    }
    setLoading(false);
  }, [id]);

  const handleRegisterClick = () => {
    if (event && event.registeredCount >= event.capacity) {
      setShowCapacityFullModal(true);
      return;
    }
    setShowRegistrationForm(true);
  };

  const handleRegistrationSubmit = (data: RegistrationFormData) => {
    // In a real app, this would send data to an API
    console.log('Registration submitted:', data);
    
    // For now, just show a success message
    alert(`Registration successful for ${data.eventName}!`);
    setShowRegistrationForm(false);
    setIsRegistered(true);
  };

  const handleCancelRegistration = () => {
    setShowRegistrationForm(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Event not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 btn btn-primary"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const isFull = event.registeredCount >= event.capacity;

  return (
    <>
      <div className="min-h-screen">
        {showRegistrationForm ? (
          <div className="container py-8">
            <button
              onClick={() => setShowRegistrationForm(false)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Event Details
            </button>
            
            <RegistrationForm
              eventId={event.id}
              eventName={event.title}
              onSubmit={handleRegistrationSubmit}
              onCancel={handleCancelRegistration}
            />
          </div>
        ) : (
          <div className="container py-8">
            <button
              onClick={() => navigate('/')}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Events
            </button>
            
            <div className="card card-lg rounded-xl overflow-hidden">
              <div className="relative h-80">
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
              
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                    <div className="flex items-center mb-6">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{formatDate(event.date)} | {event.time}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm">
                      <span className={`badge ${isFull ? 'badge-danger' : 'badge-success'}`}>
                        {isFull ? 'Full' : `${event.registeredCount}/${event.capacity} Registered`}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Event Description</h2>
                  <p className="leading-relaxed">{event.description}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleRegisterClick}
                    disabled={isFull || isRegistered}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      isFull || isRegistered
                        ? 'btn btn-outline cursor-not-allowed'
                        : 'btn btn-primary'
                    }`}
                  >
                    {isRegistered ? 'Already Registered' : isFull ? 'Registration Full' : 'Register Now'}
                  </button>
                  
                  <button
                    onClick={() => window.print()}
                    className="btn btn-outline flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                    </svg>
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      </div>
      
      <ConfirmationModal
        isOpen={showCapacityFullModal}
        title="Event Full"
        message={`Sorry, the event ${event?.title} is already at full capacity (${event?.capacity} participants). Registration is closed.`}
        onConfirm={() => setShowCapacityFullModal(false)}
        onCancel={() => setShowCapacityFullModal(false)}
        confirmText="OK"
        cancelText=""
      />
    </>
  );
};

export default EventDetails;