import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import GameTableBodyRow from './GameTableBodyRow';

const GameTableBody = ({ gameData }) => {
  const rows = gameData.map(row => (<GameTableBodyRow key={row.id} cols={row.cols} rowId={row.id} />));

  return (
    <TableBody>
      {rows}
    </TableBody>
  );
};

GameTableBody.propTypes = {
  gameData: PropTypes.array.isRequired
};

export default GameTableBody;
