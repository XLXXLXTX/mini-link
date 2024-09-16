const Footer = () => {
  return (
    <footer
      className='flex items-center justify-center py-4
    bg-background-light text-text-light
    dark:bg-background-dark dark:text-text-dark'
    >
      <p className='text-base text-center'>
        <span className='font-bold block sm:inline'>Copyright © 2024 | </span>
        <span className='block sm:inline'>
          <a
            className='text-link-light dark:text-link-dark'
            href='https://github.com/XLXXLXTX/mini-link'
            target='_blank'
          >
            mini-link!
          </a>{' '}
          |{' '}
          <a
            className='text-link-light dark:text-link-dark'
            href='https://github.com/XLXXLXTX'
            target='_blank'
          >
            Javier Pardos Blesa
          </a>{' '}
          | All rights reserved.
        </span>
      </p>
    </footer>
  );
};

export default Footer;
