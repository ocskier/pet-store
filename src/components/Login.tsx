import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField } from '@mui/material';
import { Fingerprint } from '@mui/icons-material';

import { StyledFormGroup } from './switch/Switch';

import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

import { loginUser } from '../utils/api';
import { updateUserPersistence } from '../utils/localStorage';
import { toast } from '../utils/toast';

import { User } from '../types/globalTypes';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState('customer');
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const handleRadioChange = (e: any) => {
    const { value } = e.target;
    console.log(value);
    setPermissions(value);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        dispatch({
          type: types.LOGIN,
          payload: newUser,
        });
        updateUserPersistence(newUser);
        toast('Successful login!', 1000);
        navigate('/dashboard');
      } else {
        toast(`Authentication failed!`, 1500, 'error');
      }
    } catch (err) {
      toast(`Something went wrong!`, 1500, 'error');
    }
  };

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
