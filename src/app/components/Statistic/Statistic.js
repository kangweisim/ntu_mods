import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

const Statistic = props => {
  const { title, subtitle } = props;

  return (
    <Card>
      <CardContent>
        <Typography align="center" variant="h2">{title}</Typography>
        <Typography align="center" variant="h6">{subtitle}</Typography>
      </CardContent>
    </Card>
  )
};

export default Statistic;
