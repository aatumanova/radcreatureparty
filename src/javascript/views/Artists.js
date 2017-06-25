import React, {Component} from 'react';

import creatureDefinitions from '../constants/creatureDefinitions';

class Artists extends Component {
  getGroupedCreatures() {
    const bodyParts = ['head', 'body', 'bottom'];

    return creatureDefinitions.reduce(
      (accumulator, creature, index) => {
        const {artist} = creature;
        const images = bodyParts.map(bodyPart => {
          const imageURI = creature[`${bodyPart}SmallURI`];
          const classes = (
            'creature-creator__body-part ' +
            `creature-creator__body-part--${bodyPart}`
          );

          return (
            <div className={classes} key={bodyPart}>
              <img alt={`Creature created by ${artist}`} src={imageURI} />
            </div>
          );
        });

        return accumulator.concat(
          <figure className="image-gallery__item" key={index} onClick={() => {
            this.props.history.push(
              `/creature-creator/${index}/${index}/${index}/`
            );
          }}>
            <div className="image-gallery__image">
              {images}
            </div>
            <figcaption className="image-gallery__caption">
              {artist}
            </figcaption>
          </figure>
        );
      },
      []
    );
  }

  render() {
    return (
      <div className="creature-creator__gallery image-gallery">
        {this.getGroupedCreatures()}
      </div>
    );
  }
}

export default Artists;
