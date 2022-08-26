import { DataFactory, Store } from 'n3';
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

const store = new Store();

store.add(myQuad)

store.add(quad(
    namedNode('http://ex.org/Pluto'),
    namedNode('http://ex.org/type'),
    namedNode('http://ex.org/Dog'))
);

for (const quad of store)
    console.log(quad);


