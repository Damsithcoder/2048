import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(4).fill().map(() => Array(4).fill(0)))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true) // Show instructions by default
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    initializeBoard()
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const initializeBoard = () => {
    const newBoard = Array(4).fill().map(() => Array(4).fill(0))
    addNewTile(newBoard)
    addNewTile(newBoard)
    setBoard(newBoard)
    setGameOver(false)
    setScore(0)
  }

  const addNewTile = (currentBoard) => {
    const emptyCells = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) {
          emptyCells.push({ x: i, y: j })
        }
      }
    }
    if (emptyCells.length > 0) {
      const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      currentBoard[x][y] = Math.random() < 0.9 ? 2 : 4
    }
  }

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

    if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) > minSwipeDistance) {
      if (isHorizontalSwipe) {
        if (distanceX > 0) {
          handleMove('ArrowLeft')
        } else {
          handleMove('ArrowRight')
        }
      } else {
        if (distanceY > 0) {
          handleMove('ArrowUp')
        } else {
          handleMove('ArrowDown')
        }
      }
    }
  }

  const handleMove = (direction) => {
    if (gameOver) return

    let moved = false
    const newBoard = JSON.parse(JSON.stringify(board))

    switch (direction) {
      case 'ArrowUp':
        moved = moveUp(newBoard)
        break
      case 'ArrowDown':
        moved = moveDown(newBoard)
        break
      case 'ArrowLeft':
        moved = moveLeft(newBoard)
        break
      case 'ArrowRight':
        moved = moveRight(newBoard)
        break
      default:
        return
    }

    if (moved) {
      addNewTile(newBoard)
      setBoard(newBoard)
      checkGameOver(newBoard)
    }
  }

  const handleKeyPress = (event) => {
    event.preventDefault()
    handleMove(event.key)
  }

  const moveLeft = (currentBoard) => {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      const row = currentBoard[i].filter(cell => cell !== 0);
      let newRow = [];
      
      // Merge tiles
      for (let j = 0; j < row.length; j++) {
        if (row[j] === row[j + 1]) {
          newRow.push(row[j] * 2);
          setScore(prev => prev + row[j] * 2);
          j++;
          moved = true;
        } else {
          newRow.push(row[j]);
        }
      }
      
      // Fill with zeros
      while (newRow.length < 4) {
        newRow.push(0);
      }
      
      if (JSON.stringify(currentBoard[i]) !== JSON.stringify(newRow)) {
        moved = true;
      }
      currentBoard[i] = newRow;
    }
    return moved;
  };

  const moveRight = (currentBoard) => {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      const row = currentBoard[i].filter(cell => cell !== 0);
      let newRow = [];
      
      // Merge tiles
      for (let j = row.length - 1; j >= 0; j--) {
        if (row[j] === row[j - 1]) {
          newRow.unshift(row[j] * 2);
          setScore(prev => prev + row[j] * 2);
          j--;
          moved = true;
        } else {
          newRow.unshift(row[j]);
        }
      }
      
      // Fill with zeros
      while (newRow.length < 4) {
        newRow.unshift(0);
      }
      
      if (JSON.stringify(currentBoard[i]) !== JSON.stringify(newRow)) {
        moved = true;
      }
      currentBoard[i] = newRow;
    }
    return moved;
  };

  const moveUp = (currentBoard) => {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      let column = [];
      for (let i = 0; i < 4; i++) {
        if (currentBoard[i][j] !== 0) {
          column.push(currentBoard[i][j]);
        }
      }
      
      let newColumn = [];
      // Merge tiles
      for (let i = 0; i < column.length; i++) {
        if (column[i] === column[i + 1]) {
          newColumn.push(column[i] * 2);
          setScore(prev => prev + column[i] * 2);
          i++;
          moved = true;
        } else {
          newColumn.push(column[i]);
        }
      }
      
      // Fill with zeros
      while (newColumn.length < 4) {
        newColumn.push(0);
      }
      
      // Update the board
      for (let i = 0; i < 4; i++) {
        if (currentBoard[i][j] !== newColumn[i]) {
          moved = true;
        }
        currentBoard[i][j] = newColumn[i];
      }
    }
    return moved;
  };

  const moveDown = (currentBoard) => {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      let column = [];
      for (let i = 0; i < 4; i++) {
        if (currentBoard[i][j] !== 0) {
          column.push(currentBoard[i][j]);
        }
      }
      
      let newColumn = [];
      // Merge tiles
      for (let i = column.length - 1; i >= 0; i--) {
        if (column[i] === column[i - 1]) {
          newColumn.unshift(column[i] * 2);
          setScore(prev => prev + column[i] * 2);
          i--;
          moved = true;
        } else {
          newColumn.unshift(column[i]);
        }
      }
      
      // Fill with zeros
      while (newColumn.length < 4) {
        newColumn.unshift(0);
      }
      
      // Update the board
      for (let i = 0; i < 4; i++) {
        if (currentBoard[i][j] !== newColumn[i]) {
          moved = true;
        }
        currentBoard[i][j] = newColumn[i];
      }
    }
    return moved;
  };

  const checkGameOver = (currentBoard) => {
    // Check if board is full
    const isBoardFull = currentBoard.every(row => row.every(cell => cell !== 0))
    if (!isBoardFull) return

    // Check for possible moves
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j]) ||
          (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1])
        ) {
          return
        }
      }
    }
    setGameOver(true)
  }

  const getCellColor = (value) => {
    const colors = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e'
    }
    return colors[value] || '#cdc1b4'
  }

  return (
    <div className="game-container">
      <div className="header">
        <div className="title">2048</div>
        <div className="controls">
          <div className="score-container">
            <div className="score-label">Score</div>
            <div className="score">{score}</div>
          </div>
          <button 
            className="reset-button"
            onClick={() => {
              setScore(0);
              initializeBoard();
            }}
          >
            Reset
          </button>
          <button 
            className="instructions-button"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            {showInstructions ? 'Hide Instructions' : 'How to Play'}
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="instructions-panel">
          <h2>How to Play 2048</h2>
          <div className="instructions-content">
            <div className="instruction-item">
              <h3>🎮 Controls</h3>
              <p>Use any of these controls to move ALL tiles at once:</p>
              <ul>
                <li>Arrow keys on keyboard</li>
                <li>Swipe on touch screens</li>
                <li>Click the arrow buttons on the right</li>
              </ul>
            </div>
            <div className="instruction-item">
              <h3>🎯 Goal</h3>
              <p>Combine tiles with the same numbers to create a tile with the number 2048!</p>
            </div>
            <div className="instruction-item">
              <h3>📝 Rules</h3>
              <ul>
                <li>All tiles move together in the direction you choose</li>
                <li>When two tiles with the same number touch, they merge into one!</li>
                <li>Each move, a new tile appears (either 2 or 4)</li>
                <li>The game ends when you can't make any more moves</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="game-area">
        <div 
          className="grid-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {board.map((row, i) => (
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`grid-cell ${cell ? 'tile' : ''}`}
                style={{
                  backgroundColor: getCellColor(cell),
                  color: cell <= 4 ? '#776e65' : '#f9f6f2'
                }}
              >
                {cell || ''}
              </div>
            ))
          ))}
        </div>

        <div className="control-buttons">
          <button onClick={() => handleMove('ArrowUp')} className="control-button">⬆️</button>
          <div className="horizontal-buttons">
            <button onClick={() => handleMove('ArrowLeft')} className="control-button">⬅️</button>
            <button onClick={() => handleMove('ArrowRight')} className="control-button">➡️</button>
          </div>
          <button onClick={() => handleMove('ArrowDown')} className="control-button">⬇️</button>
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <div className="game-over-text">Game Over!</div>
          <button 
            className="try-again-button"
            onClick={initializeBoard}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

export default App
