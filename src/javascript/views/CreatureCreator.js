import React, {Component} from 'react';

import ImageSlide from '../components/ImageSlide';
import ImageSlider from '../components/ImageSlider';
import creatureDefinitions from '../constants/creatureDefinitions';
import PrintIcon from '../components/PrintIcon';
import RandomIcon from '../components/RandomIcon';

class CreatureCreator extends Component {
  constructor() {
    super();

    this.state = {
      headIndex: 0,
      bodyIndex: 0,
      bottomIndex: 0
    };
  }

  handleNextClick = (bodyPart) => {
    const indexKey = `${bodyPart}Index`;
    const currentIndex = this.state[indexKey];

    this.setState({
      [indexKey]: currentIndex === creatureDefinitions.length - 1
        ? 0
        : currentIndex + 1
    });
  };

  handlePreviousClick = (bodyPart) => {
    const indexKey = `${bodyPart}Index`;
    const currentIndex = this.state[indexKey];

    this.setState({
      [indexKey]: currentIndex === 0
        ? creatureDefinitions.length - 1
        : currentIndex - 1
    });
  };

  handlePrintClick() {
    global.print();
  }

  handleRandomClick = () => {
    const nextState = ['head', 'body', 'bottom'].reduce(
      (accumulator, bodyPart) => {
        const maxIndex = creatureDefinitions.length;
        accumulator[`${bodyPart}Index`] = Math.floor(Math.random() * maxIndex);

        return accumulator;
      },
      {}
    );

    this.setState(nextState);
  };

  getBodyPartSlider(id, imageURIs) {
    const classes = (
      `creature-creator__body-part creature-creator__body-part--${id}`
    );

    return (
      <div className={classes} key={id}>
        <ImageSlider activeIndex={this.state[`${id}Index`]}
          onNextClick={this.handleNextClick}
          onPreviousClick={this.handlePreviousClick}
          id={id}>
          {imageURIs.map((uri, index) => {
            return <ImageSlide key={index} uri={uri} />;
          })}
        </ImageSlider>
      </div>
    );
  }

  getBodyPartSliders() {
    const bodyParts = creatureDefinitions.reduce(
      (accumulator, creature) => {
        accumulator.head.push(creature.headURI);
        accumulator.body.push(creature.bodyURI);
        accumulator.bottom.push(creature.bottomURI);

        return accumulator;
      }, {head: [], body: [], bottom: []});

    return Object.keys(bodyParts).map(bodyPart => {
      return this.getBodyPartSlider(bodyPart, bodyParts[bodyPart]);
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
