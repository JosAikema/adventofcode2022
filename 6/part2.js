console.log('part 1');
fs = require('fs')

let test_check = 19

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('');
}

function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}

const solve = (input) => {
    let len = 14
    let found = []

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < len; j++) {
            found.push(input[i+j]);
        }

        if (!checkIfDuplicateExists(found)) {
            console.log('4 found with index ' + (i+len));
            return i+len;
        } else {
            found = [];
        }

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

