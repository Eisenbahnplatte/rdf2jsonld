"use strict";
exports.__esModule = true;
var n3_1 = require("n3");
var namedNode = n3_1.DataFactory.namedNode, literal = n3_1.DataFactory.literal, defaultGraph = n3_1.DataFactory.defaultGraph, quad = n3_1.DataFactory.quad;
var myQuad = quad(namedNode('https://ruben.verborgh.org/profile/#me'), namedNode('http://xmlns.com/foaf/0.1/givenName'), literal('Ruben', 'en'), defaultGraph());
// console.log(myQuad.termType);              // Quad
// console.log(myQuad.value);                 // ''
// console.log(myQuad.subject.value);         // https://ruben.verborgh.org/profile/#me
// console.log(myQuad.object.value);          // Ruben
// console.log(myQuad.object.datatype.value); // http://www.w3.org/1999/02/22-rdf-syntax-ns#langString
// console.log(myQuad.object.datatype);
var store = new n3_1.Store();
store.add(myQuad);
store.add(quad(namedNode('http://ex.org/Pluto'), namedNode('http://ex.org/type'), namedNode('http://ex.org/Dog')));
for (var _i = 0, _a = store.match(undefined, undefined, undefined, undefined); _i < _a.length; _i++) {
    var quad_1 = _a[_i];
    console.log(quad_1);
}
