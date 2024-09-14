import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../components/Sidebar';
import TaskTable from '../components/TaskTable';

const WorkspacePage = () => {
  const { workspaceId } = useParams();
  const [activeView, setActiveView] = useState('workspace'); // Default to showing workspace details

  const workspace = {
    name: `Workspace ${workspaceId}`,
    purpose: `Purpose of workspace ${workspaceId}`,
  };

  const handleTaskClick = () => {
    setActiveView('task');
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onTaskClick={handleTaskClick} /> 

      {/* Main content */}
      <Box sx={{ flex: 1, padding: 2 }}>
        {activeView === 'workspace' && (
          <>
            {/* Display workspace details */}
            <Typography variant="h4">Workspace Details</Typography>
            <Typography variant="h6">Name: {workspace.name}</Typography>
            <Typography variant="body1">Purpose: {workspace.purpose}</Typography>
          </>
        )}

        {activeView === 'task' && (
          <TaskTable />
        )}
      </Box>
    </div>
  );
};

export default WorkspacePage;
