import React, { useState } from 'react';
import '../style/AuthenticationPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signIn, signUp } from '../firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from './WelcomePage';
import { useNavigate } from 'react-router-dom';

const AuthenticationPage = ({ setIsNewUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/invalid-credential': 'Incorrect credentials or no authorization',
      'auth/email-already-in-use': 'An account with this email already exists',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/invalid-email': 'Please enter a valid email address',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'Incorrect credentials or no authorization',
      'auth/wrong-password': 'Incorrect credentials or no authorization',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
      'auth/network-request-failed': 'Network error. Please check your connection'
    };
    return errorMessages[errorCode] || 'An unexpected error occurred';
  };

  const clearForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { user, error: authError } = isLogin 
        ? await signIn(formData.email, formData.password)
        : await signUp(formData.email, formData.password);

      if (authError) {
        const errorCode = authError.split('(')[1]?.split(')')[0] || authError;
        setError(getErrorMessage(errorCode));
        return;
      }

      if (!isLogin && user) {
        setIsNewUser(true);
        navigate('/welcome');
        return;
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      {showWelcome ? (
        <WelcomePage user={currentUser} />
      ) : (
        <div className="auth-box">
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {!isLogin && (
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="separator">
            <span>or</span>
          </div>

          <button
            type="button"
            className="switch-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '', confirmPassword: '' });
            }}
          >
            {isLogin ? 'Create new account' : 'Login to existing account'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
