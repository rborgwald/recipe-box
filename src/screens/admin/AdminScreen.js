// @flow
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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
    backgroundColor: 'green',
    margin: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    margin: 5,
  },
  statusMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
    fontSize: 22,
  },
});

type Props = {
  dispatch: $PropertyType<Store, 'dispatch'>,
  mealTypes: $PropertyType<StoreState, 'mealTypes'>,
  cuisineTypes: $PropertyType<StoreState, 'cuisineTypes'>,
  preparationTypes: $PropertyType<StoreState, 'preparationTypes'>,
  proteinTypes: $PropertyType<StoreState, 'proteinTypes'>,
};
type State = {
  statusMessage: string,
  selectedCategory: number,
  selectedOption: SearchCriterion | null,
};
export class AdminScreen extends Component<any, Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Admin',
    headerLeft: (
      <ImageButton
        icon={menuIcon}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    ),
  });
  state = {
    statusMessage: '',
    selectedCategory: 0,
    selectedOption: null,
  };

  mealTypeRef: ModalDropdown;
  cuisineTypeRef: ModalDropdown;
  preparationTypeRef: ModalDropdown;
  proteinTypeRef: ModalDropdown;

  handleCategoryPress = (value: number) => {
    this.setState({ selectedCategory: value, selectedOption: undefined });
    if (this.mealTypeRef) {
      this.mealTypeRef.select(0);
    }
    if (this.cuisineTypeRef) {
      this.cuisineTypeRef.select(0);
    }
    if (this.proteinTypeRef) {
      this.proteinTypeRef.select(0);
    }
    if (this.preparationTypeRef) {
      this.preparationTypeRef.select(0);
    }
  };

  handleMealTypeChange = (idx: string) => {
    const mealType = this.props.mealTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ selectedOption: mealType });
  };

  handleCuisineTypeChange = (idx: string) => {
    const cuisineType = this.props.cuisineTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ selectedOption: cuisineType });
  };

  handlePreparationTypeChange = (idx: string) => {
    const preparationType = this.props.preparationTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ selectedOption: preparationType });
  };

  handleProteinTypeChange = (idx: string) => {
    const proteinType = this.props.proteinTypes.find(
      type => type.idx === parseInt(idx, 10),
    );
    this.setState({ selectedOption: proteinType });
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
      mealTypes,
      cuisineTypes,
      preparationTypes,
      proteinTypes,
    } = this.props;

    const categories = [
      { label: 'Meal', value: 0 },
      { label: 'Cuisine', value: 1 },
      { label: 'Protein', value: 2 },
      { label: 'Preparation', value: 3 },
    ];

    const types = [
      {
        values: mealTypes,
        value: this.state.selectedOption,
        callback: this.handleMealTypeChange,
        ref: this.handleMealTypeRef,
      },
      {
        values: cuisineTypes,
        value: this.state.selectedOption,
        callback: this.handleCuisineTypeChange,
        ref: this.handleCuisineTypeRef,
      },
      {
        values: proteinTypes,
        value: this.state.selectedOption,
        callback: this.handleProteinTypeChange,
        ref: this.handleProteinTypeRef,
      },
      {
        values: preparationTypes,
        value: this.state.selectedOption,
        callback: this.handlePreparationTypeChange,
        ref: this.handlePreparationTypeRef,
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
              <Options category={this.state.selectedCategory} types={types} />
            </View>
          </View>
          <TextRowInput
            containerStyle={styles.textRow}
            onChangeText={() => {}}
            headerText="Name"
            contentText={
              this.state.selectedOption
                ? this.state.selectedOption.description
                : ''
            }
          />
          <View style={styles.buttonContainer}>
            <BlockButton
              style={styles.saveButton}
              text="Save"
              onPress={() => {
                console.warn('Save pressed');
              }}
            />
            <BlockButton
              style={styles.deleteButton}
              text="Delete"
              onPress={() => {
                console.warn('Delete pressed');
              }}
            />
          </View>
          <Text style={styles.statusMessage}>Status message here</Text>
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
});

const AdminNav = StackNavigator({
  Admin: {
    screen: connect(mapStateToProps)(AdminScreen),
  },
});

export default AdminNav;
