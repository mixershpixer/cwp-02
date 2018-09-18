// server.js
const net = require('net');
const fs = require('fs');
const port = 8124;
let seed = 0;
const log = fs.createWriteStream('client_id.txt');

const server = net.createServer((client) => {
	client.id = Date.now() + seed++;
	client.setEncoding('utf8');

	console.log('[' + formatDate() + ']: ' +'Client #' + client.id + ' connected\n');
	log.write('[' + formatDate() + ']: ' +'Client #' + client.id + ' connected\n');

	client.on('data', (data) => {
		if (data === 'QA') client.write('ACK');
        else {
        	let answr = Math.floor(Math.random() * 2).toString();
        	log.write('[' + formatDate() + '][#' + client.id + '] > Data: ' + data + '; Answer: ' + answr + '\n');
	        client.write(answr);	
	    }
	});

	client.on('end', () => {
		console.log('[' + formatDate() + ']: ' +'Client #' + client.id + ' disconnected\n');
		log.write('[' + formatDate() + ']: ' +'Client #' + client.id + ' disconnected\n');
	});
});

server.listen(port, () => {
	console.log(`Server listening on localhost:${port}`);
});

function formatDate() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}