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
    const CRT = [[], [], [], [], [], []];

    while (true && idx < input.length) {

        if ((cycle - 20) % 40 === 0) {
            //console.log('Cycle: ', cycle, 'x: ', x);
            score += (x * cycle)
        }

        let yPixels = Math.floor((cycle - 1) / 40);
        let xPixels = cycle - yPixels * 40 - 1;
        CRT[yPixels][xPixels] = [x - 1, x, x + 1].includes(xPixels) ? '#' : '.';

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
    CRT.forEach((line) => console.log(line.join(' ')));
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

