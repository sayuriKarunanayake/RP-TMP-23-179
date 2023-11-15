import { useState } from 'react';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  icon from'../../../Assets/padlock.png';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';

export default function RecruiterLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
 
    const handleLogin = async (e) => {
      e.preventDefault();

      //form validations
      if (!email || !password) {
        toast.error('Please provide both email and password');
        return;
      } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        toast.error('Invalid email');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:8070/recruiter/login', { workMail: email, pwd: password });
  
        if (response.data.success) {
            console.error('Login success', error.message);
            toast.success('Login successful');

            // Wait for the toast to close before navigating
            await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the duration as needed

            const userId = response.data.userId;
            localStorage.setItem("recemail", email);
            window.location = `/profile/${userId}`;
           
            
        } else {
          console.error('Login failed', error.message);
          setError('Invalid credentials');
          toast.error('Invalid credentials');
        }
      } catch (error) {
        console.error('Internal server error', error.message);
        setError('Internal server error');
        toast.error('Invalid credentials');
      }
    };
  
    return (
      <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
        <div className="login-form" style={{
          textAlign: 'center',
          maxWidth: '450px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: 'white',
          padding: '20px',
          margin: 'auto',
        
        }}>
          <img src={icon} alt="Icon" style={{ maxWidth: '40px', maxHeight: '40px', alignItems: 'center', display: 'block', margin: 'auto'}}/><br/>
          <h4 style={{ color: '#333', marginBottom: '20px' }}>Sign In</h4>
          <br/>
          <form onSubmit={handleLogin}>
          <TextField
            type="email"
            
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
            fullWidth
            required
            variant="standard"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: '#2196F3' }} />
                </InputAdornment>
              ),
              style: {
                borderBottom: '1px solid #2196F3', 
                borderRadius: '0',  
                marginBottom: '20px',
              },
            }}
          />

          <TextField
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            fullWidth
            required
            variant="standard"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon style={{ color: '#2196F3' }} />
                </InputAdornment>
              ),
              style: {
                borderBottom: '1px solid #2196F3',  // Adjust the color as needed
                borderRadius: '0',  // No border-radius
              },
            }}
          />
            <br /><br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: '#2196f3', marginTop: '10px'}}
            >
              Login
            </Button>
            <p style={{ textAlign: 'center', marginTop: '10px'}}>
              Don't have an account? <a href="/regrecruiter">Sign up</a> Here
            </p>
          </form>
          <ToastContainer 
          position="top-center"
          />
        </div>
      </div>

    )
}
