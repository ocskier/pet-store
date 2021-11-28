//  React type imports
import { Dispatch } from 'react';

// Custom type for a Pet object
export type Pet = {
  id: number;
  category: string;
  name: string;
  photo: string;
  tags: string;
  status: 'available' | 'pending' | 'sold';
};

// Custom type for a User object
export type User = {
  username: string;
  password: string;
  permissions: 'admin' | 'customer';
};

// Custom interface for a Dispatch Action
export interface Action {
  type: string;
  payload?: any;
}

// Custom interface for a Global State object
export interface State {
  loggedIn: boolean;
  user: User | null;
  pets: Pet[];
}

// Custom interface for a Global Context value object
export interface GlobalContextInterface {
  state: State;
  dispatch: Dispatch<Action>;
}

// Custom interface for Global Provider props to allow
// for children elements to be rendered
export interface ProvProps {
  children: JSX.Element;
}
