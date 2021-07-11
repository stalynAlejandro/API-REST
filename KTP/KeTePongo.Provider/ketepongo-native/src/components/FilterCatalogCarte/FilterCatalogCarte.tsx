import React from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ARRAYS, STRINGS, TITLES, HEIGHT, LAYOUT, getDictionaryValuesByKeys, COLORS } from "constants";
import {
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSansSemiBold,
  TouchableIcon,
  TouchableHighlightIcon,
  TypoGraphyOpenSans,
  Spinner
} from "components";

import { AppState } from "store/";

import styles from "./FilterCatalogCarte.component.styles";
import UpArrow from "../../../assets/All_Icons/arrows/arrow_up_noTail.svg";
import DownArrow from "../../../assets/All_Icons/arrows/arrow_down_noTail.svg";
import {
  navigateBackToCatalogCarte,
  filterCatalogCartRequest
} from "../../store/filterCatalogCarte";
import {refreshProviderCatalogProductsFromServerAndFilter} from '../../store/providerCatalogProducts'
import { ISectionHash } from "../../store/providerCatalogProducts/sections";
import { KindOfFood } from "../../store/providerCatalogProducts";
import { AllergenDTO } from "model/DTOs";

interface IState {
  sectionsSelected: number[];
  filtersToggled: FilterListType[];
  spaceAvailable: number;
  buttonHeight: number;
  filtersHeight: number;
  allergensSelected: number[];
  kindsOfFoodSelected: number[];
  isLoading: boolean;
}

enum FilterListType {
  sections = "sections",
  allergens = "allergens",
  kindsOfFood = "kindsOfFood"
}

class FilterCatalogCarteComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {sectionsSelected, allergensSelected, kindsOfFoodSelected} = props
    this.state = {
      sectionsSelected,
      filtersToggled: [],
      spaceAvailable: LAYOUT.WINDOW.height,
      buttonHeight: HEIGHT.filterCatalogCarteButtonHeight,
      filtersHeight: HEIGHT.initialFilterCatalogCarteHeight,
      allergensSelected,
      kindsOfFoodSelected,
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.props.onRef(this);
    setTimeout(()=>{
      this.setState({isLoading: false})
    },100)
  };

  componentWillUnmount = () => this.props.onRef(undefined);

  onResetFilter = () => {
    this.setState({
      sectionSelected: [],
      filtersToggled: [],
      allergensSelected: [],
      kindsOfFoodSelected: []
    });
  };

  onPressFilter = async () => {
    const { sectionsSelected, allergensSelected, kindsOfFoodSelected } = this.state;
    const {refreshProviderCatalogProductsFromServerAndFilter,navigateBackToCatalogCarte,filterCatalogCartRequest} = this.props
    refreshProviderCatalogProductsFromServerAndFilter({sectionsSelected, allergensSelected, kindsOfFoodSelected});
    this.setState({isLoading: true})
    // navigateBackToCatalogCarte();
    // return filterCatalogCartRequest({sectionsSelected, allergensSelected, kindsOfFoodSelected});
  };

  changeFilterToggleState = (type: FilterListType) => {
    let { filtersToggled } = this.state;

    const { isFilterToggled, index } = this.isFilterToggled(type);
    if (!isFilterToggled) {
      filtersToggled = [type]
    } else {
      filtersToggled = []
    }
    this.setState({ filtersToggled: filtersToggled });
  };

  renderFilterSection = (
    headerText: string,
    type: FilterListType,
    isToggled: boolean,
    dictionary: any,
    selected: number[]
  ) => (
    <View style={styles.section}>
      <TouchableIcon
        onPress={() => this.changeFilterToggleState(type)}
        icon={
          <View style={styles.heading_wrapper}>
            <TypoGraphyOpenSansBold style={styles.heading} text={headerText.toUpperCase()} />
            {isToggled ? <UpArrow /> : <DownArrow />}
          </View>
        }
      />
      {isToggled ? (
        <View style={styles.option_list_height}>
          <ScrollView>{this.renderOptionList(dictionary, type)}</ScrollView>
        </View>
      ) : (
        this.renderSelectedOptions(
          Object.values(getDictionaryValuesByKeys(dictionary, selected))
        )
      )}
    </View>
  );


  renderSelectedOptions = (selectedOptions: Array<any>) => {
    if (selectedOptions.length === 0) {
      return <View />;
    }

    return (
      <View>
        <TypoGraphyOpenSans
          style={styles.selected_option}
          text={selectedOptions.map(x=>x.name.toUpperCase()).join(", ")}
        />
      </View>
    );
  };

  renderOptionList = (list, type: FilterListType) => {
    let array = typeof list === "object" ? Object.values(list) : list;
    if (array && array.length>0 && array[0].displayOrder){
      array = array.sort((a, b) => a.displayOrder - b.displayOrder);
      if(array[0].id && array[0].id==-1){
        array.splice(0,1);
      }
    }
    const { styles } = this.props;
    const resetOptionValue = this.renderSingleOption(type, -1);
    let optionSelect;
    let optionText;
    
    const otherOptions = array.map((item, index) => {
      optionText = item.name.toUpperCase();
      const isSelected = this.state[`${type}Selected`].some(x => x === item.id);
      optionSelect = (
        <View
          style={
            index === array.length - 1
              ? {...styles.option_text_wrapper, ...(isSelected?styles.selected_container:{})}
              : { ...styles.option_text_wrapper, ...styles.divider,...(isSelected?styles.selected_container:{}) }
          }
        >
           {isSelected? (
            <TypoGraphyOpenSansSemiBold
              style={{ ...styles.option_text, ...styles.option_text_selected }}
              text={optionText}
            />
          ) : (
            <TypoGraphyOpenSansSemiBold
              style={styles.option_text}
              text={optionText}
            />
          )}
        </View>
      );

      return this.renderSingleOption(type, item.id, optionSelect, index + 1);
    });

    return [resetOptionValue, ...otherOptions];
  };

  updateOptionSelectionState = (selectId, type, filtersToggled) => {
    let optionsSelected: number[] = [...this.state[`${type}Selected`]];
    if(selectId === -1){//ALL
       optionsSelected = [];
       this.setState({
         [`${type}Selected`]: optionsSelected,
         filtersToggled
       });
       return;
    }

    const index = optionsSelected.findIndex(x => x === selectId);
    if (index === -1) {
      optionsSelected.push(selectId);
    } else {
      optionsSelected.splice(index, 1);
    }
    this.setState({
      [`${type}Selected`]: optionsSelected,
      filtersToggled
    });
  };

  renderSingleOption = (type: FilterListType, selectId, optionSelect, key) => {
    const { styles } = this.props;
    const filtersToggled = [...this.state.filtersToggled];
    filtersToggled.filter(x => x !== type);
    return (
      <TouchableHighlightIcon
        key={!key ? selectId : key}
        style={styles.option}
        underlayColor={COLORS.main_secondary_transparent}
        onPress={() => {
          this.updateOptionSelectionState(selectId, type, filtersToggled)
          if(!optionSelect){
            this.changeFilterToggleState(type)
          }
        }}
        icon={
          optionSelect ? (
            optionSelect
          ) : (
            <View style={{...styles.divider,...styles.option_text_wrapper}}>
              <TypoGraphyOpenSansBold
                style={styles.option_text}
                text={"TODOS"}
              />
            </View>
          )
        }
      />
    );
  };

  isFilterToggled = (type: FilterListType) => {
    const index = this.state.filtersToggled.findIndex(x => x === type);
    return { isFilterToggled: index !== -1, index };
  };

  render() {
    const {
      styles,
      sectionDictionary,
      allergens,
      kindsOfFood
    } = this.props;
    const {
      sectionsSelected,
      kindsOfFoodSelected,
      allergensSelected,
      isLoading
    } = this.state;

    if(isLoading){
      return <Spinner/>
    }

    return (
        <View style={styles.container}>
            <ScrollView
              style={styles.filters_wrapper}>
              {this.renderFilterSection(
                 TITLES.section,
                 FilterListType.sections,
                 this.isFilterToggled(FilterListType.sections).isFilterToggled,
                 sectionDictionary,
                 sectionsSelected
               )}
               {this.renderFilterSection(
                 "Alérgeno",
                 FilterListType.allergens,
                 this.isFilterToggled(FilterListType.allergens).isFilterToggled,
                 allergens,
                 allergensSelected
               )}
              {this.renderFilterSection(
                "Otros filtros",
                FilterListType.kindsOfFood,
                this.isFilterToggled(FilterListType.kindsOfFood)
                  .isFilterToggled,
                kindsOfFood,
                kindsOfFoodSelected
              )}
            </ScrollView>
            <View style={styles.btn_wrapper}>
            <TouchableIcon
              onPress={() => this.onPressFilter()}
              styles={styles.btn}
              icon={
                <TypoGraphyOpenSansBold
                  style={styles.btn_text}
                  text={"Filtrar"}
                />
              }
            />
            </View>
        </View>
    );
  }
}

FilterCatalogCarteComponent.defaultProps = {
  styles
};

interface IPropsFromState {
  sectionDictionary: ISectionHash;
  allergens: { [id: number]: AllergenDTO };
  kindsOfFood: { [id: number]: KindOfFood };
  sectionsSelected: number[];
  allergensSelected: number[];
  kindsOfFoodSelected: number[];
}

interface IProps extends IPropsFromState {
  filterCatalogCartRequest: Function;
  navigateBackToCatalogCarte: Function;
  onRef: any;
  statusBarHeight: any;
  styles: any;
  refreshProviderCatalogProductsFromServerAndFilter:Function;
}

const mapStateToProps = (state: AppState): IPropsFromState => {
  return {
    sectionDictionary: state.providerCatalogProducts.sections.dictionary,
    allergens: state.providerCatalogProducts.allergens,
    kindsOfFood: state.providerCatalogProducts.kindsOfFood,
    sectionsSelected: state.filterCatalogCarte.search.selectedSections,
    allergensSelected: state.filterCatalogCarte.search.selectedAllergens,
    kindsOfFoodSelected: state.filterCatalogCarte.search.selectedKindsOfFood
  };
};

const mapDispatchToProps = {
  filterCatalogCartRequest,
  navigateBackToCatalogCarte,
  refreshProviderCatalogProductsFromServerAndFilter
};

const FilterCatalogCarte = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterCatalogCarteComponent);

export { FilterCatalogCarte };
