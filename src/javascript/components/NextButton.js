import PropTypes from 'prop-types';
import React, {Component} from 'react';

class NextButton extends Component {
  static propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func
  };

  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    return (
      <button className="image-slider__navigation image-slider__navigation--next"
        onClick={this.handleClick}>
        Next
      </button>
    );
  }
}

export default NextButton;
