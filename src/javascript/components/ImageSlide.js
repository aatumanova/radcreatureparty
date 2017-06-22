import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class ImageSlide extends Component {
  static propTypes = {
    offsetCount: PropTypes.number,
    isSlideActive: PropTypes.bool,
    isSlideNext: PropTypes.bool,
    isSlidePrevious: PropTypes.bool
  };

  render() {
    const {props} = this;
    const slideOffset = props.offset === 0
      ? 0
      : 25 * props.offset / Math.abs(props.offset);
    const slideScale = props.offset === 0
      ? 1
      : 0.8;
    const classes = classnames(
      'image-slider__slide',
      {
        'image-slider__slide--is-active': props.isSlideActive,
        'image-slider__slide--is-next': props.isSlideNext,
        'image-slider__slide--is-previous': props.isSlidePrevious
      }
    );
    const style = {
      zIndex: props.isSlideActive ? 2 : 1,
      transform: `scale(${slideScale}) translateX(${slideOffset}%)`
    };

    return (
      <div className={classes} style={style}>
        <img alt="" className="image-slider__image" src={props.uri} />
      </div>
    );
  }
}

export default ImageSlide;
