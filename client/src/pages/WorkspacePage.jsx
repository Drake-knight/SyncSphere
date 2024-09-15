import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../components/Sidebar';

const WorkspacePage = () => {
  const { workspaceId } = useParams();

  const workspace = {
    name: `Workspace ${workspaceId}`,
    purpose: `Purpose of workspace ${workspaceId}`,
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/> 
      <Box sx={{ flex: 1, padding: 2 }}>
            <Typography variant="h4">Workspace Details</Typography>
            <Typography variant="h6">Name: {workspace.name}</Typography>
      </Box>
    </div>
  );
};

export default WorkspacePage;
