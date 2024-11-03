// Chess game state
let boardState = Array(8)
  .fill()
  .map(() => Array(8).fill(null));
let currentTurn = "white";
let selectedPiece = null;
let lastMove = null;
let moveHistory = [];

// Piece definitions
const pieces = {
  pawn: {
    white: "♙",
    black: "♟︎",
    moves: getPawnMoves,
  },
  rook: {
    white: "♖",
    black: "♜",
    moves: getRookMoves,
  },
  knight: {
    white: "♘",
    black: "♞",
    moves: getKnightMoves,
  },
  bishop: {
    white: "♗",
    black: "♝",
    moves: getBishopMoves,
  },
  queen: {
    white: "♕",
    black: "♛",
    moves: getQueenMoves,
  },
  king: {
    white: "♔",
    black: "♚",
    moves: getKingMoves,
  },
};

// Initialize the game
function initGame() {
  const initialSetup = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");
      square.dataset.row = row;
      square.dataset.col = col;
      square.addEventListener("click", handleSquareClick);

      const pieceCode = initialSetup[row][col];
      if (pieceCode) {
        const color = pieceCode === pieceCode.toUpperCase() ? "white" : "black";
        const pieceType = pieceCode.toLowerCase();
        const piece = { type: pieceType, color: color, hasMoved: false };
        boardState[row][col] = piece;
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("piece");
        pieceElement.textContent = pieces[pieceType][color];
        square.appendChild(pieceElement);
      }

      document.getElementById("chessboard").appendChild(square);
    }
  }

  updateTurnIndicator();
}

// Handle square click
function handleSquareClick(event) {
  const square = event.target.closest(".square");
  if (!square) return;

  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);

  if (selectedPiece) {
    const validMoves = getValidMoves(selectedPiece.row, selectedPiece.col);
    const isValidMove = validMoves.some(
      (move) => move.row === row && move.col === col
    );

    if (isValidMove) {
      movePiece(selectedPiece.row, selectedPiece.col, row, col);
      clearHighlights();
      selectedPiece = null;
    } else {
      clearHighlights();
      selectedPiece = null;
      handleSquareClick(event);
    }
  } else {
    const piece = boardState[row][col];
    if (piece && piece.color === currentTurn) {
      selectedPiece = { row, col };
      highlightValidMoves(row, col);
    }
  }
}

// Move piece
function movePiece(fromRow, fromCol, toRow, toCol) {
  const piece = boardState[fromRow][fromCol];
  const capturedPiece = boardState[toRow][toCol];

  // Handle en passant capture
  if (
    piece.type === "pawn" &&
    lastMove &&
    lastMove.piece.type === "pawn" &&
    Math.abs(lastMove.from.col - lastMove.to.col) ===
      Math.abs(fromCol - toCol) &&
    lastMove.to.row === (piece.color === "white" ? 3 : 4) &&
    toRow === (piece.color === "white" ? 2 : 5) &&
    toCol === lastMove.to.col
  ) {
    boardState[lastMove.to.row][lastMove.to.col] = null;
    updateSquare(lastMove.to.row, lastMove.to.col);
  }

  // Handle castling
  if (piece.type === "king" && Math.abs(fromCol - toCol) === 2) {
    const rookFromCol = toCol > fromCol ? 7 : 0;
    const rookToCol = toCol > fromCol ? toCol - 1 : toCol + 1;
    boardState[toRow][rookToCol] = boardState[toRow][rookFromCol];
    boardState[toRow][rookFromCol] = null;
    boardState[toRow][rookToCol].hasMoved = true;
    updateSquare(toRow, rookFromCol);
    updateSquare(toRow, rookToCol);
  }

  // Move the piece
  boardState[toRow][toCol] = piece;
  boardState[fromRow][fromCol] = null;
  piece.hasMoved = true;

  updateSquare(fromRow, fromCol);
  updateSquare(toRow, toCol);

  // Handle pawn promotion
  if (piece.type === "pawn" && (toRow === 0 || toRow === 7)) {
    promotePawn(toRow, toCol);
  }

  lastMove = {
    piece,
    from: { row: fromRow, col: fromCol },
    to: { row: toRow, col: toCol },
  };
  addMoveToHistory(piece, fromRow, fromCol, toRow, toCol, capturedPiece);

  switchTurns();
  checkGameStatus();
}

