import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import your sidebar component

const WorkspaceDetails = () => {
  const location = useLocation();
  const { workspace } = location.state;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar style={{ flexShrink: 0 }} /> {/* Ensures sidebar does not shrink */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ fontSize: '2rem', color: '#4A5FBD', marginBottom: '30px' }}>Workspace Details</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', color: '#FF5353', marginBottom: '5px' }}>Name:</label>
            <div style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #4A5FBD',
              backgroundColor: '#343849',
              fontSize: '1rem',
              color: '#333',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box',
              color:'white'
            }}>
              {workspace.name}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', color: '#FF5353', marginBottom: '5px' }}>Purpose:</label>
            <div style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #4A5FBD',
              backgroundColor: '#343849',
              fontSize: '1rem',
              color: '#333',
              minHeight: '40px',
              width:'600px',
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box',
              color:'white',
            }}>
              {workspace.purpose}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDetails;
