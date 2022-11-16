import React, { Component } from 'react';
export default class WrapperContent extends Component {

  render() {
    return (
      <div className='container bg-dark p-2 py-4 p-lg-4' style={{borderRadius: '10px'}}>
        {this.props.children}
      </div>
    )
  }
}