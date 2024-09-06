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

    // clean any previous messages/errors
    setCopySuccess("");
    setServerError("");

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
    <div>
      <div className="text-text-light bg-background-light dark:bg-background-dark dark:text-text-dark
      w-full max-w-lg p-8 mx-auto mb-8 rounded-xl shadow-lg">

        <div className="text-center mb-6">
          <h1 className="text-primary-light dark:text-primary-dark text-4xl font-extrabold mb-2">🔗 mini-link!</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold ">Simplify your links and make them more memorable</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {serverError && <p className="text-red-800 dark:text-red-500 text-center font-bold">{serverError}</p>}
          <div className="flex flex-col space-y-4">

            <input
              type="text"
              name="longURL"
              value={formData.longURL}
              onChange={handleChange}
              className="bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark
              placeholder:font-semibold placeholder:text-gray-600 dark:placeholder:text-gray-400 
              px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold 
              focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
              transition-colors"
              placeholder="Enter your URL"
            />
            {errors.longURL && <p className="text-red-800 dark:text-red-500 font-bold">{errors.longURL}</p>}

            <input
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              className="bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark
              placeholder:font-semibold placeholder:text-gray-600 dark:placeholder:text-gray-400
              px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold
              focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark  
              transition-colors"
              placeholder="Enter your API Key"
            />
            {errors.apiKey && <p className="text-red-800 dark:text-red-500 font-bold">{errors.apiKey}</p>}
          </div>
          <button
            type="submit"
            className="text-white bg-boton-light hover:bg-boton-hover-light dark:bg-boton-dark dark:hover:bg-boton-hover-dark
            focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark 
            w-full py-3 rounded-lg shadow-md font-semibold  
            transition-colors"
          >
            Get a mini-link!
          </button>
        </form>
      </div>

      {shortURL && (
        <div className="w-full max-w-lg mx-auto">

          <div className="flex items-center justify-center">

            <div className="w-full space-x-2 p-6 bg-green-900 rounded-lg text-center shadow-lg">
              <span className="text-2xl">🔗</span>
              <a
                href={shortURL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-2xl font-bold text-white underline break-all"
              >
                {shortURL}
              </a>
              
              <div className='w-full'>
                <button
                  onClick={copyToClipboard}
                  className="text-white bg-green-600 hover:bg-green-700
                  focus:outline-none focus:ring-2 focus:ring-green-500
                  w-1/4 mt-4 py-2 px-4 rounded-lg shadow-md font-semibold 
                  transition-colors"
                >
                  Copy
                </button>
              </div>
              
              {copySuccess && <p className="text-green-400 mt-2 font-bold">{copySuccess}</p>}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default URLShortener;
