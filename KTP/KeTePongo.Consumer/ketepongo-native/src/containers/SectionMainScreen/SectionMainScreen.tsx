import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FilterBarAndActionButtonHeader, SelectionListScroll } from 'components';
import { SelectSectionHeading, LoadingMessageDisplay } from './SectionMainScreen.UI';

import styles from './SectionMainScreen.component.styles';

import {
  navigateToCreateNewSection,
  navigateToEditSection
} from '../../store/providerCatalogProducts/sections';
import { navigateToCatalogCarte } from '../../store/authentication';
import { withAuthentication } from "../../HOC";
import { AppState } from "../../store";
import { SectionDTO } from "../../model/DTOs";

let SectionMainScreen = ({ ...props }: IProps) => {

  const [sections, setSections] = useState(props.sections);
  const [text, setText] = useState("");
  const {
    navigateToCreateNewSection,
    navigateToEditSection,
    navigateToCatalogCarte
  } = props;

  useEffect(() => {
    setSections(props.sections
      .filter((sec) => sec.name.toLowerCase().includes(text.toLowerCase()))
    )
  }, [props.sections, text]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",backAction
    );
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", ()=>backAction);
  }, []);

  const backAction =  ()=>{
    navigateToCatalogCarte();
    return true;
  }

  if (!sections) {
    return <LoadingMessageDisplay />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FilterBarAndActionButtonHeader
          onChangeTextFilter={setText}
          filterBarPlaceholder={"Buscar Sección"}
          onPressButton={() => navigateToCreateNewSection(sections && sections.length > 0 ? (sections[sections.length - 1].displayOrder + 1) : 0)}
          buttonText={"Añadir sección"}
        />

        {/* <SelectSectionHeading /> */}

        <SelectionListScroll
          list={sections}
          onPressEdit={(section) => navigateToEditSection(section)}
        />
      </View >
    </SafeAreaView>
  );
}


SectionMainScreen.defaultProps = {
  styles
};

SectionMainScreen.propTypes = {
  sections: PropTypes.array.isRequired,
  navigateToCreateNewSection: PropTypes.func.isRequired,
  navigateToEditSection: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

interface IPropsFromState {
  sections: SectionDTO[];
}

interface IPropsFromDispatch {
  navigateToCreateNewSection: Function;
  navigateToEditSection: Function;
  navigateToCatalogCarte: Function;
}

interface IProps extends IPropsFromState, IPropsFromDispatch {

}

const mapStateToProps = (state: AppState) => {
  return {
    sections: state.providerCatalogProducts.sections.list
  };
};

const mapDispatchToProps = {
  navigateToCreateNewSection,
  navigateToEditSection,
  navigateToCatalogCarte
};

SectionMainScreen = withAuthentication((connect(mapStateToProps, mapDispatchToProps)(SectionMainScreen)));

export { SectionMainScreen };
