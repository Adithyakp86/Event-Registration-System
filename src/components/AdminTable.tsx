import React from 'react';
import { Participant } from '../types';

interface AdminTableProps {
  participants: Participant[];
  columns: string[];
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  exportToCSV?: () => void;
  title?: string;
}

const AdminTable: React.FC<AdminTableProps> = ({ 
  participants, 
  columns, 
  searchTerm = '',
  onSearchChange,
  exportToCSV,
  title = 'Participants'
}) => {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {onSearchChange && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 form-input"
              />
              <svg 
                className="w-5 h-5 absolute right-3 top-2.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          )}
          
          {exportToCSV && (
            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-lg flex items-center justify-center transition-colors btn btn-primary"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Export CSV
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="text-left text-xs font-medium uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <tr key={participant.id}>
                  <td className="font-medium">
                    {participant.fullName}
                  </td>
                  <td>
                    {participant.email}
                  </td>
                  <td>
                    {participant.phone}
                  </td>
                  <td>
                    {participant.college}
                  </td>
                  <td>
                    {new Date(participant.registrationDate).toLocaleDateString()}
                  </td>
                  <td>
                    {participant.registrationId}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No participants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {participants.length === 0 && (
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
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No participants</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by registering for an event.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminTable;