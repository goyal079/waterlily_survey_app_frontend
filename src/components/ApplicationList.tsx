import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchApplications } from '../services/application.apis';
import { toast } from 'react-toastify';

interface Application {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  zipCode: string;
  created_at: string;
}

const ApplicationList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAllApplications = async () => {
    try {
      const response = await fetchApplications();
      setApplications(response.data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch applications';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Submitted Applications
        </h2>
        <p className="mt-2 text-base text-gray-700 sm:mt-0">
          Total applications: {applications.length}
        </p>
      </div>

      <div className="mt-4 bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Contact Information
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Submission Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-base font-medium text-gray-900">
                          {app.firstName} {app.lastName}
                        </div>
                        <div className="text-base text-gray-500 mt-1">
                          Born: {new Date(app.dateOfBirth).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-base text-gray-900">{app.email}</div>
                    <div className="text-base text-gray-500 mt-1">{app.phone}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-base leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {app.zipCode}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-base text-gray-900">
                      {new Date(app.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-base text-gray-500 mt-1">
                      {new Date(app.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No applications</h3>
          <p className="mt-1 text-base text-gray-500">
            No applications have been submitted yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationList; 