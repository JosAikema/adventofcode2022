console.log('part 1');
fs = require('fs')

let test_check = 15

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\r\n').map((val) => val.replace(" ",""));
}

const solve = (input) => {
    const winMatrix = {
        'AX': 3,
        'BY': 3,
        'CZ': 3,
        'AY': 6,
        'BZ': 6,
        'CX': 6,
        'AZ': 0,
        'BX': 0,
        'CY': 0
    }

    win = 0;
    input.forEach((game) => {
        win = win + winMatrix[game];
        win = win + game[1].charCodeAt(0)-87
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

