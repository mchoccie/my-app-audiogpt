import React, { useState, useRef, useEffect } from 'react';
import bot from "./images/bot.png";
import user from "./images/user.png";
import Modal from './Modal';

const Message = ({ role, content }) => (
  <div className="flex flex-row">
    <img src={role === 'user' ? user : bot} alt="Message" className="w-8 h-8 mr-3 rounded-full border border-2 border-gray-700" />
    <div className={`p-2 rounded-lg max-w-xl break-words ${role === 'user' ? 'bg-darkvanilla text-black mt-0 ml-2 mr-5 mb-5' : 'bg-vanilla mt-0 ml-2 mr-5 mb-5'}`}>
      <p>{content}</p>
    </div>
  </div>
);

const Input = ({ value, onChange, handleSubmit, className, loading }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault(); // Prevents default form submission behavior
      handleSubmit(); // Calls the provided submit handler
    }}
    className={`flex ${className}`}
  >
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="flex-1 p-2 border text-white bg-lightbrown border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
      disabled={loading}
    />
    <button
      type="submit" // Change to type="submit"
      className="ml-2 px-4 py-2 bg-brown text-white rounded-lg hover:bg-raisin"
      disabled={loading}
    >
      Send
    </button>
  </form>
);

const History = ({ question, onClick }) => (
  <div onClick={onClick} className="w-2 h-2 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
    <p>{question}</p>
  </div>
);

const Clear = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-raisin text-white rounded-lg hover:bg-red-700 ${className}`}
  >
    Clear
  </button>
);

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [errorKey, setErrorKey] = useState(false);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [sysPrompt, setSysPrompt] = useState(`You are a helpful AI assistant who can provide valuable insights and detailed explanations.
      If you can, use the context provided to help answer the questions. Please give very detailed answers combining
      what you inherently know with the context to give a unique and interesting point of view. If there is no context,
      go based off what you know inherently. Please end by saying "Hopefully this answers your question!"`)
  const [currTemplate, setCurrTemplate] = useState("GenericGPT")
  const [notification, setNotification] = useState({ message: '', type:''});
  const token =  localStorage.getItem('authToken');

  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const onKeyPressHandler = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default action if needed
      handleSubmit();
      console.log("enter");
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return; // Don't submit empty inputs
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log('Input submitted:', input);
    const newMessage = { role: "user", id: messages.length + 1, text: input };
    addMessage(newMessage);
    setInput("");
    setLoading(true);
  

    try {
      const response = await fetch(`${apiUrl}/api/add-message`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input, sysPrompt }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const newMessageBot = { role: "bot", id: messages.length + 2, text: data.response }; // Ensure unique ID
        addMessage(newMessageBot);
      } else {
        console.error('Error submitting data');
        setErrorKey(true)
        setNotification({ message: 'Invalid OpenAI Key', type:'error' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
    finally{
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([]);
  }

  return (
      <div className="justify-center flex flex-col items-center bg-gray h-screen">
        {(notification.type === 'error' || notification.type === 'modal') && (
              <div
              className={`fixed flex text-white p-2 rounded-lg shadow-lg transition-opacity duration-500 opacity-100 ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} `}>
                {notification.message}
              </div>
        )}
        <div className="center flex flex-col bg-vanilla rounded-lg shadow-md mt-14 p-4 w-3/4 h-[80vh]">
          <div className="flex flex-row justify-between items-center">
            <Clear onClick={clearChat} className=" w-15 h-15" />
            <h3 className="text-lg font-semibold">CHAT MESSAGES</h3>
            <button className="ml-2 px-2 py-2 bg-brown text-white rounded-lg hover:bg-raisin"
            onClick={() => setModalOpen(true)}>
              Template: <span className="font-bold">{currTemplate}</span>
            </button>
          </div>
          <hr className="border-t-2 border-amethyst mb-2 mt-2" />
          <div className="overflow-y-auto flex-1 overflow-y-auto mb-4">
            {messages.map((el, i) => (
              <Message key={i} role={el.role} content={el.text} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            handleSubmit={handleSubmit} // Use onSubmit instead of onClick and onKeyDown
            className="my-6"
            loading={loading}
          />
          
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={(sysPrompt, name) => {
            setCurrTemplate(name);
            setSysPrompt(sysPrompt);
            setNotification({ message: `Template "${name}" has been selected!`, type: 'modal' });
            setTimeout(() => setNotification(""), 2000);
          }}
        />
    </div>
      
  );
}
