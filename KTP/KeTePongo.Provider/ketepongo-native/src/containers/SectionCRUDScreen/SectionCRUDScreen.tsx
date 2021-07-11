import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, SafeAreaView,BackHandler  } from 'react-native';
import { TitleSectionWithLeftAndOptionalRightButton,
  BackGreyArrowButton,
   DefaultInputError,
   DefaultServerErrorMessage
 } from 'components';
import { TITLES } from 'constants';
import {
  SectionNameInput,
  DeleteAndAddButtons,
  AlertDeleteConfirm,
  AlertNameChangeNotSave,
} from './SectionCRUDScreen.UI';

import styles from './SectionCRUDScreen.component.styles';
import { ComponentFactory } from 'shared'
import { navigateBack, addSectionRequested, deleteSectionRequested, updateSectionRequested } from '../../store/providerCatalogProducts/sections';
import { withAuthentication } from "../../HOC";
import { ScrollView } from 'react-native-gesture-handler';
import { AppState, ErrorDetail } from "store";
const SectionNotSavedAlert = ComponentFactory("SectionNotSavedAlert", "DefaultAlert");

class SectionCRUDScreenComponent extends React.Component<IProps,any> {
  sectionNotSaveRef = React.createRef();
  sectionDeleteRef = React.createRef();
  sectionRef = React.createRef();

  state = {
    headerText: '',
    section: {
      name: '',
      id: '',
      changeVersion: '',
      displayOrder:''
    },
    originalSectionName: '',
    originalDisplayOrder: '',
    nextDisplayOrderSugested:'',
    isSaving:false
  }

  componentDidMount() {
    const headerText = this.props.navigation.getParam('headerText');
    if(this.backHandler){
      this.backHandler.remove();
    }
    this.backHandler= BackHandler.addEventListener('hardwareBackPress', this.handleBackHardware.bind(this));
    if (headerText === TITLES.editSection) {
      const section = JSON.parse(this.props.navigation.getParam('section'));
      this.setState({
        headerText,
        section,
        originalSectionName: section.name,
        originalDisplayOrder:section.displayOrder
      });
      return;
    }
    else{
      const nextDisplayOrderSugestedParam = this.props.navigation.getParam('nextDisplayOrderSugested');
      this.setState({
        nextDisplayOrderSugested: nextDisplayOrderSugestedParam
      });
    }

    this.setState({ headerText });
     setTimeout(() => this.sectionRef.current.focus(), 50);
  }
  componentWillUnmount(){
    if(this.backHandler){
      this.backHandler.remove();
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.error && nextProps.error!==null) {
      this.setState({
        isSaving: false
      });
    }
  }
  onPressConfirmDelete = () => {
    const { section } = this.state
    this.props.deleteSectionRequested(section.id)
    this.sectionDeleteRef.close();
  }

  renderDeleteAlert = () => (
    <SectionNotSavedAlert
      ref={(ref) => { this.sectionDeleteRef = ref; }}
      options={(
        <AlertDeleteConfirm
          onPressConfirmDelete={() => this.onPressConfirmDelete()}
          onPressCancelDelete={() => this.sectionDeleteRef.close()}
        />
      )}
    />
  );

  onChangeSectionName = (newName) => {
    this.setState({ "section": { ...this.state.section, "name": newName } })
  }

  renderNotSaveAlert = () => (
    <SectionNotSavedAlert
      ref={(ref) => { this.sectionNotSaveRef = ref; }}
      options={(
        <AlertNameChangeNotSave
          onPressConfirmDoNotSave={this.props.navigateBack}
          onPressCancel={() => this.sectionNotSaveRef.close()}
        />
      )}
    />
  );

  onPressReturn = () => {
    const { section, originalSectionName, originalDisplayOrder } = this.state
    if ((section.name && originalSectionName !== section.name) || (section.displayOrder && originalDisplayOrder !==section.displayOrder)) {
      this.sectionNotSaveRef.open();
      return;
    }

    return this.props.navigateBack();
  };

  handleBackHardware = () => {
    const { section, originalSectionName, originalDisplayOrder } = this.state
    if ((section.name && originalSectionName !== section.name) || (section.displayOrder && originalDisplayOrder !==section.displayOrder)) {
      this.sectionNotSaveRef.open();
      return true;
    }

    return false;
  };

  onPressDelete = () => {
    const { section } = this.state
    if (section.id)
      this.sectionDeleteRef.open()
    else
      this.props.navigateBack()
  }

  onPressChangeName = async () => {
    const { section, nextDisplayOrderSugested,isSaving } = this.state
    if(isSaving){
      return;
    }
    this.setState({ isSaving: true});
    if (!section.id){
      this.props.addSectionRequested(section.name, nextDisplayOrderSugested)
    }
    else{
      this.props.updateSectionRequested(section)
    }
  }
  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }
  render() {
    const { styles, error } = this.props;
    const serverErrorValidations = error?.validationErrors?error?.validationErrors:{}
    const { headerText, section, originalSectionName, originalDisplayOrder } = this.state;
    const { name, displayOrder } = section;

    return (
      <SafeAreaView style={{flex:1}}>
      <View  style={styles.fillScreen}>
        <TitleSectionWithLeftAndOptionalRightButton
         leftButton={<BackGreyArrowButton onPress={this.onPressReturn} />}
          headerText={headerText}
        />
        {this.renderDeleteAlert()}
        {this.renderNotSaveAlert()}
        <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{flexGrow: 1}} >
        <View style={styles.body}>


            <SectionNameInput
              ref={this.sectionRef}
              onChangeText={this.onChangeSectionName}
              value={name}
            />
            {<DefaultInputError style={styles.server_error_field} state={serverErrorValidations["name"]} errorMessage={serverErrorValidations["name"]}/>}

            <DeleteAndAddButtons
            isDeleteEnabled={headerText === TITLES.editSection}
              onPressDeleteFromList={this.onPressDelete}
              onPressChangeName={this.onPressChangeName}
              disabled={!section.name || this.isEmptyOrSpaces(section.name) || ( originalSectionName === section.name && (headerText === TITLES.editSection && section.displayOrder === originalDisplayOrder))}
            />

        </View>
        </ScrollView>
      </View >
      </SafeAreaView>
    );
  }
}

SectionCRUDScreenComponent.defaultProps = {
  styles
};
interface IPropsFromState {
  error: ErrorDetail | null;
  
}

interface IProps extends IPropsFromState, IOwnProps {
  deleteSectionRequested: Function;
  addSectionRequested: Function;
  updateSectionRequested: Function;
}

interface IOwnProps {
  
  onRef: any; //TODO what is this for
  styles: any;
 
}
SectionCRUDScreenComponent.propTypes = {
  navigation: PropTypes.object,
  navigateBack: PropTypes.func.isRequired,
  addSectionRequested: PropTypes.func.isRequired,
  deleteSectionRequested: PropTypes.func.isRequired,
  updateSectionRequested: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  navigateBack,
  addSectionRequested,
  deleteSectionRequested,
  updateSectionRequested
};

const mapStateToProps = (state:AppState):IPropsFromState => {
  return {
    error: state.providerCatalogProducts.sections.error,
  };
};

const mergeProps = (
  propsFromState: IPropsFromState,
  propsFromDispatch,
  ownProps
) => {

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
  };
};
const SectionCRUDScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
  )(SectionCRUDScreenComponent)));

export { SectionCRUDScreen };
