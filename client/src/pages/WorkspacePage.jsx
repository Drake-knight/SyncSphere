// src/pages/WorkspacePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../components/Sidebar'; // Assume you have a Sidebar component

const WorkspacePage = () => {
  const { workspaceId } = useParams();
  // Fetch or use the workspaceId to get workspace details
  // For simplicity, we're using a placeholder workspace

  const workspace = {
    name: `Workspace ${workspaceId}`,
    purpose: `Purpose of workspace ${workspaceId}`,
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Add your sidebar component here */}
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h4">Workspace Details</Typography>
        <Typography variant="h6">Name: {workspace.name}</Typography>
        <Typography variant="body1">Purpose: {workspace.purpose}</Typography>
      </Box>
    </div>
  );
};

export default WorkspacePage;
