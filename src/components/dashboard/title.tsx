import * as React from 'react';
import Typography from '@mui/material/Typography';

interface Props {
    children: React.ReactNode;
}

export const Title: React.FC<Props> = ({ children }) => {
    return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}