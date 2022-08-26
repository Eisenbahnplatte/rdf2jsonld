import rdfParser from 'rdf-parse';
import { DataFactory, Store } from 'n3';
const { namedNode, literal, defaultGraph, quad } = DataFactory;
import { storeStream } from 'rdf-store-stream';
// const storeStream = require("rdf-store-stream").storeStream;
// const rdfSerializer = require("rdf-serialize").default;
import rdfSerializer from 'rdf-serialize'
// import { namedNode } from '@rdfjs/data-model';

// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const $ = require( "jquery" );

async function rdf2jsonld(rdfStr: string, contType:string, baseURI:string) {

  // We convert the rdf to an N-Quads string.
  let quadStream = rdfParser.parse(require('streamify-string')(rdfStr), {contentType: contType, baseIRI: baseURI})

  console.log(quadStream)
  const store = new Store();
  store.import(quadStream)
  // Import the stream into a store
  // const store = await storeStream(quadStream);

  // await store.add(
  //     namedNode('http://ex.org/Pluto'),
  //     namedNode('http://ex.org/type'),
  //     namedNode('http://ex.org/Dog')
  //   );

  // watch for quads
  for (const quad of store.match(undefined, undefined, undefined, undefined))
    console.log(quad);

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

/**
 * turns a stream into a string
 * @param stream -  The stream that needs to be turned into a string.
 * @returns {Promise<unknown>}
 */
 function printQuads (stream) {

  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => console.log(chunk));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

async function parseJsonLD(rdfStr) {

  // We convert the rdf to an N-Quads string.
  try{
    rdfParser.parse(require('streamify-string')(rdfStr), {contentType: "application/ld+json"})
  } catch(err){
    console.log(err)
  }

}

function turtleTest(){
  let turtleStr= `@prefix schema: <http://schema.org/> .
  <http://example.com/jane>
    schema:address [
      schema:addressLocality "Seattle" ;
      schema:addressRegion "WA" ;
      schema:postalCode "98052" ;
      schema:streetAddress "20341 Whitworth Institute 405 N. Whitworth" ;
      a schema:PostalAddress
    ] ;
    schema:colleague <http://www.xyz.edu/students/alicejones.html>, <http://www.xyz.edu/students/bobsmith.html> ;
    schema:email "mailto:jane-doe@xyz.edu" ;
    schema:image <https://json-ld.org/playground/janedoe.jpg> ;
    schema:jobTitle "Professor" ;
    schema:name "Jane Doe" ;
    schema:telephone "(425) 123-4567" ;
    schema:url <http://www.janedoe.com> ;
    a schema:Person .
    `;

    console.log(turtleStr);

    rdf2jsonld(turtleStr, 'text/turtle', "example.org");
}

async function fetchURL(){
    let url = (<HTMLInputElement>document.getElementById('myUrl')).value

    try{
        const response = await fetch(url, { 
            mode: 'cors',
            headers: {
                'Accept': ['application/ld+json','application/n-quads','application/n-triples', 'application/rdf+xml', 'text/turtle', 'text/html']
            } 
        })
        let data = await response.text()
        let contentType = response.headers.get("Content-Type")

        console.log(contentType)
        console.log(data)

        // console.log("headers")
        // for (let pair of response.headers.entries()) {
        //     console.log(pair[0]+ ': '+ pair[1]);
        //  }
    
        if (contentType.includes("text/html")){
            data = $($($.parseHTML( data )).filter("script")).filter('[type="application/ld+json"]');
    
            console.log("jsonLDstr")
            console.log(data);

            parseJsonLD(data)
        } else{

          if(contentType==="application/ld+json"){
            console.log("handle JSonLD")
            parseJsonLD(data)
          } else {
            rdf2jsonld(data, contentType, url)
          }
        }

    }catch(err){
        console.log(err)
    }
}

document.getElementById('turtleTestButton').addEventListener('click', turtleTest);

let button = document.getElementById('myButton'); // add id="my-button" into html
button.addEventListener('click', fetchURL);