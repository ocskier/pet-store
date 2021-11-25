import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

import { updateUserPersistence } from '../utils/localStorage';
import { toast } from '../utils/toast';

import { User } from '../types/globalTypes';

export const Login = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const login = () => {
    const newUser: User = {
      username: 'tester',
      password: 'password',
      permissions: 'admin',
    };
    dispatch({
      type: types.LOGIN,
      payload: newUser,
    });
    toast('Successful login!', 1000);
    updateUserPersistence(newUser);
    navigate('/dashboard');
  };

  return <div onClick={login}>Login Form</div>;
};
