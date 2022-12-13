console.log('part 1');
fs = require('fs')

let test_check = 13

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').trimEnd().split('\n\n').map((pair) => pair.split('\n').map(JSON.parse));;
}

const checkValues = (left, right) => {
    // console.log('left', left);
    // console.log('right', right);
    //Both numbers?
    if ((typeof left === 'number') && (typeof right === 'number')) {
        if (left === right) {
            return 0;
        } else {
            return left > right;
        }
    }

    //Convert to array if needed
    if (typeof left === 'number') {
        left = [left];
    } else if (typeof right === 'number') {
        right = [right];
    }

    //Check if there are enough items in the other array
    for (let i = 0; i < left.length; i++) {
        if (right[i] === undefined) {
            return 1;
        }
        //Check elements of that array
        const newCheck = checkValues(left[i], right[i]);
        if (newCheck !== 0) {
            return newCheck;
        }
    }
    if (left.length === right.length) {
        return 0;
    } else {
        return -1;
    }
}
const solve = (input) => {
    let ctr = 0;
    let idx = 1
    input.forEach((pair) => {
        let check = checkValues(pair[0], pair[1]);
        if (check <= 0) {
            ctr += idx
        }
        idx++
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

