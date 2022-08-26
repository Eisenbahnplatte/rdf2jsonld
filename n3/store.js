import { DataFactory, Store } from 'n3';
const { namedNode, literal, defaultGraph, quad } = DataFactory;
import rdfSerializer from 'rdf-serialize';
// import { pipeline } from 'stream/promises'; // --> Doesnt work because browserify doesnt recognize internal node modules
// import { namedNode } from '@rdfjs/data-model';

// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const $ = require( "jquery" );


// export async function toStore(quadStream) {

//   const store = new Store();
//   store.import(quadStream).on('end', ());  

//   store.add(quad(
//       namedNode('http://ex.org/Pluto'),
//       namedNode('http://ex.org/type'),
//       namedNode('http://ex.org/Dog'))
//   );

//   for (const myquad of store)
//     console.log(myquad);

//   return store

// }

function toStore(quadStream) {

  const store = new Store();

  return new Promise((resolve, reject) => {
    store
      .import(quadStream)
      .on('error', function (error) {
        reject(error);})
      .on('end', function () {
        resolve(store);})
      })

}

export async function calcPropertysAndObjects(quadStream) {

  let store = await toStore(quadStream)

  // create LD+Json Stream  
  let textStream = rdfSerializer.serialize(store.match(undefined, undefined, undefined, undefined), { contentType: 'application/ld+json' });

  // convert stream to string
  let nQuadsString = await streamToString(textStream);

  console.log(nQuadsString)


  // // We convert the RDF JSON-LD, which is JSON with semantics embedded.
  // let doc = await jsonld.fromRDF(nQuadsString, {format: 'application/n-quads'});

  // // We use the frame and the JSON-LD generated earlier to generate a new JSON-LD document based on the frame.
  // let framed = await jsonld.flatten(doc);
  // console.log(framed);
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


