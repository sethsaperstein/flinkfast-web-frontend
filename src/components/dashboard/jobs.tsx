import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteJob, getJobs } from 'src/services/flinkfast.service';
import { DeleteJobData, Job } from 'src/models/jobs';
import CircularProgress from '@mui/material/CircularProgress';


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const Jobs: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getJobsCall = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getJobs(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setJobs(data.jobs);
      }
      if (error) {
        console.log(error.message);
      }
    };

    getJobsCall();

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

  const handleDelete = async (jobName: string, version: number) => {
    handleMenuClose();
    const jobToDelete: DeleteJobData = {
      name: jobName,
      version: version
    };
    const accessToken = await getAccessTokenSilently();
    const { error } = await deleteJob(accessToken, jobToDelete);
    if (error) {
      console.error(`Error deleting job: ${error.message}`);
    } else {
      console.log(`Job deleted successfully: ${jobName}`);
      
      setJobs(prevJobs => prevJobs?.filter((e) => (e.name !== jobName && e.version !== version)) || []);
    }
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
          {jobs !== undefined ? (
            jobs.map((job) => (
              <TableRow key={`${job.name}_${job.version}`}>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.version}</TableCell>
                <TableCell>{job.createdUTCISO}</TableCell>
                <TableCell>{job.state}</TableCell>
                <TableCell>{job.targetState}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={(e) => handleDelete(job.name, job.version)}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: 'center', py: 2 }}>
                <CircularProgress />
              </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}