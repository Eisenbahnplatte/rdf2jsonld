import { fetchURL, jsonldTest, turtleTest } from './url2rdf';
import { feedStore } from './store';
import { calcPropertysAndObjects } from './calculator'

async function fetchTurtle() {
    let quadstream = turtleTest();
    console.log(quadstream)
    let quads = await feedStore(quadstream);
    console.log(quads)
    await calcPropertysAndObjects(quads, "http://example.com/jane");
}

async function fetchJsonLD() {
    let quadstream = jsonldTest();
    console.log(quadstream)
    let quads = await feedStore(quadstream);
    console.log(quads)
    await calcPropertysAndObjects(quads, "http://musicbrainz.org/area/c9ac1239-e832-41bc-9930-e252a1fd1105")
}

async function fetchRDF() {
    let url = document.getElementById('myUrl').value

    let rdfData = await fetchURL(url);
    console.log("Quadstream")
    console.log(rdfData)

    let store = await feedStore(rdfData);
    console.log("Store")
    console.log(store)

    await calcPropertysAndObjects(store, url);
}

module.exports = { 
    'fetchTurtle':fetchTurtle, 
    'fetchJsonLD': fetchJsonLD,
    'fetchRDF':fetchRDF 
};
