console.log('part 2');
fs = require('fs')

let test_check = 12

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\r\n').map((val) => val.replace(" ",""));
}

const solve = (input) => {

    const winMatrix = {
        'AY': 1,
        'BX': 1,
        'CZ': 1,
        'AZ': 2,
        'BY': 2,
        'CX': 2,
        'AX': 3,
        'BZ': 3,
        'CY': 3
    }
    win = 0;
    
    input.forEach((game) => {
        win = win + (game[1].charCodeAt(0)-88) * 3
        win = win + winMatrix[game];
    })
    return win;
}

let test_result = solve(processInput('./test.txt'));

if (test_result === test_check) {
    console.log('Test passed')
    console.log('Test: ', test_result)
    console.log('Answer: ', solve(processInput('input.txt')))
} else {
    console.log('test failed')
    console.log('Test: ', test_result)
}

