/* @flow */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import _ from 'lodash';
// $FlowIssue
import closeIcon from '../../images/close-icon.png';
import type { Store, State as StoreState } from '../../store/store';
import { hideModal, setRecipeLists, setRecipes } from '../../store/actions';
import RecipeDetails from './components/RecipeDetails';
import ImageButton from '../../components/ImageButton';
import {
  updateRecipe,
  deleteRecipe,
} from '../../api/recipe/recipes';
import type { Recipe, RecipeList } from '../../api/recipe/model';
import { store } from '../../store/store';
import { capitalize } from '../../utils/strings';
import {
  addRecipeToRecipeList,
  deleteRecipeFromRecipeList,
} from '../../api/recipe/recipeLists';
import { getPathWithFilename } from '../../utils/directoryStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

type State = {
  errorMessage: string,
  successMessage: string,
  recipe: Recipe,
  selectedList: RecipeList | null,
  link: string,
};

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
  currentRecipe: Recipe,
  recipes: $PropertyType<StoreState, 'recipes'>,
  mealTypes: $PropertyType<StoreState, 'mealTypes'>,
  cuisineTypes: $PropertyType<StoreState, 'cuisineTypes'>,
  preparationTypes: $PropertyType<StoreState, 'preparationTypes'>,
  proteinTypes: $PropertyType<StoreState, 'proteinTypes'>,
  token: $PropertyType<StoreState, 'token'>,
  recipeLists: $PropertyType<StoreState, 'recipeLists'>,
};
export class RecipeDetailsScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Recipe Details',
    headerLeft: (
      <ImageButton
        onPress={() => {
          navigation.goBack();
          store.dispatch(hideModal());
        }}
        icon={closeIcon}
      />
    ),
  });

  state = {
    errorMessage: '',
    successMessage: '',
    recipe: this.props.currentRecipe,
    selectedList: null,
    link: '',
  };

  handleNameChange = (name: string) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, name } });
  };

  handleSourceChange = (source: string) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, source } });
  };

  handleVolumeChange = (volume: string) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, volume } });
  };

  handlePageChange = (page: string) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, page } });
  };

  handleNewRecipeCheckedChange = (checked: boolean) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, newRecipe: !checked } });
  };

  handleTriedItRecipeCheckedChange = (checked: boolean) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, newRecipe: checked } });
  };

  handleRatingChange = (itemSelected: number) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, stars: itemSelected } });
  };

  handleMealTypeChange = (itemValue: string) => {
    const { mealTypes } = this.props;
    const { recipe } = this.state;

    recipe.mealType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      const newType = mealTypes.find(type => type.idx === selectedIdx) || null;
      recipe.mealType = newType;
    }
    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleCuisineTypeChange = (itemValue: string) => {
    const { cuisineTypes } = this.props;
    const { recipe } = this.state;

    recipe.cuisineType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      const newType =
        cuisineTypes.find(type => type.idx === selectedIdx) || null;
      recipe.cuisineType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handlePreparationTypeChange = (itemValue: string) => {
    const { preparationTypes } = this.props;
    const { recipe } = this.state;

    recipe.preparationType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      const newType =
        preparationTypes.find(type => type.idx === selectedIdx) || null;
      recipe.preparationType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleProteinTypeChange = (itemValue: string) => {
    const { proteinTypes } = this.props;
    const { recipe } = this.state;

    recipe.proteinType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      const newType =
        proteinTypes.find(type => type.idx === selectedIdx) || null;
      recipe.proteinType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleOnUpdate = () => {
    const { recipes, dispatch, token } = this.props;
    const { recipe } = this.state;
    if (recipe) {
      updateRecipe(token, recipe)
        .then(() => {
          const newRecipes = _.filter(recipes, rec => rec.id !== recipe.id);
          newRecipes.push(recipe);
          dispatch(setRecipes(newRecipes));

          const { navigation } = this.props;
          navigation.goBack();
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    }
  };

  handleOnDelete = () => {
    const { recipes, dispatch, token } = this.props;
    const { recipe } = this.state;
    if (recipe) {
      deleteRecipe(token, recipe)
        .then(() => {
          const newRecipes = _.filter(recipes, rec => rec.id !== recipe.id);
          dispatch(setRecipes(newRecipes));

          const { navigation } = this.props;
          navigation.goBack();
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    }
  };

  handleAddToList = () => {
    const { token, dispatch, recipeLists } = this.props;
    const { recipe } = this.state;

    if (recipe && this.state.selectedList) {
      addRecipeToRecipeList(token, recipe, this.state.selectedList)
        .then(() => {
          // Remove recipe if already exists in recipe list
          const newRecipeList = _.cloneDeep(this.state.selectedList);
          newRecipeList.recipes = _.filter(
            newRecipeList ? newRecipeList.recipes : [],
            listRecipe => listRecipe.id !== recipe.id,
          );
          // Add recipe to newRecipeList
          if (newRecipeList.recipes) {
            newRecipeList.recipes.push(recipe);
          } else {
            newRecipeList.recipes = [recipe];
          }
          // replace list in recipe lists object
          const newRecipeLists = _.map(
            recipeLists,
            list => (list.id === newRecipeList.id ? newRecipeList : list),
          );

          dispatch(setRecipeLists(newRecipeLists));
          this.setState({
            errorMessage: '',
            successMessage: 'Successfully added recipe to list',
            selectedList: null,
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    }
  };

  handleListChange = (itemValue: string) => {
    const { recipeLists } = this.props;
    let selectedList = null;
    if (parseInt(itemValue, 10) !== 0) {
      selectedList = recipeLists.find(
        list => capitalize(list.name) === capitalize(itemValue),
      );
    }

    this.setState({ selectedList });
  };

  handleRemoveRecipeFromList = () => {
    const {
      token,
      dispatch,
      recipeLists,
      navigation: { state: { params: { recipeList } } },
    } = this.props;
    const { recipe } = this.state;
    return recipeList
      ? deleteRecipeFromRecipeList(token, recipe, recipeList)
          .then(() => {
            // Remove recipe from list
            const newRecipeList = _.cloneDeep(recipeList);
            newRecipeList.recipes = _.filter(
              newRecipeList ? newRecipeList.recipes : [],
              listRecipe => listRecipe.id !== recipe.id,
            );
            // replace list in recipe lists object
            const newRecipeLists = _.map(
              recipeLists,
              list => (list.id === newRecipeList.id ? newRecipeList : list),
            );

            dispatch(setRecipeLists(newRecipeLists));
            const { navigation } = this.props;
            navigation.goBack();
          })
          .catch(error => {
            this.setState({ errorMessage: error.message });
          })
      : null;
  };

  handleLinkChange = (url: string) => {
    const { recipe } = this.state;
    this.setState({ recipe: { ...recipe, url } });
  };

  render() {
    const {
      mealTypes,
      cuisineTypes,
      proteinTypes,
      preparationTypes,
      recipeLists,
      currentRecipe,
      navigation: { state: { params: { recipeList } } },
    } = this.props;
    const { errorMessage, successMessage, selectedList, recipe } = this.state;

    const imageUri = currentRecipe.imageFilename
      ? getPathWithFilename(currentRecipe.id, currentRecipe.imageFilename)
      : '';

    return recipe === undefined
      ? null
      : <View style={styles.container}>
          <RecipeDetails
            recipe={recipe}
            recipeLists={recipeLists}
            mealTypes={mealTypes}
            cuisineTypes={cuisineTypes}
            proteinTypes={proteinTypes}
            preparationTypes={preparationTypes}
            recipeImageUri={imageUri}
            onNameChange={this.handleNameChange}
            onSourceChange={this.handleSourceChange}
            onVolumeChange={this.handleVolumeChange}
            onPageChange={this.handlePageChange}
            onNewRecipeCheckedChange={this.handleNewRecipeCheckedChange}
            onTriedItCheckedChange={this.handleTriedItRecipeCheckedChange}
            onRatingChange={this.handleRatingChange}
            onMealTypeChange={this.handleMealTypeChange}
            onCuisineTypeChange={this.handleCuisineTypeChange}
            onPreparationTypeChange={this.handlePreparationTypeChange}
            onProteinTypeChange={this.handleProteinTypeChange}
            onUpdate={this.handleOnUpdate}
            onDelete={this.handleOnDelete}
            onAddToList={this.handleAddToList}
            selectedList={selectedList}
            onListChange={this.handleListChange}
            errorMessage={errorMessage}
            successMessage={successMessage}
            currentRecipeList={recipeList}
            onRemoveRecipeFromList={this.handleRemoveRecipeFromList}
            onLinkChange={this.handleLinkChange}
          />
        </View>;
  }
}

const mapStateToProps = state => ({
  currentRecipe: state.recipe,
  recipes: state.recipes,
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
  token: state.token,
  recipeLists: state.recipeLists,
  recipeImageUri: state.recipeImageUri,
});

export default connect(mapStateToProps)(RecipeDetailsScreen);
