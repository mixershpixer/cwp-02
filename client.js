// client.js
const net = require('net');
const fs = require('fs');
const port = 8124;

const client = new net.Socket();

let ARRQ;
let CURRENTID = -1;

client.setEncoding('utf8');
client.connect(port, () => {
	console.log('Connected');
  	fs.readFile('qa.json', (e, text) => {
        if (e) console.log(e);
        else {
            ARRQ = shuffle(JSON.parse(text));
            client.write('QA');
        }
    });
});

client.on('data', (data) => {
	//console.log(data);
	if (data === 'DEC') client.destroy();
	else if (data === 'ACK') sendQuestion();
	else { 
		let ANSW = 'Bad answer';
		if (data === '1') ANSW = ARRQ[CURRENTID].g;
		console.log('Question: ' + ARRQ[CURRENTID].q);
    console.log('Answer: ' + ARRQ[CURRENTID].g);
    console.log('Server Answer: ' + ANSW);
    sendQuestion();
	}
});

client.on('close', () => console.log('Connection closed'));

function shuffle(array) {
	let n;
	var result = [];
	while (array.length > 0)
	{
		n = Math.floor(Math.random() * array.length);
		result.push(array[n]);
		array.splice(n, 1);
	}
	return result;
}

function sendQuestion() {
	if (CURRENTID < ARRQ.length - 1) client.write(ARRQ[++CURRENTID].q);
    else client.destroy();
}