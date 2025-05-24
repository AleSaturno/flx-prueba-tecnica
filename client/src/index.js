import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import './styles/theme.scss';

import App from './App';
import { UserProvider } from './context/UserContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
