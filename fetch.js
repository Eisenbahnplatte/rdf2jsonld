let button = document.getElementById('myButton'); // add id="my-button" into html
button.addEventListener('click', fetchURL);

async function fetchURL(){
    let url = document.getElementById('myUrl').value

    try{
        const response = await fetch(url, { 
            mode: 'cors',
            headers: {
                'Accept': ['application/ld+json','application/n-quads','application/n-triples', 'application/rdf+xml', 'text/turtle', 'text/html']
            } 
        })
        let data = await response.text()
        let contentType = response.headers.get("Content-Type")

        console.log(contentType)
        console.log(data)
        // for (let pair of response.headers.entries()) {
        //     console.log(pair[0]+ ': '+ pair[1]);
        //  }
         
        console.log(response.headers.get("Access-Control-Expose-Headers"))
    
    
        if (contentType==="text/html; charset=UTF-8"){
            let data = $($($.parseHTML( data )).filter("script")).filter('[type="application/ld+json"]');
    
            console.log("jsonLDstr")
            console.log(data);
        } 

        return (data, contentType);

    }catch(err){
        console.log(err)
    }
}
  