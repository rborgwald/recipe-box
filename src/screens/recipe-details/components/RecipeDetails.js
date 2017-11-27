// @flow
import React from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import CheckBox from 'react-native-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type {
  Recipe,
  RecipeList,
  SearchCriterion,
} from '../../../api/recipe/model';
import TextRowInput from '../../../components/TextRowInput';
import BlockButton from '../../../components/BlockButton';
import BadgeSelector from '../../../components/BadgeSelector';
import Ratings from '../../../components/Ratings';
import TypeDropDown from '../../../components/TypeDropDown';
import WordButton from '../../../components/WordButton';
import ImageButton from '../../../components/ImageButton';
import wwwIcon from '../../../images/www_icon.png';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 15,
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
  },
  ratingsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
    marginBottom: 15,
  },
  linkContainer: {
    flexDirection: 'row',
  },
  badgeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginBottom: 45,
  },
  updateButton: {
    backgroundColor: '#29a709',
    margin: 5,
    marginTop: 0,
  },
  deleteButton: {
    backgroundColor: '#e24949',
    margin: 5,
    marginTop: 0,
  },
  errorMessage: {
    color: '#e74c3c',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
  },
  successMessage: {
    color: 'green',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingBottom: 15,
  },
  dropDownContainer: {
    flex: 3,
  },
  addToList: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  addToListButton: {
    flex: 1,
    backgroundColor: '#29a709',
    margin: 5,
    marginBottom: 8,
    height: 20,
    width: '25%',
  },
  listPicker: {
    height: 30,
    width: 220,
  },
  removeFromList: {
    flexDirection: 'row',
  },
  removeButton: {
    fontSize: 18,
    color: 'red',
    margin: 5,
  },
});

const RecipeDetails = ({
  recipe,
  recipeLists,
  mealTypes,
  cuisineTypes,
  proteinTypes,
  preparationTypes,
  onNameChange,
  onSourceChange,
  onVolumeChange,
  onPageChange,
  onNewRecipeCheckedChange,
  onTriedItCheckedChange,
  onRatingChange,
  onMealTypeChange,
  onCuisineTypeChange,
  onPreparationTypeChange,
  onProteinTypeChange,
  onUpdate,
  onDelete,
  onAddToList,
  selectedList,
  onListChange,
  errorMessage,
  successMessage,
  currentRecipeList,
  onRemoveRecipeFromList,
  onLinkChange,
}: {
  recipe: Recipe,
  recipeLists: RecipeList[],
  mealTypes: SearchCriterion[],
  cuisineTypes: SearchCriterion[],
  proteinTypes: SearchCriterion[],
  preparationTypes: SearchCriterion[],
  onNameChange: Function,
  onSourceChange: Function,
  onVolumeChange: Function,
  onPageChange: Function,
  onNewRecipeCheckedChange: Function,
  onTriedItCheckedChange: Function,
  onRatingChange: Function,
  onMealTypeChange: Function,
  onCuisineTypeChange: Function,
  onPreparationTypeChange: Function,
  onProteinTypeChange: Function,
  onUpdate: Function,
  onDelete: Function,
  onAddToList: Function,
  selectedList: RecipeList | null,
  onListChange: Function,
  errorMessage: string,
  successMessage: string,
  currentRecipeList?: RecipeList,
  onRemoveRecipeFromList?: Function,
  onLinkChange: Function,
}) =>
  <View style={styles.container}>
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.infoWrapper}>
        <View style={styles.detailsContainer}>
          <TextRowInput
            onChangeText={onNameChange}
            headerText="Name"
            contentText={recipe.name}
          />
          <TextRowInput
            onChangeText={onSourceChange}
            headerText="Source"
            contentText={recipe.source}
          />
          <TextRowInput
            onChangeText={onVolumeChange}
            headerText="Volume"
            contentText={recipe.volume}
          />
          <TextRowInput
            onChangeText={onPageChange}
            headerText="Page"
            contentText={recipe.page ? recipe.page.toString() : ''}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              label="New"
              checked={recipe.newRecipe}
              onChange={onNewRecipeCheckedChange}
            />
            <CheckBox
              label="Tried It"
              checked={!recipe.newRecipe}
              onChange={onTriedItCheckedChange}
            />
          </View>
        </View>
        <View style={styles.badgeContainer}>
          <BadgeSelector
            searchCriterion={recipe.mealType}
            backgroundColor="#6b7a8f"
            defaultText="- Meal -"
            onValueChange={onMealTypeChange}
            options={mealTypes}
          />
          <BadgeSelector
            searchCriterion={recipe.cuisineType}
            backgroundColor="#f7882f"
            defaultText="- Cuisine -"
            onValueChange={onCuisineTypeChange}
            options={cuisineTypes}
          />
          <BadgeSelector
            searchCriterion={recipe.preparationType}
            backgroundColor="#f7c331"
            defaultText="- Prep -"
            onValueChange={onPreparationTypeChange}
            options={preparationTypes}
          />
          <BadgeSelector
            searchCriterion={recipe.proteinType}
            backgroundColor="#dcc7aa"
            defaultText="- Protein -"
            onValueChange={onProteinTypeChange}
            options={proteinTypes}
          />
        </View>
      </View>
      <View style={styles.ratingsContainer}>
        <View style={styles.linkContainer}>
          <TextRowInput
            containerStyle={{ width: '85%' }}
            onChangeText={onLinkChange}
            headerText="Link"
            contentText={recipe.url}
          />
          {recipe.url
            ? <ImageButton
                icon={wwwIcon}
                onPress={() => {
                  Linking.canOpenURL(recipe.url).then(supported => {
                    if (supported) {
                      Linking.openURL(recipe.url);
                    } else {
                      console.warn("Don't know how to open URI: " + recipe.url);
                    }
                  });
                }}
              />
            : null}
        </View>
        <Ratings
          maxRating={3}
          rating={recipe.stars ? recipe.stars : 0}
          onRatingChange={onRatingChange}
        />
      </View>
    </KeyboardAwareScrollView>
    <View style={styles.buttonContainer}>
      <BlockButton
        style={styles.updateButton}
        text="Update"
        onPress={onUpdate}
      />
      <BlockButton
        style={styles.deleteButton}
        text="Delete"
        onPress={() =>
          Alert.alert(
            'Warning',
            'Are you sure you want to delete this recipe?',
            [
              { text: 'Cancel', onPress: () => {} },
              { text: 'Yes', onPress: onDelete },
            ],
          )}
      />
    </View>
    <Text style={styles.errorMessage}>
      {errorMessage}
    </Text>
    <Text style={styles.successMessage}>
      {successMessage}
    </Text>

    {currentRecipeList && onRemoveRecipeFromList
      ? <View style={styles.removeFromList}>
          <WordButton
            style={styles.removeButton}
            text={`Remove from list: ${currentRecipeList.name}`}
            onPress={onRemoveRecipeFromList}
          />
        </View>
      : <View style={styles.addToList}>
          <TypeDropDown
            containerStyle={styles.dropDownContainer}
            style={styles.listPicker}
            title={`Add ${recipe.name} to list`}
            selectedValue={
              selectedList ? selectedList.name : 'No list selected'
            }
            onValueChange={onListChange}
            options={
              recipeLists
                ? recipeLists.map(list => list.name)
                : ['no lists available']
            }
          />
          <BlockButton
            style={styles.addToListButton}
            text="Add"
            onPress={onAddToList}
          />
        </View>}
  </View>;

export default RecipeDetails;
