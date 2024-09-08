import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const settingsFields = [
    {
        labelText: "API Key",
        labelFor: "apikey",
        id: "apikey",
        name:"apikey",
        type: "text",
        autoComplete:"apikey",
        isRequired: true,
        placeholder: "API Key",
        text: "API Key Reset"  
    },
    {
        labelText: "Password Reset",
        labelFor: "password",
        id: "password",
        name:"password",
        type: "text",
        autoComplete:"password",
        isRequired: true,
        placeholder: "Password Reset",
        text: "Password Reset"   
    },
    {
        labelText: "Langchain Key",
        labelFor: "langchainkey",
        id: "langchainkey",
        name:"langchainkey",
        type: "text",
        autoComplete:"langchainkey",
        isRequired: true,
        placeholder: "Langchain Key",
        text: "Langchain Key"   
    },
];

function Settings() {
    const token = localStorage.getItem('authToken');
    const [notification, setNotification] = useState({ message: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSettingsState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [settingsState, setSettingsState] = useState({
        apikey: "",
        password: "",
        langchainkey: "",
    });

    const changePassData = { password: settingsState.password };
    const changeKeyData = { apikey: settingsState.apikey };
    const changeLangchainData = { langchainkey: settingsState.langchainkey };

    const handleClick = async (text) => {
        let url = '';
        let data = {};
        let successMessage = '';

        if (text === 'Password Reset') {
            url = 'http://127.0.0.1:8000/api/changePass';
            data = changePassData;
            successMessage = 'Password changed';
        } else if (text === 'API Key Reset') {
            url = 'http://127.0.0.1:8000/api/changeKey';
            data = changeKeyData;
            successMessage = 'API Key changed';
        } else {
            url = 'http://127.0.0.1:8000/api/changeLangchain';
            data = changeLangchainData;
            successMessage = 'Langchain Key changed';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSettingsState(prevState => ({
                    ...prevState,
                    [text.toLowerCase().replace(' ', '')]: ""  // Reset the corresponding field
                }));
                setNotification({ message: successMessage });
                setTimeout(() => setNotification({ message: '' }), 2500);
            } else {
                console.error('Error submitting data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fixedInputClass = "bg-vanilla appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brown focus:border-brown focus:z-10 sm:text-sm ";

    return (
        <div className="bg-gray text-white flex flex-col items-center justify-start p-4 min-h-screen">
    <h1 className="text-3xl pb-4 text-gray-600 font-bold mt-20">Settings</h1>
    <div className="space-y-6 w-full max-w-md">
        {settingsFields.map((field) => (
            <div key={field.id} className="space-y-2">
                <div className="text-raisin text-xl mb-1">{field.text}:</div>
                <label htmlFor={field.id} className="sr-only">
                    {field.labelText}
                </label>
                <input
                    onChange={handleChange}
                    value={settingsState[field.name]}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    required={field.isRequired}
                    className={fixedInputClass}
                    placeholder={field.placeholder}
                />
                <button
                    type="submit"
                    className="group bg-brown w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-raisin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amythest mt-2"
                    onClick={() => handleClick(field.text)}
                >
                    {field.text}
                </button>
            </div>
        ))}
        {notification.message && (
            <div
                className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded-lg shadow-lg transition-opacity duration-500"
            >
                {notification.message}
            </div>
        )}
    </div>
</div>
    );
}

export default Settings;
