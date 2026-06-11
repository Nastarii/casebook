import { createBrowserRouter } from 'react-router-dom';

import { ReadingShell } from './layouts/ReadingShell';
import { HomePage } from './pages/HomePage';
import { ProjectReaderPage } from './pages/ProjectReaderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ReadingShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects/:projectSlug/read', element: <ProjectReaderPage /> },
      { path: 'projects/:projectSlug/read/:pageSlug', element: <ProjectReaderPage /> },
    ],
  },
]);
