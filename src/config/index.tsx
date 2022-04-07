import Bundles from '../assets/icons/MainInfo/Bundles';
import Holders from '../assets/icons/MainInfo/Holders';
import MarketCap from '../assets/icons/MainInfo/MarketCap';
import Nodes from '../assets/icons/MainInfo/Nodes';
import TotalSupply from '../assets/icons/MainInfo/TotalSupply';
import TotalTransactions from '../assets/icons/MainInfo/TotalTransactions';

const getMainInfoIcon = (icon: string) => {
	switch (icon) {
		case 'BUNDLES':
			return <Bundles />;
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

export default getMainInfoIcon;
