console.log('part 2');
fs = require('fs')

let test_check = 45000

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


    elves.sort((a, b) => { return b.calories - a.calories })

    return elves[0].calories + elves[1].calories + elves[2].calories;
}

const test_input = processInput('test.txt');
const input = processInput('input.txt');

let test_result = solve(test_input);
if (test_result === test_check) {
    console.log('test passed')
    console.log('Test: ', test_result)
    console.log('Answer: ', solve(input))
} else {
    console.log('test failed')
    console.log('Test: ', test_result)
}

