import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            await login(formData.email, formData.password);
        } else {
            const success = await register(formData);
            if (success) {
                setIsLogin(true); // Switch to login form after successful registration
                setFormData({ firstName: '', lastName: '', email: '', password: '' });
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>CipherStudio</h1>
                <h2>{isLogin ? 'Login' : 'Create an Account'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                        </>
                    )}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                </p>
            </div>
        </div>
    );
};

// THIS IS THE LINE THAT WAS MISSING
export default AuthPage;

