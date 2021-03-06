/* @flow */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import type { Store, State as StoreState } from '../../store/store';
import { setRecipe } from '../../store/actions';
import AddRecipe from './components/AddRecipe';
import type { Recipe } from '../../api/recipe/model';
import { createRecipe } from '../../api/recipe/recipes';
import ImageButton from '../../components/ImageButton';
import menuIcon from '../../images/hamburgerNav.png';

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  recipe: $PropertyType<StoreState, 'recipe'>,
  mealTypes: $PropertyType<StoreState, 'mealTypes'>,
  cuisineTypes: $PropertyType<StoreState, 'cuisineTypes'>,
  preparationTypes: $PropertyType<StoreState, 'preparationTypes'>,
  proteinTypes: $PropertyType<StoreState, 'proteinTypes'>,
  token: $PropertyType<StoreState, 'token'>,
};

type State = {
  errorMessage: string,
};
export class AddRecipeScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Recipes',
    headerLeft: (
      <ImageButton
        icon={menuIcon}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    ),
  });
  state = {
    errorMessage: '',
  };

  mealTypeRef: ModalDropdown;
  cuisineTypeRef: ModalDropdown;
  preparationTypeRef: ModalDropdown;
  proteinTypeRef: ModalDropdown;

  handleMealTypeRef = (ref: ModalDropdown) => {
    this.mealTypeRef = ref;
  };

  handleCuisineTypeRef = (ref: ModalDropdown) => {
    this.cuisineTypeRef = ref;
  };

  handlePreparationTypeRef = (ref: ModalDropdown) => {
    this.preparationTypeRef = ref;
  };

  handleProteinTypeRef = (ref: ModalDropdown) => {
    this.proteinTypeRef = ref;
  };

  handleNameChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.name = text;
    dispatch(setRecipe(newRecipe));
  };

  handleSourceChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.source = text;
    dispatch(setRecipe(newRecipe));
  };

  handleVolumeChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.volume = text;
    dispatch(setRecipe(newRecipe));
  };

  handlePageChange = (text: string) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe };
    newRecipe.page = text;
    dispatch(setRecipe(newRecipe));
  };

  handleNewRecipeCheckedChange = (checked: boolean) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe, newRecipe: !checked };
    dispatch(setRecipe(newRecipe));
  };

  handleTriedItRecipeCheckedChange = (checked: boolean) => {
    const { dispatch, recipe } = this.props;
    const newRecipe: Recipe = { ...recipe, newRecipe: checked };
    console.log(`newRecipe: ${JSON.stringify(newRecipe)}`);
    dispatch(setRecipe(newRecipe));
  };

  handleRatingChange = (itemSelected: number) => {
    const {dispatch, recipe} = this.props;
    const newRecipe: Recipe = { ...recipe, stars: itemSelected};
    dispatch(setRecipe(newRecipe));
  };

  handleMealTypeChange = (idx: string) => {
    const newType = this.props.mealTypes.find(
      type => type.idx === parseInt(idx, 10),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe: Recipe = { ...recipe, mealType: newType };
    dispatch(setRecipe(newRecipe));
  };

  handleCuisineTypeChange = (idx: string) => {
    const newType = this.props.cuisineTypes.find(
      type => type.idx === parseInt(idx, 10),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe = { ...recipe, cuisineType: newType };
    dispatch(setRecipe(newRecipe));
  };

  handlePreparationTypeChange = (idx: string) => {
    const newType = this.props.preparationTypes.find(
      type => type.idx === parseInt(idx, 10),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe = { ...recipe, preparationType: newType };
    dispatch(setRecipe(newRecipe));
  };

  handleProteinTypeChange = (idx: string) => {
    const newType = this.props.proteinTypes.find(
      type => type.idx === parseInt(idx, 10),
    );

    const { recipe, dispatch } = this.props;
    const newRecipe = { ...recipe, proteinType: newType };
    dispatch(setRecipe(newRecipe));
  };

  handleSaveRecipe = () => {
    const { recipe, token } = this.props;

    if(recipe && recipe.newRecipe === undefined) {
      recipe.newRecipe = true;
    }

    console.log(`final state: ${JSON.stringify(recipe)}`);

    createRecipe(token, recipe)
      .then(response => {
        console.log(`Created Recipe: ${JSON.stringify(response)}`);
        this.setState({ errorMessage: '' });
        this.handleClearRecipe();
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });

    Keyboard.dismiss();
  };

  handleClearRecipe = () => {
    const { dispatch } = this.props;
    dispatch(setRecipe(null));

    if (this.mealTypeRef) {
      this.mealTypeRef.select(0);
    }
    if (this.cuisineTypeRef) {
      this.cuisineTypeRef.select(0);
    }
    if (this.preparationTypeRef) {
      this.preparationTypeRef.select(0);
    }
    if (this.proteinTypeRef) {
      this.proteinTypeRef.select(0);
    }

    this.setState({ errorMessage: '' });

    Keyboard.dismiss();
  };

  render() {
    const {
      recipe,
      mealTypes,
      cuisineTypes,
      preparationTypes,
      proteinTypes,
    } = this.props;

    const { errorMessage } = this.state;

    const types = [
      {
        name: 'mealTypes',
        values: mealTypes,
        callback: this.handleMealTypeChange,
        ref: this.handleMealTypeRef,
      },
      {
        name: 'cuisineTypes',
        values: cuisineTypes,
        callback: this.handleCuisineTypeChange,
        ref: this.handleCuisineTypeRef,
      },
      {
        name: 'preparationTypes',
        values: preparationTypes,
        callback: this.handlePreparationTypeChange,
        ref: this.handlePreparationTypeRef,
      },
      {
        name: 'proteinTypes',
        values: proteinTypes,
        callback: this.handleProteinTypeChange,
        ref: this.handleProteinTypeRef,
      },
    ];

    return (
      <AddRecipe
        onNameChange={this.handleNameChange}
        onSourceChange={this.handleSourceChange}
        onVolumeChange={this.handleVolumeChange}
        onPageChange={this.handlePageChange}
        onNewRecipeCheckedChange={this.handleNewRecipeCheckedChange}
        onTriedItCheckedChange={this.handleTriedItRecipeCheckedChange}
        onRatingChange={this.handleRatingChange}
        types={types}
        onSave={this.handleSaveRecipe}
        onClear={this.handleClearRecipe}
        recipe={recipe}
        errorMessage={errorMessage}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
  token: state.token,
});

const AddRecipeNav = StackNavigator({
  AddRecipe: {
    screen: connect(mapStateToProps)(AddRecipeScreen),
  },
});

export default AddRecipeNav;
