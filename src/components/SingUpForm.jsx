import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function SignUpForm() {
    const [inputUsername, setInputUsername] = useState({
        pseudonyme: '',
      });
      const navigate = useNavigate();
    
      const handleJoin = async (e) => {
        e.preventDefault();
        try {
          const socket = io('http://localhost:3000');
          socket.emit('create user', inputUsername);
          localStorage.setItem('username', inputUsername.pseudonyme);
          if (inputUsername.pseudonyme) {
              navigate('/pageChat');
          }else{
            alert("the field is empty")
          }
        } catch (error) {
          console.log(error);
        }
        setInputUsername({
          pseudonyme: '',
        });
      };
  return (
    <div className="bg-gray-900  min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col bg-gray-300 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md  shadow-white">
        <div className="font-mono self-center text-xl sm:text-3xl text-gray-800">
          Join us Now
        </div>
        <div className=" font-mono mt-4 self-center text-xl sm:text-sm text-gray-800">
           Enter your name for Chat Room access.
        </div>

        <div className="mt-10">
          <form action="#">
            <div className="flex flex-col mb-5">
              <label htmlFor="name" className="mb-1 text-xs tracking-wide text-gray-600">
                Name:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <FontAwesomeIcon icon={faUser} className="text-blue-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className=" font-mono text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your name"
                  value={inputUsername.pseudonyme}
                  onChange={(e) => setInputUsername({ pseudonyme: e.target.value })}
                />
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gray-700 hover:bg-gray-700/80 rounded-2xl py-2 w-full transition duration-150 ease-in"
              >
                <span onClick={handleJoin} className="mr-2 uppercase">Join Us</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
