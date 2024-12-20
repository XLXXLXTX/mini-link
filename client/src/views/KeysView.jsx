import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KeysView = ({ endpoint, path }) => {
  const [keys, setKeys] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [datetime, setDatetime] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [serverError, setServerError] = useState('API Key and expiration date are required');

  const fetchKeys = async () => {
    try {
      console.log(`Fetching keys from ${endpoint}/${path} ...`);

      const token = localStorage.getItem('token');
      const response = await axios.get(`${endpoint}/${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setKeys(response.data.result);
      } else {
        setKeys([]);
      }
    } catch (error) {
      console.error('Error fetching keys:', error);
      setKeys([]);
    }
  };

  const createKey = async (e) => {
    try {
      e.preventDefault();
      console.log(`Creating key ${apiKey} that expires at ${datetime} ...`);

      if (!apiKey || !datetime) {
        setServerError('API Key and expiration date are required');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await axios.post(`${endpoint}/auth/create-key`, { apiKey, expiresAt: datetime }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        fetchKeys();
        setApiKey('');
        setDatetime('');
        setServerError('');
      }
    } catch (error) {
      setServerError(error.response.data.error);
      console.error('Error creating key:', error);
    }
  };

  const deleteKey = async (idKey) => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${endpoint}/auth/delete-key`, { idKey }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        fetchKeys();
      }
    } catch (error) {
      console.error('Error deleting key');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <div className='flex-grow flex flex-col items-center w-full h-max min-h-full bg-gradient-to-tl from-gray-900 to-gray-800'>
      <div className='w-full my-8 px-4'>
        <div className='overflow-x-auto'>
          <form onSubmit={createKey} className='space-y-6'>
            {/* Flex container for inputs */}
            <div className='flex space-x-4'>
              <input
                type='text'
                id='apiKey'
                name='apiKey'
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className='bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark placeholder:font-semibold placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-colors w-2/5'
                placeholder='Enter the API Key'
              />

              {/* add a label for the datetime input */}
              <label
                htmlFor='expiresAt'
                className='text-gray-300 font-semibold w-1/5 text-lg text-right'
              >
                Expiration date
              </label>

              <input
                type='datetime-local'
                id='expiresAt'
                name='expiresAt'
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className='bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark placeholder:font-semibold placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-colors w-1/5'
                placeholder='Enter the expiration date'
              />

              <button
                type='submit'
                className='bg-green-600 hover:bg-green-700
                  focus:outline-none focus:ring-2 focus:ring-green-500
                 light:text-text-light text-text-dark
                 px-4 py-3 rounded-lg font-semibold transition-colors w-2/5 text-lg'
              >
                Create Key
              </button>
            </div>
            <div className='flex space-x-4 justify-center'>
              {serverError && (
                <p className='text-red-800 dark:text-red-500 text-center font-bold'>{serverError}</p>
              )}
            </div>
          </form>
        </div>
      </div>

      {keys.length === 0 && <p className='text-white mt-4'>No keys found</p>}

      {keys.length > 0 && (
        <div className='w-full mt-4 px-4'>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-full bg-gray-800 border border-gray-600'>
              <thead className='bg-gray-700 border-b'>
                <tr>
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    API Key
                  </th>
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Created at
                  </th>
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Expires at
                  </th>
                  {/* <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Links associated
                  </th> */}
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key) => (
                  <tr key={key.id} className='border-b border-gray-600'>
                    <td className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg font-bold'>
                      {key.apiKey}
                    </td>
                    <td className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                      {key.creationDate}
                    </td>
                    <td className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                      {key.expiresAt}
                    </td>
                    <td className='px-6 py-4 text-gray-300 border-r border-gray-600'>
                      <div className='flex justify-center items-center space-x-6'>
                        <button
                          className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all font-semibold'
                          onClick={() => {
                            console.log('editing the row');
                          }}
                        >
                          ✏ Edit
                        </button>
                        <button
                          className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all font-semibold'
                          onClick={() => deleteKey(key.id)}
                          disabled={isDeleting}
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeysView;
