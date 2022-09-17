import React from 'react';
import './App.css';
import { Login } from './Components/Login';
import ErrorBoundary from './Components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import { Home } from './Components/Home';
import { PrivateRoute } from './Components/PrivateRoute';

function App() {
  return (
      <Router>
        <ErrorBoundary>
          <AuthProvider>
            <div className="App">
              <Routes>
                <Route path="*" element={
                  <PrivateRoute>
                    <Routes>
                      <Route path="/" element={<Home />} />
                    </Routes>
                  </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </AuthProvider>
        </ErrorBoundary>
    </Router>
  );
}

export default App;
