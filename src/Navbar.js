import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";

import 'bootstrap/dist/css/bootstrap.min.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="block text-[#f2f2f2] px-4 py-3.5 hover:bg-[#ddd] hover:text-black"
    style={{ display: 'inline-block' }}
  >
    {children}
  </a>
));

export default function Navbar() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('authToken');

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        const data = await response.json();
        console.log(data);
        navigate('/');
      } else {
        console.log(response);
        console.error('Error logging out data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-[#333] fixed top-0 left-0 w-full z-10">
      <nav className="flex justify-between items-center p-4 h-16">
        <div className="flex items-center">
          <img src={logo} alt="Description of the image" className="w-20 h-20 ml-2" /> {/* Adjust the size and margin as needed */}
          
          <ul className="flex items-center list-none ml-6 space-x-4">
            <li className="text-xl">
              <a href="/home" className="block text-[#f2f2f2] text-center px-4 py-3 no-underline hover:bg-[#ddd] hover:text-black">Home</a>
            </li>
            <li className="text-xl">
              <a href="/home/chat" className="block text-[#f2f2f2] text-center px-4 py-3 no-underline hover:bg-[#ddd] hover:text-black">Chat</a>
            </li>
          </ul>
        </div>

        <div className="relative">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <i className="fas fa-user" style={{ fontSize: '24px' }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="absolute right-0 mt-2 w-48 bg-vanilla rounded-lg shadow-lg">
              <Dropdown.Item className="px-4 py-2 hover:bg-gray-200" href="/home/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Item className="px-4 py-2 hover:bg-gray-200 rounded-b-lg" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}
