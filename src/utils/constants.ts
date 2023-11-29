import Gpt from 'assets/icons/Cryptos/Gpt';
import Hpt from 'assets/icons/Cryptos/Hpt';
import Ppt from 'assets/icons/Cryptos/Ppt';
import Amb from 'assets/icons/Cryptos/Amb';

export const WEI2ETH = 1000000000;
export const BUNDLE_MAX_LOAD = 16834;
export const CLIENT_VERSION = process.env.REACT_APP_TAG || 'v3.0.0';
export const { ethereum }: any = window;
export const ENABLE_LOGS = process.env.NODE_ENV !== 'production';

export const poolsTokens: any = {
  '0x322269e52800e5094c008f3b01A3FD97BB3C8f5D': {
    symbol: 'HPT',
    name: 'Hera Pool Token',
    icon: Hpt
  },
  '0x7240d2444151d9A8c72F77306Fa10f19FE7C9182': {
    symbol: 'TPT',
    name: 'Test1 pool token',
    icon: Amb
  },
  '0xEB8386a50Edd613cc43f061E9C5A915b0443C5d4': {
    symbol: 'PPT',
    name: 'Plutus pool token',
    icon: Ppt,
  },
  '0xE984ACe36F2B6f10Fec8dd6fc1bB19c7b1D2F2c6': {
    symbol: 'GPT',
    name: 'Ganymede pool token',
    icon: Gpt,
  }
}
// testnet
export const chainID = '22040';

// mainnet
// export const chainID = '16718';

//devnet
// export const chainID = '30746';
