const http = require("http");

const endpointUrl = 'https://orkg.org/triplestore';
const sparqlQuery = `
PREFIX orkgp: <http://orkg.org/orkg/predicate/>
PREFIX orkgr: <http://orkg.org/orkg/resource/>

SELECT DISTINCT ?id_food ?food_name
WHERE {
  ?id_food rdf:type <http://orkg.org/orkg/class/C34000> .
  ?id_food rdfs:label ?food_name
}

`;

async function startServer() {
    const { default: fetch } = await import('node-fetch');

    class SPARQLQueryDispatcher {
        constructor(endpoint) {
            this.endpoint = endpoint;
        }

        async query(sparqlQuery) {
            const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
            const headers = { 'Accept': 'application/sparql-results+json' };

            return fetch(fullUrl, { headers }).then(response => response.json());
        }
    }

    const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
    queryDispatcher.query(sparqlQuery)
        .then(result => {
            const server = http.createServer();
            if (server) {
                console.log('Server is running');
                console.log('Navigate to http://localhost:8080');
                console.log('To break the server, press CTRL+C');
                server.on("request", (req, res) => {
                    res.write(JSON.stringify(result['results']['bindings']));
                    res.end();
                });
                server.listen(8080);
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

startServer();