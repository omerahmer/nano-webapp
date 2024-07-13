import React, { useState, useEffect, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import '../../index.css'


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = 'Login';
    }, []);

    async function loginUser(event: FormEvent) {
        event.preventDefault();
        const response = await fetch('https://nanotech.studentorg.berkeley.edu/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            window.location.href = '/Biosensor'
        } else {
            alert('Please check your username and password')
        }
        console.log(data);
    }

    return (
        <div className="font-link">
            <h1 className="text-center mt-4 mb-4">Login</h1>
            <form onSubmit={loginUser} className="col-md-6 offset-md-3 p-4 rounded shadow login-form">
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
                <button type="submit" className="btn btn-primary" value="login">Login</button>
            </form>
        </div>
    );
}

export default Login;
