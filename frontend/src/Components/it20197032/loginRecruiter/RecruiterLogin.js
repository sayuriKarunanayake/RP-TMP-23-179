import { useState } from 'react';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  icon from'../../../Assets/padlock.png';


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
            toast.success('Login successful');
            console.error('Login success', error.message);
            
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
      <div style={{backgroundColor:'#F0FFFF', height:'100vh', width:'100vw', margin:0, padding:0}}>
        <div class="login-form"
          style={{
            textAlign: 'center',
            maxWidth: '450px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            borderRadius: '5px',
            backgroundColor: 'white',
            padding: '20px',
            weight:"50px",
          }}
        >
          <br/>
          <img src={icon} alt="Icon" style={{ maxWidth: '40px', maxHeight: '40px' }}/><br/><br/>          <h5 style={{ color: '#333', marginBottom: '20px' }}>Sign In</h5>
          <form onSubmit={handleLogin}>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="dense"
              fullWidth
              required
            />
            
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="dense"
              fullWidth
              required
            />
            <br/><br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
          
            >
              Login
            </Button>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don't have an account? <a href="/regrecruiter">Register</a>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    )
}
