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
  const dropdownMenu = rendered.container.querySelector(".Dropdown-menu");
  console.log(dropdownMenu);
  expect(rendered).toMatchSnapshot();
});
