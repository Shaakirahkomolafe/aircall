import React from "react";
import { render, cleanup } from "@testing-library/react";
import Activities from "../components/Activities";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Activities />);
});

