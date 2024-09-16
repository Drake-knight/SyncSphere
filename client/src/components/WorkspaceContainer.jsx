import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import api from '../utils/axios'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkspaceContainer = ({ workspaces, onLogout }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [token, setToken] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleGoToWorkspace = (workspace) => {
    navigate(`/workspace/${workspace.name}`, { state: { workspace } });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setToken('');
    setErrorMessage('');
  };

  const handleJoinWorkspace = async () => {
    setIsJoining(true);
    setErrorMessage('');
    try {
      await api.post('/workspace/join', { token });
      handleCloseDialog();
      window.location.reload();
      toast.success('Joined workspace successfully', { className: 'toast-custom' });
    } catch (error) {
      console.error('Error joining workspace:', error);
      setErrorMessage('Failed to join workspace. Please check the token and try again.');
      toast.error('Failed to join workspace. Please check the token and try again.', { className: 'toast-custom' });
    } finally {
      setIsJoining(false);
    }
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
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenDialog}
          sx={{ marginTop: 3 }}
        >
          Join Workspace
        </Button>
      </div>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          padding: 0,
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

      <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ sx: { backgroundColor: '#0b051d', color: 'white' } }}>
        <DialogTitle sx={{ backgroundColor: '#0b051d', color: 'white' }}>Join Workspace</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#0b051d', color: 'white' }}>
          <TextField
            fullWidth
            margin="dense"
            label="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' ,border:'1px solid #4A5FBD'} }}
          />
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#0b051d', color: 'white' }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleJoinWorkspace}
            color="primary"
            disabled={isJoining}
          >
            {isJoining ? 'Joining...' : 'Join Workspace'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkspaceContainer;