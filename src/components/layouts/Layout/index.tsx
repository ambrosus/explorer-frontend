import { NewHeader } from '../NewHeader';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { Menu, HelpMenu } from 'airdao-components-and-tools/components';
import React, { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

/*
@param {React.ReactNode} children
@return {React.FC<LayoutProps>}
 */

const helpContent = {
  title: 'AirDao Explorer',
  description:
    'AirDAO Explorer is the gateway to all of the transactions andstatistics on the AirDAO blockchain.',
  video: {
    url: '/',
    thumbnailSrc: 'https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1f5277f1-551d-4fe3-9bf9-4a6a319f6ff4%2FWebsite_cover_Swapping_Tutorial.png?table=block&id=8f5f3d59-5003-4661-bae5-ea5317de6712&spaceId=79cb251e-d7b1-4bd3-a1d5-2c9c1d66b43d&userId=b72afef1-e899-40f4-9b75-443390a43034&cache=v2',
  },
  guideLink: {
    text: 'Go to AirDAO Academy →',
    url: 'https://airdao.academy/guides/bridge',
  },
  links: [
    {
      text: 'Help Center',
      url: 'https://airdao.academy/',
    },
    {
      text: 'Whats New',
      url: 'https://airdao.academy/change-log',
    },
    {
      text: 'Place Feedback & Report Bugs',
      url: 'https://forms.gle/vRqhvT5pLAFic7Z77',
    },
    {
      text: 'Governance',
      url: 'https://community.airdao.io/',
    },
    {
      text: 'Github',
      url: 'https://github.com/ambrosus/',
    },
  ],
  socials: [
    {
      url: 'https://twitter.com/airdao_io',
      iconSrc:
        'https://airdao.cdn.prismic.io/airdao/5e3435fb-0f14-4f6f-91da-1587da93ec02_twitter-icon.svg',
    },
    {
      url: 'https://t.me/airDAO_official',
      iconSrc:
        'https://airdao.cdn.prismic.io/airdao/5e3435fb-0f14-4f6f-91da-1587da93ec02_twitter-icon.svg',
    },
    {
      url: 'https://www.reddit.com/r/AirDAO/',
      iconSrc:
        'https://airdao.cdn.prismic.io/airdao/5e3435fb-0f14-4f6f-91da-1587da93ec02_twitter-icon.svg',
    },
    {
      url: 'https://blog.airdao.io/',
      iconSrc:
        'https://airdao.cdn.prismic.io/airdao/5e3435fb-0f14-4f6f-91da-1587da93ec02_twitter-icon.svg',
    },
    {
      url: 'https://discord.com/invite/hnftmSjUr8',
      iconSrc:
        'https://airdao.cdn.prismic.io/airdao/5e3435fb-0f14-4f6f-91da-1587da93ec02_twitter-icon.svg',
    },
  ],
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const web3ReactInstance = useWeb3React();

  return (
    <div className="layout ">
      <div className="container" style={{ position: 'relative' }}>
        <Menu web3ReactInstance={web3ReactInstance} initHidden />
      </div>
      <NewHeader />
      <div className="page">{children}</div>
      <HelpMenu {...helpContent} />
    </div>
  );
};
