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
        <></>
      </Content.Header>
      <Content.Body>
        <div className="error_page">
          <Error404Icon />
          <ViewMoreBtn onclick={() => navigate(`/`)} nameBtn="Back to Home" />
          <h1>Oops! Page not found!</h1>
        </div>
      </Content.Body>
    </Content>
  );
};

export default Error404;
