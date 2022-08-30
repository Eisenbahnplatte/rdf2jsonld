import { fetchURL, turtleTest } from './url2rdf';
import { feedStore } from './store';
import { calcPropertysAndObjects } from './calculator'

async function fetchTurtle() {
    let quadstream = turtleTest();
    console.log(quadstream)
    let quads = await feedStore(quadstream);
    console.log(quads)
    await calcPropertysAndObjects(quads);
}

async function fetchRDF() {
    let url = document.getElementById('myUrl').value

    let quadstream = await fetchURL(url);
    console.log("Quadstream")
    console.log(quadstream)

    // let store = await feedStore(quadstream);
    // console.log("Store")
    // console.log(store)

    // await calcPropertysAndObjects(store);
}

module.exports = { 
    'fetchTurtle':fetchTurtle, 
    'fetchRDF':fetchRDF 
};
