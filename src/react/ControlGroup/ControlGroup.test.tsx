import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { ControlGroup } from ".";

describe("ControlGroup", () => {
  it("既定は縦並びで、ボタンを controls の中に並べる", () => {
    render(
      <ControlGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ControlGroup>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveClass(
      "m2012-controlgroup",
      "m2012-controlgroup-vertical",
      "m2012-corner-all",
    );
    expect(group).not.toHaveClass("m2012-mini", "m2012-shadow");
    const controls = group.querySelector(".m2012-controlgroup-controls");
    expect(controls?.children).toHaveLength(2);
  });

  it("type / mini / shadow を反映する", () => {
    render(<ControlGroup type="horizontal" mini shadow />);
    expect(screen.getByRole("group")).toHaveClass(
      "m2012-controlgroup-horizontal",
      "m2012-mini",
      "m2012-shadow",
    );
  });

  it("legend をグループのラベルにする", () => {
    render(<ControlGroup legend="Timeline" />);
    const group = screen.getByRole("group", { name: "Timeline" });
    expect(group.querySelector(".m2012-controlgroup-label")).toHaveTextContent("Timeline");
  });
});
