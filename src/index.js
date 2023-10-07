console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", (event) => {
    fetch(imgUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const allUrls = data.message; // The message part is because of the returned JSON
            allUrls.forEach((imageUrl) => {
                const grabImageContainer = document.getElementById("dog-image-container");
                const createNewImage = document.createElement("img");
                createNewImage.src = imageUrl;
                grabImageContainer.appendChild(createNewImage);
            });
        });
});

document.addEventListener("DOMContentLoaded", (event) => {
    // I found this function to select a random color for the li event listener.
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    fetch(breedUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const allBreeds = Object.keys(data.message); // Extract breed names by taking keys in the message and converts it to an array
            const grabBreedContainer = document.getElementById("dog-breeds");
            const breedDropdown = document.getElementById("breed-dropdown");
            
            allBreeds.forEach((breed) => {
                const createListItem = document.createElement("li");
                createListItem.innerText = breed; // Set breed name as the inner text
                grabBreedContainer.appendChild(createListItem);
                // The event listener below is to change the color of the li items when they are clicked. It uses a function above the fetch event listener of the dog breeds.
                createListItem.addEventListener("click", (event) => {
                    const randomColor = getRandomColor();
                    event.target.style.color = randomColor;
                });
            });

            breedDropdown.addEventListener("change", (event) => { // Makes an event listener for changes based on the dropdown
                const selectedLetter = event.target.value; // Defines a variable that holds the value of the dropdown letter chosen
                grabBreedContainer.innerHTML = ''; // Erases the previous list of breeds
                allBreeds.forEach((breed) => { // A foreach that has the first letter post those breeds and allows color change
                    if (breed.charAt(0) === selectedLetter) {
                        const createListItem = document.createElement("li");
                        createListItem.innerText = breed;
                        grabBreedContainer.appendChild(createListItem);
        
                        createListItem.addEventListener("click", (event) => {
                            const randomColor = getRandomColor();
                            event.target.style.color = randomColor;
                        });
                    }
                });
            });
        });  
});

