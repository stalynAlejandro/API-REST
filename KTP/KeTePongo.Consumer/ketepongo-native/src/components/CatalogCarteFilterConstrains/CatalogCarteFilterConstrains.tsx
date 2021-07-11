import React from "react";
import { View, ScrollView} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ARRAYS, STRINGS, getDictionaryValuesByKeys } from "constants";
import { TouchableIcon, TypoGraphyOpenSans, FilterButton } from "components";
import styles from "./CatalogCarteFilterConstrains.component.styles";
import CloseIcon from "../../../assets/All_Icons/symbols/x_grey.svg";

import {
  filterCatalogCarteRequestByKeyword,
  navigateToFilterCatalogCarte,
  filterCatalogCartRequest
} from "../../store/filterCatalogCarte";
import { ISectionHash } from "../../store/providerCatalogProducts/sections";
import { KindOfFood } from "../../store/providerCatalogProducts";
import { AllergenDTO } from "model/DTOs";
import { ISearchCatalog, IFilterCatalogCartRequest } from "../../store/filterCatalogCarte";

class CatalogCarteFilterConstrains extends React.Component<IProps, {}> {
   displayConstraints = () => {
    const constrains = this.combineConstrains();
    return constrains.map(item => this.createNameConstrain(item));
  };

  combineConstrains = () => {
    const {
      filterCatalogCarteOptions,
      sectionDictionary,
      kindsOfFoodDictionary,
      allergensDictionary
    } = this.props;
    const { selectedSections, selectedAllergens, selectedKindsOfFood, keyword } = filterCatalogCarteOptions;
    let constrains = [];
    if(keyword!==""){
      constrains.push({
        name: keyword,
        type: "keyword"
      });
    }

    if(selectedSections.length>0){
      Object.values(getDictionaryValuesByKeys(sectionDictionary, selectedSections)).forEach(x=> {
        constrains.push({
          name: x.name,
          type: "sections",
          id: x.id
        });
      });
    }
    if(selectedAllergens.length>0){
        Object.values(getDictionaryValuesByKeys(allergensDictionary, selectedAllergens)).forEach(x=> {
          constrains.push({
            name: x.name,
            type: "allergens",
            id: x.id
          });
        });
    }
    if(selectedKindsOfFood.length>0){
        Object.values(getDictionaryValuesByKeys(kindsOfFoodDictionary, selectedKindsOfFood)).forEach(x=> {
          constrains.push({
            name: x.name,
            type: "kindsOfFood",
            id: x.id
          });
        });
    }

    return constrains;
  };

  createNameConstrain = ({ name, type, id }) => (
    <View key={name} style={styles.constrain}>
      <TouchableIcon
        onPress={() => this.onRemoveConstrain(type, id)}
        styles={{}}
        icon={<CloseIcon {...styles.icon_size} />}
      />
      <TypoGraphyOpenSans style={styles.name} text={name.toUpperCase()} />
    </View>
  );

  onRemoveConstrain = (type,id )=> {
    const {
      filterCatalogCarteOptions,
      filterCatalogCarteRequestByKeyword,
      filterCatalogCartRequest
    } = this.props;
    if (type == "keyword") {
      filterCatalogCarteRequestByKeyword("");
    } else {
      let { selectedSections, selectedAllergens, selectedKindsOfFood, keyword } = filterCatalogCarteOptions;
      if(type==="sections"){
        selectedSections =selectedSections.filter(x=>x!==id);
      }else if(type==="allergens"){
        selectedAllergens = selectedAllergens.filter(x=>x!==id);
      }else{
        selectedKindsOfFood = selectedKindsOfFood.filter(x=>x!==id);
      }
      filterCatalogCartRequest({ sectionsSelected: selectedSections,allergensSelected: selectedAllergens, kindsOfFoodSelected: selectedKindsOfFood, keyword})
    }
  };

  render() {
    const {
      styles,
      navigateToFilterCatalogCarte,
      hasToDisplayFilterConstraints
    } = this.props;

    if (!hasToDisplayFilterConstraints) {
      return <View/>;
    }
    return (
      <ScrollView
        horizontal={true}
        numColumns={1}
        onLayout={event => {
          this.setState({ sectionDisplayHeight: 50 });
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content_container_scrollView}
        style={{...styles.scrollView,...styles.container}}>
        <FilterButton onPressFilter={() => navigateToFilterCatalogCarte()} />
        <View style={styles.constrain_wrapper}>
          {this.displayConstraints()}
        </View>
      </ScrollView>
    );
  }
}

CatalogCarteFilterConstrains.defaultProps = {
  styles
};

CatalogCarteFilterConstrains.propTypes = {
  hasToDisplayFilterConstraints: PropTypes.bool.isRequired,
  filterCatalogCarteOptions: PropTypes.object.isRequired,
  sectionDictionary: PropTypes.object.isRequired,
  allergensDictionary: PropTypes.object.isRequired,
  kindsOfFoodDictionary: PropTypes.object.isRequired,
  filterCatalogCarteRequestByKeyword: PropTypes.func.isRequired,
  navigateToFilterCatalogCarte: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

interface IProps {
  sectionDictionary: ISectionHash;
  allergensDictionary: { [id: number]: AllergenDTO };
  kindsOfFoodDictionary: { [id: number]: KindOfFood };
  navigateToFilterCatalogCarte: Function;
  filterCatalogCarteRequestByKeyword: Function;
  hasToDisplayFilterConstraints: boolean;
  filterCatalogCarteOptions: ISearchCatalog;
  filterCatalogCartRequest: (data: IFilterCatalogCartRequest ) => void;
}

const mapDispatchToProps = {
  navigateToFilterCatalogCarte,
  filterCatalogCarteRequestByKeyword,
  filterCatalogCartRequest
};

CatalogCarteFilterConstrains = connect(
  null,
  mapDispatchToProps
)(CatalogCarteFilterConstrains);

export { CatalogCarteFilterConstrains };
