import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteInvite, getInvites, getMembers, sendInvite } from "src/services/flinkfast.service";
import { Invite, Invites, Members } from "src/models/account-management";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


export const Invitations: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [invites, setInvites] = useState<string[] | undefined>(undefined);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getInvitesCall = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getInvites(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setInvites(data.emails);
      }
      if (error) {
        console.log(error.message);
      }
    };

    getInvitesCall();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (email: string) => {
    handleMenuClose();
    const inviteToDelete: Invite = { email };
    const accessToken = await getAccessTokenSilently();
    const { error } = await deleteInvite(accessToken, inviteToDelete);
    if (error) {
      console.error(`Error deleting invite: ${error.message}`);
    } else {
      console.log(`Invite deleted successfully: ${email}`);

      setInvites(prevInvites => prevInvites?.filter((e) => e !== email) || []);
    }
  };

  const handleInviteUser = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSend = async (email: string) => {
    const inviteToSend: Invite = { email };
    const accessToken = await getAccessTokenSilently();
    const { error } = await sendInvite(accessToken, inviteToSend);
    if (error) {
      console.error(`Error sending invite: ${error.message}`);
    } else {
      console.log(`Invite sent successfully: ${email}`);

      setInvites((prevInvites) => [...(prevInvites ?? []), email]);
    }
  }

  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">
                Invitations
              </Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <Button variant="contained" onClick={handleInviteUser}>Invite User</Button>
              <InviteUserModal open={isModalOpen} onClose={handleCloseModal} onSend={handleSend} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontWeight: "bold",
              },
            }}
          >
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invites !== undefined ? (
            invites.map((email) => (
              <TableRow key={email}>
                <TableCell>{email}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={(e) => handleDelete(email)}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} sx={{ textAlign: 'center', py: 2 }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};


const InviteUserModal: React.FC<{ open: boolean; onClose: () => void, onSend: (email: string) => void }> = ({ open, onClose, onSend }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(newEmail));
  };

  const handleCancel = () => {
    onClose();
    setEmail('');
    setValidEmail(false);
  };

  const handleSend = async () => {
    console.log(`Sending invitation to ${email}`);
    onSend(email);
    onClose();
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
