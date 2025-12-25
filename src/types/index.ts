export interface Event {
  id: string;
  title: string;
  date: string; // ISO date string
  time: string; // e.g. "10:00 AM - 12:00 PM"
  location: string;
  description: string;
  bannerImage?: string;
  capacity: number;
  registeredCount: number;
  createdAt: string;
}

export interface Participant {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  registrationDate: string;
  registrationId: string; // Unique registration ID
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  eventId: string;
  eventName: string;
}