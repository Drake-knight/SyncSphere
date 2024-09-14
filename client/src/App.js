import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkspaceContainer from './components/WorkspaceContainer';
import WorkspaceDetails from './components/WorkspaceDetails';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import ExitToAppIcon
import Login from './pages/Login'; // Import Login component
import './App.css'; // Import your styles
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function App() {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspacePurpose, setWorkspacePurpose] = useState('');

  useEffect(() => {
    const savedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    setWorkspaces(savedWorkspaces);
  }, []);

  useEffect(() => {
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  const handleAddWorkspace = () => {
    if (workspaceName.trim() && workspacePurpose.trim()) {
      setWorkspaces((prevWorkspaces) => [
        ...prevWorkspaces,
        { name: workspaceName, purpose: workspacePurpose }
      ]);
      setWorkspaceName('');
      setWorkspacePurpose('');
    }
  };

  const handleDeleteWorkspace = (index) => {
    const updatedWorkspaces = workspaces.filter((_, i) => i !== index);
    setWorkspaces(updatedWorkspaces);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logged out');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
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
                    <input
                      type="text"
                      placeholder="Enter Purpose"
                      value={workspacePurpose}
                      onChange={(e) => setWorkspacePurpose(e.target.value)}
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
                    onDelete={handleDeleteWorkspace}
                    onLogout={handleLogout}
                  />
                </div>
              </div>
            </div>
          }
        />
        <Route 
            path="/workspace/:name" 
              element={
                <div className='wspcD'>
                  <h1>SyncSphere</h1>
                <WorkspaceDetails />
                </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
