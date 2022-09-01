import { DataFactory } from 'n3';
import { encode } from 'html-entities';



export async function calcPropertysAndObjects(store, url){

    const list = document.getElementById("list");

    let quadstream = store.match(DataFactory.namedNode(url), undefined, undefined, undefined)
    
    for (const quad of quadstream) {

        let liPredicate = document.getElementById(quad.predicate.id)

        if (liPredicate === null) {
            liPredicate = document.createElement('li')
            liPredicate.id = quad.predicate.id
            liPredicate.innerHTML = encode(quad.predicate.id) + "<ul> </ul>"
            
            list.appendChild(liPredicate);
        }

        
        let liObject  = document.getElementById(quad.object.id)

        if (liObject === null) {

            liObject = document.createElement('li')
            liObject.id = quad.object.id
            liObject.innerHTML = encode(quad.object.id) + " &nbsp;&nbsp; <-- Provenance: " + encode(url)

            let objectList = liPredicate.lastChild
            objectList.appendChild(liObject);
        } 



        // console.log(list)
        
        // if (graph[quad.subject.id]===undefined) graph[quad.subject.id] = {}

        // if (graph[quad.subject.id][quad.predicate.id]===undefined) graph[quad.subject.id][quad.predicate.id] = []
        
        // graph[quad.subject.id][quad.predicate.id].push(quad.object.id)
        
    }
    
    let i = 0
    for (const element of $("#list").children()){
        i += element.children[0].children.length
    }

    console.log(i)

    document.getElementById("triplesCount").innerHTML = "Number of Triples " +i
    // console.log(graph)

    // console.log(createHtmlList(graph))
}

// const div = document.getElementById('predicateObjects');

// export async function calcPropertysAndObjects(store){

//     let quadstream = store.match(undefined, undefined, undefined, undefined)
    
//     let graph = {}

//     for (const quad of quadstream) {
        
//         if (graph[quad.subject.id]===undefined) graph[quad.subject.id] = {}

//         if (graph[quad.subject.id][quad.predicate.id]===undefined) graph[quad.subject.id][quad.predicate.id] = []
        
//         graph[quad.subject.id][quad.predicate.id].push(quad.object.id)
        
//     }

//     console.log(graph)

//     console.log(createHtmlList(graph))
// }

// function createHtmlList(obj){

//     let ul = document.getElementById("list");

//     let output = "";
//     Object.keys(obj).forEach(function(k) {
//         if (typeof obj[k] == "object" && obj[k] !== null){
//             output += "<li>" + encode(k) + "<ul>";
//             output += createHtmlList(obj[k]);
//             output += "</ul></li>";
//         } else {
//             output += "<li>" + k + " : " + obj[k] + "</li>"; 
//         }
//     });

    
//     ul.innerHTML = output
//     return output;
// }