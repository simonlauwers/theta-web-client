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

function App() {
  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Route>
    
          <Route path="/home" element={<HomeLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>
    
          <Route path="/scenarios" element={<ScenarioLayout />}>
            <Route path="/scenarios" element={<ScenarioSelection />} />
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
      </Router>
    </QueryClientProvider>
  );
}

export default App;
