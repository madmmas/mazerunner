import * as fs from 'fs';
import * as path from 'path';
import {Maze} from './maze';

// read the file contents if the file exists in the input directory
export const read_file = (filename:string): (string|boolean)  => {

  const file_full_path_name: string = path.join(__dirname, '../maze-input-files/', filename)
  if (!fs.existsSync(file_full_path_name)) {
    // file not found
    console.log(`File ${file_full_path_name} not found`);
    return false;
  }
  const fileContents: string = fs.readFileSync(
    file_full_path_name,
    {
    encoding: 'utf-8',
    },
  );
  return fileContents;
}

// write solution string to file
export const write_to_file = async (filename: string, fileContents: string): Promise<boolean> => {
    const solution_file_path = path.join(__dirname, '../maze-output-files/', filename.replace('.txt', '_solution.txt'));
    fs.writeFileSync(solution_file_path, fileContents);
    return true;
}

// parse the file contents and solve the maze
export const parse_file_contents = (fileContents: string): (boolean|[number[][], number[], number[]]) => {

  const lines = fileContents.split(/\r?\n/)
  const matrix_dim: number[] = lines[0].split(' ').map(Number)

  const start_pos: number[] = lines[1].split(' ').map(Number)
  const end_pos: number[] = lines[2].split(' ').map(Number)
  const maze_lines = lines.slice(3).filter(line => line.length>0)
  
  const maze_matrix = maze_lines.map(line => line.split(' ').map(Number))

  // check if maze matrix is valid
  if(maze_matrix.length !== matrix_dim[1] || maze_matrix[0].length !== matrix_dim[0]){
    console.log('invalid maze matrix')
    return false
  }
  // check if start and end positions are valid
  // if start_pos is not valid, return false
  if(maze_matrix[start_pos[1]][start_pos[0]] !== 0){
    console.log('invalid start position')
    return false
  }
  // if end_pos is not valid, return false
  if(maze_matrix[end_pos[1]][end_pos[0]] !== 0){
    console.log('invalid end position')
    return false
  }

  return [maze_matrix, start_pos, end_pos]
}

export const parse_and_solve_maze = (fileContents: string): (string|boolean) => {

  const parse_contents = parse_file_contents(fileContents)
  if(!parse_contents){
    return false
  }

  const [maze_matrix, start_pos, end_pos] = parse_contents as [number[][], number[], number[]]
  const maze = new Maze(maze_matrix, start_pos, end_pos);
  
  if(maze.Solve()){
    return maze.GetSolution();
  }else{
    console.log('failed to solve');
    return false
  }
}
