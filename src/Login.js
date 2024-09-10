import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from "./images/logo.png";

const loginFields = [
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
    }
];

function Login() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });

    const [loginFailed, setLoginFailed] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (loginFailed) {
            setShowMessage(true);
            setFadeOut(false);

            const timer1 = setTimeout(() => {
                setFadeOut(true);
            }, 10000);

            const timer2 = setTimeout(() => {
                setShowMessage(false);
                setLoginFailed(false);
            }, 10000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        } else {
            setShowMessage(false);
            setFadeOut(false);
        }
    }, [loginFailed]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const loginData = {
            email: formState.email,
            password: formState.password,
        };
        
        try {
            
            const response = await fetch(`${apiUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('authToken', token);
                navigate('/home');
            } else {
                console.error('Error submitting data');
                setLoginFailed(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginFailed(true);
        }
    }

    const fixedInputClass = "bg-vanilla appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ";

    return (
        <div className="bg-gray text-white flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
                    <img src={logo} alt="Logo" className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl mt-6 text-gray-600 font-bold text-center">Log in</h1>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        {loginFields.map((field) => (
                            <input
                                key={field.id}
                                onChange={handleChange}
                                value={formState[field.name]}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                required={field.isRequired}
                                className={fixedInputClass}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="group bg-brown relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-raisin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amythest mt-6"
                    >
                        Login
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
                                <span className="font-medium">Incorrect username or password!</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-center items-center mt-8">
                    <a href="/signup"
                        className="font-medium text-blue-700 hover:underline"
                    >
                        Click here to sign up
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
