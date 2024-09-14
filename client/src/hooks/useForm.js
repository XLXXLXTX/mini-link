import { useState } from 'react';

export const useForm = (initialValues, submitCallback) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    // retrieve the name, type, value, and checked properties from the target element
    const { name, type, value, checked } = e.target;

    // update the form data based on the type of the input element
    setFormData((prev) => ({
      ...prev,
      // if the type is checkbox, use the checked property
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.longURL) newErrors.longURL = 'URL is required';
    if (!formData.apiKey) newErrors.apiKey = 'API Key is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      submitCallback({
        longURL: formData.longURL,
        apiKey: formData.apiKey,
        generateQR: formData.generateQR,
      });
    }
  };

  // reset the form data, errors, and server error
  // or reset the form data with new values
  const resetForm = (newValues = {}) => {
    setFormData((prev) => ({ ...prev, ...newValues }));
    setErrors({});
    setServerError('');
  };

  return {
    formData,
    errors,
    serverError,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
