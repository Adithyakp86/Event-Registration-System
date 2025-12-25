import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import ConfirmationModal from './ConfirmationModal';

interface RegistrationFormProps {
  eventId: string;
  eventName: string;
  onSubmit: (data: RegistrationFormData) => void;
  onCancel: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ eventId, eventName, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<RegistrationFormData, 'eventId' | 'eventName'>>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
  });
  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.college.trim()) {
      newErrors.college = 'College/University is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof errors];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Show confirmation modal instead of immediately submitting
      setShowConfirmationModal(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 card card-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Event Registration</h2>
      
      <div className="mb-6 p-4 rounded-lg bg-blue-50">
        <h3 className="font-semibold text-blue-800">Event: {eventName}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.fullName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } form-input`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } form-input`}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } form-input`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        
        <div>
          <label htmlFor="college" className="block text-sm font-medium mb-1">
            College / Organization *
          </label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.college 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } form-input`}
            placeholder="Enter your college or organization"
          />
          {errors.college && <p className="mt-1 text-sm text-red-600">{errors.college}</p>}
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 rounded-lg btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 rounded-lg btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Register Now'}
          </button>
        </div>
      </form>
      
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title="Confirm Registration"
        message={`Are you sure you want to register for ${eventName}? Please verify your details before submitting.`}
        onConfirm={() => {
          setIsSubmitting(true);
          setTimeout(() => {
            onSubmit({
              ...formData,
              eventId,
              eventName
            });
            setIsSubmitting(false);
            setShowConfirmationModal(false);
          }, 1000);
        }}
        onCancel={() => setShowConfirmationModal(false)}
        confirmText="Register"
        cancelText="Cancel"
      />
    </div>
  );
};

export default RegistrationForm;