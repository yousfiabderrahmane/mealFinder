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
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Results for '${term}' :</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results for '${term}'</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });

    // clear search text
    search.value = " ";
  } else {
    alert("Please enter a search term");
  }
}

//  Fetch Meal by Id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}
// Fetch random meal
function getRandomMeal() {
  // clear Meals and Headings (in case we already searched)
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
      console.log(data);
    });
}
// Add meal to Dom
function addMealToDom(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}"></img>
  <div clas="single-meal-info">
  ${meal.strCategory ? `<p> ${meal.strCategory}` : ""} 
  ${meal.strArea ? `<p> ${meal.strArea}` : ""} 
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}

  </ul>
  </div>
  </div>
  `;
}
//   event listeners
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getMealById(mealId);
  }
});

random.addEventListener("click", getRandomMeal);
