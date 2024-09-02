// Reference essential HTML elements
let recipeForm = document.getElementById('recipe-form');
let recipeName = document.getElementById('recipe-name');
let ingredients = document.getElementById('ingredients');
let steps = document.getElementById('steps');
let recipeImage = document.getElementById('recipeImage');
let displayArea = document.getElementById('display-area');

// Initialize recipes array
let recipes = [];

/**
 * Loads recipes from local storage and displays them when the page is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('recipes')) {
        recipes = JSON.parse(localStorage.getItem('recipes'));
        recipes.forEach((recipe, index) => displayRecipe(recipe, index));
    }
});

/**
 * Handles form submission, capturing input values and storing a new recipe.
 * Prevents submission if required fields are empty, and saves the new recipe
 * to local storage, updating the displayed list.
 *
 * @param {Event} event - The form submission event.
 */
recipeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Capture input values
    let enteredRecipeName = recipeName.value.trim();
    let enteredIngredients = ingredients.value.trim();
    let enteredSteps = steps.value.trim();
    let enteredRecipeImage = recipeImage.value.trim();

    // Check if any required fields are empty
    if (enteredRecipeName === '' || enteredIngredients === '' || enteredSteps === '') {
        alert('Please fill out all required fields.');
        return;
    }

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

/**
 * Displays a recipe on the page by creating a new div element and appending it
 * to the display area. Provides options to view recipe details or delete the recipe.
 *
 * @param {Object} recipe - The recipe object containing the recipe details.
 * @param {number} index - The index of the recipe in the recipes array.
 */
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

/**
 * Opens a new window displaying detailed information about a specific recipe,
 * including the name, ingredients, steps, and image.
 *
 * @param {number} index - The index of the recipe in the recipes array.
 */
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
                    <p>${recipe.steps.replace(/\n/g, '<br/>')}</p>
                    <button class="back-home-btn" onclick="window.close()">Back to Home</button>
                </div>
            </body>
        </html>
    `;

    let newWindow = window.open();
    newWindow.document.write(recipeDetails);
    newWindow.document.close();
}

/**
 * Shows a temporary notification on the page, displaying a message
 * with a specified type (e.g., success, error). The notification
 * disappears after a few seconds.
 *
 * @param {string} message - The message to display in the notification.
 * @param {string} [type='success'] - The type of notification (e.g., success, error).
 */
function showNotification(message, type = 'success') {
    let notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Deletes a recipe from the recipes array and updates local storage.
 * Clears the display area and redisplays the remaining recipes.
 *
 * @param {number} index - The index of the recipe to delete in the recipes array.
 */
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
