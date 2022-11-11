import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebaseConfig from './firebaseConfig';



import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import Forgotpassword from './pages/forgotpassword/Forgotpassword';
import store from './store'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgotten-password",
    element: <Forgotpassword />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

