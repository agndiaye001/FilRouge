import React, { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <form className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              id="notifications"
              className="h-4 w-4"
            />
            <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
              Enable Notifications
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              id="darkMode"
              className="h-4 w-4"
            />
            <label htmlFor="darkMode" className="text-sm font-medium text-gray-700">
              Enable Dark Mode
            </label>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
