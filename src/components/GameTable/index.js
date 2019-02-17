import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import GameTableHead from './GameTableHead';
import GameTableBody from './GameTableBody';

const GameTable = ({ cols, gameData }) => (
  <Table>
    <GameTableHead cols={cols}></GameTableHead>
    <GameTableBody gameData={gameData}></GameTableBody>
  </Table>
);

GameTable.propTypes = {
  cols: PropTypes.array.isRequired,
  gameData: PropTypes.array.isRequired
};

export default GameTable;
