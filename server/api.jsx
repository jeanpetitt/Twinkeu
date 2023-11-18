import axios from "axios";
import { useState, useEffect } from "react";
export const fetchFood = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpointUrl = 'https://orkg.org/triplestore';
      const sparqlQuery = `
        PREFIX orkgp: <http://orkg.org/orkg/predicate/>
        PREFIX orkgr: <http://orkg.org/orkg/resource/>

        SELECT DISTINCT ?object ?object_name
        WHERE {
          ?subject orkgp:P62002 ?object .
          ?object rdfs:label ?object_name .
        }
      `;

      try {
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };

        const response = await axios.get(fullUrl, { headers });
        setData(response.data.results.bindings);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [])
  return data
}