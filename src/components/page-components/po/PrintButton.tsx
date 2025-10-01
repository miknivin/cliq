/* components/page-components/po/PrintButton.tsx */
import React from 'react';

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
     
      `}</style>
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 print:hidden"
      >
        Print
      </button>
    </>
  );
};

export default PrintButton;