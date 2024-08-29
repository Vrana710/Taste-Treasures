// Reference essential HTML elements
let recipeForm = document.getElementById('recipe-form');
let recipeName = document.getElementById('recipe-name');
let ingredients = document.getElementById('ingredients');
let steps = document.getElementById('steps');
let recipeImage = document.getElementById('recipeImage');
let displayArea = document.getElementById('display-area');

// Initialize recipes array
let recipes = [];

// Load recipes from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('recipes')) {
        recipes = JSON.parse(localStorage.getItem('recipes'));
        recipes.forEach((recipe, index) => displayRecipe(recipe, index));
    }
});

// Event listener for form submission
recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture input values
    let enteredRecipeName = recipeName.value;
    let enteredIngredients = ingredients.value;
    let enteredSteps = steps.value;
    let enteredRecipeImage = recipeImage.value;

    // Create a new recipe object
    let newRecipe = {
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps,
        image: enteredRecipeImage
    };

    // Add the new recipe to the recipes array
    recipes.push(newRecipe);

    // Save recipes to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Display the new recipe
    displayRecipe(newRecipe, recipes.length - 1);

    // Clear input fields
    recipeForm.reset();
});

// Function to display a recipe
function displayRecipe(recipe, index) {
    let recipeDiv = document.createElement('div');
    recipeDiv.classList.add('col-md-4', 'recipe');

    let title = `<h3>${recipe.name}</h3>`;
    let img = recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" class="img-fluid rounded">` : '';
    

    recipeDiv.innerHTML = `
        ${img}
        <div class="recipe-content">
            ${title}
            <button onclick="openRecipeDetails(${index})" class="btn btn-primary btn-sm mt-2">Read More</button>
            <button onclick="deleteRecipe(${index})" class="btn btn-danger btn-sm mt-2">Delete</button>
        </div>
    `;

    displayArea.appendChild(recipeDiv);
}


function openRecipeDetails(index) {
    let recipe = recipes[index];
    let recipeDetails = `
        <html>
            <head>
                <title>${recipe.name}</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <style>
                    body { padding: 20px; }
                    .recipe-detail img { max-width: 100%; border-radius: 8px; margin-bottom: 20px; }
                    .recipe-detail h1 { margin-bottom: 20px; }
                    .back-home-btn {
                        margin-top: 20px;
                        background-color: #8745b6;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    .back-home-btn:hover {
                        background-color: #6a3492;
                    }
                </style>
            </head>
            <body>
                <div class="recipe-detail">
                    <h1>${recipe.name}</h1>
                    ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}">` : ''}
                    <h2>Ingredients</h2>
                    <p>${recipe.ingredients}</p>
                    <h2>Steps</h2>
                    <p>${recipe.steps}</p>
                    <button class="back-home-btn" onclick="window.close()">Back to Home</button>
                </div>
            </body>
        </html>
    `;
    
    let newWindow = window.open();
    newWindow.document.write(recipeDetails);
    newWindow.document.close();
}

function showNotification(message, type = 'success') {
    let notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Modify the form submission handler to show a notification
recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture input values
    let enteredRecipeName = recipeName.value;
    let enteredIngredients = ingredients.value;
    let enteredSteps = steps.value;
    let enteredRecipeImage = recipeImage.value;

    // Create a new recipe object
    let newRecipe = {
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps,
        image: enteredRecipeImage
    };

    // Add the new recipe to the recipes array
    recipes.push(newRecipe);

    // Save recipes to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Display the new recipe
    displayRecipe(newRecipe, recipes.length - 1);

    // Clear input fields
    recipeForm.reset();

    // Show notification
    showNotification('Recipe added successfully!');
});


// Function to delete a recipe
function deleteRecipe(index) {
    // Remove recipe from the array
    recipes.splice(index, 1);

    // Save updated recipes to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Clear the display area
    displayArea.innerHTML = '';

    // Redisplay remaining recipes
    recipes.forEach((recipe, idx) => displayRecipe(recipe, idx));
}
