import React from 'react';
import { withRouter } from 'react-router-dom';

class NavigateButton extends React.Component {
  handleClick = () => {
    this.props.history.push('/landing');
  };

  render() {
    return (
      <div className="mt-12">
        <button
          onClick={this.handleClick}
          className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-emerald-400 active:bg-lightBlue-600 uppercase text-sm shadow hover:bg-emerald-00 hover:shadow-lg ease-linear transition-all duration-150"
        >
          Try it Now
        </button>
      </div>
    );
  }
}

export default withRouter(NavigateButton);
