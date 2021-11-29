import './App.css';
import Login from './components/auth/Login';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Signup from './components/auth/Signup';
import AuthLayout from './components/layouts/AuthLayout';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
  );
}

export default App;
