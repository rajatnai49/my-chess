'use client'

import React, { useState, useEffect } from "react";
import { getPossibleMoves, isInCheck, getKingPosition } from "../utils/pieceMove";
import Image from "next/image";

const ChessBoard = () => {
    const [board, setBoard] = useState([
        ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--'],
        ['--', '--', '--', '--', '--', '--', '--', '--'],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
    ]);

    const [selectedPiece, setSelectedPiece] = useState<{ row: number, col: number } | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<{ row: number, col: number }[]>([]);
    const [turn, setTurn] = useState<'w' | 'b'>('w');
    const [history, setHistory] = useState<string[][][]>([]);
    const [undoStack, setUndoStack] = useState<string[][][]>([]);
    const [blackTime, setBlackTime] = useState<number>(600);
    const [whiteTime, setWhiteTime] = useState<number>(600);
    const [gameStatus, setGameStatus] = useState<string>('ongoing');

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameStatus === 'ongoing') {
                if (turn === 'w') {
                    setWhiteTime(prev => {
                        if (prev <= 1) {
                            setGameStatus('timeout');
                            return 0;
                        }
                        return prev - 1;
                    });
                } else {
                    setBlackTime(prev => {
                        if (prev <= 1) {
                            setGameStatus('timeout');
                            return 0;
                        }
                        return prev - 1;
                    });
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [turn, gameStatus]);

    const handleSquareClick = (row: number, col: number, piece: string) => {
        if (gameStatus !== 'ongoing') return;

        if (selectedPiece && possibleMoves.some(move => move.row === row && move.col === col)) {
            movePiece(row, col);
        } else if (piece !== '--' && piece.charAt(0) === turn) {
            const moves = getPossibleMoves(row, col, piece, board);
            setSelectedPiece({ row, col });
            setPossibleMoves(moves);
        }
    };

    const movePiece = (newRow: number, newCol: number) => {
        if (!selectedPiece) return;

        const newBoard = board.map(row => [...row]);
        const { row: oldRow, col: oldCol } = selectedPiece;

        // push to the stack
        setUndoStack(prev => [...prev, board]);

        newBoard[newRow][newCol] = newBoard[oldRow][oldCol];
        newBoard[oldRow][oldCol] = '--';

        setBoard(newBoard);
        setSelectedPiece(null);
        setPossibleMoves([]);
        setTurn(prev => (prev === 'w' ? 'b' : 'w'));
        setHistory(prev => [...prev, newBoard]);

        checkGameStatus(newBoard);
    };

    const undoMove = () => {
        if (undoStack.length === 0) return;

        const previousBoard = undoStack[undoStack.length - 1];
        setUndoStack(undoStack.slice(0, -1));
        setBoard(previousBoard);
        setSelectedPiece(null);
        setPossibleMoves([]);
        setTurn(prev => (prev === 'w' ? 'b' : 'w'));
        // revert the history
        setHistory(prev => prev.slice(0, -1)); 
    };

    const checkGameStatus = (newBoard: string[][]) => {
        const kingPosition = getKingPosition(newBoard, turn === 'w');
        const checkStatus = isInCheck(newBoard, kingPosition.row, kingPosition.col, turn === 'w');
    
        if (checkStatus === 'checkmate') {
            setGameStatus(`${turn} checkmate`);
        } else if (checkStatus === 'check') {
            setGameStatus('check');
        } else if (whiteTime <= 0 || blackTime <= 0) {
            setGameStatus('timeout');
        } else if (isStalemate(newBoard)) {
            setGameStatus('draw');
        } else {
            setGameStatus('ongoing');
        }
    };
    
    const isStalemate = (board: string[][]) => {
        return false; 
    };

    const restartGame = () => {
        setBoard([
            ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
            ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['--', '--', '--', '--', '--', '--', '--', '--'],
            ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
            ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
        ]);
        setSelectedPiece(null);
        setPossibleMoves([]);
        setTurn('w');
        setHistory([]);
        setUndoStack([]);
        setBlackTime(600);
        setWhiteTime(600);
        setGameStatus('ongoing');
    };

    const giveUp = () => {
        setGameStatus(turn === 'w' ? 'black wins' : 'white wins');
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <h1>Welcome to ChessGame :)</h1>
            <h2>Status: {gameStatus}</h2>
            <h2>Turn: {turn === 'w' ? 'White' : 'Black'}</h2>
            <div className="grid grid-cols-8 grid-rows-8">
                {board.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        const isPossibleMove = possibleMoves.some(move => move.row === rowIndex && move.col === colIndex);
                        return (
                            <Square
                                key={`${rowIndex}-${colIndex}`}
                                cellDetails={{ row: rowIndex, col: colIndex }}
                                cellPiece={cell}
                                isPossibleMove={isPossibleMove}
                                onClick={() => handleSquareClick(rowIndex, colIndex, cell)}
                            />
                        );
                    });
                })}
            </div>
            <div className="flex justify-between w-full">
                <div>White Timer: {formatTime(whiteTime)}</div>
                <div>Black Timer: {formatTime(blackTime)}</div>
            </div>
            <div className="flex gap-4 mt-4">
                <button onClick={restartGame} className="btn">Restart Game</button>
                <button onClick={giveUp} className="btn">Give Up</button>
                <button onClick={undoMove} className="btn">Undo Move</button>
            </div>
        </div>
    );
}

const Square = ({ cellDetails, cellPiece, isPossibleMove, onClick }: { cellDetails: { row: number, col: number }, cellPiece: string, isPossibleMove: boolean, onClick: () => void }) => {
    const { row, col } = cellDetails;
    const color = (row + col) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-500';
    const highlightClass = isPossibleMove ? 'bg-green-300 border border-black' : '';

    return (
        <div className={`${color} ${highlightClass} w-14 h-14 flex items-center justify-center`} onClick={onClick}>
            {cellPiece !== '--' && 
            <div>
                <Image src={`/${cellPiece}.svg`} width={50} height={50} alt={`${cellPiece}`}/>
            </div>
            }
        </div>
    );
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default ChessBoard;
