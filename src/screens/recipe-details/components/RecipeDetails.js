import React from 'react';
import { Recipe } from '../../../api/recipe/model';

const RecipeDetails = ({
  recipe,
  onUpdate,
  onDelete,
}: {
  recipe: Recipe,
  onUpdate: Function,
  onDelete: Function,
}) =>
  <View>
    <Text>
      {recipe.name}
    </Text>
  </View>;

export default RecipeDetails;
