import Error404Icon from 'assets/icons/Errors/Error404Icon';
import { Content } from 'components/Content';
import ViewMoreBtn from 'components/ViewMoreBtn';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Content>
      <Content.Header>
        <div
          style={{
            height: 111,
          }}
        />
      </Content.Header>
      <Content.Body>
        <div className="error_page">
          <Error404Icon />
          <h1>Oops! Page not found!</h1>
          <ViewMoreBtn onclick={() => navigate(`/`)} nameBtn="Back to Home" />
        </div>
      </Content.Body>
    </Content>
  );
};

export default Error404;
