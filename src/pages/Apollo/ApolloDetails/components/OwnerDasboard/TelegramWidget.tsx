// @ts-ignore
import { Notify } from '@airdao/ui-library';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const notifyServiceUrls: any = {
  '16718': 'https://notification-service-api.ambrosus.io',
  '22040': 'https://notification-service-api.ambrosus-test.io',
  '30746': 'https://notification-service-api.ambrosus-dev.io',
};

const chainId = process.env.REACT_APP_CHAIN_ID;

export default function TelegramWidget() {
  const { address } = useParams();

  const handleRedirect = () => {
    if (!chainId) return null;
    axios
      .get(`${notifyServiceUrls[chainId]}/generateLink?ownerAddress=${address}`)
      .then((res) => {
        if (!res.data) {
          Notify.error('You have already connected to bot', null, {});
        } else {
          // @ts-ignore
          window.open(res.data, '_blank').focus();
        }
      });
  };

  return (
    <button className="telegram-widget" onClick={handleRedirect}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <rect width="32" height="32" rx="16" fill="#EDF3FF" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.4995 11.6655C14.9471 12.3581 11.8444 13.7915 7.19158 15.9659C6.43602 16.2881 6.04023 16.6034 6.0042 16.9117C5.94331 17.4327 6.55158 17.6378 7.37989 17.9172C7.49256 17.9552 7.6093 17.9945 7.72898 18.0363C8.54391 18.3204 9.64013 18.6528 10.21 18.666C10.7269 18.678 11.3039 18.4494 11.9409 17.9802C16.2882 14.8327 18.5323 13.2417 18.6732 13.2074C18.7726 13.1832 18.9103 13.1528 19.0037 13.2418C19.097 13.3308 19.0878 13.4993 19.0779 13.5445C19.0177 13.82 16.63 16.2009 15.3943 17.4331C15.0091 17.8172 14.7359 18.0896 14.6801 18.1519C14.5549 18.2913 14.4274 18.4231 14.3048 18.5498C13.5478 19.3327 12.98 19.9197 14.3363 20.8783C14.988 21.339 15.5096 21.7199 16.0299 22.1C16.5981 22.515 17.1649 22.929 17.8982 23.4446C18.085 23.576 18.2634 23.7124 18.4372 23.8453C19.0985 24.3509 19.6926 24.8052 20.4266 24.7328C20.8531 24.6907 21.2936 24.2605 21.5174 22.9777C22.0461 19.9458 23.0854 13.3768 23.3256 10.6698C23.3467 10.4326 23.3202 10.1291 23.2989 9.99588C23.2777 9.86264 23.2333 9.6728 23.0718 9.53227C22.8806 9.36584 22.5853 9.33074 22.4533 9.33312C21.853 9.34458 20.932 9.68808 16.4995 11.6655Z"
          stroke="#7DA3F9"
          strokeWidth="1.77778"
          strokeLinejoin="round"
        />
      </svg>
      <div className="telegram-widget__text">
        Connect with Telegram to receive notifications
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="telegram-widget__arrow"
      >
        <path
          d="M22.6666 16H9.33329"
          stroke="#7DA3F9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.3333 10.668L22.6666 16.0013L17.3333 21.3346"
          stroke="#7DA3F9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
