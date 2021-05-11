const router = require("express").Router();
const meals = require("../meal-hunt");

const _formatMeals = (response) => {
  return response.meals.map((meal) => {
    return { mealName: `${meal.strMeal}`, id: `${meal.idMeal}` };
  });
};

const _formatMeal = (response) => {
  const meal = response.meals[0];
  console.log(meal);
  return { mealName: `${meal.strMeal}`, mealRecipe: `${meal.strInstructions}` };
};

/* GET /search?ingredient=<ingredientName>
	Return meal names + ids with a valid ingredient name
*/
router.get("/search", async (req, res) => {
  try {
    const { ingredient } = req.query;
    const result = await meals.getByMainIngredient(ingredient);

    if (result.meals) {
      const formattedMeals = _formatMeals(result);
      const numOfResults = result.meals.length;
      const timeSearched = Date.now();

      const db = req.app.locals.db;
      const collection = db.collection("Meals");
      await collection.insertOne({
        ingredient,
        timeSearched,
        numOfResults,
        meals: formattedMeals,
      });

      res.json(formattedMeals);
    } else {
      const errorMessage = "No Meal Was Found";
      res.status(404).json({ error: errorMessage });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

/* POST to get meal by ID
   Retrieve ID from req.body
   Returns meal name + recipe
*/
router.post("/search", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await meals.getByID(id);
    if (result.meals) {
      res.json(_formatMeal(result));
    } else {
      res.status(404).json({ error: "No meal was found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
