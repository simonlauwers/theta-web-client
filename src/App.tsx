import './App.css';
import Login from './components/login/Login';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Signup from './components/signup/Signup';
import AuthLayout from './components/layouts/AuthLayout';
import HomeLayout from './components/layouts/HomeLayout';
import Home from './components/home/Home';
import ScenarioSelection from './components/scenario-selection/ScenarioSelection';
import ScenarioLayout from './components/layouts/ScenarioLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAuth from './hooks/UseAuth';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NonAuthenticatedRoute from './components/NonAuthenticatedRoute';
import { Snackbar } from '@mui/material';

function App() {

  const { loading, error, user, loadingInitial } = useAuth();

  // A React Query client used for the React Query Provider that will wrap game related components
  const queryGameClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000,
      },
    },
  });

  // A React Query client used for the React Query Provider that will wrap general components
  const queryGeneralClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 15000,
      },
    },
  });


  if (loadingInitial || loading) {
    return (
      <h1>LOAAAAAAAAAADING</h1>
    );
  }




  return (
    <QueryClientProvider client={queryGeneralClient}>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<NonAuthenticatedRoute component={Login} />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>

        <Route path="/home" element={<HomeLayout />}>
          <Route path="/home" element={<AuthenticatedRoute component={Home} />} />
        </Route>

        <Route path="/scenarios" element={<ScenarioLayout />}>
          <Route path="/scenarios" element={<AuthenticatedRoute component={ScenarioSelection} />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404 | Page not found!</p>
            </main>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}


export default App;
