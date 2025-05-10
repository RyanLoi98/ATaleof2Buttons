// function to start background music when mouse is moved
document.body.addEventListener("mousemove", function () {
  const audio = document.getElementById("backgroundAudio");
  if (audio && audio.paused) {
    audio.play();
  }
});

// Variables

// Variables to keep track of topping number
let toppingNumber = 1;
const maxToppings = 3;
let happinessTotal = 0;

// variable to access topping price list
let toppingPriceIndex = 0;

// variable to hold current budget
let budget = 10.00

// Get elements from the DOM
const goodButton = document.getElementById("goodButton");
const badButton = document.getElementById("badButton");
const resetButton = document.getElementById("resetButton");
const quitButton = document.getElementById("quitButton");
const resetButtonContainer = document.querySelector(".resetButtonContainer");
const toppingLayer = document.getElementById("toppingLayer");
const toppingCountDisplay = document.getElementById("toppingCount");
const happinessCountDisplay = document.getElementById("happinessCount");
const happinessEmojiDisplay = document.getElementById("happinessEmoji");
const budgetDisplay = document.getElementById("budgetAmount");
const goodToppingPrice = document.getElementById("goodButtonPrice");
const badToppingPrice = document.getElementById("badButtonPrice");
const budgetWarning = document.getElementById("overBudget");

const goodButtonImages = [
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/chashu%20button.gif?v=1727411383446", // chaisu
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/egg%20button%20.gif?v=1727411386115", // egg
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/fishcake%20button.gif?v=1727411389211", // fish cake
];

const badButtonImages = [
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/Brussel%20button%20.gif?v=1727411375949", // brussell sprouts
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/carrot%20button.gif?v=1727411380986", // carrots
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/pineapple%20button.gif?v=1727411393903", // pineapple
];

const badToppings = [
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/brussel%20topping.gif?v=1727411379365", // brussell sprouts
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/carrot%20topping%20.gif?v=1727413038864", // carrots
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/pineapple%20topping.gif?v=1727411395561", // pineapple
];

const goodToppings = [
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/chashu%20topping.gif?v=1727411384681", // chaisu
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/egg%20topping.gif?v=1727411387392", // egg
  "https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/fishcake%20topping.gif?v=1727411390279", // fish cake
];

// lists to contain the topping prices
const  goodToppingPrices = ["1.00","2.00", "1.00", "8.00", "6.00", "10.00", "1.00", "3.00", "6.00"]
const  badToppingPrices = ["3.00","4.00", "3.00", "2.00", "4.00", "3.00", "1.00", "4.00", "5.00"]


function addTopping(imageSrc) {
  const toppingsContainer = document.querySelector(".toppingsContainer");

  // Create two image elements for the two toppings (same topping in each row)
  const toppingImg1 = document.createElement("img");
  const toppingImg2 = document.createElement("img");
  toppingImg1.src = imageSrc;
  toppingImg2.src = imageSrc;

  toppingImg1.classList.add("topping");
  toppingImg2.classList.add("topping");

  // Get container dimensions
  const containerWidth = toppingsContainer.offsetWidth;
  const containerHeight = toppingsContainer.offsetHeight;

  // Responsive padding values based on container width
  let basePadding, paddingVariation;

  if (containerWidth < 500) {
    basePadding = 30; 
    paddingVariation = 10; 
  } else if (containerWidth >= 500 && containerWidth < 900) {
    // Medium screens
    basePadding = 50; 
    paddingVariation = 20; 
  } else {
    // Large screens
    basePadding = 70; 
    paddingVariation = 30; 
  }

  // Randomize the padding by applying a random variation
  const randomPaddingX =
    basePadding + Math.random() * paddingVariation - paddingVariation / 2;
  const randomPaddingY =
    basePadding + Math.random() * paddingVariation - paddingVariation / 2;

  // Calculate base spacing for the toppings (still two slots in each row)
  const baseSpacing = (containerWidth - 2 * randomPaddingX) / 2;

  // Determine which slot to place the toppings in based on the current toppingNumber
  const slotIndex = (toppingNumber - 1) % 3; 
 
  let staggerAmountX, staggerAmountY;

  if (containerWidth < 400) {
    // Smaller screens
    staggerAmountX = 5; 
    staggerAmountY = 1;
  } else if (containerWidth >= 400) {
    // Medium screens
    staggerAmountX = 82; 
    staggerAmountY = 62;
  }

  // Calculate base X and Y positions
  const baseXPos = randomPaddingX + slotIndex * baseSpacing;
  const baseRow1YPos = randomPaddingY;
  const baseRow2YPos = containerHeight / 2 + randomPaddingY;

  // Apply stagger
  const xPos1 = baseXPos - Math.random() * staggerAmountX;
  const xPos2 = baseXPos - Math.random() * staggerAmountX;

  const row1YPos = baseRow1YPos - Math.random() * staggerAmountY;
  const row2YPos = baseRow2YPos - Math.random() * staggerAmountY;

  // Set the positions for the two toppings
  toppingImg1.style.position = "absolute";
  toppingImg1.style.left = `${xPos1}px`;
  toppingImg1.style.top = `${row1YPos}px`;

  toppingImg2.style.position = "absolute";
  toppingImg2.style.left = `${xPos2}px`;
  toppingImg2.style.top = `${row2YPos}px`;

  // Append both toppings to the container
  toppingsContainer.appendChild(toppingImg1);
  toppingsContainer.appendChild(toppingImg2);
}

