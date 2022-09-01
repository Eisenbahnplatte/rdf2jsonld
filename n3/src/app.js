import { fetchUrl, jsonldTest, turtleTest } from './fetchUrl';
import { feedStore } from './store';
import { calcPropertysAndObjects } from './calculator'

/**
 * 
 * @param {string} url Url to fetch 
 * @returns n3.store containing all quads of url
 */
 async function fetchUrl2Store(url){
    let rdfData = await fetchUrl(url);
    console.log("Quadstream")
    console.log(rdfData)

    return await feedStore(rdfData);
}

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

    let rdfData = await fetchUrl(url);
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
    'fetchRDF':fetchRDF, 
    'fetchUrl2Store': fetchUrl2Store
};
