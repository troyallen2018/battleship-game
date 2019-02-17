import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import pickBy from 'lodash/pickBy';
import injectSaga from 'utils/injectSaga';
import {
  SHIP_TYPES,
  MIN_ROWS_COUNT,
  MAX_ROWS_COUNT,
  MIN_COLS_COUNT,
  MAX_COLS_COUNT
} from 'utils/constants';
import { makeSelectGameInfo } from 'containers/App/selectors';
import { initializeGame } from 'containers/App/actions';
import saga from './saga';

import 'styles/containers/home.css';

class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      counts: {
        rowsCount: 10,
        colsCount: 10,
        carriersCount: 1,
        battleshipsCount: 2,
        cruisersCount: 0,
        destroyersCount: 0,
        submarinesCount: 0
      },
      validationMsg: {
        rowsCount: '',
        colsCount: '',
        carriersCount: '',
        battleshipsCount: '',
        cruisersCount: '',
        destroyersCount: '',
        submarinesCount: ''
      }
    };
  }

  componentDidUpdate({
    gameInfo: { loading: prevLoading, error: prevError }
  }) {
    const { history, gameInfo: { loading, error } } = this.props;

    if (prevError !== error && error) {
      return toastr.error('Game Initialization Error', 'Error occurred while trying to initialize game! Try again!');
    }

    if (prevLoading && !loading) {
      return history.push('/game');
    }
  }

  handleFieldChange = id => event => {
    const value = event.target.value;

    this.setState({
      counts: {
        ...this.state.counts,
        [id]: value
      }
    });
  };

  validateForm = () => {
    const { counts } = this.state;
    let valid = true;

    Object.entries(counts).forEach(([key, value]) => {
      const parsedValue = parseInt(value, 10);

      if (isNaN(value) || parsedValue < 0 || Math.round(parsedValue) !== parsedValue) {
        this.setState({
          validationMsg: {
            ...this.state.validationMsg,
            [key]: 'Please input non-negative integer only!'
          }
        });
        valid = false;
      } else if (key === 'rowsCount' && (parsedValue < MIN_ROWS_COUNT || parsedValue > MAX_ROWS_COUNT)) {
        this.setState({
          validationMsg: {
            ...this.state.validationMsg,
            rowsCount: 'Min of number of rows is 5 and max of it is 26'
          }
        });
        valid = false;
      } else if (key === 'colsCount' && (parsedValue < MIN_COLS_COUNT || parsedValue > MAX_COLS_COUNT)) {
        this.setState({
          validationMsg: {
            ...this.state.validationMsg,
            colsCount: 'Min of number of cols is 5 and max of it is 50'
          }
        });
        valid = false;
      }
    });

    return valid;
  };

  start = () => {
    if (!this.validateForm()) {
      return;
    }

    const { initializeGame } = this.props;
    const {      
      counts: {
        rowsCount,
        colsCount,
        carriersCount,
        battleshipsCount,
        cruisersCount,
        destroyersCount,
        submarinesCount
      }
    } = this.state;
    let shipsCounts = {
      [SHIP_TYPES.CARRIER]: parseInt(carriersCount, 10),
      [SHIP_TYPES.BATTLESHIP]: parseInt(battleshipsCount, 10),
      [SHIP_TYPES.CRUISER]: parseInt(cruisersCount, 10),
      [SHIP_TYPES.DESTROYER]: parseInt(destroyersCount, 10),
      [SHIP_TYPES.SUBMARINE]: parseInt(submarinesCount, 10)
    };

    shipsCounts = pickBy(shipsCounts, value => !!value);
    const config = { rowsCount, colsCount, shipsCounts };

    initializeGame(config);
  };

  render() {
    const { gameInfo: { loading } } = this.props;
    const {
      counts: {
        rowsCount,
        colsCount,
        carriersCount,
        battleshipsCount,
        cruisersCount,
        destroyersCount,
        submarinesCount
      },
      validationMsg
    } = this.state;
    const fields = [
      { id: 'rowsCount', label: 'Number of Rows', value: rowsCount },
      { id: 'colsCount', label: 'Number of Cols', value: colsCount },
      { id: 'carriersCount', label: 'Number of Carriers', value: carriersCount },
      { id: 'battleshipsCount', label: 'Number of Battleships', value: battleshipsCount },
      { id: 'cruisersCount', label: 'Number of Cruisers', value: cruisersCount },
      { id: 'destroyersCount', label: 'Number of Destroyers', value: destroyersCount },
      { id: 'submarinesCount', label: 'Number of Submarines', value: submarinesCount }
    ];
    const fieldsRendered = fields.map(field => (
      <TextField
        key={field.id}
        id={field.id}
        className="form-control"
        label={field.label}
        helperText={validationMsg[field.id]}
        value={field.value}
        onChange={this.handleFieldChange(field.id)}
        margin="normal"
      />
    ));

    return (
      <Card className="card home">
        <CardHeader className="card-header" title="Welcome to the Battleship game!" />
        <CardContent className="card-content">
          <h3>Please initialize game by configuring the values</h3>
          <form className="form" noValidate autoComplete="off">
            {fieldsRendered}
          </form>
        </CardContent>
        <CardActions className="card-actions">
          {loading?
            <Button variant="contained" color="primary" disabled={true}>Loading...</Button> :
            <Button variant="contained" color="primary" onClick={this.start}>Start</Button>
          }
        </CardActions>
      </Card>
    );
  }

}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  gameInfo: PropTypes.object.isRequired,
  initializeGame: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  gameInfo: makeSelectGameInfo()
});

export function mapDispatchToProps(dispatch) {
  return {
    initializeGame: config => dispatch(initializeGame(config))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withRouter,
  withSaga,
  withConnect
)(Home);
