import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from ".";

describe("Icon", () => {
  it("アイコン名の class を付け、スクリーンリーダーからは隠す", () => {
    const { container } = render(<Icon name="arrow-r" />);
    const icon = container.firstElementChild;
    expect(icon).toHaveClass("m2012-icon", "m2012-icon-arrow-r");
    expect(icon).not.toHaveClass("m2012-icon-shadow", "m2012-icon-alt");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("shadow / alt / className を反映する", () => {
    const { container } = render(<Icon name="home" shadow alt className="extra" />);
    expect(container.firstElementChild).toHaveClass(
      "m2012-icon-home",
      "m2012-icon-shadow",
      "m2012-icon-alt",
      "extra",
    );
  });
});
