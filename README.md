# Memcrab Matrix — Frontend Test Task

An interactive M×N matrix app built with **React 19 + TypeScript + Vite + SCSS**.  
No Redux, no UI libraries, no CSS-in-JS — plain React Context + `useReducer`.


## Features

- **Generate** an M×N matrix (M, N: 0–100) filled with random 3-digit numbers.
- **Increment** any cell value by clicking on it.
- **Highlight nearest X cells** — hover a data cell to highlight the X closest values across the entire matrix.
- **Row sum** — rightmost column shows the sum for each row.
- **Row percentage mode** — hover a sum cell to replace all values in that row with their % of the total, with a blue heat-map background.
- **60th-percentile footer** — bottom row shows the 60th-percentile value for each column.
- **Add row** — appends a new random row at the end.
- **Remove row** — removes any row; sum and percentile values recalculate automatically.

