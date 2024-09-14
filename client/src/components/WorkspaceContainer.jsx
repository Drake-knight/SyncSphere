import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const WorkspaceContainer = ({ workspaces, onDelete, onLogout }) => {
  const navigate = useNavigate();
  
console.log(workspaces);

const names = workspaces.map(workspace => workspace.name);
console.log(names);
  const handleGoToWorkspace = (workspace) => {
    navigate(`/workspace/${workspace.name}`, { state: { workspace } });
  };

  return (
    <div style={{ paddingBottom: '60px' }}> 
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Your Workspaces
        </Typography>
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 2,
            flexWrap: 'wrap',
            marginTop: 2,
          }}
        >
          {workspaces.map((workspace, index) => (
            <Box
              key={index}
              sx={{
                padding: 2,
                backgroundColor: '#fff',
                width: '250px',
                height: '200px',
                textAlign: 'center',
                borderRadius: 1,
                border: '2px solid #4A5FBD',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: 3,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflowWrap: 'break-word',
              }}
            >
              <div style={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: '#333', marginBottom: 1 }}>
                  Name: {workspace.name}
                </Typography>
              </div>
              <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1 }}
                  onClick={() => handleGoToWorkspace(workspace)}
                >
                  Go to Workspace
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ flex: 1 }}
                  onClick={() => onDelete(index)}
                >
                  Delete Workspace
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </div>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          padding:0,
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#FF5353', 
          boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<ExitToAppIcon />}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default WorkspaceContainer;


  
