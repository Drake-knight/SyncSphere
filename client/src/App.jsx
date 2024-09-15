import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WorkspaceContainer from './components/WorkspaceContainer';
import WorkspaceDetails from './components/WorkspaceDetails'; 
import Login from './pages/Login';
import Register from './pages/Register'; 
import './App.css'; 

import api from './utils/axios';

function App() {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspacePurpose, setWorkspacePurpose] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (isLoggedIn) {
      const fetchWorkspaces = async () => {
        setLoading(true);
        try {
          const response = await api.get('/workspace/list'); 
          setWorkspaces(response.data.workspaces);
        } catch (err) {
          console.error('Error fetching workspaces:', err);
          setError('Failed to load workspaces');
        } finally {
          setLoading(false);
        }
      };

      fetchWorkspaces();
    }
  }, [isLoggedIn]);

  const handleAddWorkspace = async () => {
    if (workspaceName.trim() && workspacePurpose.trim()) {
      try {
        const response = await api.post('/workspace/create', {
          name: workspaceName,
          purpose: workspacePurpose,
        });
        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, response.data.workspace]);
        setWorkspaceName('');
        setWorkspacePurpose('');
      } catch (error) {
        console.error('Error adding workspace:', error);
      }
    }
  };
  
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    console.log('Logged out');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div className="App">
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <div style={{ flex: 1, padding: '20px' }}>
                    <h1>SyncSphere</h1>
                    <div className="add-workspace-section">
                      <input
                        type="text"
                        placeholder="Enter workspace name"
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="workspace-input"
                      />
                      <button
                        className="add-workspace-button"
                        onClick={handleAddWorkspace}
                      >
                        Add Workspace
                      </button>
                    </div>
                    <WorkspaceContainer
                      workspaces={workspaces}
                      onLogout={handleLogout}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/workspace/:name"
          element={
            isLoggedIn ? (
              <div className='wspcD'>
                <h1>SyncSphere</h1>
                <WorkspaceDetails />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App