fs = require('fs')

let test_check = 36
const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n').map((val) => val.split(' '));
}

const movesDefinition = {
    R: {
        x: 1,
        y: 0,
    },
    L: {
        x: -1,
        y: 0,
    },
    U: {
        x: 0,
        y: -1,
    },
    D: {
        x: 0,
        y: 1,
    },
};

function solve(lines) {

    let posHead = { x: 0, y: 0 }
    let posTail = { x: 0, y: 0 }

    const visited = new Set();

    for (const line of lines) {

        for (let i = 0; i < parseInt(line[1]); i++) {

            const delta = movesDefinition[line[0]];
            posHead.x += delta.x;
            posHead.y += delta.y;

            const distance = Math.max(
                Math.abs(posTail.x - posHead.x),
                Math.abs(posTail.y - posHead.y)
            );
            if (distance > 1) {
                // Move this point
                const directionX = posHead.x - posTail.x;
                posTail.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
                const directionY = posHead.y - posTail.y;
                posTail.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
            }

            visited.add(posTail.x + '-' + posTail.y);
        }
    }

    return visited.size;
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