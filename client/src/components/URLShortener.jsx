import { useState } from 'react';

import { useForm } from '../hooks/useForm';

const URLShortener = () => {

  const backendURL = import.meta.env.VITE_BACKEND_URL === undefined 
  ? 'http://localhost:3001/create' 
  : `${import.meta.env.VITE_BACKEND_URL}/create`;

  const initialValues = { longURL: "", apiKey: "" };

  const [shortURL, setShortURL] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [serverError, setServerError] = useState(""); 

  const submitCallback = async (data) => {

    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': data.apiKey,
        },
        body: JSON.stringify({ longURL: data.longURL }),
      });
  
      // verify if the response is not successful, so an error is thrown
      if (!response.ok) {
        // parse the error data from the server
        const errorData = await response.json(); 
  
        // check if it is a 404 error (URL already shortened)
        if (response.status === 404) {
          // show the existing shortened URL
          setShortURL(errorData.shortURL); 
        } else {
          // if there are other types of errors, just show the error message
          setServerError(errorData.error || 'Something went wrong');
          // clean the shortURL in case of error
          setShortURL(""); 
        }
  
        throw new Error(errorData.error || 'Something went wrong');
      }
  
      // if the response is successful, parse the data
      const responseData = await response.json();
  
      // verify the server returned a shortURL
      if (responseData.shortURL) {
        // update the shortURL in the state
        setShortURL(responseData.shortURL); 
        // clean any previous success message
        setCopySuccess(""); 
        // clean any previous error message
        setServerError(""); 

      } else {
        console.error('Error: No short URL returned');
      }
      
      // reset the form after a successful operation
      resetForm(); 
  
    } catch (error) {
      // handle other types of errors
      console.error('Error:', error.message);
      //show the error message 
      setServerError(error.message); 
    }
  };

  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(initialValues, submitCallback);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL).then(() => {
      setCopySuccess("Copied!");
    }, () => {
      setCopySuccess("Failed to copy");
    });
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
      
      {/* container form */}
      <div className="w-2/3 h-auto bg-black p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <h1 className="text-white text-3xl font-bold mb-2">🔗 mini-link!</h1>
          <p className="text-white">Simplify your links and make them more memorable</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {serverError && <p className="font-bold text-red-500 mb-4">{serverError}</p>} 
          <div className="flex space-x-4">
            <input
              type="text"
              name="longURL"
              value={formData.longURL}
              onChange={handleChange}
              className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your URL"
            />
            {errors.longURL && <p className="font-bold text-red-500">{errors.longURL}</p>}

            <input
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your API Key"
            />
            {errors.apiKey && <p className="font-bold text-red-500">{errors.apiKey}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
            Get a mini-link!
          </button>
        </form>
      </div>

      {/* container shortURL */}
      {shortURL && (
        <div className="w-2/3 h-auto mt-6 p-4 bg-green-900 border border-green-950 rounded-lg text-center relative">

          <div className='flex items-center justify-center '>

            <div className="w-5/6 space-x-4">
              
              <span className="text-2xl">🔗</span>
              <a
                href={shortURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-white underline break-all"
              >
                {shortURL}
              </a>

              <button
                onClick={copyToClipboard}
                className="font-semibold bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Copy
              </button>
            </div>

          </div>

          {copySuccess && <p className="font-bold mt-2 text-green-500">{copySuccess}</p>}
        </div>
      )}
    </div>
  );
};

export default URLShortener;