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
import {
  hideModal,
  setRecipeLists,
  setRecipes,
} from '../../store/actions';
import RecipeDetails from './components/RecipeDetails';
import ImageButton from '../../components/ImageButton';
import { updateRecipe, deleteRecipe } from '../../api/recipe/recipes';
import type { Recipe, RecipeList } from '../../api/recipe/model';
import { store } from '../../store/store';
import { capitalize } from '../../utils/strings';
import {
  addRecipeToRecipeList,
  deleteRecipeFromRecipeList,
} from '../../api/recipe/recipeLists';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

type State = {
  errorMessage: string,
  successMessage: string,
  recipe: Recipe | null,
  selectedList: RecipeList | null,
  link: string,
};

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
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
    recipe: null,
    selectedList: null,
    link: '',
  };

  handleNameChange = (newName: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.name = newName;
    this.setState({ recipe });
  };

  handleSourceChange = (newSource: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.source = newSource;
    this.setState({ recipe });
  };

  handleVolumeChange = (newVolume: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.volume = newVolume;
    this.setState({ recipe });
  };

  handlePageChange = (newPage: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.page = newPage;
    this.setState({ recipe });
  };

  handleNewRecipeCheckedChange = (checked: boolean) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.newRecipe = !checked;
    this.setState({ recipe });
  };

  handleTriedItRecipeCheckedChange = (checked: boolean) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.newRecipe = checked;
    this.setState({ recipe });
  };

  handleRatingChange = (itemSelected: number) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.stars = itemSelected;
    this.setState({ recipe });
  };

  handleMealTypeChange = (itemValue: string) => {
    const {
      mealTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.mealType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.mealType = {};
      const newType = mealTypes.find(type => type.idx === selectedIdx);
      recipe.mealType = newType;
    }
    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleCuisineTypeChange = (itemValue: string) => {
    const {
      cuisineTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.cuisineType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.cuisineType = {};
      const newType = cuisineTypes.find(type => type.idx === selectedIdx);
      recipe.cuisineType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handlePreparationTypeChange = (itemValue: string) => {
    const {
      preparationTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.preparationType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.preparationType = {};
      const newType = preparationTypes.find(type => type.idx === selectedIdx);
      recipe.preparationType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleProteinTypeChange = (itemValue: string) => {
    const {
      proteinTypes,
      navigation: { state: { params: { recipe } } },
    } = this.props;

    recipe.proteinType = null;
    if (parseInt(itemValue, 10) !== 0) {
      const selectedIdx = parseInt(itemValue, 10);
      recipe.proteinType = {};
      const newType = proteinTypes.find(type => type.idx === selectedIdx);
      recipe.proteinType = newType;
    }

    console.log(`recipe: ${JSON.stringify(recipe)}`);
    this.setState({ recipe });
  };

  handleOnUpdate = () => {
    const {
      recipes,
      dispatch,
      token,
      navigation: { state: { params: { recipe } } },
    } = this.props;
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
    const {
      recipes,
      dispatch,
      token,
      navigation: { state: { params: { recipe } } },
    } = this.props;
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
    const {
      token,
      dispatch,
      recipeLists,
      navigation: { state: { params: { recipe } } },
    } = this.props;

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
      navigation: { state: { params: { recipe, recipeList } } },
    } = this.props;
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

  handleLinkChange = (newLink: string) => {
    const { navigation: { state: { params: { recipe } } } } = this.props;
    recipe.url = newLink;
    this.setState({ recipe });
  };

  render() {
    const {
      mealTypes,
      cuisineTypes,
      proteinTypes,
      preparationTypes,
      recipeLists,
      navigation: { state: { params: { recipe, recipeList } } },
    } = this.props;
    const { errorMessage, successMessage, selectedList } = this.state;
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
  recipes: state.recipes,
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
  token: state.token,
  recipeLists: state.recipeLists,
});

export default connect(mapStateToProps)(RecipeDetailsScreen);
