type Move = { row: number, col: number };

const getWhitePawnMoves = (row: number, col: number, currentBoard: string[][]): Move[] => {
    const moves: Move[] = [];
    const piece = currentBoard[row][col];

    // Forward
    if (row > 0 && currentBoard[row - 1][col] === '--') {
        moves.push({ row: row - 1, col });
        if (row === 6 && currentBoard[row - 2][col] === '--') {
            moves.push({ row: row - 2, col });
        }
    }

    // Capture left
    if (row > 0 && col > 0) {
        const leftDiagonal = currentBoard[row - 1][col - 1];
        if (leftDiagonal !== '--' && leftDiagonal.charAt(0) !== piece.charAt(0)) {
            moves.push({ row: row - 1, col: col - 1 });
        }
    }

    // Capture right
    if (row > 0 && col < 7) {
        const rightDiagonal = currentBoard[row - 1][col + 1];
        if (rightDiagonal !== '--' && rightDiagonal.charAt(0) !== piece.charAt(0)) {
            moves.push({ row: row - 1, col: col + 1 });
        }
    }

    return moves;
};

const getBlackPawnMoves = (row: number, col: number, currentBoard: string[][]): Move[] => {
    const moves: Move[] = [];
    const piece = currentBoard[row][col];

    // Forward
    if (row < 7 && currentBoard[row + 1][col] === '--') {
        moves.push({ row: row + 1, col });
        // Move two squares forward from initial position
        if (row === 1 && currentBoard[row + 2][col] === '--') {
            moves.push({ row: row + 2, col });
        }
    }

    // Capture left
    if (row < 7 && col > 0) {
        const leftDiagonal = currentBoard[row + 1][col - 1];
        if (leftDiagonal !== '--' && leftDiagonal.charAt(0) !== piece.charAt(0)) {
            moves.push({ row: row + 1, col: col - 1 });
        }
    }

    // Capture right
    if (row < 7 && col < 7) {
        const rightDiagonal = currentBoard[row + 1][col + 1];
        if (rightDiagonal !== '--' && rightDiagonal.charAt(0) !== piece.charAt(0)) {
            moves.push({ row: row + 1, col: col + 1 });
        }
    }

    return moves;
};

const getRookMoves = (row: number, col: number, currentBoard: string[][]): Move[] => {
    const moves: Move[] = [];
    const piece = currentBoard[row][col];

    // Up
    for (let i = row - 1; i >= 0; i--) {
        if (currentBoard[i][col] === '--') {
            moves.push({ row: i, col });
        } else {
            if (currentBoard[i][col].charAt(0) !== piece.charAt(0)) {
                moves.push({ row: i, col });
            }
            break;
        }
    }

    // Down
    for (let i = row + 1; i < 8; i++) {
        if (currentBoard[i][col] === '--') {
            moves.push({ row: i, col });
        } else {
            if (currentBoard[i][col].charAt(0) !== piece.charAt(0)) {
                moves.push({ row: i, col });
            }
            break;
        }
    }

    // Left
    for (let i = col - 1; i >= 0; i--) {
        if (currentBoard[row][i] === '--') {
            moves.push({ row, col: i });
        } else {
            if (currentBoard[row][i].charAt(0) !== piece.charAt(0)) {
                moves.push({ row, col: i });
            }
            break;
        }
    }

    // Right
    for (let i = col + 1; i < 8; i++) {
        if (currentBoard[row][i] === '--') {
            moves.push({ row, col: i });
        } else {
            if (currentBoard[row][i].charAt(0) !== piece.charAt(0)) {
                moves.push({ row, col: i });
            }
            break;
        }
    }

    return moves;
};

const getKnightMoves = (row: number, col: number, currentBoard: string[][]): Move[] => {
    const moves: Move[] = [];
    const piece = currentBoard[row][col];
    const knightMoves: Move[] = [
        { row: row - 2, col: col - 1 },
        { row: row - 2, col: col + 1 },
        { row: row + 2, col: col - 1 },
        { row: row + 2, col: col + 1 },
        { row: row - 1, col: col - 2 },
        { row: row - 1, col: col + 2 },
        { row: row + 1, col: col - 2 },
        { row: row + 1, col: col + 2 }
    ];

    knightMoves.forEach(move => {
        if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
            const targetPiece = currentBoard[move.row][move.col];
            if (targetPiece === '--' || targetPiece.charAt(0) !== piece.charAt(0)) {
                moves.push(move);
            }
        }
    });

    return moves;
};

