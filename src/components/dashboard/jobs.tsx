import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';


function createData(
  name: string,
  version: number,
  created: string,
  state: string,
  targetState: string,
) {
  return { name, version, created, state, targetState };
}

const rows = [
  createData(
    'test1',
    1,
    'an hour ago',
    'Running',
    'Running',
  ),
  createData(
    'test2',
    2,
    'an hour ago',
    'Stopped',
    'Stopped',
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const Jobs: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStart = () => {
    // Handle start action
    handleMenuClose();
  };

  const handleStop = () => {
    // Handle stop action
    handleMenuClose();
  };
  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow 
           sx={{
            "& th": {
              fontWeight: "bold"
            }
          }}
          >
            <TableCell>Name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Target State</TableCell>
            <TableCell sx={{ textAlign: 'right' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`${row.name}_${row.version}`}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.version}</TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.targetState}</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleStart}>Start</MenuItem>
                  <MenuItem onClick={handleStop}>Stop</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}