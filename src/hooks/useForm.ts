
import { useState } from 'react';

interface FormState {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export const useForm = (initialState: FormState, validationRules?: any) => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (validationRules) {
      Object.keys(validationRules).forEach(field => {
        const rules = validationRules[field];
        const value = formData[field];

        if (rules.required && !value.trim()) {
          newErrors[field] = rules.required;
        } else if (rules.email && value && !validateEmail(value)) {
          newErrors[field] = rules.email;
        } else if (rules.phone && value && !validatePhone(value)) {
          newErrors[field] = rules.phone;
        } else if (rules.minLength && value && value.length < rules.minLength.length) {
          newErrors[field] = rules.minLength.message;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setFormData(initialState);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
    reset,
  };
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return phoneRegex.test(phone);
};
