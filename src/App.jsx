import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';

const Home = lazy(() => import('./Components/Home/Home'));
const InteractiveForm = lazy(() => import('./Components/InteractiveForm/InteractiveForm'));
const MovieSelection = lazy(() => import('./Components/MovieSelection/MovieSelection'));
const DateSelection = lazy(() => import('./Components/DateSelection/DateSelection'));
const TicketConfirmation = lazy(() => import('./Components/TicketConfirmation/TicketConfirmation'));
const NotFound = lazy(() => import('./Components/NotFound/NotFound'));
const MovieDetails = lazy(() => import('./Components/MovieDetails/MovieDetails'))

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'form', element: <InteractiveForm /> },
      { path: 'movies', element: <MovieSelection /> },
      { path: 'date-selection', element: <DateSelection /> },
      { path: 'ticket-confirmation', element: <TicketConfirmation /> },
      { path: '/movie/:id', element: <MovieDetails /> },
    ]
  },
  { path: '*', element: <NotFound /> }
]);

function App() {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  )
}

export default App;
