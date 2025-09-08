"use client"
import React, { useState } from 'react';
import GeneralForm from './GeneralForm';
import Additions from './AdditionsForm';

const tabContent = {
  General: (
    <>
        <GeneralForm/>
    </>
  ),
  Additions: (
    <>
        <Additions/>
    </>
  ),
  Search: (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your account settings, including privacy preferences, notifications, and security options.
      </p>
    </div>
  ),
//   Contacts: (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Contacts</h2>
//       <p className="text-gray-600 dark:text-gray-300">
//         View and manage your contacts. Add new contacts, edit existing ones, or organize your contact list.
//       </p>
//     </div>
//   ),
};

const TabsComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>('General');

  const handleTabClick = (tab: keyof typeof tabContent) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {Object.keys(tabContent).map((tab) => (
          <li key={tab} className="me-2">
            <button
              onClick={() => handleTabClick(tab as keyof typeof tabContent)}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === tab
                  ? 'text-blue-600 bg-gray-100 dark:bg-gray-700 dark:text-blue-500'
                  : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300'
              } ${tab === 'Disabled' ? 'text-gray-400 cursor-not-allowed dark:text-gray-500' : ''}`}
              disabled={tab === 'Disabled'}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default TabsComponent;