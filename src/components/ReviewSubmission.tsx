import { useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormContext';

const ReviewSubmission = () => {
  const navigate = useNavigate();
  const { formData, resetForm } = useForm();

  const handleStartNew = () => {
    resetForm();
    navigate('/survey');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary-light">
          Submission Review
        </h2>

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{formData.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{formData.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{new Date(formData.dateOfBirth).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ZIP Code</p>
              <p className="font-medium">{formData.zipCode}</p>
            </div>
          </div>
        </div>

        {/* Health Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Health Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Smoking Status</p>
              <p className="font-medium capitalize">{formData.smokingStatus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Chronic Conditions</p>
              <p className="font-medium">{formData.hasChronicConditions ? 'Yes' : 'No'}</p>
            </div>
            {formData.hasChronicConditions && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Condition Details</p>
                <p className="font-medium">{formData.chronicConditionDetails}</p>
              </div>
            )}
          </div>
        </div>

        {/* Financial Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Financial Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Annual Income</p>
              <p className="font-medium">
                ${Number(formData.annualIncome).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Has Savings</p>
              <p className="font-medium">{formData.hasSavings ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Has Insurance</p>
              <p className="font-medium">{formData.hasInsurance ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        {/* Start New Survey Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleStartNew}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
          >
            Take Another Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmission; 