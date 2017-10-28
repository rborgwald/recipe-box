// @flow
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import type { Store, State as StoreState } from '../../store/store';
import ImageButton from '../../components/ImageButton';
import Categories from './components/Categories';
import menuIcon from '../../images/hamburgerNav.png';
import Options from './components/Options';
import TextRowInput from '../../components/TextRowInput';
import BlockButton from '../../components/BlockButton';
import type { SearchCriterion } from '../../api/recipe/model';
import { createType, deleteType, updateType } from '../../api/recipe/lookup';
import {
  setCuisineTypes,
  setMealTypes,
  setPreparationTypes,
  setProteinTypes,
} from '../../store/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  categoriesContainer: {
    margin: 15,
  },
  optionsContainer: {
    margin: 15,
    marginRight: 20,
  },
  textRow: {
    margin: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  saveButton: {
    backgroundColor: '#29a709',
    margin: 5,
  },
  deleteButton: {
    backgroundColor: '#e24949',
    margin: 5,
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
    fontSize: 14,
    fontWeight: '300',
  },
  successMessage: {
    color: 'green',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
    fontSize: 14,
    fontWeight: '300',
  },
});

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  mealTypes: $PropertyType<StoreState, 'mealTypes'>,
  cuisineTypes: $PropertyType<StoreState, 'cuisineTypes'>,
  preparationTypes: $PropertyType<StoreState, 'preparationTypes'>,
  proteinTypes: $PropertyType<StoreState, 'proteinTypes'>,
  token: $PropertyType<StoreState, 'token'>,
};
type State = {
  successMessage: string,
  errorMessage: string,
  selectedCategory: number,
  currentOptions: SearchCriterion[],
  selectedOption: SearchCriterion | null,
  currentName: string,
};
export class AdminScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recipe Admin',
    headerLeft: (
      <ImageButton
        icon={menuIcon}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    ),
  });
  state = {
    successMessage: '',
    errorMessage: '',
    selectedCategory: 0,
    currentOptions: this.props.mealTypes,
    selectedOption: null,
    currentName: '',
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextState.selectedOption !== this.state.selectedOption ||
      nextState.currentName !== this.state.currentName ||
      nextState.successMessage !== this.state.successMessage ||
      nextState.errorMessage !== this.state.errorMessage ||
      nextState.currentOptions !== this.state.currentOptions ||
      nextProps !== this.props
    );
  }

  dropDownRef: ModalDropdown;

  categoriesMap = {
    '0': 'mealtypes',
    '1': 'cuisinetypes',
    '2': 'proteintypes',
    '3': 'preparationtypes',
  };

  handleCategoryPress = (value: number) => {
    this.setState({
      selectedCategory: value,
      selectedOption: null,
      currentName: '',
      successMessage: '',
      errorMessage: '',
    });

    if (value === 0) {
      this.setState({ currentOptions: this.props.mealTypes });
    } else if (value === 1) {
      this.setState({ currentOptions: this.props.cuisineTypes });
    } else if (value === 2) {
      this.setState({ currentOptions: this.props.proteinTypes });
    } else if (value === 3) {
      this.setState({ currentOptions: this.props.preparationTypes });
    }

    this.dropDownRef.select(0);
  };

  handleMealTypeChange = (idx: string) => {
    const mealType = this.props.mealTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    if (mealType) {
      this.setState({
        selectedOption: mealType,
        currentName: mealType.description,
      });
    } else {
      this.setState({ selectedOption: null, currentName: '' });
    }
    this.setState({
      successMessage: '',
      errorMessage: '',
    });
  };

  handleCuisineTypeChange = (idx: string) => {
    const cuisineType = this.props.cuisineTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    if (cuisineType) {
      this.setState({
        selectedOption: cuisineType,
        currentName: cuisineType.description,
      });
    } else {
      this.setState({ selectedOption: null, currentName: '' });
    }
    this.setState({
      successMessage: '',
      errorMessage: '',
    });
  };

  handlePreparationTypeChange = (idx: string) => {
    const preparationType = this.props.preparationTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    if (preparationType) {
      this.setState({
        selectedOption: preparationType,
        currentName: preparationType.description,
      });
    } else {
      this.setState({ selectedOption: null, currentName: '' });
    }
    this.setState({
      successMessage: '',
      errorMessage: '',
    });
  };

  handleProteinTypeChange = (idx: string) => {
    const proteinType = this.props.proteinTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    if (proteinType) {
      this.setState({
        selectedOption: proteinType,
        currentName: proteinType.description,
      });
    } else {
      this.setState({ selectedOption: null, currentName: '' });
    }
    this.setState({
      successMessage: '',
      errorMessage: '',
    });
  };

  handleNameChange = (text: string) => {
    this.setState({ currentName: text });
  };

  handleDropDownRef = (ref: ModalDropdown) => {
    this.dropDownRef = ref;
  };

  handleSavePress = () => {
    const { token } = this.props;

    if (!this.state.selectedOption && this.state.currentName !== '') {
      console.log(`Ready to save new type: ${this.state.currentName}`);

      createType(
        token,
        this.categoriesMap[this.state.selectedCategory],
        this.state.currentName,
      )
        .then(newType => {
          this.dispatchNewTypes(this.state.selectedCategory, newType);
          this.setState({
            currentName: '',
            successMessage: `New type "${newType.description}" successfully saved`,
            errorMessage: '',
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    } else if (this.state.selectedOption && this.state.currentName !== '') {
      const selectedOption = this.state.selectedOption;
      console.log(`Ready to update: ${this.state.currentName}`);
      updateType(
        token,
        this.categoriesMap[this.state.selectedCategory],
        selectedOption,
        this.state.currentName,
      )
        .then(newType => {
          console.log(`updated type: ${JSON.stringify(newType)}`);
          const typeWithIdx = { ...newType, idx: selectedOption.idx };
          this.dispatchUpdatedTypes(this.state.selectedCategory, typeWithIdx);
          this.setState({
            currentName: '',
            successMessage: `Type "${typeWithIdx.description}" updated successfully`,
            errorMessage: '',
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    }
  };

  dispatchNewTypes = (selectedCategory: number, type: SearchCriterion) => {
    const { dispatch } = this.props;
    let newTypes;
    const newType = type;
    if (selectedCategory === 0) {
      newTypes = [...this.props.mealTypes];
      newType.idx = newTypes.length + 1;
      newTypes.push(newType);
      console.log(`to dispatch: ${JSON.stringify(newTypes)}`);
      dispatch(setMealTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    } else if (selectedCategory === 1) {
      newTypes = [...this.props.cuisineTypes];
      newType.idx = newTypes.length + 1;
      newTypes.push(newType);
      dispatch(setCuisineTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    } else if (selectedCategory === 2) {
      newTypes = [...this.props.proteinTypes];
      newType.idx = newTypes.length + 1;
      newTypes.push(newType);
      dispatch(setProteinTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    } else if (selectedCategory === 3) {
      newTypes = [...this.props.preparationTypes];
      newType.idx = newTypes.length + 1;
      newTypes.push(newType);
      dispatch(setPreparationTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    }
  };

  dispatchUpdatedTypes = (selectedCategory: number, type: SearchCriterion) => {
    const { dispatch } = this.props;
    if (selectedCategory === 0) {
      const existingTypes = [...this.props.mealTypes];
      const newTypes = _.map(
        existingTypes,
        t =>
          t.id === type.id ? { ...type, description: type.description } : t,
      );
      console.log(`to dispatch: ${JSON.stringify(newTypes)}`);
      dispatch(setMealTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    } else if (selectedCategory === 1) {
      const existingTypes = [...this.props.cuisineTypes];
      const newTypes = _.map(
        existingTypes,
        t =>
          t.id === type.id ? { ...type, description: type.description } : t,
      );
      dispatch(setCuisineTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    } else if (selectedCategory === 2) {
      const existingTypes = [...this.props.proteinTypes];
      const newTypes = _.map(
        existingTypes,
        t =>
          t.id === type.id ? { ...type, description: type.description } : t,
      );
      dispatch(setProteinTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    } else if (selectedCategory === 3) {
      const existingTypes = [...this.props.preparationTypes];
      const newTypes = _.map(
        existingTypes,
        t =>
          t.id === type.id ? { ...type, description: type.description } : t,
      );
      dispatch(setPreparationTypes(newTypes));
      this.setState({ currentOptions: newTypes });
    }
    this.dropDownRef.select(0);
  };

  handleDeletePress = () => {
    const { token } = this.props;
    console.log(`Delete Pressed: ${JSON.stringify(this.state.selectedOption)}`);
    if (this.state.selectedOption) {
      const selectedOption = this.state.selectedOption;
      console.log(
        `Ready to delete type: ${selectedOption.id} ${selectedOption.name}`,
      );

      deleteType(
        token,
        this.categoriesMap[this.state.selectedCategory],
        selectedOption.id,
      )
        .then(() => {
          this.removeTypes(this.state.selectedCategory, selectedOption);
          this.setState({
            currentName: '',
            successMessage: `Type "${selectedOption.description}" successfully deleted`,
            errorMessage: '',
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, successMessage: '' });
        });
    }
  };

  removeTypes = (selectedCategory: number, type: SearchCriterion) => {
    const { dispatch } = this.props;
    let newTypes;
    if (selectedCategory === 0) {
      newTypes = [...this.props.mealTypes];
      _.remove(newTypes, { id: type.id });
      dispatch(setMealTypes(newTypes));
      this.setState({
        currentOptions: newTypes,
        selectedOption: null,
        currentName: '',
      });
    } else if (selectedCategory === 1) {
      newTypes = [...this.props.cuisineTypes];
      _.remove(newTypes, { id: type.id });
      dispatch(setCuisineTypes(newTypes));
      this.setState({
        currentOptions: newTypes,
        selectedOption: null,
        currentName: '',
      });
    } else if (selectedCategory === 2) {
      newTypes = [...this.props.proteinTypes];
      _.remove(newTypes, { id: type.id });
      dispatch(setProteinTypes(newTypes));
      this.setState({
        currentOptions: newTypes,
        selectedOption: null,
        currentName: '',
      });
    } else if (selectedCategory === 3) {
      newTypes = [...this.props.preparationTypes];
      _.remove(newTypes, { id: type.id });
      dispatch(setPreparationTypes(newTypes));
      this.setState({
        currentOptions: newTypes,
        selectedOption: null,
        currentName: '',
      });
    }
    this.dropDownRef.select(0);
  };

  render() {
    const categories = [
      { label: 'Meal', value: 0 },
      { label: 'Cuisine', value: 1 },
      { label: 'Protein', value: 2 },
      { label: 'Preparation', value: 3 },
    ];

    const types = [
      {
        callback: this.handleMealTypeChange,
      },
      {
        callback: this.handleCuisineTypeChange,
      },
      {
        callback: this.handleProteinTypeChange,
      },
      {
        callback: this.handlePreparationTypeChange,
      },
    ];

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.selectionContainer}>
            <View style={styles.categoriesContainer}>
              <Categories
                categories={categories}
                onPress={this.handleCategoryPress}
              />
            </View>
            <View style={styles.optionsContainer}>
              <Options
                category={this.state.selectedCategory}
                options={this.state.currentOptions}
                childRef={this.handleDropDownRef}
                types={types}
                selectedValue={this.state.selectedOption || undefined}
              />
            </View>
          </View>
          <TextRowInput
            containerStyle={styles.textRow}
            onChangeText={this.handleNameChange}
            headerText="Name"
            contentText={this.state.currentName}
          />
          <View style={styles.buttonContainer}>
            <BlockButton
              style={styles.saveButton}
              text="Save"
              onPress={this.handleSavePress}
              disabled={this.state.currentName === ''}
            />
            <BlockButton
              style={styles.deleteButton}
              text="Delete"
              onPress={this.handleDeletePress}
              disabled={
                this.state.currentName === '' ||
                this.state.selectedOption === null
              }
            />
          </View>
          <Text style={styles.errorMessage}>
            {this.state.errorMessage}
          </Text>
          <Text style={styles.successMessage}>
            {this.state.successMessage}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  mealTypes: state.mealTypes,
  cuisineTypes: state.cuisineTypes,
  proteinTypes: state.proteinTypes,
  preparationTypes: state.preparationTypes,
  token: state.token,
});

const AdminNav = StackNavigator({
  Admin: {
    screen: connect(mapStateToProps)(AdminScreen),
  },
});

export default AdminNav;
