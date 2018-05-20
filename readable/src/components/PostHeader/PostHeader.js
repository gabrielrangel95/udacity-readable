import React from 'react';

import { List } from 'antd';
import './PostHeader.css';

const PostHeader = () => (
  <List.Item>
    <div className="title-categorie">
      <span>Category</span>
    </div>
    <div className="title-description">
      <span>Description</span>
    </div>
    <div className="title-details">
      <span>Details</span>
    </div>
    <div className="title-score">
      <span>Score</span>
    </div>
    <div className="title-actions">
      <span>Actions</span>
    </div>
  </List.Item>
);

export { PostHeader };

