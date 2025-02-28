import { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: string;

  // Contact Info
  email: string;
  phone: string;
  zipCode: string;

  // Health Info
  hasChronicConditions: boolean;
  chronicConditionDetails: string;
  smokingStatus: 'never' | 'former' | 'active';

  // Financial Info
  annualIncome: string;
  hasSavings: boolean;
  hasInsurance: boolean;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  zipCode: '',
  hasChronicConditions: false,
  chronicConditionDetails: '',
  smokingStatus: 'never',
  annualIncome: '',
  hasSavings: false,
  hasInsurance: false,
};

interface FormContextType {
  formData: FormData;
  handleFieldChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitForm: () => Promise<void>;
  progress: number;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const formSteps = [
  {
    id: 1,
    title: 'Personal Information',
    fields: ['firstName', 'lastName', 'dateOfBirth'],
  },
  {
    id: 2,
    title: 'Contact Information',
    fields: ['email', 'phone', 'zipCode'],
  },
  {
    id: 3,
    title: 'Health Information',
    fields: ['hasChronicConditions', 'chronicConditionDetails', 'smokingStatus'],
  },
  {
    id: 4,
    title: 'Financial Information',
    fields: ['annualIncome', 'hasSavings', 'hasInsurance'],
  },
];

export const FormProvider = ({ children }: { children: ReactNode }) => {
  // Form Data State
  const [formData, setFormData] = useState<FormData>(initialFormData);
  
  // Navigation State
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate progress
  const progress = (currentStep / formSteps.length) * 100;

  // Field Change Handler
  const handleFieldChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Navigation Handlers
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, formSteps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Form Submission Handler
  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      // Add your API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  const value = {
    formData,
    handleFieldChange,
    currentStep,
    nextStep,
    prevStep,
    isSubmitting,
    isSubmitted,
    submitForm,
    progress,
    resetForm,
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}; 