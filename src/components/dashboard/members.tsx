import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Member } from "src/models/account-management";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteMember, getMembers } from "src/services/flinkfast.service";


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const Members: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [members, setMembers] = useState<Member[] | undefined>(undefined);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMembersCall = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getMembers(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMembers(data.members);
      }
      if (error) {
        console.log(error.message);
      }
    };

    getMembersCall();

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
    console.log(`Deleting member: ${email}`);
    const memberToDelete: Member = { email };
    const accessToken = await getAccessTokenSilently();
    const { error } = await deleteMember(accessToken, memberToDelete);
    if (error) {
      console.error(`Error deleting member: ${error.message}`);
    } else {
      console.log(`Member deleted successfully: ${email}`);

      setMembers(prevMembers => prevMembers?.filter((e) => e.email !== email) || []);
    }
  };


  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>
                <Typography variant="h5">
                    Members
                </Typography>
            </TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ textAlign: "right" }}>
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
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members !== undefined ? (
            members.map((member) => (
            <TableRow key={member.email}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={e => handleDelete(member.email)}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          )) 
          ) : (
            <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: 'center', py: 2 }}>
                <CircularProgress />
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
