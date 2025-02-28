import { useEffect } from 'react';
import { useForm } from '../../context/FormContext';
import type { FormData } from '../../context/FormContext';

const ContactInfo = ({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) => {
  const { formData, handleFieldChange } = useForm();

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?1?\d{10,15}$/;
    const zipRegex = /^\d{5}(-\d{4})?$/;

    const isEmailValid = emailRegex.test(formData.email);
    const isPhoneValid = phoneRegex.test(formData.phone);
    const isZipValid = zipRegex.test(formData.zipCode);
    
    const isValid = isEmailValid && isPhoneValid && isZipValid;
    onValidationChange(isValid);
    return isValid;
  };

  const handleChange = (field: keyof Pick<FormData, 'email' | 'phone' | 'zipCode'>, value: string) => {
    handleFieldChange(field, value);
  };
  useEffect(() => {
    validateFields();
  }, [formData]); // Run validation when formData changes or component mounts

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Enter your primary email address. We'll use this for important communications.
        </p>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">Phone Number</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Enter a valid phone number where we can reach you. Include country code if applicable.
        </p>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">ZIP Code</h3>
        <p className="text-base text-gray-600 mt-1 mb-3">
          Enter your current residential ZIP code.
        </p>
        <input
          type="text"
          id="zipCode"
          value={formData.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your ZIP code"
        />
      </div>
    </div>
  );
};

export default ContactInfo; 