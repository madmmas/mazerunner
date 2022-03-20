export class Maze{
    start: number[];
    end: number[];
    matrix: number[][];
    original_matrix: number[][];
    stack: number[][];
    solved: boolean;

    constructor(matrix: number[][], start: number[], end: number[]){
        this.start = start;
        this.end = end;
        this.original_matrix = [...matrix];
        this.matrix = [];
        this.stack = [];
        this.solved = false;
    }

    // get the matrix, start and end positions
    GetMatrixStartEndPositions(): [number[][], number[], number[]]{
        return [this.original_matrix, this.start, this.end];
    }

    // check if the maze is solved
    IsSolved(): boolean{
        return this.solved;
    }

    // prepare the solution matrix for output
    prepareSolvedMaze(): void{
        // check if the maze is solved
        if(!this.solved){ return; }
        // copy the solution onto the maze matrix
        for(let i=0; i<this.stack.length; i++){
            this.matrix[this.stack[i][1]][this.stack[i][0]] = 2;
        }
        // copy the start position onto the maze matrix
        this.matrix[this.start[1]][this.start[0]] = 3;
        // copy the end position onto the maze matrix
        this.matrix[this.end[1]][this.end[0]] = 4;
    }

    // solve the maze
    Solve(): boolean{
        this.matrix = [...this.original_matrix];
        this.stack = [this.start];            
        while(this.stack.length > 0){
            const current_pos: number[] = this.stack[this.stack.length-1];
            // mark this position as visited
            this.matrix[current_pos[1]][current_pos[0]] = -1;
            // if current_pos is the end_pos retrun the stack of positions
            if(current_pos[0] === this.end[0] && current_pos[1] === this.end[1]){
                // end of the solution
                console.log('solution found');
                this.solved = true;
                // prepare the solution matrix for output
                this.prepareSolvedMaze();
                return true;
            }
            // check if can move right
            if(this.matrix[current_pos[1]][current_pos[0]+1] === 0){
                this.stack.push([current_pos[0]+1, current_pos[1]]);
                continue;
            }
            // check if can move down
            if(this.matrix[current_pos[1]+1][current_pos[0]] === 0){
                this.stack.push([current_pos[0], current_pos[1]+1]);
                continue;
            }
            // check if can move left
            if(this.matrix[current_pos[1]][current_pos[0]-1] === 0){
                this.stack.push([current_pos[0]-1, current_pos[1]]);
                continue;
            }
            // check if can move up
            if(this.matrix[current_pos[1]-1][current_pos[0]] === 0){
                this.stack.push([current_pos[0], current_pos[1]-1]);
                continue;
            }
            
            // if no valid move pop the stack
            // console.log('no valid move')
            this.stack.pop();
        }
        return false;
    }
    

    // convert the maze matrix to a string
    GetSolution(): string{
        // check if the maze is solved
        if(!this.solved){ return ''; }
        let maze_string = '';
        const chr_map: string[] = [' ',' ', '#', 'X', 'S', 'E'];
        this.matrix.forEach(y => {
            y.forEach(x => {
                maze_string += chr_map[x+1];
            })
            maze_string += '\n';
        })
        return maze_string;
    }
}