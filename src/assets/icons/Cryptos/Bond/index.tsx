import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = () => (
  <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="800" fill="white"/>
    <circle cx="381.873" cy="399.873" r="288.582" fill="#732C17" stroke="#1D1D1D" strokeWidth="8.58237"/>
    <circle cx="418.24" cy="399.763" r="288.472" fill="#FF5E0D" stroke="#1D1D1D" strokeWidth="8.58237"/>
    <path d="M296.702 571.087L296.702 571.087C292.599 574.274 291.551 580.142 294.548 584.529L300.993 593.961C303.967 598.313 309.835 599.565 314.333 596.843L312.112 593.171L314.333 596.843L600.616 423.622C619.353 412.284 619.353 385.255 600.616 373.917L314.333 200.696C309.835 197.974 303.967 199.226 300.993 203.578L304.536 205.999L300.993 203.578L294.548 213.01L298.091 215.431L294.548 213.01C291.551 217.397 292.599 223.265 296.702 226.452C317.594 242.677 334.735 260.941 348.199 280.469C398.283 353.11 398.283 444.429 348.199 517.07C334.735 536.598 317.594 554.862 296.702 571.087Z" fill="white" stroke="#1D1D1D" strokeWidth="8.58237"/>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
