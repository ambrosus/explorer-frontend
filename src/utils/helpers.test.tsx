import { copyContent, sliceData10, sliceData5, calcTime, setActiveLink } from "./helpers";
import moment from "moment";

describe("copyContent", () => {
  Object.assign(window.navigator, {
    clipboard: {
      writeText: jest.fn().mockImplementation(() => Promise.resolve())
    }
  });
  jest.spyOn(navigator.clipboard, "writeText");
  it("should copy to clipboard", () => {
    const address = "0x0";
    const setIsCopy = jest.fn();
    copyContent(address, setIsCopy);
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
  it("should slice data correctly value", () => {
    const address = "0xB500558a3886e42142121B54c4bd1ef378D34";
    expect(sliceData10(address)).toEqual("0xB500558a...d1ef378D34");
    expect(sliceData5(address)).toEqual("0xB50...78D34");
  });
});

describe("setActiveLink", () => {
  it("not active link", () => {
    const className = "tabs__link";
    const separator = " ";
    expect(setActiveLink({ isActive: false })).toEqual(className +
      separator);
  });
  it("is active link", () => {
    const className = "tabs__link";
    const activeClass = className + '-active'
    const separator = " ";
    expect(setActiveLink({ isActive: true })).toEqual(className +
      separator + activeClass);
  });
});

describe("should return the date in a specific format", () => {
  it("Invalid date", () => {
    const tNull = null
    const tUndefined = undefined
    const tEmptyString = ''
    expect(calcTime(tNull)).toEqual('')
    expect(calcTime(tUndefined)).toEqual('Invalid date')
    expect(calcTime(tEmptyString)).toEqual('')
  });
  it("a few seconds ago", () => {
    const time = Date.now() / 1000
    expect(calcTime(time)).toEqual('a few seconds ago');
  });
  it("a minute ago", () => {
    const time = Date.now() / 1000 - 60;
    expect(calcTime(time)).toEqual('a minute ago');
  });
  it("an hour ago", () => {
    const time = Date.now() / 1000 - 60 * 60;
    expect(calcTime(time)).toEqual('an hour ago');
  });
  it("a two hour ago", () => {
    const time = Date.now() / 1000 - 60 * 60 * 2;
    expect(calcTime(time)).toEqual('2 hours ago');
  });
  it("12 hours ago", () => {
    const time = Date.now() / 1000 - 60 * 60 * 12;
    expect(calcTime(time)).toEqual('12 hours ago');
  });
  it("a day ago", () => {
    const time = Date.now() / 1000 - 60 * 60 * 24;
    expect(calcTime(time)).toEqual('a day ago');
  });
  it("7 days ago", () => {
    const time = Date.now() / 1000 - 60 * 60 * 24 * 7;
    expect(calcTime(time)).toEqual('7 days ago');
  });
  it("a month ago", () => {
    const time = Date.now() / 1000 - 60 * 60 * 24 * 30;
    expect(calcTime(time)).toEqual('a month ago');
  });
  it("a year ago", () => {
    const time = Date.now() / 1000 - 60 * 60 * 24 * 365;
    expect(calcTime(time)).toEqual('a year ago');
  });
});

