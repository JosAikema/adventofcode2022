console.log('part 1');
fs = require('fs')

let test_check = 157

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n').map((val) => Array.from(val));
}

function intersect(a, b) {
    let t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}
const toPriority = (val) => {
    if (val == val.toLowerCase()){
        return val.charCodeAt(0) - 96;
    } else {
        return val.charCodeAt(0) - 38
    }
}

const solve = (input) => {
    let sum = 0;
    input.forEach((rucksack => {
        let middleIndex = Math.ceil(rucksack.length / 2);
        let answer = intersect(rucksack.slice().splice(0, middleIndex), rucksack.slice().splice(-middleIndex))[0];
        sum = sum + toPriority(answer);
    }))
    return sum
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

