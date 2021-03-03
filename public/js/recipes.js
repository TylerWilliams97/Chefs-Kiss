let recipeId;
const updating = false;
// const getRecipeData = id => {
//   fetch(`/api/recipes/post/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data) {
//         console.log(`Success in grabbing post ${id}`, data);
//       }
//     })
//     .catch(error => {
//       console.error("Error:", error);
//     });
// };
// getRecipeData(recipeId);
const recipeForm = document.getElementById("recipeForm");
const recipeName = document.getElementById("recipeName");
const ingredient = document.getElementById("ingredient");
const description = document.getElementById("description");
const instructions = document.getElementById("instructions");
const fileUpload = document.getElementById("file-upload");
//const image = document.getElementById("image");
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbgplg3re/upload";
const CLOUDINARY_UPLOAD_PRESET = "hp6zbozi";
const recipeFormSubmit = e => {
  e.preventDefault();
  console.log(recipeName.value);
  console.log(description.value);
  console.log(ingredient.value);
  if (!recipeName.value || !description.value) {
    alert("Your recipe is missing some content");
    return;
  }
  // Create a newPost object to send off to the backend
  const newRecipe = {
    recipeName: recipeName.value.trim(),
    description: description.value.trim(),
    ingredient: ingredient.value.trim(),
    instructions: instructions.value.trim()
  };
  console.log(newRecipe);
  if (updating) {
    newRecipe.id = recipeId;
  } else {
    submitRecipe(newRecipe);
  }
};
recipeForm.addEventListener("submit", recipeFormSubmit);
fileUpload.addEventListener("change", event => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formData
  })
    .then(res => {
      console.log(res);
      //const link = res.data.url;
    })
    .catch(err => {
      console.log(err);
    });
});
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
