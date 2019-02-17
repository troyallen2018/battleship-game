import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const GameTableBodyRow = ({ cols, rowId }) => {
  const rowCols = cols.map(col => (<TableCell key={col.id}>{col.value}</TableCell>));

  return (
    <TableRow>
      <TableCell>{rowId}</TableCell>
      {rowCols}
    </TableRow>
  );
};

GameTableBodyRow.propTypes = {
  cols: PropTypes.array.isRequired,
  rowId: PropTypes.string.isRequired
};

export default GameTableBodyRow;
