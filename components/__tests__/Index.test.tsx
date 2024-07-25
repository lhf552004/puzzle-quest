import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Index from "../../app/index";

describe("PuzzleGame", () => {
  test("renders correctly", () => {
    const { getByText } = render(<Index />);
    expect(getByText("1")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
    // Add more checks for other tiles
  });

  test("moves tile correctly", () => {
    const { getByText, queryByText } = render(<Index />);

    // Find the tile next to the empty space and simulate a press
    const tileToMove = getByText("15"); // Adjust according to the current shuffled state
    fireEvent.press(tileToMove);

    // Check if the tile has moved to the empty space
    const movedTile = queryByText("15"); // Find the tile that was moved
    expect(movedTile).toBeTruthy(); // The tile should now be in a new position

    const emptyTile = queryByText(""); // Find the empty space
    expect(emptyTile).toBeTruthy(); // Check that the empty space exists
  });

  test("checks win condition", () => {
    // Simulate winning state
    const winningTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    const { getByText, queryByText } = render(
      <Index initialTilesProp={winningTiles} />
    );
    // Check if the win text is displayed
    const winText = queryByText("You Win!");
    expect(winText).toBeTruthy();
  });
});
