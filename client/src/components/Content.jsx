// Content.js
const Content = ({ isOpen, children }) => {
  return (
    <main
      className={`flex-grow transition-all duration-300 ${
        isOpen ? 'ml-48' : 'ml-16'
      } bg-background-dark`}
    >
      {children}
    </main>
  );
};

export default Content;
