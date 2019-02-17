import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  makeSelectGameInfo,
  makeSelectEvaluationResult,
  makeSelectCheatInfo
} from 'containers/App/selectors';
import { evaluateShot, getCheat } from 'containers/App/actions';
import GameTable from 'components/GameTable';

class GamePanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props) {
    super(props);

    const { gameInfo: { data: { rows, cols } } } = props;
    const gameData = rows.map(row => {
      const rowData = { id: row, cols: cols.map(col => ({ id: `${row}${col}`, value: '.' })) };

      return rowData;
    });
    const shotRow = null;
    const shotCol = null;
    const shot = '';

    this.state = { gameData, shotRow, shotCol, shot };
    window.show = this.getCheat;
  }

  componentDidUpdate({
    evaluationResult: prevEvaluationResult,
    cheatInfo: prevCheatInfo
  }) {
    const { evaluationResult, cheatInfo } = this.props;

    if (prevEvaluationResult.loading && !evaluationResult.loading) {
      this.updateGameDataByEvaluationResult();
    }

    if (prevCheatInfo.loading && !cheatInfo.loading) {
      this.updateGameDataByCheatInfo();
    }
  }

  updateGameDataByEvaluationResult = () => {
    const { evaluationResult } = this.props;

    if (evaluationResult.error) {
      return;
    }

    const { gameInfo: { data: { rows, cols } } } = this.props;
    const { shotRow, shotCol, gameData } = this.state;
    const { hit, repeat } = evaluationResult.data;
    const rowIndex = rows.indexOf(shotRow);
    const colIndex = cols.indexOf(shotCol);

    if (rowIndex < 0 || colIndex < 0 || repeat) {
      return;
    }

    if (hit) {
      gameData[rowIndex].cols[colIndex].value = 'X';
    } else {
      gameData[rowIndex].cols[colIndex].value = '_';
    }

    this.setState({ gameData });
  };

  updateGameDataByCheatInfo = () => {
    const { cheatInfo } = this.props;

    if (cheatInfo.error) {
      return;
    }

    const { gameInfo: { data: { rows, cols } } } = this.props;
    const { gameData } = this.state;
    const shipsCells = cheatInfo.data;

    rows.forEach((row, rowIndex) => {
      cols.forEach((col, colIndex) => {
        if (shipsCells.indexOf(`${row}${col}`) > -1) {
          gameData[rowIndex].cols[colIndex].value = 'X';
        }
      });
    });

    this.setState({ gameData });
  };

  getStatusMsg = () => {
    const { evaluationResult: { loading, error, data } } = this.props;

    if (error) {
      return `*** ${error.message} ***`;
    }

    if (loading || !data) {
      return '';
    }

    const { sunk, repeat, hit } = data;

    if (sunk) {
      return '*** Sunk ***';
    }

    if (repeat) {
      return '*** Repeated Shot! ***';
    }

    if (hit) {
      return '*** Hit! ***';
    }

    return '*** Miss! ***';
  };

  getResultMsg = () => {
    const { evaluationResult: { loading, error, data } } = this.props;

    if (error || loading || !data) {
      return '';
    }

    const { sunk, attempts } = data;

    if (sunk) {
      return `Well done! You completed the game in ${attempts} shots`;
    }

    return '';
  };

  handleShotChange = event => {
    const shot = event.target.value;

    this.setState({ shot });
  };

  evaluateShot = () => {
    const { evaluateShot, gameInfo: { data: { id } } } = this.props;
    const { shot } = this.state;
    const shotRow = shot[0];
    const shotCol = shot.substring(1);

    this.setState({
      shotRow,
      shotCol
    }, () => {
      evaluateShot({
        id,
        row: shotRow,
        col: shotCol
      });
    });
  };

  getCheat = () => {
    const { getCheat, gameInfo: { data: { id } } } = this.props;

    getCheat(id);
  };

  restartGame = () => this.props.history.push('/');

  render() {
    const {
      gameInfo: { data: { cols } },
      evaluationResult: { loading, data }
    } = this.props;
    const { gameData, shot } = this.state;
    const statusMsg = this.getStatusMsg();
    const resultMsg = this.getResultMsg();
    const completed = data && data.sunk;

    return (
      <Card className="card">
        <CardContent className="card-content">
          <div className="status-msg">
            {statusMsg}
          </div>
          <div className="game-table">
            <GameTable cols={cols} gameData={gameData} />
          </div>
          <div className="evaluate-shot">
            <span>Enter coordinates (row, col), e.g. A5: </span>
            <TextField
              className="form-control"
              id="shot"
              label=""
              value={shot}
              disabled={completed}
              onChange={this.handleShotChange}
              margin="normal"
            />
            {loading?
              <Button className="btn" variant="contained" color="primary" disabled={true}>Evaluating...</Button> :
              <Button className="btn" variant="contained" color="primary" disabled={completed} onClick={this.evaluateShot}>Submit</Button>
            }
            <Button className="btn" variant="contained" color="secondary" onClick={this.restartGame}>Restart Game</Button>
          </div>
          <div className="result-msg">
            {resultMsg}
          </div>
        </CardContent>
      </Card>
    );
  }

}

GamePanel.propTypes = {
  history: PropTypes.object.isRequired,
  gameInfo: PropTypes.object.isRequired,
  evaluationResult: PropTypes.object.isRequired,
  cheatInfo: PropTypes.object.isRequired,
  evaluateShot: PropTypes.func.isRequired,
  getCheat: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  gameInfo: makeSelectGameInfo(),
  evaluationResult: makeSelectEvaluationResult(),
  cheatInfo: makeSelectCheatInfo()
});

function mapDispatchToProps(dispatch) {
  return {
    evaluateShot: shot => {
      dispatch(evaluateShot(shot));
    },
    getCheat: gameId => {
      dispatch(getCheat(gameId));
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect
)(GamePanel);
