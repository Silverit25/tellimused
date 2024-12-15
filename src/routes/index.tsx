import { createRouter, RouterProvider } from '@tanstack/react-router';
import { DayView } from '../pages/DayView';
import { Layout } from '../components/Layout';

const router = createRouter({
  routeTree: {
    component: Layout,
    children: [
      {
        path: '/',
        component: DayView,
      },
      {
        path: '/day/:date',
        component: DayView,
      },
    ],
  },
});

export function Router() {
  return <RouterProvider router={router} />;
}