// @flow

export type Recipe = {
  id: string,
  name: string,
  source: string,
  volume: string,
  page: string,
  notes: string,
  url: string,
  stars: number,
  newRecipe: boolean,
  mealType: SearchCriterion,
  cuisineType: SearchCriterion,
  preparationType: SearchCriterion,
  proteinType: SearchCriterion,
};

export type SearchCriterion = {
  idx: number,
  id: number,
  name: string,
  description: string,
};

export type User = {
  id: number,
  username: string,
};

export type RecipeList = {
  id: string,
  name: string,
  recipes: Recipe[],
  users: User[],
};
