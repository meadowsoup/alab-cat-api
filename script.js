import * as Carousel from "./Carousel.js";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favorites button element.
const getFavoritesBtn = document.getElementById("getFavoritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_OTSljFTDuXBxjbeM88pOACuCU0Iu6YA4udNYQ3aX2Rj50GdXq1nlTW7sL086iEZ4";

// Axios Defaults
axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = API_KEY
// axios.interceptors.request.use(config => {
//      console.log(new Date());
//      return config
// })

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

// async function initialLoad() {
//      try {
//           // send a request to the cat api
//           const res = await fetch("https://api.thecatapi.com/v1/breeds", {
//                headers: {
//                     'x-api-key': API_KEY
//                }
//           });
//           // get the data from the response!
//           const breeds = await res.json();
//           console.log(breeds);
//           breeds.forEach((breed) => {
//                const option = document.createElement("option");
//                option.value = breed.id;
//                option.textContent = breed.name;
//                breedSelect.appendChild(option)
//           });
//           // breedSelect.innerHTML = breeds.map(
//           //      (breed) => `<option value = ${breed.id}>${breed.name}</option>`
//           // )
//           // console.log(breeds);
//           // breedSelect()
          
//      } catch (e) {
//           console.error(e);
          
//      }
// }
// initialLoad();
/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

// async function fetchBreedImages() {
//      const breedId = breedSelect.value;
  
//      try {
//      const res = await fetch(
//          `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`,
//          { headers: { "x-api-key": API_KEY } }
//      );
//      const catImgs = await res.json();
  
//      // Clear previous data
//      Carousel.clear();
//      infoDump.innerHTML = "";
  
//      catImgs.forEach((catImgObj) => {
//          const carouselItem = Carousel.createCarouselItem(
//          catImgObj.url,
//          "Cat Image",
//          catImgObj.id
//          );
//          Carousel.appendCarousel(carouselItem);
//      });
  
//      // Display breed info
//      const breedInfo = catImgs[0]?.breeds[0];
//      if (breedInfo) {
//          infoDump.innerHTML = `
//          <h3>${breedInfo.name}</h3>
//          <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
//          <p><strong>Life Span:</strong> ${breedInfo.life_span} years</p>
//          <p>${breedInfo.description}</p>
//          `;
//      }
  
//      Carousel.start();
//      } catch (e) {
//      console.error("Error fetching breed images details:", e);
//      }
//  }
  
//  // Add event listener
//  breedSelect.addEventListener("change", fetchBreedImages);

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

async function initialLoad() {
     try {
         // send request to cat api
         const res = await axios.get("breeds");
         const breeds = res.data;
         console.log(breeds);
 
         breeds.forEach((breed) => {
             const option = document.createElement("option");
             option.value = breed.id;
             option.textContent = breed.name;
             breedSelect.appendChild(option);
         });
     } catch (e) {
         console.error("Error trying to fetch breeds:", e);
     }
 }
 initialLoad();
 
 async function fetchBreedImages() {
     const breedId = breedSelect.value;
 
     try {
         const res = await axios.get("images/search", {
             params: { breed_ids: breedId, limit: 5 },
             onDownloadProgress: updateProgress,
         });
 
         const catImgs = res.data;
 
         // Clear previous data
         Carousel.clear();
         infoDump.innerHTML = "";
 
         catImgs.forEach((catImgObj, index) => {
             const carouselItem = Carousel.createCarouselItem(
                 catImgObj.url,
                 "Cat Image",
                 catImgObj.id
             );
 
             Carousel.appendCarousel(carouselItem);
         });
 
         // Display breed info
         const breedInfo = catImgs[0]?.breeds[0];
         if (breedInfo) {
             infoDump.innerHTML = `
           <h3>${breedInfo.name}</h3>
           <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
           <p><strong>Life Span:</strong> ${breedInfo.life_span} years</p>
           <p>${breedInfo.description}</p>
         `;
         }
 
         Carousel.start();
     } catch (e) {
         console.error("Error trying to fetch breed images:", e);
     }
 }
 
 // Add event listener
 breedSelect.addEventListener("change", fetchBreedImages);
 

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgress, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

axios.interceptors.request.use((config) => {
     console.log(`Starting request to: ${config.url}`);
     document.body.style.cursor = "progress";
     progressBar.style.width = "0%";
     return config;
 });
 
 axios.interceptors.response.use(
     (response) => {
         console.log(`Received response from: ${response.config.url}`);
         document.body.style.cursor = "default";
         progressBar.style.width = "100%";
         return response;
     },
     (error) => {
         console.log(`Request failed: ${error.config?.url || "Unknown URL"}`);
         document.body.style.cursor = "default";
         return Promise.reject(error);
     }
 );
 
 function updateProgress(event) {
     if (event.lengthComputable) {
         const percent = (event.loaded / event.total) * 100;
         progressBar.style.width = `${percent}%`;
         console.log(`Progress: ${percent}%`, event);
     }
 }

 /**
  * 7. As a final element of progress indication, add the following to your axios interceptors:
  * - In your request interceptor, set the body element's cursor style to "progress."
  * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favorite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favorites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favored,
 *   you delete that favorite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
*/
     // your code here
     export async function favorite(imgId) {
         try {
             const favS = await axios.get("favorites");
             const existingFav = favS.data.find((fav) => fav.image_id === imgId);
     
             if (existingFav) {
                 await axios.delete(`favorites/${existingFav.id}`);
             } else {
                 await axios.post("favorites", { image_id: imgId });
             }
         } catch (e) {
             console.error("Error toggling favorite:", e);
         }
     }

/**
 * 9. Test your favorite() function by creating a getFavorites() function.
 * - Use Axios to get all of your favorites from the cat API.
 * - Clear the carousel and display your favorites when the button is clicked.
 *  - You will have to bind this event listener to getFavoritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */