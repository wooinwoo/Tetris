import { useState, useEffect } from "react";
import { createStage, createStage2, checkCollision } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [stage2, setStage2] = useState(createStage2());
  const [rowsCleared, setRowsCleared] = useState(0);
  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      const copy = JSON.parse(JSON.stringify(player));
      for (let i = 0; i < 30; i++) {
        if (!checkCollision(copy, stage, { x: 0, y: 1 })) {
          copy.pos["y"] += 1;
          // console.log(copy);
        } else {
          break;
        }
      }
      // First flush the stage
      // console.log(prevStage);
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );
      // console.log(newStage);
      // Then draw the tetromino

      copy.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + copy.pos.y][x + copy.pos.x] = [
              "M",
              `${copy.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      // Then check for collisions
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      // console.log(newStage);
      return newStage;
    };

    setStage((prev) => updateStage(prev));
    // setStage2((prev) => updateStage(prev));
  }, [player, resetPlayer]);
  // console.log(stage2);
  return [stage, setStage, stage2, setStage2, rowsCleared];
};