const getBishopMoves = (row: number, col: number, currentBoard: string[][]): Move[] => {
    const moves: Move[] = [];
    const piece = currentBoard[row][col];

    // Top-left
    for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
        if (currentBoard[row - i][col - i] === '--') {
            moves.push({ row: row - i, col: col - i });
        } else {
            if (currentBoard[row - i][col - i].charAt(0) !== piece.charAt(0)) {
                moves.push({ row: row - i, col: col - i });
            }
            break;
        }
    }

    // Top-right
    for (let i = 1; row - i >= 0 && col + i < 8; i++) {
        if (currentBoard[row - i][col + i] === '--') {
            moves.push({ row: row - i, col: col + i });
        } else {
            if (currentBoard[row - i][col + i].charAt(0) !== piece.charAt(0)) {
                moves.push({ row: row - i, col: col + i });
            }
            break;
        }
    }

    // Bottom-left
    for (let i = 1; row + i < 8 && col - i >= 0; i++) {
        if (currentBoard[row + i][col - i] === '--') {
            moves.push({ row: row + i, col: col - i });
        } else {
            if (currentBoard[row + i][col - i].charAt(0) !== piece.charAt(0)) {
                moves.push({ row: row + i, col: col - i });
            }
            break;
        }
    }

    // Bottom-right
    for (let i = 1; row + i < 8 && col + i < 8; i++) {
        if (currentBoard[row + i][col + i] === '--') {
            moves.push({ row: row + i, col: col + i });
        } else {
            if (currentBoard[row + i][col + i].charAt(0) !== piece.charAt(0)) {
                moves.push({ row: row + i, col: col + i });
            }
            break;
        }
    }

    return moves;
};

const getQueenMoves = (row: number, col: number, currentBoard: string[][]): Move[] => {
    return [...getRookMoves(row, col, currentBoard), ...getBishopMoves(row, col, currentBoard)];
};

const getKingMoves = (row: number, col: number, currentBoard: string[][]): Move[] => {
    const moves: Move[] = [];
    const piece = currentBoard[row][col];
    const kingMoves: Move[] = [
        { row: row - 1, col: col - 1 },
        { row: row - 1, col },
        { row: row - 1, col: col + 1 },
        { row, col: col - 1 },
        { row, col: col + 1 },
        { row: row + 1, col: col - 1 },
        { row: row + 1, col },
        { row: row + 1, col: col + 1 }
    ];

    kingMoves.forEach(move => {
        if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
            const targetPiece = currentBoard[move.row][move.col];
            if (targetPiece === '--' || targetPiece.charAt(0) !== piece.charAt(0)) {
                moves.push(move);
            }
        }
    });

    return moves;
};

const getPossibleMoves = (row: number, col: number, piece: string, currentBoard: string[][]): Move[] => {
    switch (piece) {
        case 'wp': return getWhitePawnMoves(row, col, currentBoard);
        case 'bp': return getBlackPawnMoves(row, col, currentBoard);
        case 'wr':
        case 'br': return getRookMoves(row, col, currentBoard);
        case 'wn':
        case 'bn': return getKnightMoves(row, col, currentBoard);
        case 'wb':
        case 'bb': return getBishopMoves(row, col, currentBoard);
        case 'wq':
        case 'bq': return getQueenMoves(row, col, currentBoard);
        case 'wk':
        case 'bk': return getKingMoves(row, col, currentBoard);
        default: return [];
    }
};


const isInCheck = (currentBoard: string[][], kingRow: number, kingCol: number, isWhite: boolean): 'check' | 'checkmate' | null => {
    const opponentColor = isWhite ? 'b' : 'w';

    const getAllPossibleMoves = (currentBoard: string[][], isWhite: boolean): Move[] => {
        const moves: Move[] = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = currentBoard[row][col];
                if (piece !== '--' && piece.charAt(0) === (isWhite ? 'w' : 'b')) {
                    moves.push(...getPossibleMoves(row, col, piece, currentBoard));
                }
            }
        }
        return moves;
    };

    const allOpponentMoves = getAllPossibleMoves(currentBoard, !isWhite);
    const isKingInCheck = allOpponentMoves.some(move => move.row === kingRow && move.col === kingCol);

    if (isKingInCheck) {
        const possibleMoves: Move[] = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = currentBoard[row][col];
                if (piece !== '--' && piece.charAt(0) === (isWhite ? 'w' : 'b')) {
                    possibleMoves.push(...getPossibleMoves(row, col, piece, currentBoard));
                }
            }
        }

        for (const move of possibleMoves) {
            const tempBoard = currentBoard.map(row => row.slice()); 
            tempBoard[move.row][move.col] = tempBoard[kingRow][kingCol];
            tempBoard[kingRow][kingCol] = '--';

            if (!isInCheck(tempBoard, move.row, move.col, isWhite)) {
                return 'check';
            }
        }

        return 'checkmate'; 
    }

    return null;
};


const isCheckmate = (currentBoard: string[][], kingRow: number, kingCol: number, isWhite: boolean): boolean => {
    if (!isInCheck(currentBoard, kingRow, kingCol, isWhite)) {
        return false;
    }

    const possibleMoves: Move[] = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = currentBoard[row][col];
            if (piece !== '--' && piece.charAt(0) === (isWhite ? 'w' : 'b')) {
                possibleMoves.push(...getPossibleMoves(row, col, piece, currentBoard));
            }
        }
    }

    for (const move of possibleMoves) {
        const tempBoard = currentBoard.map(row => row.slice()); // Copy the board
        tempBoard[move.row][move.col] = tempBoard[kingRow][kingCol];
        tempBoard[kingRow][kingCol] = '--';

        if (!isInCheck(tempBoard, move.row, move.col, isWhite)) {
            return false; 
        }
    }

    return true; 
};

const getKingPosition = (currentBoard: string[][], isWhite: boolean) => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (currentBoard[row][col] === (isWhite ? 'wk' : 'bk')) {
                return { row, col };
            }
        }
    }
    return { row: -1, col: -1 }; 
};

export { getPossibleMoves, isInCheck, isCheckmate, getKingPosition };
