// This will be used in case anyone access the site by it's *.netlify.app domain name
const defaultDestination = 'https://www.ucsusa.org';

const fs = require('fs');
const contents = fs.readFileSync( './src/data.tsv', 'utf8' ).split( "\n" );
let redirects = [];

// Loop through each of the domain/destination pairs...
for( let i = 0; i < contents.length; i++ ) {
	let line = contents[i].split("\t");
	if( line.length === 2 ) {
		// and build the four fines for each pair
		let domain = line[0].trim();
		let destination = line[1].trim();
		console.log( 'Redirecting ' + domain + ' to ' + destination );
		redirects.push( "http://"+domain+"/*\t"+destination+"\t301!" );
		redirects.push( "https://"+domain+"/*\t"+destination+"\t301!" );
		redirects.push( "http://www."+domain+"/*\t"+destination+"\t301!" );
		redirects.push( "https://www."+domain+"/*\t"+destination+"\t301!" );
	} else {
		console.log( 'Ignoring line ' + ( i + 1 ) );
	}
}
// set up a fallback redirection to your defaultDestination
console.log( 'Redirecting default subdomain to ' + defaultDestination );
redirects.push( "/*\t" + defaultDestination + "\t301!" );
// Add an extra newline
redirects.push('');
// Write the redirects file.
fs.writeFileSync( './public/_redirects', redirects.join("\n") );