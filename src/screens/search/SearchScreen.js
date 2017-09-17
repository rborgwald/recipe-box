/* @flow */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';
import type { Store, State as StoreState } from '../../store/store';
import { setRecipes } from '../../store/actions';
import Search from './components/Search';
import { searchRecipes } from '../../api/recipe/recipes';
import type { SearchCriterion } from '../../api/recipe/model';
import RecipeDetailsScreen from '../recipe-details/RecipeDetailsScreen';
import ImageButton from '../../components/ImageButton';
import menuIcon from '../../images/hamburgerNav.png';

type State = {
  searchString: string,
  newRecipe: boolean,
  triedIt: boolean,
  mealType: SearchCriterion | null,
  cuisineType: SearchCriterion | null,
  preparationType: SearchCriterion | null,
  proteinType: SearchCriterion | null,
  errorMessage: string,
};

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  navigation: NavigationScreenProp,
  results: $PropertyType<StoreState, 'recipes'>,
  mealTypes: $PropertyType<StoreState, 'mealTypes'>,
  cuisineTypes: $PropertyType<StoreState, 'cuisineTypes'>,
  preparationTypes: $PropertyType<StoreState, 'preparationTypes'>,
  proteinTypes: $PropertyType<StoreState, 'proteinTypes'>,
};

export class SearchScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    headerLeft: (
      <ImageButton
        icon={menuIcon}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    ),
  });

  state = {
    searchString: '',
    newRecipe: true,
    triedIt: true,
    mealType: null,
    cuisineType: null,
    preparationType: null,
    proteinType: null,
    errorMessage: '',
  };

  mealTypeRef: ModalDropdown;
  cuisineTypeRef: ModalDropdown;
  preparationTypeRef: ModalDropdown;
  proteinTypeRef: ModalDropdown;

  handleSearchRecipe = () => {
    const {
      searchString,
      newRecipe,
      triedIt,
      mealType,
      cuisineType,
      preparationType,
      proteinType,
    } = this.state;

    const queryParams = [
      {
        queryParam: 'name',
        value: searchString,
      },
      {
        queryParam: 'mealtype',
        value: mealType ? mealType.name : '',
      },
      {
        queryParam: 'cuisinetype',
        value: cuisineType ? cuisineType.name : '',
      },
      {
        queryParam: 'preparationtype',
        value: preparationType ? preparationType.name : '',
      },
      {
        queryParam: 'proteintype',
        value: proteinType ? proteinType.name : '',
      },
      // TODO - logic here to determine if new=true, new=false, or new = ''
      {
        queryParam: 'new',
        value: newRecipe && !triedIt ? newRecipe.toString()
          : !newRecipe && triedIt ? newRecipe.toString() : '',
      },
    ];

    searchRecipes(queryParams)
      .then(recipes => {
        console.log(`Matching recipes: ${JSON.stringify(recipes)}`);
        const { dispatch } = this.props;
        dispatch(setRecipes(recipes));
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
    Keyboard.dismiss();
  };

  handleTextChange = (text: string) => {
    this.setState({ searchString: text });
  };

  handleNewCheckedChange = (checked: boolean) => {
    this.setState({ newRecipe: !checked });
  };

  handleTriedItCheckedChange = (checked: boolean) => {
    this.setState({ triedIt: !checked});
  };

  handleMealTypeChange = (idx: string) => {
    const newType = this.props.mealTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ mealType: newType });
  };

  handleCuisineTypeChange = (idx: string) => {
    const newType = this.props.cuisineTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ cuisineType: newType });
  };

  handlePreparationTypeChange = (idx: string) => {
    const newType = this.props.preparationTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ preparationType: newType });
  };

  handleProteinTypeChange = (idx: string) => {
    const newType = this.props.proteinTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ proteinType: newType });
  };

  handleClear = () => {
    const { dispatch } = this.props;
    this.setState({
      searchString: '',
      newRecipe: true,
      triedIt: true,
      mealType: undefined,
      cuisineType: undefined,
      preparationType: undefined,
      proteinType: undefined,
    });
    dispatch(setRecipes([]));

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

  render() {
    const {
      navigation,
      mealTypes,
      cuisineTypes,
      preparationTypes,
      proteinTypes,
      results,
    } = this.props;

    const { errorMessage } = this.state;

    const types = [
      {
        name: 'mealTypes',
        values: mealTypes,
        value: this.state.mealType,
        callback: this.handleMealTypeChange,
        ref: this.handleMealTypeRef,
      },
      {
        name: 'cuisineTypes',
        values: cuisineTypes,
        value: this.state.cuisineType,
        callback: this.handleCuisineTypeChange,
        ref: this.handleCuisineTypeRef,
      },
      {
        name: 'preparationTypes',
        values: preparationTypes,
        value: this.state.preparationType,
        callback: this.handlePreparationTypeChange,
        ref: this.handlePreparationTypeRef,
      },
      {
        name: 'proteinTypes',
        values: proteinTypes,
        value: this.state.proteinType,
        callback: this.handleProteinTypeChange,
        ref: this.handleProteinTypeRef,
      },
    ];

    const data = results.map(recipe => ({
      key: recipe.id,
      recipe,
      onViewRecipe: () => {
        navigation.navigate('RecipeDetailsScreen', {
          recipe,
        });
      },
    }));

    return (
      <Search
        types={types}
        onTextChange={this.handleTextChange}
        newRecipeChecked={this.state.newRecipe}
        onNewRecipeCheckedChange={this.handleNewCheckedChange}
        triedItChecked={this.state.triedIt}
        onTriedItCheckedChange={this.handleTriedItCheckedChange}
        onSearchRecipe={this.handleSearchRecipe}
        onClearSearch={this.handleClear}
        recipes={data}
        textValue={this.state.searchString}
        errorMessage={errorMessage}
      />
    );
  }
}

const mapStateToProps = state => ({
  results: state.recipes,
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
});

const RecipeNav = StackNavigator({
  Search: {
    screen: connect(mapStateToProps)(SearchScreen),
  },
  RecipeDetailsScreen: {
    screen: RecipeDetailsScreen,
  },
});

export default RecipeNav;
