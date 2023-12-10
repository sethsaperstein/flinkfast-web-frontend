import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Title } from './title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface SpendProps {
  forecast: string
}

export function Spend({ forecast }: SpendProps) {
  return (
    <React.Fragment>
      <Typography color="text.secondary">
        Current month's total forecast
      </Typography>
      <Typography component="p" variant="h4">
        USD ${forecast}
      </Typography>
    </React.Fragment>
  );
}

interface JobCountProps {
  count: number
}

export function JobCount({ count }: JobCountProps) {
  return (
    <React.Fragment>
      <Typography color="text.secondary">
        Current month's total running jobs
      </Typography>
      <Typography component="p" variant="h4">
        {count}
      </Typography>
    </React.Fragment>
  );
}

interface ProcessingUnitsProps {
  units: number
}

export function ProcessingUnits({ units }: ProcessingUnitsProps) {
  return (
    <React.Fragment>
      <Typography color="text.secondary">
        Current month's total processing unit hours
      </Typography>
      <Typography component="p" variant="h4">
        {units}
      </Typography>
    </React.Fragment>
  );
}