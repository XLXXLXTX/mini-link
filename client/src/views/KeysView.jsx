import React, { useEffect, useState } from 'react';

const KeysView = () => {
  const [keys, setKeys] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [datetime, setDatetime] = useState('');

  const fetchKeys = () => {
    console.log(`Fetching keys ...`);

    const keys = [
      {
        apiKey: 1234,
        expires_at: '2022-12-31 23:59:59',
        linksAssociated: [
          {
            longURL: 'https://www.google.com',
            hashURL: 'abc123',
            creationDate: '2022-12-31 23:59:59',
          },
          {
            longURL: 'https://www.facebook.com',
            hashURL: 'ghi789',
            creationDate: '2022-12-31 23:59:59',
          },
        ],
      },
      {
        apiKey: 5678,
        expires_at: '2022-12-31 23:59:59',
        linksAssociated: [
          {
            longURL: 'https://www.twitter.com',
            hashURL: 'def456',
            creationDate: '2022-12-31 23:59:59',
          },
          {
            longURL: 'https://www.youtube.com',
            hashURL: 'ghi789',
            creationDate: '2022-12-31 23:59:59',
          },
          {
            longURL: 'https://www.bing.com',
            hashURL: 'abc123',
            creationDate: '2022-12-31 23:59:59',
          },
        ],
      },
      {
        apiKey: 9101,
        expires_at: '2022-12-31 23:59:59',
        linksAssociated: [],
      },
    ];

    setKeys(keys);

    return;
  };

  const createKey = (e) => {
    e.preventDefault();
    console.log(`Creating key ${apiKey} that expires at ${datetime} ...`);

    return;
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
                    Expires at
                  </th>
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Links associated
                  </th>
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key, index) =>
                  key.linksAssociated.map((link, linkIndex) => (
                    <React.Fragment key={`${key.apiKey}-${link.hashURL}`}>
                      {/* Add a special row between keys */}
                      {linkIndex === 0 && index > 0 && (
                        <tr className='bg-gray-700'>
                          <td colSpan='4' className='h-2'></td>
                        </tr>
                      )}
                      <tr className='border-b border-gray-600'>
                        <td className='px-6 py-4 text-center text-gray-300 border-r border-gray-600'>
                          {key.apiKey}
                        </td>
                        <td className='px-6 py-4 text-center text-gray-300 border-r border-gray-600'>
                          {key.expires_at}
                        </td>
                        <td className='px-6 py-4 text-left text-gray-300 border-r border-gray-600'>
                          <div className='flex flex-col items-center'>
                            <p className='mb-2'>
                              {link.hashURL} ➡ {link.longURL}
                            </p>
                            <button
                              className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all font-semibold'
                              onClick={() => {
                                console.log('deleting the link');
                              }}
                            >
                              ❌ Delete Link
                            </button>
                          </div>
                        </td>
                        <td className='px-6 py-4 text-gray-300 border-r border-gray-600'>
                          <div className='flex justify-center items-center space-x-6'>
                            <button
                              className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all font-semibold'
                              onClick={() => {
                                console.log('editing the row');
                              }}
                            >
                              ✏ Edit Key
                            </button>
                            <button
                              className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all font-semibold'
                              onClick={() => {
                                console.log('deleting the row');
                              }}
                            >
                              ❌ Delete Key
                            </button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeysView;
