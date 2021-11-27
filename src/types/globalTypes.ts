import { Dispatch } from 'react';

export type Pet = {
  id: number;
  category: string;
  name: string;
  photo: string;
  tags: string;
  status: 'available' | 'pending' | 'sold';
};

export type User = {
  username: string;
  password: string;
  permissions: 'admin' | 'customer';
};

export interface Action {
  type: string;
  payload?: any;
}

export interface State {
  loggedIn: boolean;
  user: User | null;
  pets: Pet[];
}

export interface GlobalContextInterface {
  state: State;
  dispatch: Dispatch<Action>;
}

export interface ProvProps {
  children: JSX.Element;
}
