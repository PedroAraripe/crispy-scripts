import React, { Component } from 'react';
export default class WrapperContent extends Component {

  render() {
    return (
      <div className='container bg-dark py-4' style={{borderRadius: '10px'}}>
        <div className="p-2 p-lg-4">
          {this.props.children}
        </div>
      </div>
    )
  }
}