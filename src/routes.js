import React from 'react';
import Developers from './pages/Developers';
import Businesses from './pages/Businesses';
import AboutAmbrosus from './pages/AboutAmbrosus';

const routes = [
  {
    path: '/',
    key: 'About Ambrosus',
    exact: true,
    component: () => <AboutAmbrosus />,
  },
  {
    path: '/businesses',
    key: 'Businesses',
    exact: true,
    component: () => <Businesses />,
  },
  {
    path: '/developers',
    key: 'Developers',
    exact: true,
    component: () => <Developers />,
  },
  {
    path: '/community',
    key: 'Community',
    exact: true,
    component: () => <Businesses />,
  },
];

export default routes;
