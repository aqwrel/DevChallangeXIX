var numEnclaves = function(grid) {
    if(!grid.length) return

    const checkEnclaves = (rowIndex, colIndex) => {
        if(grid[rowIndex] === undefined) return false
        if(grid[rowIndex][colIndex] === undefined) return false
        if(grid[rowIndex][colIndex] !== 1) return false

        // vertical
        const y = checkEnclaves(rowIndex - 1, colIndex) || checkEnclaves(rowIndex + 1, colIndex)
        
        // horizontal
        const x = checkEnclaves(rowIndex, colIndex - 1) || checkEnclaves(rowIndex, colIndex + 1)    

        return y || x
    }

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
            if(grid[rowIndex][colIndex] === 1) {
                checkEnclaves(rowIndex, colIndex)
            }
        }
    }
};


const grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]

numEnclaves(grid)