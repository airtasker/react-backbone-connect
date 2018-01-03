import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { CONTEXT_KEY } from './const';
import shallowEqual from './utils/shallowEqual'; 

export default class Provider extends PureComponent {
  static childContextTypes = {
    [CONTEXT_KEY]: PropTypes.object,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    store: PropTypes.object
  };

  getChildContext() {
    return { [CONTEXT_KEY]: this.props.store };
  }

  render() {
    return this.props.children;
  }
}
