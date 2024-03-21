import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import '../../index.css'

const Register: React.FC = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(event: FormEvent) {
        event.preventDefault();
        const response = await fetch('https://nanotech.berkeley.edu/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            navigate('/login')
        }
    }

    return (
        <div>
            <h1 className="text-center mt-4 mb-4">Register</h1>
            <form onSubmit={registerUser} className="col-md-6 offset-md-3 p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;
