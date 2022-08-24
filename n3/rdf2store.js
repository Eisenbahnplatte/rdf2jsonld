const N3 = require('n3');
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

const myQuad = quad(
  namedNode('https://ruben.verborgh.org/profile/#me'),
  namedNode('http://xmlns.com/foaf/0.1/givenName'),
  literal('Ruben', 'en'),
  defaultGraph(),
);

console.log(myQuad.termType);              // Quad
console.log(myQuad.value);                 // ''
console.log(myQuad.subject.value);         // https://ruben.verborgh.org/profile/#me
console.log(myQuad.object.value);          // Ruben
console.log(myQuad.object.datatype.value); // http://www.w3.org/1999/02/22-rdf-syntax-ns#langString
console.log(myQuad.object.language);

const store = new N3.Store();

store.add(myQuad)

for (const quad of store)
    console.log(quad);
rdf2store()

async function rdf2store(){
    const store = new N3.Store(
        [(
        namedNode('http://ex.org/Pluto'),
        namedNode('http://ex.org/type'),
        namedNode('http://ex.org/Dog')
        ), 
        (
        namedNode('http://ex.org/Mickey'),
        namedNode('http://ex.org/type'),
        namedNode('http://ex.org/Mouse')
        )]);
        
    store.add(
        namedNode('http://ex.org/Pluto'),
        namedNode('http://ex.org/type'),
        namedNode('http://ex.org/Dog')
    );
    store.add(
        namedNode('http://ex.org/Mickey'),
        namedNode('http://ex.org/type'),
        namedNode('http://ex.org/Mouse')
    );

    // Retrieve all quads
    for (const quad of store)
        console.log(quad);
    // Retrieve Mickey's quads
    for (const quad of store.match(namedNode('http://ex.org/Mickey'), null, null))
        console.log(quad);

    console.log(store)
    // console.log(store.match(undefined, undefined, undefined, undefined))
    // let str = await streamToString(store.match(undefined, undefined, undefined, undefined))
    // console.log(str)
}

/**
 * turns a stream into a string
 * @param stream -  The stream that needs to be turned into a string.
 * @returns {Promise<unknown>}
 */
function streamToString (stream) {

    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}