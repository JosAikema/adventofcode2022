console.log('part 1');
fs = require('fs')

let test_check = 21

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n').map(el=> el.split('').map((val) => parseInt(val)));
}

const solve = (input) => {
    let edge = input[0].length * 2 + input.length * 2 - 4;

    let found = 0;
    for (let i = 1; i < input.length-1; i++) {
        for (let j = 1; j < input[i].length-1; j++) {
            let treeHeight = input[i][j];
            let left = input[i].slice(0, j);
            let right = input[i].slice(j+1);
            let top = input.slice(0, i).map(el => el[j]);
            let bottom = input.slice(i+1).map(el => el[j]);
            if (treeHeight > Math.max.apply(Math, left) || treeHeight > Math.max.apply(Math, right) ||
                treeHeight > Math.max.apply(Math, top) || treeHeight > Math.max.apply(Math, bottom)) {
            found++;
            }
        }
    }
    return edge + found
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

