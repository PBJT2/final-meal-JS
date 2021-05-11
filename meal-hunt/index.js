const superagent = require("superagent");
const { URL } = require("./config.json");

const getByMainIngredient = async (ingredient) => {
  try {
    ingredient = ingredient.replace(" ", "_");
    const ingredientURL = `${URL}/1/filter.php?i=${ingredient}`;
    const response = await superagent.get(ingredientURL);
    return response.body;
  } catch (error) {
    console.error(error);
  }
};

const getByID = async (ID) => {
  try {
    const idURL = `${URL}/1/lookup.php?i=${ID}`;
    const response = await superagent.get(idURL);
    return response.body;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getByMainIngredient,
  getByID,
};
