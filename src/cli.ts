#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import {performance} from 'perf_hooks';

import { read_file, parse_and_solve_maze, write_to_file } from './main';

const full_path_name: string = path.join(__dirname, '../maze-input-files');

// total time to run all problem files
let totol_time = 0;

// loop through all files in the input directory
fs.readdir(full_path_name, (_, files) => {
    // for each file in the input directory parse and solve the maze
    files.forEach(file => {
    //    console.log(file);
       // read the file contents if the file exists in the input directory
       const fileContents: (string|boolean) = read_file(file);
       if(fileContents){
            // start timer
            const start = performance.now();
            // parse the file contents and solve the maze
            const solution: (string|boolean) = parse_and_solve_maze(fileContents as string);
            if(solution){
                // stop timer
                const end = performance.now();
                console.log(`${file} took ${(end-start).toFixed(2)} ms`);
                // total time to solve the problem
                totol_time += (end-start);
                // print the solution
                console.log(solution);
                // write the solution into the output file
                write_to_file(file, solution as string).then(()=>{  console.log(`${file} solution output written`)});
            }else{
                console.log(`${file} failed to solve`);
            }
       }
    })
    console.log(`Total time taken to solve all the problems: ${totol_time.toFixed(2)} ms`);
});
