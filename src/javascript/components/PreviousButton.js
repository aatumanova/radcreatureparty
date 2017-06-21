import PropTypes from 'prop-types';
import React, {Component} from 'react';

class PreviousButton extends Component {
  static propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func
  };

  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    return (
      <button className="image-slider__navigation image-slider__navigation--prev"
        onClick={this.handleClick}>
        Previous
      </button>
    );
  }
}

export default PreviousButton;