// Function to modify the emoji based on the happiness count
function updateHappinessEmoji() {
  if (happinessTotal > 0) {
    happinessEmojiDisplay.textContent = "❤️"; // Heart emoji
  } else if (happinessTotal < 0) {
    happinessEmojiDisplay.textContent = "💔"; // Broken heart emoji
  } else {
    happinessEmojiDisplay.textContent = ""; // No emoji when happiness is zero
  }
}

// Function to keep the track of happiness count
function updateHappinessDisplay() {
  happinessCountDisplay.textContent = happinessTotal;
  updateHappinessEmoji(); // Call the emoji update function
}

// Event listener for the good button
goodButton.addEventListener("click", function () {
  // Play splash sound
  const splashSound = document.getElementById("splashSound");
  splashSound.currentTime = 0; // Reset sound to start
  splashSound.play();

  // Add the good topping inside the container
  const imageSrc = goodToppings[toppingNumber - 1];
  addTopping(imageSrc, true);

  // Update happiness, topping count, etc.
  happinessTotal += 1;
  updateHappinessDisplay();

  advanceToppings(true);
});

// Event listener for the bad button
badButton.addEventListener("click", function () {
  // Play splash sound
  const splashSound = document.getElementById("splashSound");
  splashSound.currentTime = 0;
  splashSound.play();

  // Add the bad topping inside the container
  const imageSrc = badToppings[toppingNumber - 1];
  addTopping(imageSrc, false);

  // Update happiness, topping count, etc.
  happinessTotal -= 1;
  updateHappinessDisplay();

  advanceToppings(false);
});

// Event listner for the reset button
resetButton.addEventListener("click", resetGame);

function resetGame() {
  // Reset game variables
  toppingNumber = 1;
  happinessTotal = 0;

  // Update displays
  toppingCountDisplay.textContent = toppingNumber;
  happinessCountDisplay.textContent = happinessTotal;
  updateHappinessEmoji();
  budgetDisplay.textContent = (budget.toFixed(2));
  budgetWarning.style.display = "none";
  
  // update button prices
  goodToppingPrice.textContent = "$" + goodToppingPrices[toppingPriceIndex%9];
  badToppingPrice.textContent = "$" + badToppingPrices[toppingPriceIndex%9];

  // Reset button images to the first toppings
  goodButton.querySelector("img").src = goodButtonImages[0];
  badButton.querySelector("img").src = badButtonImages[0];
  goodButton.querySelector("img").alt = `Good Topping 1`;
  badButton.querySelector("img").alt = `Bad Topping 1`;

  // Remove all topping images from the toppings container
  const toppingsContainer = document.querySelector(".toppingsContainer");
  toppingsContainer.innerHTML = ""; // Removes all child elements (toppings)

  resetButtonContainer.style.display = "none";

  // Show "good" and "bad" buttons
  goodButton.style.display = "inline-block";
  badButton.style.display = "inline-block";
  
  // show prices
  goodToppingPrice.style.display = "inline-block";
  badToppingPrice.style.display = "inline-block";

  // Re-enable buttons in case they were disabled
  goodButton.disabled = false;
  badButton.disabled = false;

  // Hide the background GIF
  const backgroundGif = document.getElementById("backgroundGif");
  backgroundGif.style.display = "none";
  backgroundGif.src = "";

  // Remove the reduce-size class
  const bowlContainer = document.querySelector(".bowlContainer");
  bowlContainer.classList.remove("reduce-size");
  
  // Stop any playing sound effects
  const happySound = document.getElementById('happySound');
  const sadSound = document.getElementById('sadSound');
  if (happySound) {
    happySound.pause();
    happySound.currentTime = 0;
  }
  if (sadSound) {
    sadSound.pause();
    sadSound.currentTime = 0;
  }
}

