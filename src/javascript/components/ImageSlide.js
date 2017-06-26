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

    let smallImageURI = null;
    let largeImageURI = null;

    if (Math.abs(props.offset) < 2) {
      smallImageURI = props.smallURI;
    }

    if (props.offset === 0) {
      largeImageURI = props.largeURI;
    }

    return (
      <div className={classes} style={style}>
        <img alt=""
          className="image-slider__image image-slider__image--small"
          src={smallImageURI} />
        <img alt=""
          className="image-slider__image image-slider__image--large"
          src={largeImageURI} />
      </div>
    );
  }
}

export default ImageSlide;
