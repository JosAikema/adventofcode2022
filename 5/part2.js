console.log('part 1');
fs = require('fs')

let test_check = 'MCD'

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8');
}

const doMove = (crates, move) => {
    let [txt1, count, txt2, from, txt3, to] = move.split(' ');

    let cratesToMove = crates[from-1].slice(-count)
    crates[from-1] = crates[from-1].slice(0, -count)
    crates[to-1] += cratesToMove

    return crates
}

const solve = (input) => {

    let [crates, moves] = input.split('\n\n');

    crates = crates.split('\n');

    moves.split('\n').forEach(move => {
        crates = doMove(crates, move);
    })


    let result = ''
    crates.forEach(crate => {
        result += crate.charAt(crate.length-1)
    })

    return result
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

