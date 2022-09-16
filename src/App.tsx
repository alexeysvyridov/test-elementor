import React from 'react';
import './App.css';
import { Home } from './Components/Home';
import ErrorBoundary from './Components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="App">
          <Home />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
