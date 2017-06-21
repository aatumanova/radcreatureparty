import PropTypes from 'prop-types';
import React, {Component} from 'react';

import NextButton from './NextButton';
import PreviousButton from './PreviousButton';

class ImageSlider extends Component {
  static propTypes = {
    offsetLength: PropTypes.number,
    activeIndex: PropTypes.number
  };

  static defaultProps = {
    offsetLength: 4,
    activeIndex: 0
  };

  getChildren() {
    const {activeIndex} = this.props;
    const childCount = this.props.children.length;

    return React.Children.map(
      this.props.children,
      (child, childIndex) => {
        const offset = this.getOffset({activeIndex, childIndex, childCount});

        const isSlideActive = childIndex === activeIndex;
        const isSlideNext = offset === 1;
        const isSlidePrevious = offset === -1;

        return React.cloneElement(
          child,
          {
            index: childIndex,
            offset,
            offsetLength: this.props.offsetLength,
            isSlideActive,
            isSlideNext,
            isSlidePrevious
          }
        );
      }
    );
  }

  getOffset(options) {
    const {offsetLength} = this.props;
    const {activeIndex, childIndex, childCount} = options;
    const indexDiff = childIndex - activeIndex;

    // Do we need to "wrap" our offsets to the end of the slider items?
    if (activeIndex - offsetLength < 0) {
      const amountToGrabFromEnd = offsetLength - activeIndex;
      const distanceFromEnd = childCount - childIndex;

      if (distanceFromEnd <= amountToGrabFromEnd) {
        return (offsetLength - amountToGrabFromEnd + distanceFromEnd) * -1;
      }
    }

    // Do we need to "wrap" our offsets to the beginning of the slider items?
    if (activeIndex + offsetLength > childCount - 1) {
      const amountToGrabFromBeginning = (
        activeIndex + 1 + offsetLength - childCount
      );
      const distanceFromBeginning = childIndex + 1;

      if (distanceFromBeginning <= amountToGrabFromBeginning) {
        return offsetLength - amountToGrabFromBeginning + distanceFromBeginning;
      }
    }

    return indexDiff;
  }

  render() {
    const {id, onNextClick, onPreviousClick} = this.props;

    return (
      <div className="image-slider">
        <NextButton id={id} onClick={onNextClick} />
        <PreviousButton id={id} onClick={onPreviousClick} />
        {this.getChildren()}
      </div>
    );
  }
}

export default ImageSlider;
