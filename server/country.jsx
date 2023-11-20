import axios from "axios";
import { useState, useEffect } from "react";

export default function fetchCountry() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const endpointUrl = 'https://orkg.org/triplestore';
            const sparqlQuery = `
                SELECT ?id_country ?country
                WHERE {
                ?id_country rdf:type <http://orkg.org/orkg/class/C20015> .
                ?id_country rdfs:label ?country
                }`;

            try {
                const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
                const headers = { 'Accept': 'application/sparql-results+json' };

                const response = await axios.get(fullUrl, { headers });
                setData(response.data.results.bindings);
                console.log('longueur du tablea', data.length)

                if (data.length == 0) {
                    setData([
                        { 'label': 'Not country available', 'value': '1' }
                    ])
                    console.log('succes get counties but the list is null')
                } else {

                    const newDataCountry = data.map(item => (
                        {
                            'label': item.country.value,
                            'value': item.country.value,
                            'uri': item.id_country.value,
                        }

                    ))

                    newDataCountry.sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        if (a.label > b.label) {
                            return 1;
                        }
                        return 0;
                    });

                    setData(newDataCountry)
                    console.log('success get country with list');
                }


            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData();
    }, [])

    return data
}
