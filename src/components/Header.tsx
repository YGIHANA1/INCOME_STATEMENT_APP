import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-10 text-white">
      <h1 className="text-4xl font-bold mb-3 text-shadow-lg">
        Income Statement Calculator
      </h1>
      <p className="text-lg opacity-90 font-light">
        Track your business revenue and expenses to calculate profit or loss
      </p>
    </header>
  );
};

export default Header;