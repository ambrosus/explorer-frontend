import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => <div className="content">{children}</div>;

Content.Header = ({ children }) => (
  <div className="content__header">
    <div className="container">{children}</div>
  </div>
);

Content.Body = ({ children }) => (
  <div className="content__body">
    <div className="container">{children}</div>
  </div>
);

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Content.Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Content.Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Content;
