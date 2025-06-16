import { Routes } from 'nest-router';

export const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/v1',
        children: [
          {
            path: '/users',
          },
          {
            path: '/auth',
          },
          {
            path: '/connections',
          },
          {
            path: '/notifications',
          },
        ],
      },
    ],
  },
];
