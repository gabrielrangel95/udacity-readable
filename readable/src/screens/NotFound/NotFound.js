import React from 'react';
import './NotFound.css';

const image = require('../../resources/img/notfound.png');

const NotFound = () => (
  <div className="div-not-found">
    <h1 className="title-not-found">404 Not Found</h1>
    <img src={image} alt="NotFound" width={500} />
  </div>
);

export { NotFound };
