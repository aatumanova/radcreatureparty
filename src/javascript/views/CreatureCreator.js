import React, {Component} from 'react';

import creatureDefinitions from '../constants/creatureDefinitions';
import ImageSlide from '../components/ImageSlide';
import ImageSlider from '../components/ImageSlider';
import PrintIcon from '../components/PrintIcon';
import RandomIcon from '../components/RandomIcon';

const bodyParts = ['head', 'body', 'bottom'];

class CreatureCreator extends Component {
  handleImageSlideNavigationClick = (getNextIndex, bodyPart) => {
    const {history, match} = this.props;
    const currentBodyPartIndex = Number(match.params[`${bodyPart}ID`]);
    const bodyPartIDPosition = bodyParts.indexOf(bodyPart);
    const urlParts = match.url.split('/');

    // Replace the currently selected body part index with the next one.
    urlParts[bodyPartIDPosition + 2] = getNextIndex(currentBodyPartIndex);

    history.replace(urlParts.join('/'));
  };

  handleNextSlideClick = this.handleImageSlideNavigationClick.bind(
    this,
    this.getNextIndex
  );

  handlePreviousSlideClick = this.handleImageSlideNavigationClick.bind(
    this,
    this.getPreviousIndex
  );

  handlePrintClick() {
    global.print();
  }

  handleRandomClick = () => {
    const maxIndex = creatureDefinitions.length;
    const parts = bodyParts.reduce(
      (accumulator, bodyPart) => {
        accumulator[bodyPart] = Math.floor(Math.random() * maxIndex);

        return accumulator;
      },
      {}
    );

    this.props.history.replace(
      `/creature-creator/${parts.head}/${parts.body}/${parts.bottom}/`
    );
  };

  getNextIndex(currentBodyPartIndex) {
    return currentBodyPartIndex === creatureDefinitions.length - 1
      ? 0
      : currentBodyPartIndex + 1;
  }

  getPreviousIndex(currentBodyPartIndex) {
    return currentBodyPartIndex === 0
      ? creatureDefinitions.length - 1
      : currentBodyPartIndex - 1
  }

  getBodyPartSlider(bodyPart, imageURIs) {
    const classes = (
      `creature-creator__body-part creature-creator__body-part--${bodyPart}`
    );
    const activeID = Number(this.props.match.params[`${bodyPart}ID`] || 0);

    return (
      <div className={classes} key={bodyPart}>
        <ImageSlider activeIndex={activeID}
          onNextClick={this.handleNextSlideClick}
          onPreviousClick={this.handlePreviousSlideClick}
          id={bodyPart}>
          {imageURIs.map((uri, index) => {
            return <ImageSlide key={index} uri={uri} />;
          })}
        </ImageSlider>
      </div>
    );
  }

  getBodyPartSliders() {
    const bodyPartURIs = creatureDefinitions.reduce(
      (accumulator, creature) => {
        accumulator.head.push(creature.headURI);
        accumulator.body.push(creature.bodyURI);
        accumulator.bottom.push(creature.bottomURI);

        return accumulator;
      },
      bodyParts.reduce((accumulator, bodyPart) => {
        accumulator[bodyPart] = [];

        return accumulator;
      }, {})
    );

    return Object.keys(bodyPartURIs).map(bodyPart => {
      return this.getBodyPartSlider(bodyPart, bodyPartURIs[bodyPart]);
    });
  }

  render() {

    return (
      <div className="creature-creator">
        <section className="creature-creator__creature">
          {this.getBodyPartSliders()}
        </section>
        <section className="creature-creator__toolbar">
          <div className="creature-creator__toolbar__content creature-creator__toolbar__content--secondary">
            <button className="creature-creator__toolbar__action creature-creator__toolbar__action--print"
              onClick={this.handlePrintClick}>
              <PrintIcon />
            </button>
            <button className="creature-creator__toolbar__action creature-creator__toolbar__action--randomize"
              onClick={this.handleRandomClick}>
              <RandomIcon />
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default CreatureCreator;
