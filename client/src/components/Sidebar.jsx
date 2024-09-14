import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskIcon from '@mui/icons-material/Task';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import VideoCall from '@mui/icons-material/VideoCall';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Sidebar.css';

const Sidebar = ({ onTaskClick }) => {
    const handleLogout = () => {
        console.log('Logout button clicked');
    };

    return (
        <Drawer
            anchor={"left"}
            open={true}
            variant="permanent"
        >
            <Box
                className='sidebar'
                role="presentation"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderRight: '1px solid #4A5FBD'
                }}
            >
                {/* Profile Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 2,
                        backgroundColor: '#0B051D',
                        color: 'white'
                    }}
                >
                    <Avatar
                        alt="Profile Picture"
                        sx={{ width: 35, height: 35, marginRight: 2 }}
                    />
                    <Typography variant="h6" className="profile-name">Tejas</Typography>
                </Box>

                <Divider />

                {/* Navigation Items */}
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#4A5FBD',
                                },
                                color: 'white',
                            }}
                            onClick={onTaskClick} // Pass the click handler
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <TaskIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Task"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#4A5FBD',
                                },
                                color: 'white',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Chat"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#4A5FBD',
                                },
                                color: 'white',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Document"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#4A5FBD',
                                },
                                color: 'white',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <VideoCall />
                            </ListItemIcon>
                            <ListItemText primary={"Video Call"} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                {/* Logout Button */}
                <Box sx={{ marginTop: 'auto', padding: 2 }}>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<ExitToAppIcon />}
                        fullWidth
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
