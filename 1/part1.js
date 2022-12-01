console.log('part 1');
fs = require('fs')

let test_check = 24000

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n').map((val) => parseInt(val));
}

const solve = (input) => {
    let elves = [];
    let sum = 0;
    let elf_index = 0
    input.forEach((val, index) => {
        if (isNaN(val)) {
            elves.push({id: elf_index, calories: sum})
            sum = 0
            elf_index++;
        } else {
            sum += val
        }
    })
    let greatest = Math.max(...elves.map(o => o.calories))
    return greatest
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

