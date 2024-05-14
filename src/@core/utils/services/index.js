import axios from 'axios'

export const zipCodeService = zipCode => new Promise((resolve, reject) => {
  axios
    .get(`https://viacep.com.br/ws/${zipCode}/json`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
})

// export const geolocationApi = (city, uf) => {
//     const appId = process.env.REACT_APP_APP_ID;
//
//     return new Promise((resolve, reject) => {
//         api
//             .get(
//                 `https://api.openweathermap.org/geo/1.0/direct?q=${city},${uf},Brazil&limit=5&appid=${appId}`
//             )
//             .then((response) => {
//                 resolve(response.data[0]);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     });
// };
