import axios from "axios";
import { useState, useEffect } from "react";



export default function fetchFoodGroup() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpointUrl = 'https://orkg.org/triplestore';
      const sparqlQuery = `
        SELECT DISTINCT ?id_food ?food_name
        WHERE {
        ?id_food rdf:type <http://orkg.org/orkg/class/C34000> .
        ?id_food rdfs:label ?food_name .
        }
        `;

      try {
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };

        const response = await axios.get(fullUrl, { headers });
        setData(response.data.results.bindings);
        console.log('size of foods', data.length)

        if (data.length == 0) {
          setData([
            { 'label': 'Not available food group', 'value': '1' }
          ])
          console.log('succes get foods but the lit is nul')
        } else {

          const newDataCountry = data.map(item => (
            {
              'label': item.food_name.value,
              'value': item.food_name.value,
              'uri': item.id_food.value,
            }

          ))

          // newDataCountry.sort((a, b) => {
          //   if (a.label < b.label) {
          //     return -1;
          //   }
          //   if (a.label > b.label) {
          //     return 1;
          //   }
          //   return 0;
          // });
          setData(newDataCountry)
          console.log('success get food with list');
        }


      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [])

  // console.log(data)
  return data
};
