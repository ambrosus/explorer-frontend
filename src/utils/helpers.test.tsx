import { copyContent, sliceData10, sliceData5 } from "./helpers";

Object.assign(window.navigator, {
 clipboard: {
  writeText: jest.fn().mockImplementation(() => Promise.resolve()),
 },
});

describe("copyContent", () => {
  jest.spyOn(navigator.clipboard, "writeText");
  it("should copy to clipboard", () => {
   const address = "0x0";
   const setIsCopy = jest.fn();
   copyContent(address,setIsCopy);
   expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
   expect(window.navigator.clipboard.writeText)
     .toHaveBeenCalledWith(address);
  });
});
describe("sliceData5 & sliceData10", () => {
  it("should slice data less then correctly value", () => {
   const data = "0x0";
   expect(sliceData10(data)).toEqual("0x0");
   expect(sliceData5(data)).toEqual("0x0");
  });
  it("if empty string | null | undefined", () => {
    const dEmpty = "";
    const dNull = null;
    const dUndefined = undefined;
    expect(sliceData10(dEmpty)).toEqual("");
    expect(sliceData10(dNull)).toEqual("");
    expect(sliceData10(dUndefined)).toEqual("");
    expect(sliceData5(dEmpty)).toEqual("");
    expect(sliceData5(dNull)).toEqual("");
    expect(sliceData5(dUndefined)).toEqual("");
  });
  it("correctly value", () => {
    const address = '0xB500558a3886e42142121B54c4bd1ef378D34'
    expect(sliceData10(address)).toEqual("0xB500558a...d1ef378D34");
    expect(sliceData5(address)).toEqual("0xB50...78D34");
  });
});
