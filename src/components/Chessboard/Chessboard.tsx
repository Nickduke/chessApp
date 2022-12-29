import React, { MouseEvent } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? 'b' : 'w';
  const y = p === 0 ? 7 : 0;

  pieces.push({ image: `./assets/images/rook_${type}.png`, x: 7, y: y });
  pieces.push({ image: `./assets/images/rook_${type}.png`, x: 0, y: y });
  pieces.push({ image: `./assets/images/knight_${type}.png`, x: 1, y: y });
  pieces.push({ image: `./assets/images/knight_${type}.png`, x: 6, y: y });
  pieces.push({ image: `./assets/images/bishop_${type}.png`, x: 5, y: y });
  pieces.push({ image: `./assets/images/bishop_${type}.png`, x: 2, y: y });
  pieces.push({ image: `./assets/images/queen_${type}.png`, x: 3, y: y });
  pieces.push({ image: `./assets/images/king_${type}.png`, x: 4, y: y });
}

// black pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: './assets/images/pawn_b.png', x: i, y: 6 });
}

// white pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: './assets/images/pawn_w.png', x: i, y: 1 });
}

let activePiece: HTMLElement | null = null;

const grabPiece = (e: React.MouseEvent) => {
  const el = e.target as HTMLElement;
  if (el.classList.contains('chess-piece')) {
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    activePiece = el;
  }
};

const movePiece = (e: React.MouseEvent) => {
  const el = e.target as HTMLElement;

  if (activePiece) {
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }
};

const dropPiece = (e: React.MouseEvent) => {
  if (activePiece) {
    activePiece = null;
  }
};

export default function Chessboard() {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;

      let image = '';

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${i},${j}`} image={image} number={number} />);
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id='chessboard'
    >
      {board}
    </div>
  );
}
