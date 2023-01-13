import * as React from 'react';
import { SVGProps, memo } from 'react';

const AmbPrice = (props: SVGProps<SVGSVGElement>) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.76567 26.0035C9.63494 26.0832 9.46466 26.0463 9.37872 25.9195L9.04954 25.4342C8.9636 25.3075 8.99245 25.1359 9.11304 25.0415C10.1972 24.1931 11.0885 23.2369 11.7893 22.2128C14.3991 18.3993 14.3991 13.6005 11.7893 9.78706C11.0885 8.7629 10.1972 7.80669 9.11304 6.95833C8.99245 6.86398 8.9636 6.69237 9.04954 6.56565L9.37872 6.08029C9.46466 5.95358 9.63494 5.91663 9.76567 5.99632L24.3879 14.91C25.204 15.4075 25.204 16.5924 24.3879 17.0899L9.76567 26.0035Z" fill="#9198BB"/>
  </svg>

);

const Memo = memo(AmbPrice);
export default Memo;
