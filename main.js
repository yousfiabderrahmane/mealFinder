const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// Search Meal and fetch from Api
function searchMeal(e) {
  e.preventDefault();

  //   Clear single meal
  single_mealEl.innerHTML = "";
  // Get search term
  const term = search.value;
  //   Check for empty
  if (term.trim()) {
  } else {
    alert("Please enter a search term");
  }
}

//   event listeners
submit.addEventListener("submit", searchMeal);
