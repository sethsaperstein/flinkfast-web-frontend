import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Title } from './title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export function Spend() {
  return (
    <React.Fragment>
      <Typography color="text.secondary">
        Current month's total forecast
      </Typography>
      <Typography component="p" variant="h4">
        USD $3,024.00
      </Typography>
    </React.Fragment>
  );
}

export function JobCount() {
  return (
    <React.Fragment>
      <Typography color="text.secondary">
        Current month's total running jobs
      </Typography>
      <Typography component="p" variant="h4">
        14
      </Typography>
    </React.Fragment>
  );
}

export function ProcessingUnits() {
  return (
    <React.Fragment>
      <Typography color="text.secondary">
        Current month's total processing unit hours
      </Typography>
      <Typography component="p" variant="h4">
        1020
      </Typography>
    </React.Fragment>
  );
}