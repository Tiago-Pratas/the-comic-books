import React, { useState } from 'react';
import { Login, Register } from '../../components/index';

const Auth = () => {
    const [showForm, setShowForm] = useState('login');

    return (
        <div className="">
            <div className="flex justify-center pt-10">
                <div className="px-4">
                    <button
                        className="btn btn-yellow"
                        onClick={() => setShowForm('login')}
                    >
                        Login
                    </button>
                </div>

                <div className="px-4">
                    <button
                        className="btn btn-yellow"
                        onClick={() => setShowForm('register')}
                    >
                        Register
                    </button>
                </div>
            </div>

            <div className="form-container">
                {showForm === 'login' && <Login />}

                {showForm === 'register' && <Register />}
            </div>
        </div>
    );
};
    

export default Auth;