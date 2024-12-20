import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LinksView = ({ endpoint, path }) => {
  const [links, setLinks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLinks = async () => {
    try {
      console.log(`Fetching links from ${endpoint}/${path} ...`);

      const token = localStorage.getItem('token');
      const response = await axios.get(`${endpoint}/${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLinks(response.data.result);
      } else {
        setLinks([]);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks([]);
    }
  };

  const deleteLink = async (idLink) => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${endpoint}/auth/delete-link`, { idLink }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        fetchLinks();
      }
    } catch (error) {
      console.error('Error deleting link');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className='flex-grow flex flex-col items-center w-full h-max min-h-full bg-gradient-to-tl from-gray-900 to-gray-800'>

      {links.length === 0 && <p className='text-white mt-4'>No links found</p>}

      {links.length > 0 && (
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
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Shorten URL
                  </th>
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg'>
                    Link associated
                  </th>
                  <th className='px-6 py-3 text-center text-gray-300 border-r border-gray-600 text-lg w-1/5'>
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((element, index) =>
                  element.linksAssociated.map((link, linkIndex) => (
                    < React.Fragment key={`${element.apiKey}-${link.hashURL}`}>
                      {/* Add a special row between keys */}
                      {linkIndex === 0 && index > 0 && (
                        <tr className='bg-gray-700'>
                          <td colSpan='6' className='h-2'></td>
                        </tr>
                      )}
                      <tr className='border-b border-gray-600'>
                        <td className='px-6 py-4 text-center text-gray-300 border-r border-gray-600 font-bold'>
                          {element.apiKey}
                        </td>
                        <td className='px-6 py-4 text-center text-gray-300 border-r border-gray-600'>
                          {element.creationDate}
                        </td>
                        <td className='px-6 py-4 text-center text-gray-300 border-r border-gray-600'>
                          {element.expiresAt}
                        </td>

                        <td className='px-6 py-4 text-center text-gray-300 border-r border-gray-600 font-bold'>
                          <a className='text-blue-500 underline hover:text-blue-700 transition-colors font-medium flex items-center'
                            href={link.longURL}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {link.hashURL}
                            <span className='ml-2'>
                              {/* SVG Icon */}
                              <svg className="h-4 w-4 text-blue-500 hover:text-blue-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13 7h6m0 0v6m0-6L10 17"
                                />
                              </svg>
                            </span>
                          </a>
                        </td>

                        <td className='px-6 py-4 text-left text-gray-300 border-r border-gray-600 font-bold'>
                          {link.longURL}
                        </td>
                        <td className='px-6 py-4 text-gray-300 border-r border-gray-600'>
                          <div className='flex justify-center items-center space-x-6'>
                            <button
                              className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all font-semibold'
                              onClick={() => {
                                console.log('editing the row');
                              }}
                            >
                              ✏ Edit Link
                            </button>
                            <button
                              className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all font-semibold'
                              onClick={() => deleteLink(link.id)}
                              disabled={isDeleting}
                            >
                              ❌ Delete Link
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
      )
      }
    </div >
  );
};

export default LinksView;
