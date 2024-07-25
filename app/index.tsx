import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PuzzleGameProps {
  initialTilesProp?: number[];
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ initialTilesProp }) => {
  const initialTiles = initialTilesProp || [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,
  ];
  const [tiles, setTiles] = useState<number[]>(initialTiles);
  const [emptyIndex, setEmptyIndex] = useState<number>(15);

  const moveTile = (index: number) => {
    const adjacentIndexes = [
      emptyIndex - 1, // Left
      emptyIndex + 1, // Right
      emptyIndex - 4, // Up
      emptyIndex + 4, // Down
    ];

    if (adjacentIndexes.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = 0;

      setTiles(newTiles);
      setEmptyIndex(index);
    }
  };

  const checkWin = () => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i + 1) {
        return false;
      }
    }
    return true;
  };

  const shuffleTiles = () => {
    const shuffledTiles = [...initialTiles];

    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [
        shuffledTiles[j],
        shuffledTiles[i],
      ];
    }

    setTiles(shuffledTiles);
    setEmptyIndex(shuffledTiles.indexOf(0));
  };

  useEffect(() => {
    if (!initialTilesProp) {
      shuffleTiles();
    }
  }, []);

  return (
    <View style={styles.container}>
      {tiles.map((tile, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tile}
          onPress={() => moveTile(index)}
        >
          <Text style={styles.tileText}>{tile !== 0 ? tile : ""}</Text>
        </TouchableOpacity>
      ))}
      {checkWin() && <Text style={styles.winText}>You Win!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 50,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f8ff", // Light blue background
  },
  tile: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    backgroundColor: "#4682b4", // Steel blue tiles
    borderRadius: 5, // Rounded corners for a modern look
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  tileText: {
    fontSize: 24,
    color: "#fff", // White text for better contrast
  },
  winText: {
    fontSize: 32,
    color: "green",
    position: "absolute",
    top: 50,
  },
});

export default PuzzleGame;
