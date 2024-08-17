import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';

const Home = lazy(() => import('./Components/Home/Home'));
const InteractiveForm = lazy(() => import('./Components/InteractiveForm/InteractiveForm'));
const MovieSelection = lazy(() => import('./Components/MovieSelection/MovieSelection'));
const DateSelection = lazy(() => import('./Components/DateSelection/DateSelection'));
const TicketConfirmation = lazy(() => import('./Components/TicketConfirmation/TicketConfirmation'));
const NotFound = lazy(() => import('./Components/NotFound/NotFound'));
const MovieDetails = lazy(() => import('./Components/MovieDetails/MovieDetails'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="form" element={<InteractiveForm />} />
            <Route path="movies" element={<MovieSelection />} />
            <Route path="date-selection" element={<DateSelection />} />
            <Route path="ticket-confirmation" element={<TicketConfirmation />} />
            <Route path="movie/:id" element={<MovieDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
