import React, { useState } from 'react';

interface FAQProps {
  list: any[];
}

const FAQ = ({ list }: FAQProps) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleActive = (i: number) => {
    setActiveItem((state) => (state === i ? null : i));
  };

  return (
    <div className="faq-node">
      <h3 className="faq-node__title">FAQs</h3>
      <div className="faq-node__list">
        {list.map(({ title, text }, i) => (
          <div
            key={title}
            className={`faq-node__item ${
              activeItem === i ? 'faq-node__item_active' : ''
            }`}
          >
            <p className="faq-node__item-title" onClick={() => handleActive(i)}>
              {title}
            </p>
            <p className="faq-node__item-text">{text}</p>
            <button className="faq-node__btn" onClick={() => handleActive(i)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M8 13.293L16 21.293L24 13.293"
                  stroke="#1D1D1D"
                  strokeWidth="1.52381"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <p className="faq-node__footer">
        Need help? Go to{' '}
        <a href="mailto:support@airdao.io">support@airdao.io</a>
      </p>
    </div>
  );
};

export default FAQ;
