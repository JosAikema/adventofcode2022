console.log('part 1');
fs = require('fs')

let test_check = 2713310158

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\n');
}

const parseInput = (input) => {
    let monkeys = []
    let idx = 0
    while (idx < input.length) {
        //console.log(input[idx+1].split(': ')[1].split(', ').map((val) => parseInt(val)))
        let monkey = {
            id: input[idx].split(' ')[1],
            items: input[idx+1].split(': ')[1].split(', ').map((val) => parseInt(val)),
            operation: {
                operator : input[idx+2].split(': ')[1].split(' ')[3],
                value : input[idx+2].split(': ')[1].split(' ')[4]
            },
            test: {
                value: parseInt(input[idx+3].split(': divisible by ')[1]),
                valueTrue: parseInt(input[idx+4].split(': throw to monkey ')[1]),
                valueFalse: parseInt(input[idx+5].split(': throw to monkey ')[1]),
            },
            inspects: 0
        }
        monkeys.push(monkey)
        idx += 7
    }
    return monkeys
}


const solve = (input) => {
    let monkeys = parseInput(input)
    console.log(monkeys)
    let round = 1;

    while (true && round <=1000) {
        let modulo = 1
        //console.log('Round: ', round)
        for (let m of monkeys){
            modulo *= +m.test.value;
        }
        console.log('modulo: ', modulo)
        monkeys.forEach((monkey) => {
            //console.log('Monkey: ', monkey);
            let items = [...monkey.items]
            let inspects = 0;
            for (let i = 0; i < items.length; i++) {
                inspects++;
                let worryLevel = items[i];
                let value = 0;
                if (isNaN(monkey.operation.value)) {
                    value = items[i]
                } else {
                    value = parseInt(monkey.operation.value);
                }
                if (monkey.operation.operator === '*') {
                    if (monkey.operation.value !== 'old') {
                        worryLevel = items[i] * value
                    }
                } else if (monkey.operation.operator === '+') {
                    worryLevel = items[i] + value
                }
                //worryLevel = Math.floor(worryLevel / 3);
                worryLevel = worryLevel % modulo;
                if (worryLevel % monkey.test.value === 0) {
                    monkeys[monkey.test.valueTrue].items.push(worryLevel)
                } else {
                    monkeys[monkey.test.valueFalse].items.push(worryLevel)
                }
                monkey.items.shift();
            }
            monkey.inspects += inspects;

        })

        round++;

    }
    let sorted = monkeys.sort((a, b) => b.inspects - a.inspects);
    console.log(sorted[0].inspects);
    console.log(sorted[1].inspects);
    return sorted[0].inspects * sorted[1].inspects
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

