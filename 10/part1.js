console.log('part 1');
fs = require('fs')

let test_check = 13140

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n').map((val) => val.split(' '));
}

const solve = (input) => {
    //console.log(input)
    let x = 1;
    let cycle = 1;
    let second_cycle = 0
    let idx = 0;
    let score =0;
    while (true && idx < input.length) {

        if ((cycle - 20) % 40 === 0) {
            //console.log('Cycle: ', cycle, 'x: ', x);
            score += (x * cycle)
        }
        if (input[idx][0] !== 'noop') {
            if (second_cycle < 1) {
                second_cycle++
            } else {
                x += parseInt(input[idx][1]);
                second_cycle = 0
                idx++;
            }
        } else {
            idx++;
        }



        cycle++;
    }
    console.log(score);
    return score
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

