window.addEventListener('load', function() {


  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');


  context.imageSmoothingEnabled = false;
  document.addEventListener('contextmenu', event => event.preventDefault());

  const loadImage = async function(url) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      }
      image.src = url;
    });
  }

  const game = async function() {

    const minesheet = await loadImage('./images/minesheet.png');
    const tileRow = 8;
    const tileSize = minesheet.width/tileRow;


    const tilesheetData = [];

    for (let i = 0; i < minesheet.height; i+=tileSize) {
      for (let j = 0; j < minesheet.width; j+=tileSize) {
        const tile = {
          x: j,
          y: i
        };
        tilesheetData.push(tile);
      }
    }

    const tileNumbers = [];

    for (let i = 8; i < tilesheetData.length; i++) {
      tileNumbers.push(tilesheetData[i]);
    }
    
    console.log('tileData', tilesheetData);
    console.log('tileNumbers', tileNumbers);

    const tileStatuses = {
      hidden: 'hidden',
      revealed: 'revealed',
      marked: 'marked',
      number: 'number'
    };



    const getCanvasRelative = function(event) {
      const boundary = canvas.getBoundingClientRect();
      // console.log('Event stuff', event.clientX, event.clientY, boundary.left, boundary.right);
      const posX = event.clientX - boundary.left;
      const posY = event.clientY - boundary.top;
      return {
        x: Math.floor(posX/tileSize),  
        y: Math.floor(posY/tileSize),
        eventX: posX,
        eventY: posY
      }
    }

    const gameBoard = makeGameBoard(10, 10);
    console.log('gameBoard', gameBoard);


    for (let i = 0; i < gameBoard.grid.length; i++) {
      for (let j = 0; j < gameBoard.grid[i].length; j++) {
      const cell = gameBoard.grid[i][j];

      context.drawImage(
        minesheet,
        0, 0,
        tileSize, tileSize,
        cell.x*tileSize, cell.y*tileSize,
        tileSize, tileSize
      );
      }
    }


    canvas.addEventListener('click', event => {
      const pos = getCanvasRelative(event);
      console.log('pos', pos);
      const clickedTile = gameBoard.grid[pos.y][pos.x];
      console.log('clickedTile:', clickedTile);
      
      const adjTiles = findNearTiles(clickedTile);
      console.log('adjTiles', adjTiles);
      revealTile(clickedTile);
    });

    canvas.addEventListener('contextmenu', event => {
      const pos = getCanvasRelative(event);
      const clickedTile = gameBoard.grid[pos.y][pos.x];
      let sourceX = 0;
      console.log('contextmenu', clickedTile);
      console.log(clickedTile.status === tileStatuses.marked);
      if (clickedTile.status !== tileStatuses.marked) {
        clickedTile.status = tileStatuses.marked;
        sourceX = tilesheetData[3].x;
      } else {
        clickedTile.status = tileStatuses.hidden;
        sourceX = 0;
      }
      context.drawImage(
        minesheet,
        sourceX, 0,
        tileSize, tileSize,
        pos.x*tileSize, pos.y*tileSize,
        tileSize, tileSize
      );
    });

    canvas.addEventListener('mousemove', event => {
      const pos = getCanvasRelative(event);
    });

    function makeGameBoard(gridSize, numOfMines) {
      
      canvas.width = gridSize*tileSize;
      canvas.height = gridSize*tileSize;
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
      console.log('canvasSize', canvas.width, canvas.height);
      const mineGrid = createMines(gridSize, numOfMines);

      let grid = [];
      for (let i = 0; i < gridSize; i++) {
        const array = [];
        for (let j = 0; j < gridSize; j++) {
          const cell = {
            x: j,
            y: i,
            isMine: mineGrid.some(mine => positionMatch(mine, { x: j, y: i })),
            status: 'hidden',
            tile: 0,
          };
          
          if (cell.isMine) {
            cell.tile = 6;
          }
          array.push(cell);
        }
        grid.push(array);
      }
      
      const gameBoard = {
        grid: grid,
        mineGrid: mineGrid
      };

      return gameBoard;
    }

    function createMines(gridSize, numOfBombs) {
      const positions = [];
      randomNum(gridSize);
      while (positions.length < numOfBombs) {
        const pos = {
          x: randomNum(gridSize),
          y: randomNum(gridSize)
        };
        if (!positions.some((element => positionMatch(element, pos)))) {
          positions.push(pos);
        }
      }
      return positions;
    }

    function positionMatch(a, b) {
      return a.x === b.x && a.y === b.y;
    }

    function randomNum(num) {
      const random = Math.floor(Math.random()*num);
      return random;
    }

    function findNearTiles(clickedTile) {
      const adjTiles = [];
      for (let yOffSet = -1; yOffSet <= 1; yOffSet++) {
        for (let xOffSet = -1; xOffSet <= 1; xOffSet++) {
          const adj = gameBoard.grid[clickedTile.y+yOffSet]?.[clickedTile.x+xOffSet];
          if (adj && clickedTile !== adj) adjTiles.push(adj);
        }
      }
      return adjTiles;
    }

    function revealTile(clickedTile) {
      if (clickedTile.status !== tileStatuses.hidden) return;
      if (clickedTile.isMine) {
        context.drawImage(
          minesheet,
          tilesheetData[6].x, 0,
          tileSize, tileSize,
          clickedTile.x*tileSize, clickedTile.y*tileSize,
          tileSize, tileSize
        );
        return;
      }
      
      clickedTile.status = tileStatuses.number;
      clickedTile.tile = 1;


      const adjTiles = findNearTiles(clickedTile);
      const mines = adjTiles.filter(tile => tile.isMine);
      if (mines.length === 0) {
        clickedTile.status = tileStatuses.revealed;
        clickedTile.tile = 1;
        context.drawImage(
          minesheet,
          tilesheetData[clickedTile.tile].x, tilesheetData[clickedTile.tile].y,
          tileSize, tileSize,
          clickedTile.x*tileSize, clickedTile.y*tileSize,
          tileSize, tileSize
        );
        adjTiles.forEach(tile => revealTile(tile));
      } else {
          context.drawImage(
            minesheet,
            tileNumbers[mines.length-1].x, tileNumbers[mines.length-1].y,
            tileSize, tileSize,
            clickedTile.x*tileSize, clickedTile.y*tileSize,
            tileSize, tileSize
          );
      }

      
    
    }
  }
  game();
});
