//  React hook imports
import { useState } from 'react';

// Dependency imports
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

// MUI imports (Material-UI)
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField } from '@mui/material';
import { Fingerprint } from '@mui/icons-material';

// Component imports
import { StyledFormGroup } from './switch/Switch';

// Global State imports
import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

// Utility imports
import { loginUser } from '../utils/api';
import { updateUserPersistence } from '../utils/localStorage';
import { toast } from '../utils/toast';

// Type and interface imports
import { User } from '../types/globalTypes';

export const Login = () => {
  // Local states for loading true or false, permissions selection value, and form object
  // with credentials for auth (last two for controlled inputs)
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState('customer');
  const [formData, setFormData] = useState({ username: '', password: '' });

  // Dispatch from global state
  const { dispatch } = useGlobalContext();

  // Navigate hook to reroute
  const navigate = useNavigate();

  // Event handler for changing permissions b/t admin and customer
  const handleRadioChange = (e: any) => {
    const { value } = e.target;
    console.log(value);
    setPermissions(value);
  };

  // Event handler for capturing textarea input changes
  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit event handler to create user from form, make request to API
  // to authenticate, if successful persist to ls and reroute to dashboard view
  // toast accordingly and loading concurrently
  const login = async (e: any) => {
    setLoading(true);
    const newUser = {
      ...formData,
      permissions,
    } as User;
    try {
      const res = await loginUser(newUser);
      const data = await res.json();
      if (data.code < 400) {
        toast('Successful login!', 750);
        setTimeout(() => {
          dispatch({
            type: types.LOGIN,
            payload: newUser,
          });
          updateUserPersistence(newUser);
          navigate('/dashboard');
        }, 750);
      } else {
        toast(`Authentication failed!`, 1400, 'error');
        setLoading(false);
      }
    } catch (err) {
      toast(`Something went wrong!`, 1400, 'error');
      setLoading(false);
    }
  };

  // Show the loading spinner during async actions else login form
  return loading ? (
    <ClipLoader color={'blue'} loading={loading} css={''} size={100} />
  ) : (
    <StyledFormGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ marginBottom: '1.5rem' }}>
          Login
        </FormLabel>
        <TextField
          id="username-basic"
          label="Username"
          name="username"
          sx={{ marginBottom: '1rem' }}
          onChange={handleFormChange}
          value={formData.username}
          variant="outlined"
        />
        <TextField
          id="password-basic"
          label="Password"
          name="password"
          sx={{ marginBottom: '1rem' }}
          value={formData.password}
          onChange={handleFormChange}
          variant="outlined"
        />
      </FormControl>
      <FormControl component="fieldset" sx={{ margin: '1rem 0' }}>
        <FormLabel component="legend" sx={{ marginBottom: '1rem' }}>
          Permissions
        </FormLabel>
        <RadioGroup aria-label="permissions" name="permissions" value={permissions} onChange={handleRadioChange}>
          <FormControlLabel value="customer" control={<Radio />} label="Customer" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        </RadioGroup>
      </FormControl>

      {/* Disabled button until username and password have input*/}
      <Button
        aria-label="fingerprint"
        color="primary"
        disabled={!formData.username || !formData.password}
        onClick={login}
        type="submit"
        variant="outlined"
      >
        <Fingerprint />
        Submit
      </Button>
    </StyledFormGroup>
  );
};
