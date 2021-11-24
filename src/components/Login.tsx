import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

import { updateUserPersistence } from '../utils/localStorage';

export const Login = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const login = () => {
    const newUser = {
      username: 'tester',
      password: 'password',
      permissions: 'admin',
    };
    dispatch({
      type: types.LOGIN,
      payload: newUser,
    });
    updateUserPersistence(newUser);
    navigate('/dashboard');
  };
  return <div onClick={login}>Login Form</div>;
};
