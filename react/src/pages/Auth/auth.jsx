import React, { useState } from 'react';
import { Login, Register } from '../../components/index';

const Auth = () => {
    const [showForm, setShowForm] = useState('login');

    return (
        <div>
            <div className="form-container__controls">
                <button
                    className="form-container__controls-btn btn-blue"
                    onClick={() => setShowForm('login')}
                >
                    Login
                </button>
                <button
                    className="form-container__controls-btn btn-blue"
                    onClick={() => setShowForm('register')}
                >
                    Registro
                </button>
            </div>

            <div className="form-container">
                {showForm === 'login' && <Login />}

                {showForm === 'register' && <Register />}
            </div>
        </div>
    );
};
    

export default Auth;