const childProcess = require('child_process');
for(let i = 0; i<process.argv[2]; i++)
    childProcess.exec('node client.js', (e, stdout, stderr) => {
        if (e) { console.error(err); return; }
        console.log("Run child #" + i);
        console.log(stdout);
    });