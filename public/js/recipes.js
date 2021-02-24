document.addEventListener("DOMloaded", (e) => {
  let recipeId;
  const updating = false;

  const getRecipeData = id => {
    fetch(`/api/recipes/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log(`Success in grabbing post ${id}`, data);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  getRecipeData(recipeId);

  const recipeForm = document.getElementById("recipeForm");
  const recipeName = document.getElementById("recipeName");
  const recipeIng = document.getElementById("recipeIng");
  const description = document.getElementById("description");

  const recipeFormSubmit = e => {
    e.preventDefault();
    if (!recipeName.value || !description.value) {
      alert("Your recipe is missing some content");
    }

    // Create a newPost object to send off to the backend
    const newRecipe = {
      recipeName: recipeName.value.trim(),
      description: description.value.trim(),
      recipeIng: recipeIng.value.trim()
    };

    if (updating) {
      newRecipe.id = recipeId;
    } else {
      submitRecipe(newRecipe);
    }
  };

  recipeForm.addEventListener("submit", recipeFormSubmit);

  const submitRecipe = recipe => {
    fetch("/api/members/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    })
      .then(response => response.json())
      .then(data => {
        console.log("recipe posted", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
});
