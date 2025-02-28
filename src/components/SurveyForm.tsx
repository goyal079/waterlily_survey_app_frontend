import { useState } from 'react';
import { useForm, formSteps } from '../context/FormContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PersonalInfo from './form-steps/PersonalInfo';
import ContactInfo from './form-steps/ContactInfo';
import HealthInfo from './form-steps/HealthInfo';
import FinancialInfo from './form-steps/FinancialInfo';
import { createApplication } from '../services/application.apis';
import axios from 'axios';

const SurveyForm = () => {
  const { 
    currentStep, 
    progress, 
    formData, 
    nextStep,
    prevStep,
    isSubmitting,
  } = useForm();
  const navigate = useNavigate();
  const [isStepValid, setIsStepValid] = useState(false);

  const handleSubmit = async () => {
    try {
      await createApplication(formData);
      toast.success('Application submitted successfully!');
      navigate('/review');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to submit application';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Submission error:', error);
    }
  };

  const handleNext = () => {
    if (currentStep === formSteps.length) {
      handleSubmit();
    } else {
      nextStep();
      setIsStepValid(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo onValidationChange={setIsStepValid} />;
      case 2:
        return <ContactInfo onValidationChange={setIsStepValid} />;
      case 3:
        return <HealthInfo onValidationChange={setIsStepValid} />;
      case 4:
        return <FinancialInfo onValidationChange={setIsStepValid} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-primary-light">
          {formSteps[currentStep - 1].title}
        </h2>
        <Link 
          to="/applications" 
          className="text-primary hover:text-primary-hover text-sm font-medium flex items-center gap-1 transition-colors"
        >
          View all applications
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {formSteps.map((step) => (
            <div
              key={step.id}
              className={`text-sm ${
                currentStep >= step.id ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-primary-light">
          {formSteps[currentStep - 1].title}
        </h2>
        
        {renderStepContent()}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isStepValid || isSubmitting}
            className="px-6 py-2 bg-primary text-white rounded-md ml-auto hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === formSteps.length ? (
              isSubmitting ? 'Submitting...' : 'Submit Application'
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm; 