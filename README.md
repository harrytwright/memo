## Architecture

### `useEngine`

> May create a separate engine object to replace the ones from stockfish itself

Create a new engine object from stockfish, and a `send` UCI message command.

```jsx
import useEngine from "./hooks/useEngine";

const [engine, send] = useEngine();

send('uci');

engine.onMessage((line) => {
  ...
})
```

### ChessContext

> This is an idea to hold the chess game data, and handles the game, so you can change the player and the game staying, 
> only re-endering the board

### `useStockfish`

> This is an idea to allow multiple usages, and to pull the amount of code out of a page/controller
> and place it inside a hook

### `withMemo` or `MemorisationEngine`

> This is the code for setting up the memorisation table, could be built into the page, or here, will see

## Basic Idea of UI logic

```jsx
const useChess = () => {
  const game = useChessProvider()

  // ...

  return {..., game}
}

const Game = withChessProvider({ player, opponent }) => {
  const { fen, lastMove, handleMove } = useChess()

  // ...

  return (
    <Chessground fen={fen} lastMove={lastMove} onMove={handleMove} />
  )
})

const App = () => {
  return (
    <Game player={{ name: 'Hello' }} opponent={{ name: 'World' }} />
  )
}

// 
```
