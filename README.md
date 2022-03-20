# Installation:
To run the project it was assumed that you have already nodejs, npm and yarn installed in the system. If not then you need to install it in the system.

---
If the system does not have yarn, then use the following command in the terminal:
```console
npm install --global yarn
```

To load all the necessary packages run the following command in the terminal:
```console
npm install
```

To run the project run the following command in the terminal:
```console
yarn cli
```

To test the project run the following command in the terminal:
```console
yarn test
```

---

The project input files are located in the input folder '/maze-input-files'. All the input files are already provided in the folder.
The project output will be displayed in the console and also written in the output directory '/maze-output-files'. 
The file names of the output will be the same as the input file names with '_solution' appended to the file name.
The execution time of the project will be displayed in the console.

---

## Complexity of the solution:
The complexity of the solution is O(NM) where N and M are the number of rows and columns in the maze respectively.

## Complexity of the problem:
The algorithm is based on the concept of DFS. The algorithm is implemented using a stack.
The algorithm also used memoization to avoid the same node being visited again. 
The total number of nodes visited is 4*N*M in worst case scenario.

