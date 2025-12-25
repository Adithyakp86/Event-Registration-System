import { Event, Participant } from '../types';

// Mock event data
export const mockEvents: Event[] = [
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

// Mock participant data
export const mockParticipants: Participant[] = [
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