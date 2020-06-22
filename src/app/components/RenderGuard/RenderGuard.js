import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const RenderGuard = props => {
  const { children, renderIf } = props;

  return <Fragment>{renderIf ? children : null}</Fragment>;
};

RenderGuard.propTypes = {
  children: PropTypes.node,
  renderIf: PropTypes.bool
};

RenderGuard.defaultProps = {
  renderIf: false
};

export default RenderGuard;