// Get valid moves for a piece
function getValidMoves(row, col) {
  const piece = boardState[row][col];
  if (!piece) return [];

  let moves = pieces[piece.type].moves(row, col, piece.color);
  moves = moves.filter((move) => isValidMove(row, col, move.row, move.col));

  return moves;
}

// Check if a move is valid (doesn't put own king in check)
function isValidMove(fromRow, fromCol, toRow, toCol) {
  const piece = boardState[fromRow][fromCol];
  const originalToPiece = boardState[toRow][toCol];

  // Temporarily make the move
  boardState[toRow][toCol] = piece;
  boardState[fromRow][fromCol] = null;

  const kingPosition = findKing(piece.color);
  const isValid = !isSquareAttacked(
    kingPosition.row,
    kingPosition.col,
    piece.color
  );

  // Undo the move
  boardState[fromRow][fromCol] = piece;
  boardState[toRow][toCol] = originalToPiece;

  return isValid;
}

// Find the king's position
function findKing(color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = boardState[row][col];
      if (piece && piece.type === "king" && piece.color === color) {
        return { row, col };
      }
    }
  }
}

// Check if a square is attacked by the opponent
function isSquareAttacked(row, col, color) {
  const opponentColor = color === "white" ? "black" : "white";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = boardState[r][c];
      if (piece && piece.color === opponentColor) {
        const moves = pieces[piece.type].moves(r, c, piece.color);
        if (moves.some((move) => move.row === row && move.col === col)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Highlight valid moves
function highlightValidMoves(row, col) {
  clearHighlights();
  const validMoves = getValidMoves(row, col);
  validMoves.forEach((move) => {
    const square = getSquare(move.row, move.col);
    if (boardState[move.row][move.col]) {
      square.classList.add("valid-capture");
    } else {
      square.classList.add("valid-move");
    }
  });
  getSquare(row, col).classList.add("highlight");
}

// Clear highlights
function clearHighlights() {
  document
    .querySelectorAll(".highlight, .valid-move, .valid-capture")
    .forEach((square) => {
      square.classList.remove("highlight", "valid-move", "valid-capture");
    });
}

// Update a square on the board
function updateSquare(row, col) {
  const square = getSquare(row, col);
  square.innerHTML = "";
  const piece = boardState[row][col];
  if (piece) {
    const pieceElement = document.createElement("div");
    pieceElement.classList.add("piece");
    pieceElement.textContent = pieces[piece.type][piece.color];
    square.appendChild(pieceElement);
  }
}

// Get a square element by row and column
function getSquare(row, col) {
  return document.querySelector(
    `.square[data-row="${row}"][data-col="${col}"]`
  );
}

// Switch turns
function switchTurns() {
  currentTurn = currentTurn === "white" ? "black" : "white";
  updateTurnIndicator();
}

// Update turn indicator
function updateTurnIndicator() {
  document.getElementById("turn-indicator").textContent = `${
    currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1)
  }'s Turn`;
}

// Check game status (check, checkmate, stalemate)
function checkGameStatus() {
  const kingPosition = findKing(currentTurn);
  const isInCheck = isSquareAttacked(
    kingPosition.row,
    kingPosition.col,
    currentTurn
  );
  const hasValidMoves = hasAnyValidMoves(currentTurn);

  if (isInCheck && !hasValidMoves) {
    document.getElementById("game-status").textContent = `Checkmate! ${
      currentTurn === "white" ? "Black" : "White"
    } wins!`;
  } else if (isInCheck) {
    document.getElementById("game-status").textContent = `${
      currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1)
    } is in check!`;
  } else if (!hasValidMoves) {
    document.getElementById("game-status").textContent = "Stalemate!";
  } else {
    document.getElementById("game-status").textContent = "";
  }
}

// Check if the current player has any valid moves
function hasAnyValidMoves(color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = boardState[row][col];
      if (piece && piece.color === color) {
        const moves = getValidMoves(row, col);
        if (moves.length > 0) {
          return true;
        }
      }
    }
  }
  return false;
}

// Pawn promotion
function promotePawn(row, col) {
  const piece = boardState[row][col];
  const newPiece = { type: "queen", color: piece.color, hasMoved: true };
  boardState[row][col] = newPiece;
  updateSquare(row, col);
}

// Add move to history
function addMoveToHistory(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  capturedPiece
) {
  const files = "abcdefgh";
  const ranks = "87654321";
  const from = files[fromCol] + ranks[fromRow];
  const to = files[toCol] + ranks[toRow];
  const pieceSymbol = pieces[piece.type][piece.color];
  const captureSymbol = capturedPiece ? "x" : "";
  const move = `${pieceSymbol}${from}${captureSymbol}${to}`;
  moveHistory.push(move);
  updateMoveHistory();
}

// Update move history display
function updateMoveHistory() {
  const historyElement = document.getElementById("move-history");
  historyElement.innerHTML = moveHistory
    .map((move, index) => `${Math.floor(index / 2) + 1}. ${move}`)
    .join("<br>");
  historyElement.scrollTop = historyElement.scrollHeight;
}

// Piece move functions
function getPawnMoves(row, col, color) {
  const moves = [];
  const direction = color === "white" ? -1 : 1;
  const startRow = color === "white" ? 6 : 1;

  // Move forward
  if (!boardState[row + direction][col]) {
    moves.push({ row: row + direction, col: col });
    // Double move from starting position
    if (row === startRow && !boardState[row + 2 * direction][col]) {
      moves.push({ row: row + 2 * direction, col: col });
    }
  }

  // Capture diagonally
  [-1, 1].forEach((offset) => {
    if (col + offset >= 0 && col + offset < 8) {
      const targetPiece = boardState[row + direction][col + offset];
      if (targetPiece && targetPiece.color !== color) {
        moves.push({ row: row + direction, col: col + offset });
      }
    }
  });

  // En passant
  if (
    lastMove &&
    lastMove.piece.type === "pawn" &&
    Math.abs(lastMove.from.row - lastMove.to.row) === 2 &&
    Math.abs(lastMove.to.col - col) === 1 &&
    row === (color === "white" ? 3 : 4)
  ) {
    moves.push({ row: row + direction, col: lastMove.to.col });
  }

  return moves;
}

function getRookMoves(row, col, color) {
  return getSlidingMoves(row, col, color, [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]);
}

function getKnightMoves(row, col, color) {
  const moves = [];
  const offsets = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  offsets.forEach(([rowOffset, colOffset]) => {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = boardState[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  });

  return moves;
}

function getBishopMoves(row, col, color) {
  return getSlidingMoves(row, col, color, [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]);
}

function getQueenMoves(row, col, color) {
  return [...getRookMoves(row, col, color), ...getBishopMoves(row, col, color)];
}

function getKingMoves(row, col, color) {
  const moves = [];
  const offsets = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  offsets.forEach(([rowOffset, colOffset]) => {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = boardState[newRow][newCol];
      if (!targetPiece || targetPiece.color !== color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  });

  // Castling
  if (!boardState[row][col].hasMoved && !isSquareAttacked(row, col, color)) {
    // Kingside castling
    if (
      !boardState[row][col + 1] &&
      !boardState[row][col + 2] &&
      boardState[row][col + 3] &&
      boardState[row][col + 3].type === "rook" &&
      !boardState[row][col + 3].hasMoved &&
      !isSquareAttacked(row, col + 1, color) &&
      !isSquareAttacked(row, col + 2, color)
    ) {
      moves.push({ row: row, col: col + 2 });
    }
    // Queenside castling
    if (
      !boardState[row][col - 1] &&
      !boardState[row][col - 2] &&
      !boardState[row][col - 3] &&
      boardState[row][col - 4] &&
      boardState[row][col - 4].type === "rook" &&
      !boardState[row][col - 4].hasMoved &&
      !isSquareAttacked(row, col - 1, color) &&
      !isSquareAttacked(row, col - 2, color)
    ) {
      moves.push({ row: row, col: col - 2 });
    }
  }

  return moves;
}

function getSlidingMoves(row, col, color, directions) {
  const moves = [];

  directions.forEach(([rowDirection, colDirection]) => {
    let newRow = row + rowDirection;
    let newCol = col + colDirection;
    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = boardState[newRow][newCol];
      if (!targetPiece) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (targetPiece.color !== color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      newRow += rowDirection;
      newCol += colDirection;
    }
  });

  return moves;
}

// Initialize the game
initGame();
