import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../redux/slices/auth.slice';



const Register = () => {
    const [formData, setFormData ] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = (ev) => {
        ev.preventDefault();

        dispatch(registerAsync(formData));
        setFormData({});
    };

    const handleInputChange = (ev) => {
        const { value, name } = ev.target;
        setFormData({ ...formData, [name]: value });
    };

    return(
        <div className="shadow p-3 mb-5 bg-body rounded login-container">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="col-sm-2 col-form-label">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    className="form-control input"
                    autoComplete="username"
                    id="username"
                    onChange={handleInputChange}
                    value={formData.username}
                />

                <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    className="form-control input"
                    autoComplete="email"
                    id="email"
                    onChange={handleInputChange}
                    value={formData.email}
                />

                <div>
                    <label
                        htmlFor="password"
                        className="col-sm-2 col-form-label"
                    >
                        Password
                    </label>
                </div>

                <input
                    type="password"
                    name="password"
                    className="form-control input"
                    autoComplete="current-password"
                    id="password"
                    onChange={handleInputChange}
                    value={formData.password}
                />


                <button type="submit" className="btn btn-primary btn-blue">
                    Register
                </button>
            </form>
        </div>

    );

    
};

export default Register;