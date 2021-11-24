import { Dispatch } from 'react';

export type Pet = {
  id: string;
  category: string;
  name: string;
  photo: string;
  tags: string;
  status: string;
};

export type User = {
  username: string;
  password: string;
  permissions: string;
};

export interface Action {
  type: string;
  payload?: any;
}

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export interface GlobalContextInterface {
  state: State;
  dispatch: Dispatch<Action>;
}

export interface ProvProps {
  children: JSX.Element;
}