// Event listener for the Quit button
quitButton.addEventListener("click", quitApplication);

function quitApplication() {
  // Clear the page content
  document.body.innerHTML = "";

  // Optionally, stop the background music
  const audio = document.getElementById("backgroundAudio");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  // Display a termination message
  const terminationMessage = document.createElement("div");
  terminationMessage.style.display = "flex";
  terminationMessage.style.justifyContent = "center";
  terminationMessage.style.alignItems = "center";
  terminationMessage.style.height = "100vh";
  terminationMessage.style.fontFamily = "'Satisfy', cursive";
  terminationMessage.style.fontSize = "3rem";
  terminationMessage.style.color = "white";
  terminationMessage.style.textAlign = "center";
  terminationMessage.style.padding = "0 20px";
  terminationMessage.textContent = "Thank you for playing!";

  document.body.appendChild(terminationMessage);

  // Change the background color
  document.body.style.backgroundColor = "black";
}

// Function to advance toppings
function advanceToppings(goodPrice) {
  if (toppingNumber < maxToppings) {
    
    // update budget display
    if (goodPrice){
      budgetDisplay.textContent = (budget -= goodToppingPrices[toppingPriceIndex%9]).toFixed(2);
    }else{
      budgetDisplay.textContent = (budget -= badToppingPrices[toppingPriceIndex%9]).toFixed(2);
    }
    
    // determine if price is negative, if so decrease happiness by 10
    if(budget <0) {
      happinessTotal -=10;
      happinessCountDisplay.textContent = happinessTotal;
      budgetWarning.style.display = "flex";
    }
    
    toppingNumber++;
    toppingPriceIndex++;
  
    // Update topping count display
    toppingCountDisplay.textContent = toppingNumber;
    

    // Update images for both buttons
    goodButton.querySelector("img").src = goodButtonImages[toppingNumber - 1];
    badButton.querySelector("img").src = badButtonImages[toppingNumber - 1];

    // Optionally, update alt text
    goodButton.querySelector("img").alt = `Good Topping ${toppingNumber}`;
    badButton.querySelector("img").alt = `Bad Topping ${toppingNumber}`;
    
    // update button prices
    goodToppingPrice.textContent = "$" + goodToppingPrices[toppingPriceIndex%9];
    badToppingPrice.textContent = "$" + badToppingPrices[toppingPriceIndex%9];
    
    
  } else {
    
    // update budget display
    if (goodPrice){
      budgetDisplay.textContent = (budget -= goodToppingPrices[toppingPriceIndex%9]).toFixed(2);
    }else{
      budgetDisplay.textContent = (budget -= badToppingPrices[toppingPriceIndex%9]).toFixed(2);
    }
    
    if(budget <0) {
      happinessTotal -=10;
      happinessCountDisplay.textContent = happinessTotal;
      budgetWarning.style.display = "flex";
    }
    
    toppingPriceIndex++;
    
    budget = 10.00;
    
    // All toppings have been added
    console.log("All toppings have been added.");

    // Hide "good" and "bad" buttons
    goodButton.style.display = "none";
    badButton.style.display = "none";
    
    // hide prices
    goodToppingPrice.style.display = "none";
    badToppingPrice.style.display = "none";
    

    // Show reset button
    resetButtonContainer.style.display = "flex";

    // Reduce the size of the bowl and toppings
    const bowlContainer = document.querySelector(".bowlContainer");
    bowlContainer.classList.add("reduce-size");

    // Display the background GIF based on happiness score
    displayBackgroundGif();
  }
}

function displayBackgroundGif() {
  const backgroundGif = document.getElementById('backgroundGif');
  const happySound = document.getElementById('happySound');
  const sadSound = document.getElementById('sadSound');

  // Determine which GIF and sound to use based on happinessTotal
  if (happinessTotal > 0) {
    backgroundGif.src = 'https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/happy.gif?v=1727570582565'; 
    backgroundGif.style.display = 'block';

    // Play happy sound
    if (happySound) {
      happySound.currentTime = 0; // Reset to start
      happySound.play();
    }
  } else if (happinessTotal < 0) {
    backgroundGif.src = 'https://cdn.glitch.global/2ae4a9df-7fc9-497f-a59f-9f88e1d8efc0/sad.gif?v=1727570586300'; 
    backgroundGif.style.display = 'block';

    // Play sad sound
    if (sadSound) {
      sadSound.currentTime = 0; // Reset to start
      sadSound.play();
    }
  } else {
    backgroundGif.style.display = 'none';
  }
}

 