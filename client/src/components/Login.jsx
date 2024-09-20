import { useState } from 'react';

const Login = () => {
  const [serverError, setServerError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setServerError('');

    if (!username || !password) {
      setServerError('Please enter a username and password');
      return;
    }

    if (username != 'admin' || password != 'admin') {
      setServerError('Invalid username or password');
      return;
    }

    alert('Login successful');
  };

  return (
    <div
      className='text-text-light
        bg-gradient-to-br from-background-light to-gray-300
        dark:bg-gradient-to-br dark:from-background-dark dark:to-gray-900
	    dark:text-text-dark w-full max-w-lg p-8 mx-auto mt-8 mb-8 rounded-xl shadow-lg'
    >
      <div className='text-center mb-6'>
        <h1 className='text-primary-light dark:text-primary-dark text-4xl font-extrabold mb-2'>
          🔐 Login
        </h1>
      </div>

      <form onSubmit={handleLogin} className='space-y-6'>
        {serverError && (
          <p className='text-red-800 dark:text-red-500 text-center font-bold'>
            {serverError}
          </p>
        )}
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark
              placeholder:font-semibold placeholder:text-gray-600 dark:placeholder:text-gray-400
              px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold
              focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
              transition-colors'
            placeholder='Enter your username'
          />

          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark
              placeholder:font-semibold placeholder:text-gray-600 dark:placeholder:text-gray-400
              px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold
              focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
              transition-colors'
            placeholder='Enter your password'
          />
        </div>
        <button
          type='submit'
          className='text-white bg-boton-light hover:bg-boton-hover-light dark:bg-boton-dark dark:hover:bg-boton-hover-dark
            focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark
            w-full py-3 rounded-lg shadow-md font-semibold
            transition-colors'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
