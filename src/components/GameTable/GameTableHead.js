import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const GameTableHead = ({ cols }) => {
  const colHeaders = cols.map(col => (<TableCell key={col}>{col}</TableCell>));

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {colHeaders}
      </TableRow>
    </TableHead>
  );
};

GameTableHead.propTypes = {
  cols: PropTypes.array.isRequired
};

export default GameTableHead;
