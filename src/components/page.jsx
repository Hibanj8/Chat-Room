import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"} className="text-2xl font-mono font-bold text-white hover:text-gray-300 lg:text-3xl" >
          ChatRoom
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button onClick={toggleMenu} type="button" className="text-gray-200 hover:text-gray-400 focus:text-gray-400" aria-label="toggle menu">
            {!isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`inset-x-0 z-20 w-full px-6 py-4 shadow-md transition-all duration-300 ease-in-out bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${isOpen ? "translate-x-0 opacity-100 " : "opacity-0 -translate-x-full"}`}>
        <div className="lg:-px-8 flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
          <Link to={"/"} className="transform transition-colors duration-300  text-gray-200 hover:text-blue-400 lg:mx-8">
            Home
          </Link>
        </div>

        <Link to={"/SignUpForm"} className="mt-4 block rounded-lg bg-blue-600 px-6 py-2.5 text-center font-medium capitalize leading-5 text-white hover:bg-blue-500 lg:mt-0 lg:w-auto" >
          Start chatting
        </Link>
      </div>
    </nav>
  );
}

function MainSection() {
  return (
    <div className="container mx-auto px-6 py-6 text-center">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-mono font-bold text-white lg:text-4xl">Welcome to the Chat Room: Where Conversations Come Alive!</h1>
        <p className="mt-6 text-gray-300">Click on the 'Start chatting' button to enter your name and join the chat room.</p>
        <button className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-blue-500 focus:outline-none lg:mx-0 lg:w-auto">
            <Link to={"/SignUpForm"}>Start chatting</Link></button>
      </div>

      <div className="mt-10 flex justify-center">
        <img className="h-96 w-full rounded-xl object-cover lg:w-4/5" src="public/chatRoom.jpg" alt="App preview" />
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <main>
      <section className="bg-gray-900">
        <Navbar />
        <MainSection />
      </section>
    </main>
  );
}

export default LandingPage;