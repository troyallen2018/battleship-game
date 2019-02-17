import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectGameInfo } from 'containers/App/selectors';
import GamePanel from 'components/GamePanel';
import saga from './saga';

import 'styles/containers/game.css';

class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { history, gameInfo: { error, data } } = this.props;

    if (error || !data) {
      history.push('/');
    }
  }

  render() {
    const { gameInfo: { error, data } } = this.props;

    if (error | !data) {
      return null;
    }

    return (
      <div className="game">
        <GamePanel />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.object.isRequired,
  gameInfo: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  gameInfo: makeSelectGameInfo()
});

const withConnect = connect(mapStateToProps, null);
const withSaga = injectSaga({ key: 'game', saga });

export default compose(
  withRouter,
  withSaga,
  withConnect
)(Game);
