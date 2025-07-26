// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App';
import TurfsPage from './pages/Turfs.jsx'; // Add other routes as needed
import NotFound from './pages/NotFound';
import Home from './pages/Home';

import './index.css'; // Tailwind or global styles

// Leaflet CSS and icon fix (required for Vite)
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icons for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// ✅ Define Routes
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <Home /> },
        { path: 'turfs/*', element: <TurfsPage /> }, // Splat route
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    // ✅ This removes the v7 warning
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

// ✅ Mount app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
