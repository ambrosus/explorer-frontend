import packageJson from '../../../package.json';
import discordIcon from '../../assets/svg/discord-icon.svg';
import mediumIcon from '../../assets/svg/medium-icon.svg';
import redditIcon from '../../assets/svg/reddit.svg';
import telegramIcon from '../../assets/svg/telegram.svg';
import twitterIcon from '../../assets/svg/twitter.svg';
// @ts-ignore
import { HelpMenu } from 'airdao-components-and-tools/components';
// @ts-ignore
import { getBranchLastUpdatedString } from 'airdao-components-and-tools/utils';
import { useEffect, useState } from 'react';

const ExplorerHelp = () => {
  const [lastUpdated, setLastUpdated] = useState('');
  useEffect(() => {
    (async () => {
      const lastUpdated = await getBranchLastUpdatedString(
        'ambrosus',
        'explorer-frontend',
        'main',
        process.env.REACT_APP_GITHUB_API_TOKEN,
      );
      setLastUpdated(lastUpdated);
    })();
  }, []);

  return (
    <HelpMenu
      {...helpContent}
      appDetails={{
        name: packageJson.name,
        version: packageJson.version,
        lastUpdated,
      }}
    />
  );
};

const helpContent = {
  title: 'AirDao Explorer',
  description:
    'AirDAO Explorer is the gateway to all of the transactions andstatistics on the AirDAO blockchain.',
  video: {
    url: '/',
    thumbnailSrc:
      'https://www.notion.so/signed/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1f5277f1-551d-4fe3-9bf9-4a6a319f6ff4%2FWebsite_cover_Swapping_Tutorial.png?table=block&id=8f5f3d59-5003-4661-bae5-ea5317de6712&spaceId=79cb251e-d7b1-4bd3-a1d5-2c9c1d66b43d&userId=b72afef1-e899-40f4-9b75-443390a43034&cache=v2',
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
      iconSrc: twitterIcon,
    },
    {
      url: 'https://t.me/airDAO_official',
      iconSrc: telegramIcon,
    },
    {
      url: 'https://www.reddit.com/r/AirDAO/',
      iconSrc: redditIcon,
    },
    {
      url: 'https://blog.airdao.io/',
      iconSrc: mediumIcon,
    },
    {
      url: 'https://discord.com/invite/hnftmSjUr8',
      iconSrc: discordIcon,
    },
  ],
};

export default ExplorerHelp;
