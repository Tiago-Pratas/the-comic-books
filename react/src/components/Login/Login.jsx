import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../redux/slices/auth.slice';

const Login = () => {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        dispatch(loginAsync(formData));
        setFormData({});
    };

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="shadow p-3 mb-5 bg-body rounded login-container">
            <form onSubmit={handleFormSubmit}>

                <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    onChange={handleInputChange}
                    value={formData.email}
                />

                <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                </label>

                <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    onChange={handleInputChange}
                    value={formData.password}
                />

                <div>
                    <label
                        htmlFor="password"
                        className="col-sm-2 col-form-label"
                    >
                        Contraseña
                    </label>
                </div>

                <button type="submit" className="btn btn-primary btn-blue">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Login;