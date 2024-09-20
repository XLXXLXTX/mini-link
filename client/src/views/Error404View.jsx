import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Error404View = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header className='h-16' />

      {/* Content that will grow to take up the remaining space */}
      <main
        className='flex-grow flex flex-col items-center justify-center
        bg-gradient-to-tl from-blue-700 to-indigo-400
        dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800'
      >
        <div
          className='flex flex-col items-center justify-center
          w-full max-w-lg mx-auto mb-8 text-center'
        >
          <h1 className='w-full text-4xl text-white font-bold mb-6'>
            404 Not Found
          </h1>

          <Link to='/' className='text-xl font-semibold'>
            <button
              className='bg-secondary-light dark:bg-secondary-dark
              p-3 rounded'
            >
              Return Home
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer className='h-16' />
    </div>
  );
};

export default Error404View;
