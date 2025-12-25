import { Participant } from '../types';

// In a real application, this would connect to an actual API
// For this demo, we'll use localStorage to persist data

const PARTICIPANTS_STORAGE_KEY = 'eventRegistrationParticipants';

// Initialize with mock data if no participants exist
const initializeParticipants = (): Participant[] => {
  const storedParticipants = localStorage.getItem(PARTICIPANTS_STORAGE_KEY);
  if (storedParticipants) {
    return JSON.parse(storedParticipants);
  }
  
  // Use mock participants as initial data
  const mockParticipants: Participant[] = [
    {
      id: '101',
      eventId: '1',
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      college: 'MIT',
      registrationDate: '2024-11-10',
      registrationId: 'REG001'
    },
    {
      id: '102',
      eventId: '1',
      fullName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1-555-0124',
      college: 'Stanford University',
      registrationDate: '2024-11-12',
      registrationId: 'REG002'
    },
    {
      id: '103',
      eventId: '1',
      fullName: 'Michael Chen',
      email: 'm.chen@example.com',
      phone: '+1-555-0125',
      college: 'UC Berkeley',
      registrationDate: '2024-11-15',
      registrationId: 'REG003'
    },
    {
      id: '104',
      eventId: '2',
      fullName: 'Emily Rodriguez',
      email: 'e.rodriguez@example.com',
      phone: '+1-555-0126',
      college: 'Harvard University',
      registrationDate: '2024-11-18',
      registrationId: 'REG004'
    },
    {
      id: '105',
      eventId: '2',
      fullName: 'David Wilson',
      email: 'd.wilson@example.com',
      phone: '+1-555-0127',
      college: 'Caltech',
      registrationDate: '2024-11-20',
      registrationId: 'REG005'
    },
    {
      id: '106',
      eventId: '3',
      fullName: 'Priya Patel',
      email: 'priya.p@example.com',
      phone: '+1-555-0128',
      college: 'Georgia Tech',
      registrationDate: '2024-11-22',
      registrationId: 'REG006'
    },
    {
      id: '107',
      eventId: '4',
      fullName: 'James Brown',
      email: 'j.brown@example.com',
      phone: '+1-555-0129',
      college: 'Carnegie Mellon',
      registrationDate: '2024-11-25',
      registrationId: 'REG007'
    },
    {
      id: '108',
      eventId: '4',
      fullName: 'Olivia Davis',
      email: 'o.davis@example.com',
      phone: '+1-555-0130',
      college: 'University of Washington',
      registrationDate: '2024-11-28',
      registrationId: 'REG008'
    },
    {
      id: '109',
      eventId: '5',
      fullName: 'Robert Taylor',
      email: 'r.taylor@example.com',
      phone: '+1-555-0131',
      college: 'Cornell University',
      registrationDate: '2024-12-01',
      registrationId: 'REG009'
    },
    {
      id: '110',
      eventId: '6',
      fullName: 'Sophia Martinez',
      email: 's.martinez@example.com',
      phone: '+1-555-0132',
      college: 'University of Texas',
      registrationDate: '2024-12-05',
      registrationId: 'REG010'
    }
  ];
  
  localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(mockParticipants));
  return mockParticipants;
};

export const getAllParticipants = (): Participant[] => {
  return initializeParticipants();
};

export const getParticipantsByEventId = (eventId: string): Participant[] => {
  const participants = getAllParticipants();
  return participants.filter(participant => participant.eventId === eventId);
};

export const getParticipantById = (id: string): Participant | undefined => {
  const participants = getAllParticipants();
  return participants.find(participant => participant.id === id);
};

export const createParticipant = (participantData: Omit<Participant, 'id' | 'registrationId'>): Participant => {
  const participants = getAllParticipants();
  const newParticipant: Participant = {
    ...participantData,
    id: Date.now().toString(), // In a real app, this would be a proper UUID
    registrationId: `REG${String(participants.length + 1).padStart(3, '0')}`
  };
  
  participants.push(newParticipant);
  localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(participants));
  return newParticipant;
};

export const updateParticipant = (id: string, participantData: Partial<Omit<Participant, 'id' | 'registrationId'>>): boolean => {
  const participants = getAllParticipants();
  const participantIndex = participants.findIndex(participant => participant.id === id);
  
  if (participantIndex === -1) return false;
  
  participants[participantIndex] = { ...participants[participantIndex], ...participantData } as Participant;
  localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(participants));
  return true;
};

export const deleteParticipant = (id: string): boolean => {
  const participants = getAllParticipants();
  const initialLength = participants.length;
  const filteredParticipants = participants.filter(participant => participant.id !== id);
  
  if (filteredParticipants.length === initialLength) return false; // Participant not found
  
  localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(filteredParticipants));
  return true;
};

// Function to export participants to CSV format
export const exportParticipantsToCSV = (participants: Participant[]): string => {
  const headers = ['Registration ID', 'Full Name', 'Email', 'Phone', 'College', 'Registration Date'];
  const rows = participants.map(participant => [
    participant.registrationId,
    participant.fullName,
    participant.email,
    participant.phone,
    participant.college,
    participant.registrationDate
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');
  
  return csvContent;
};