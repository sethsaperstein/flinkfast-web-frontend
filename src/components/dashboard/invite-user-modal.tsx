import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export const InviteUserModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Validate email format (you can implement your own validation logic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(newEmail));
  };

  const handleCancel = () => {
    onClose();
    // Reset the form state if needed
    setEmail('');
    setValidEmail(false);
  };

  const handleSend = () => {
    // Handle sending the email (you can implement your own logic)
    console.log(`Sending invitation to ${email}`);
    onClose();
    // Reset the form state if needed
    setEmail('');
    setValidEmail(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Invite your teammates to collaborate!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Great teams build great data pipelines. Bring your team along for the ride.
        </DialogContentText>
        <Divider />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSend} color="primary" disabled={!isValidEmail}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
