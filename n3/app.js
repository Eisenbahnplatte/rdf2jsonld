import { fetchURL, turtleTest } from './url2rdf';
import { calcPropertysAndObjects } from './store';

// document.getElementById('turtleTestButton').addEventListener('click', fetchTurtle);

// let button = document.getElementById('myButton'); // add id="my-button" into html
// button.addEventListener('click', fetchRDF);

module.exports = async function fetchTurtle() {
    console.log("fetchTurtle");
    let quadstream = turtleTest();
    console.log("quadstream")
    await calcPropertysAndObjects(quadstream);
}


module.exports = async function fetchRDF() {
    let url = document.getElementById('myUrl').value

    let quadstream = await fetchURL(url);

    await calcPropertysAndObjects(quadstream);
}


