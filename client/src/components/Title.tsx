import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const Title = (props: { children: ReactNode }) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
