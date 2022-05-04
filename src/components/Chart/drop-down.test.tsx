import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DropDown from "./DropDown";

test("react-testing-library works!", () => {
  const rendered = render(
    <DropDown
      placeholder="Select an option"
      value="Son"
      options={[
        "Self",
        "Son",
        "Daughter",
        "Brother",
        "Sister",
        "Friend",
        "Relative"
      ]}
    />
  );
  const dropdown:any = rendered.container.querySelector(".Dropdown-placeholder");
  fireEvent.click(dropdown);
  expect(rendered).toMatchSnapshot();
});