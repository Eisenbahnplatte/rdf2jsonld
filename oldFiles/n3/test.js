import { DataFactory, Store } from 'n3';
import {  turtleTest } from './url2rdf.js'

let quadstream = turtleTest()

let store = new Store(quadstream);

for (const quad of store)
    console.log(quad);