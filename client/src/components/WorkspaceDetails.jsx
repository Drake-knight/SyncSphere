import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chat from './Chat'; 
import TableTask from './TableTask';
import CollaborativeEditor from './CollaborativeEditor';

const WorkspaceDetails = () => {
  const location = useLocation();
  const { workspace } = location.state;
  const [showChat, setShowChat] = useState(false); 
  const [showTasks, setShowTasks] = useState(false); 
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (workspace._id) {
      localStorage.setItem('selectedWorkspaceId', workspace._id);
    }
  }, [workspace]);

  const handleShowChat = () => {
    setShowChat(true);
    setShowTasks(false); 
    setShowEditor(false);
  }

  const handleShowTasks = () => {
    setShowTasks(true);
    setShowChat(false);
    setShowEditor(false); 
  };

  const handleShowEditor = () => {
    setShowChat(false);
    setShowTasks(false);
    setShowEditor(true);
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ fontSize: '2rem', color: '#4A5FBD', marginBottom: '30px' }}>
          {workspace.name} 
        </h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', color: '#FF5353', marginBottom: '5px' }}>Name:</label>
            <div style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #4A5FBD',
              backgroundColor: '#343849',
              fontSize: '1rem',
              color: 'white',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box'
            }}>
              {workspace.name}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
          <button
            style={{
              width: '300px', // Set width here
              padding: '10px',
              backgroundColor: showTasks ? '#4A5FBD' : '#FF5353',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={handleShowTasks}
          >
            Show Tasks
          </button>
          <button
            style={{
              width: '300px', // Set width here
              padding: '10px',
              backgroundColor: showChat ? '#4A5FBD' : '#FF5353',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={handleShowChat}
          >
            Open Chat
          </button>
          <button
            style={{
              width: '300px', // Set width here
              padding: '10px',
              backgroundColor: showEditor ? '#4A5FBD' : '#FF5353',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={handleShowEditor}
          >
            Open Editor
          </button>
        </div>

        <div style={{ marginTop: '30px' }}>
          {showTasks && <TableTask />}
          {showChat && <Chat />} 
          {showEditor && <CollaborativeEditor />}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDetails;
