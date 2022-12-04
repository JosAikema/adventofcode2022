console.log('part 1');
fs = require('fs')

let test_check = 4


const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n').map(el=> el.split(','))
        ;
}

const solve = (input) => {

    let ctr = 0;
    input.forEach((line) => {
        let set1 = line[0].split('-').map(Number)
        let set2 = line[1].split('-').map(Number)
        if( (set1[0] >= set2[0] && set1[0] <= set2[1]) || (set1[1] >= set2[0] && set1[1] <= set2[1]) ||
            (set2[0] >= set1[0] && set2[0] <= set1[1]) || (set2[1] >= set1[0] && set2[1] <= set1[1]) ){
            ctr++
        }
    })

    return ctr
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

