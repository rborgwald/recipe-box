// @flow

export type Recipe = {
  id: string,
  name: string,
  source: string,
  volume: string,
  page: number,
  mealType: SearchCriterion,
  cuisineType: SearchCriterion,
  preparationType: SearchCriterion,
  proteinType: SearchCriterion,
};

export type SearchCriterion = {
  id: number,
  name: string,
  description: string,
}