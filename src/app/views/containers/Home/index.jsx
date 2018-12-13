import React from 'react';

import { connect } from 'react-redux';

class HomeContainer extends React.Component {
  render() {
    return (
      <h1>Home page</h1>
    );
  }
}

export default connect()(HomeContainer);
