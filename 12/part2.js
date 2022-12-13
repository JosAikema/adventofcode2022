console.log('part 1');
fs = require('fs')

let test_check = 29

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n');
}

const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];



function solve(input) {
    let starts = [];
    let endPoint;

    const map = input.map((line, i) =>
        line.split('').map((char, j) => {
            let elevation;
            if (char === 'S' || char === 'a') {
                elevation = 0;
                starts.push([i, j]);
            } else if (char === 'E') {
                elevation = 25;
                endPoint = [i, j];
            } else {
                elevation = char.codePointAt(0) - 'a'.codePointAt(0);
            }
            return elevation;
        })
    );

    let queue = starts.map((start) => ({ pos: start, steps: 0 }));
    let visited = [];
    while (queue.length) {
        const {
            pos: [i, j],
            steps,
        } = queue.shift();
        if (visited[i]?.[j]) {
            continue;
        }
        if (i === endPoint[0] && j === endPoint[1]) {
            return steps
            break;
        }
        for (const [di, dj] of dirs) {
            if (
                map[i + di]?.[j + dj] === undefined ||
                map[i + di][j + dj] > map[i][j] + 1 ||
                visited[i + di]?.[j + dj]
            ) {
                continue;
            }
            queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
        }
        visited[i] = visited[i] ?? [];
        visited[i][j] = 1;
    }
}

let test_result = solve(processInput('test.txt'));

if (test_result === test_check) {
    console.log('Test passed')
    console.log('Test: ', test_result)
    console.log('Answer: ', solve(processInput('input.txt')))
} else {
    console.log('test failed')
    console.log('Test: ', test_result)
}

