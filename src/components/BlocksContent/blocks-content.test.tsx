
import BlocksContent from "./index";
import {render} from "@testing-library/react";
import {ResultHomePageData} from "../../pages/Home/home.interfaces";
const globalAny: any = global;
globalAny.window = {};
globalAny.document = {};
//fix error: ● Test suite failed to run
//     ReferenceError: global is not defined
//     at Object.window.document.createElement (
describe("BlocksContent", () => {
  it("renders correctly", () => {
    const data :ResultHomePageData = {
      latestBlocks: [
        {
          number: 1,
          timestamp: 213124124,
          miner: "0x0000000000000000000000000000000000000000",
          totalTransactions: 0,
          blockRewards: 0,
          key: 21,
          index: 0,
          validator: "0x0000000000000000000000000000000000000000",
          blockReward: 12,
          name: "name",
        },
      ],
      latestTransactions: [
        {
          _id: "0x0",
          status: "SUCCESS",
          hash: "0x0",
          amount: 0,
          timestamp: 0,
          from: "0x0000000000000000000000000000000000000000",
          to: "0x0000000000000000000000000000000000000000",
          value: {
            ether: 0,
          },
          type: "0x0",
        },
      ],
    }
    const { container } = render(<BlocksContent data={data} />);
    expect(container).toMatchSnapshot();
  });
});
