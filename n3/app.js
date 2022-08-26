import { fetchURL, turtleTest } from './url2rdf';
import { toStore } from './store';

document.getElementById('turtleTestButton').addEventListener('click', fetchTurtle);

let button = document.getElementById('myButton'); // add id="my-button" into html
button.addEventListener('click', fetchRDF);

export async function fetchTurtle() {
    let quadstream = await turtleTest();
    console.log(quadstream);
    toStore(quadstream);
}


export async function fetchRDF() {
    let url = document.getElementById('myUrl').value

    let quadstream = await fetchURL(url);

    toStore(quadstream);
}
