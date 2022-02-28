import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    img: require('../../static/img/celts.png').default,
    description: (
      <>
        Create applications with the tried and tested API of
        express.js
      </>
    ),
  },
  {
    title: 'One Syntax',
    img: require('../../static/img/celts1.jpg').default,
    description: (
      <>
        Use a single syntax to build RESTful APIs and web applications
      </>
    ),
  },
  {
    title: 'Extendable',
    img: require('../../static/img/celts2.jpg').default,
    description: (
      <>
        Leverage existing middlewares or create your own
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={img} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
