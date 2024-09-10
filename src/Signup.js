import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from "./images/logo.png";

const signupFields = [
    {
        labelText: "Username",
        labelFor: "username",
        id: "username",
        name: "username",
        type: "text",
        autoComplete: "username",
        isRequired: true,
        placeholder: "Username"
    },
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"
    },
    {
        labelText: "API Key",
        labelFor: "apikey",
        id: "apikey",
        name: "apikey",
        type: "text",
        autoComplete: "apikey",
        isRequired: true,
        placeholder: "API Key"
    },
    {
        labelText: "Langchain Key",
        labelFor: "langchainkey",
        id: "langchainkey",
        name: "langchainkey",
        type: "text",
        autoComplete: "langchainkey",
        isRequired: true,
        placeholder: "Langchain Key"
    },
];

function Signup() {

    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [Duplicate, setDuplicate] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const [signupState, setSignupState] = useState({
        username: "",
        email: "",
        password: "",
        apikey: "",
        langchainkey: "",
    });

    useEffect(() => {
        if (Duplicate) {
            setShowMessage(true);
            setFadeOut(false);

            const timer1 = setTimeout(() => {
                setFadeOut(true);
            }, 3000);

            const timer2 = setTimeout(() => {
                setShowMessage(false);
                setDuplicate(false);
            }, 4000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        } else {
            setShowMessage(false);
            setFadeOut(false);
        }
    }, [Duplicate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignupState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const signupData = {
            username: signupState.username,
            email: signupState.email,
            password: signupState.password,
            apikey: signupState.apikey,
            langchainkey: signupState.langchainkey
        };

        try {
            const response = await fetch(`${apiUrl}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/');
            } else {
                console.error('Error submitting data');
                setDuplicate(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fixedInputClass = "bg-vanilla appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brown focus:border-brown focus:z-10 sm:text-sm";

    return (
        <div className="bg-gray text-white flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                    <img src={logo} alt="Logo" className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56" />
                </div>

                <h1 className="text-2xl sm:text-3xl mt-6 text-gray-600 font-bold text-center">Sign up</h1>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        {signupFields.map((field) => (
                            <div key={field.id} className="">
                                <label htmlFor={field.id} className="sr-only">
                                    {field.labelText}
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={signupState[field.name]}
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    required={field.isRequired}
                                    className={fixedInputClass}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="group bg-brown relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-raisin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amythest mt-6"
                    >
                        Signup
                    </button>
                </form>
                <div className="h-8 mt-4">
                    {showMessage && (
                        <div className={`flex items-center px-4 p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`} role="alert">
                            <svg
                                className="flex-shrink-0 inline w-4 h-4 me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Email already in use.</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center mt-8">
                    <a href="/"
                        className="font-medium text-blue-700 hover:underline"
                    >
                        Click here to log in
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
