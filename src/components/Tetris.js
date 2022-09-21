import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

// Styled Components
import {
  StyledTetris,
  StyledTetrisWrapper,
  StyledPreviewArea,
} from "./styles/StyledTetris";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import Preview from "./Preview";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { StyledPreview } from "./styles/StyledPreview";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate, block] =
    usePlayer();
  const [stage, setStage, stage2, setStage2, rowsCleared] = useStage(
    player,
    resetPlayer
  );
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  console.log("re-render");

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = (yVal) => {
    if (rows > level + 1) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: yVal, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = (i = 1) => {
    setDropTime(null);
    drop(i);
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        // Left Arrow Key
        movePlayer(-1);
      } else if (keyCode === 39) {
        // Right Arrow Key
        movePlayer(1);
      } else if (keyCode === 40) {
        // Down Arrow Key
        dropPlayer();
      } else if (keyCode === 38) {
        // Up Arrow Key - rotate CW
        playerRotate(stage, 1);
      } else if (keyCode === 65) {
        // 'a' key - rotate CCW
        playerRotate(stage, -1);
      } else if (keyCode === 83) {
        for (var i = 0; i < 30; i++) {
          if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            player.pos["y"] += 1;
          } else {
            break;
          }
        }
        drop();
      }
    }
  };

  useInterval(() => {
    drop(1);
  }, dropTime);
  console.log(stage, stage2, block);
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}>
      <ul>
        <li className="title">테~트~리~스</li>
      </ul>
      <StyledTetris>
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`점수 : ${score}`} />
              <Display text={`삭제라인 : ${rows}`} />
              <Display text={`레벨 : ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
        <Stage stage={stage} />
        <div>next</div>
        <StyledPreviewArea>
          <Preview stage={stage2} />
          <Preview stage={stage2} />
          <Preview stage={stage2} />
        </StyledPreviewArea>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
