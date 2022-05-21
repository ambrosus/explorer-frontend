import { ViewMoreBtnProps } from 'pages/Home/home.interfaces';
import React from 'react';

const ViewMoreBtn: React.FC<ViewMoreBtnProps> = ({ nameBtn, onclick }) => (
  <div className="view_more_btn">
    <button
      className="view_more_btn_content"
      onClick={onclick ? onclick : () => {}}
    >
      {nameBtn}
    </button>
  </div>
);

export default ViewMoreBtn;
