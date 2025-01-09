import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="">
      <ul className="space-y-4">
        <li>
          <Link to="/prestataire" className="flex items-center hover:bg-gray-700 p-2 rounded">
            <FaChartBar className="mr-3" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/prestataire/profile" className="flex items-center hover:bg-gray-700 p-2 rounded">
            <FaUser className="mr-3" />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/prestataire/settings" className="flex items-center hover:bg-gray-700 p-2 rounded">
            <FaCog className="mr-3" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
