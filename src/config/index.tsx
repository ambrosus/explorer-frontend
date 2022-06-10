import AmbPrice from 'assets/icons/MainInfo/AmbPrice';
import Bundles from 'assets/icons/MainInfo/Bundles';
import Holders from 'assets/icons/MainInfo/Holders';
import MarketCap from 'assets/icons/MainInfo/MarketCap';
import Nodes from 'assets/icons/MainInfo/Nodes';
import TotalSupply from 'assets/icons/MainInfo/TotalSupply';
import TotalTransactions from 'assets/icons/MainInfo/TotalTransactions';
import moment from 'moment';

const getMainInfoIcon = (icon: string) => {
  switch (icon) {
    case 'BUNDLES':
      return <Bundles />;

    case 'AMB PRICE':
      return <AmbPrice />;

    case 'HOLDERS':
      return <Holders />;

    case 'MARKET CAP':
      return <MarketCap />;
    case 'NODES':
      return <Nodes />;
    case 'TOTAL SUPPLY':
      return <TotalSupply />;
    case 'TOTAL TRANSACTIONS':
      return <TotalTransactions />;

    default:
      break;
  }
};

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%d secs',
    ss: '%d secs',
    m: '%d mins',
    mm: '%d mins',
    h: '%d hour',
    hh: '%d hours',
    d: '%d day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

export default getMainInfoIcon;
