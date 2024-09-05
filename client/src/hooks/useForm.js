import { useState } from 'react';

export const useForm = (initialValues, submitCallback) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      });
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
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
