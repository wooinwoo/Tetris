export const TETROMINOES = {
  // Empty stage for initial state
  0: { shape: [[0]], color: "0, 0, 0" },

  // the long boy, "I" tetromino
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "80, 227, 230",
  },

  // the "J"-shaped tetromino
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "223, 173, 36",
  },

  // the "L"-shaped tetromino
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "36, 95, 223",
  },

  // the "O"-shaped tetromino
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },

  // "S"-shaped tetromino
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48, 211, 56",
  },

  // "Z"-shaped tetromino
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "132, 61, 198",
  },

  // "T"-shaped tetromino
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    color: "227, 78, 78",
  },
  M: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    color: "47, 47, 47",
  },
};

export const randomTetromino = () => {
  const tetrominoes = "IJLOSTZ";
  const randTetromino =
    tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  return TETROMINOES[randTetromino];
};
