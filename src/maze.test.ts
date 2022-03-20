import {Maze} from './maze';

const maze_matrix = [
                        [1,1,1,1,1],
                        [1,0,1,0,1],
                        [1,0,1,0,1],
                        [1,0,0,0,1],
                        [1,1,1,1,1]
                    ];
const start_pos = [1,1];
const end_pos = [3,3];

// mock if object is initalized properly
describe("test matrix and start and end positions", () => {
    it("has default behaviour", () => {
      // Object Initialization
      const mazeTest = new Maze(maze_matrix, start_pos, end_pos);
  
      // Get the matrix, start and end positions
      const values = mazeTest.GetMatrixStartEndPositions();

      // Assert the values
      expect(values).toEqual([maze_matrix, start_pos, end_pos]);
    });    
});