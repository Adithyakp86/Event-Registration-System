import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Participant } from '../types';
import { getParticipantsByEventId, exportParticipantsToCSV } from '../utils/participantService';
import { getEventById } from '../utils/eventService';
import AdminTable from '../components/AdminTable';

const EventParticipants: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [eventTitle, setEventTitle] = useState('');

  useEffect(() => {
    if (eventId) {
      loadParticipants();
      loadEventTitle();
    }
  }, [eventId]);

  const loadParticipants = () => {
    setLoading(true);
    const participantsData = getParticipantsByEventId(eventId!);
    setParticipants(participantsData);
    setLoading(false);
  };

  const loadEventTitle = () => {
    const event = getEventById(eventId!);
    if (event) {
      setEventTitle(event.title);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleExportCSV = () => {
    if (participants.length === 0) return;

    const csvContent = exportParticipantsToCSV(participants);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `participants-${eventTitle.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter participants based on search term
  const filteredParticipants = participants.filter(participant => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      participant.fullName.toLowerCase().includes(searchLower) ||
      participant.email.toLowerCase().includes(searchLower) ||
      participant.college.toLowerCase().includes(searchLower) ||
      participant.registrationId.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading participants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Participants for: {eventTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and view all participants registered for this event
          </p>
        </div>

        <AdminTable
          participants={filteredParticipants}
          columns={['Name', 'Email', 'Phone', 'College', 'Date', 'ID']}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          exportToCSV={handleExportCSV}
          title="Event Participants"
        />
      </div>
    </div>
  );
};

export default EventParticipants;