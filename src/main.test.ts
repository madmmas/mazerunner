import { parse_file_contents } from './main'

const fileContents = 
`5 5
1 1
3 3
1 1 1 1 1
1 0 1 0 1
1 0 1 0 1
1 0 0 0 1
1 1 1 1 1
` 

// test whether the file contents are parsed correctly
test('File contents can parse properly.', () => {
    const result = parse_file_contents(fileContents) as [number[][], number[], number[]]
    console.log(result)
    expect(result).toEqual(
        [
            [
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,0,1,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ],
            [1,1],
            [3,3]
        ]
    );
});
