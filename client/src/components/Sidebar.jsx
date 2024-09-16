import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import api from '../utils/axios'; 
import './Sidebar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [inviteCode, setInviteCode] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isGeneratingInvite, setIsGeneratingInvite] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logout button clicked');
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userName");
        window.location.reload();
        toast.info('Logged out successfully', { className: 'toast-custom' });
    };

    const handleInviteClick = async () => {
        setIsGeneratingInvite(true);
        setErrorMessage('');
        try {
            const workspaceId = localStorage.getItem('selectedWorkspaceId');
            const response = await api.post('/workspace/invite', { workspaceId, email });
            setInviteCode(response.data.token || ''); 
            setErrorMessage(''); 
            toast.success('Invite code generated successfully', { className: 'toast-custom' });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setErrorMessage('User not registered');
                    toast.error('User not registered', { className: 'toast-custom' });
                } else if (error.response.status === 400 && error.response.data.message === 'User is already a member') {
                    setErrorMessage('User is already a member');
                    toast.error('User is already a member', { className: 'toast-custom' });
                } else {
                    console.error('Error generating invite code:', error);
                    setErrorMessage('An error occurred. Please try again later.');
                    toast.error('An error occurred. Please try again later.', { className: 'toast-custom' });
                }
            } else {
                console.error('Error generating invite code:', error);
                setErrorMessage('An error occurred. Please try again later.');
                toast.error('An error occurred. Please try again later.', { className: 'toast-custom' });
            }
        } finally {
            setIsGeneratingInvite(false);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setInviteCode(''); 
        setEmail(''); 
        setErrorMessage('');
    };

    const handleCopyInviteCode = () => {
        navigator.clipboard.writeText(inviteCode);
        toast.success('Invite code copied to clipboard', { className: 'toast-custom' });
    };

    const handleBack = () => {
        navigate('/');
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
                    <Typography variant="h6" className="profile-name">{userName}</Typography>
                </Box>

                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </Box>

                <Box sx={{ padding: 2, textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleOpenDialog}
                    >
                        Invite to Workspace
                    </Button>
                </Box>

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

            <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ sx: { backgroundColor: '#0b051d', color: 'white' } }}>
                <DialogTitle sx={{ backgroundColor: '#0b051d', color: 'white' }}>Invite to Workspace</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#0b051d', color: 'white' }}>
                    {!inviteCode ? (
                        <Box>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' ,border:'1px solid #4A5FBD'} }}
                            />
                            {errorMessage && (
                                <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <Button
                                onClick={handleInviteClick}
                                color="primary"
                                disabled={isGeneratingInvite}
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                {isGeneratingInvite ? 'Generating...' : 'Generate Invite Code'}
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Invite Code:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, border: '1px solid #4A5FBD', borderRadius: 1 }}>
                                <Tooltip title={inviteCode}>
                                    <Typography variant="body1" color="white" noWrap>
                                        {inviteCode}
                                    </Typography>
                                </Tooltip>
                                <IconButton onClick={handleCopyInviteCode} sx={{ marginLeft: 1 }}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#0b051d', color: 'white' }}>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Drawer>
    );
};

export default Sidebar;