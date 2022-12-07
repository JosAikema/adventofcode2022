console.log('part 2');
fs = require('fs')

let test_check = 24933642

const processInput = (inputFile) => {
    return fs.readFileSync(inputFile, 'utf8').split('\r\n');
}

//use obsolete uuid function because want to do it in VanillaJS
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getSize = (directories, id) => {
    let directory = directories.filter(dir => dir.id == id)[0]
    if (directory.children.length == 0) {
        return directory.size
    } else {
        let sum = 0
        for (let i=0; i < directory.children.length; i++) {
            sum = sum + getSize(directories, directory.children[i]);
            
        }
        return directory.size + sum;
    }
    
}


const solve = (input) => {
    
    currentDir = uuidv4();
    rootId = currentDir; 
    parentDir = currentDir;
    directories = [{name:'root', children: [], size: 0, parent: null, id: currentDir}];
    
    for (let i=1; i < input.length; i++) {
        let prompt = '';
        let command = '';
        let arg = '';
        if (input[i][0] == '$') {
            [prompt, command, arg] = input[i].split(' ');
            switch (command) {
                case 'cd':
                    
                    if (arg == '..') {
                        currentDir = parentDir
                        parentDir = directories.filter(dir => dir.id == currentDir)[0].parent;
                    } else {
                        currentDir = uuidv4();
                        
                        directories.filter(dir => dir.id == parentDir)[0].children.push(currentDir);
                        directories.push({name: arg, children: [], size: 0, parent: parentDir, id: currentDir})
                        parentDir = currentDir;
                        
                    }
                    
                    break;
                default:
                    break;
            }
        } else {
            let [one, two] = input[i].split(' ');
            if (one != 'dir') {
                directories.filter(dir => dir.id == currentDir)[0].size = directories.filter(dir => dir.id == currentDir)[0].size + parseInt(one);
            }
        } 
        
    }
    
    
    let spaceNeeded = 30000000 - (70000000 - getSize(directories, rootId))
    let minimal = 30000000
    
    directories.forEach(dir => {
        let size = getSize(directories, dir.id)
        if (size > spaceNeeded) {
            minimal = Math.min(minimal, size);
        } 

    });
    
    return minimal
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
