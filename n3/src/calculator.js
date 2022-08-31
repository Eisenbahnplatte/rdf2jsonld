import { Store } from 'n3';
import { encode } from 'html-entities';

const div = document.getElementById('predicateObjects');

export async function calcPropertysAndObjects(store){

    let quadstream = store.match(undefined, undefined, undefined, undefined)
    
    let graph = {}

    for (const quad of quadstream) {
        
        if (graph[quad.subject.id]===undefined) graph[quad.subject.id] = {}

        if (graph[quad.subject.id][quad.predicate.id]===undefined) graph[quad.subject.id][quad.predicate.id] = []
        
        graph[quad.subject.id][quad.predicate.id].push(quad.object.id)
        
    }

    console.log(graph)

    console.log(createHtmlList(graph))
}

function createHtmlList(obj){

    let ul = document.getElementById("list");

    let output = "";
    Object.keys(obj).forEach(function(k) {
        if (typeof obj[k] == "object" && obj[k] !== null){
            output += "<li>" + encode(k) + "<ul>";
            output += createHtmlList(obj[k]);
            output += "</ul></li>";
        } else {
            output += "<li>" + k + " : " + obj[k] + "</li>"; 
        }
    });

    
    ul.innerHTML = output
    return output;
}