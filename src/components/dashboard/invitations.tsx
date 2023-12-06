import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { InviteUserModal } from "./invite-user-modal";

function createData(email: string) {
  return { email };
}

const rows = [createData("sethsaps@gmail.com"), createData("foobar@gmail.com")];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const Invitations: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Handle start action
    handleMenuClose();
  };

  const handleInviteUser = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Invitations</TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <Button variant="contained" onClick={handleInviteUser}>Invite User</Button>
              <InviteUserModal open={isModalOpen} onClose={handleCloseModal} />
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
          {rows.map((row) => (
            <TableRow key={row.email}>
              <TableCell>{row.email}</TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
