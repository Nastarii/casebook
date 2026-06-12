import { createBrowserRouter } from 'react-router-dom';

import { ReadingShell } from './layouts/ReadingShell';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ProjectReaderPage } from './pages/ProjectReaderPage';
import { ProtectedReaderRoute } from './routes/ProtectedReaderRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ReadingShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage /> },
      {
        element: <ProtectedReaderRoute />,
        children: [
          { path: 'projects/:projectSlug/read', element: <ProjectReaderPage /> },
          { path: 'projects/:projectSlug/read/:pageSlug', element: <ProjectReaderPage /> },
        ],
      },
    ],
  },
]);
