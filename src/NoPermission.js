import React, { useState, useRef, useEffect } from 'react';
export default function NoPermission(){
    return (
        <div className='text-3xl bg-gray text-white flex flex-col items-center justify-center h-screen'>
            You don't have access to this page!
        
            <div className="flex justify-center items-center mt-10">
            <a href="/"
                className="text-xl text-blue-700 hover:underline"
            >
                Click here to log in
            </a>
            </div>
    </div>
    );
}
