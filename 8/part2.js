console.log('part 2');
fs = require('fs')

let test_check = 8

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n').map(el=> el.split('').map((val) => parseInt(val)));
}

const solve = (input) => {
    let max = 0;

    for (let i = 1; i < input.length-1; i++) {
        for (let j = 1; j < input[i].length-1; j++) {

            let treeHeight = input[i][j];

            let left = input[i].slice(0, j);
            let checkedLeft = 0;
            for (let k = left.length-1; k >= 0; k--) {

                checkedLeft++;
                if (left[k] >= treeHeight) {
                    break;
                }
            }


            let right = input[i].slice(j+1);
            let checkedRight = 0;
            for (let k = 0; k < right.length; k++) {
                checkedRight++;
                if (right[k] >= treeHeight) {
                    break;
                }
            }

            let up = input.slice(0, i).map(el => el[j]);
            let checkedUp = 0;
            for (let k = up.length-1; k >= 0; k--) {
                checkedUp++;
                if (up[k] >= treeHeight) {
                    break;
                }
            }

            let bottom = input.slice(i+1).map(el => el[j]);
            let checkedBottom = 0;
            for (let k = 0; k < bottom.length; k++) {
                checkedBottom++;
                if (bottom[k] >= treeHeight) {
                    break;
                }
            }

            let scenicScore = checkedLeft * checkedRight * checkedUp * checkedBottom;
            max = Math.max(max, scenicScore);
        }
    }
    return max
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

