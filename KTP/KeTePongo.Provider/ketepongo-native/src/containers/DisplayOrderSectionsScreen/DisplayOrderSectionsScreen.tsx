import React from "react";
import { connect } from "react-redux";
import { View, Animated, TouchableOpacity, Text, ScrollView, SafeAreaView } from "react-native";
import {
  LoadingMessageDisplay,
  TransitionNoProductsCarte,
} from "../../components/CatalogProductCarteList/CatalogProductCarteList.Ui";
import { SIZE } from "constants"
import styles from "./DisplayOrderSectionsScreen.component.styles";
import { navigateToCreateProductCarte, } from "../../store/providerCatalogProducts/productsCarte";
import { AppState } from "../../store";
import { SectionDTO } from "../../model/DTOs";
import { updateSectionPairDisplayOrderCarteFromCatalog } from "../../store/filterCatalogCarte/actions";
import {
  navigateToCreateNewSection
} from "../../store/providerCatalogProducts/sections";
import DraggableFlatList from "react-native-draggable-flatlist";
import { TypoGraphyOpenSansSemiBold } from "components";

import MoveIconOff from "../../../assets/All_Icons/drag/MoveIconOff.svg";
import MoveIconOn from "../../../assets/All_Icons/drag/MoveIconOn.svg";

const DraggableSection = ({item, index, drag, isActive, isLastSection}) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View key={item.id} style={isActive ? styles.section_container_active : styles.section_container}>
          {item.id !== -1 &&
            <TouchableOpacity activeOpacity={1} onLongPress={drag}
              styles={styles.name}>
              <View key={index} style={isLastSection ? styles.container : { ...styles.container, ...styles.underLine }}>
                <TypoGraphyOpenSansSemiBold style={isActive ? styles.name_1_active : styles.name_1} text={item.name} />
                <View style={styles.pencil_wrapper}>
                  {isActive ? <MoveIconOn {...SIZE.square_20} /> : <MoveIconOff {...SIZE.square_20} />}
                </View>
              </View>
            </TouchableOpacity>
          }
        </View>
      </SafeAreaView>
    )
};

function keyExtractor(item, index){
  return`draggable-item-section-${item.id}`;
}

const DisplayOrderSectionsScreenComponent : React.FC<IProps> = (props) => {
  let flatListRef = React.createRef();
  let yplacement: any;


  React.useEffect(() => {
    yplacement = new Animated.Value(0);

    return () => { }
  }, []);
 
  const dragEndSection = ({ data, from, to }) => {
    if (from === to) {
      return;
    }
    props.updateSectionPairDisplayOrderCarteFromCatalog(data, to);
  }

  const renderItem = ({ item, index, drag, isActive }) => { 
    const {
      sections
    } = props;
    return <DraggableSection item={item} index={index} drag={drag} isLastSection={index === sections.length - 1} isActive={isActive}/>
  } 

  const renderSections = () => {
    const {
      anyProductInDB,
      sections
    } = props;
    const AnimatedFlatList = {
      transform: [{ translateY: yplacement || 0 }]
    };

    if (!sections) {
      return <LoadingMessageDisplay />;
    }

    if (sections.length === 0 && !anyProductInDB) {
      return (
        <View style={styles.fillScreen}>
          <TransitionNoProductsCarte
            navigateToCreateProductCarte={navigateToCreateProductCarte}
            navigateToCreateNewSection={navigateToCreateNewSection}
          />
        </View>
      );
    }

    return (
      <Animated.View style={[styles.flatListWithProducts, AnimatedFlatList]}>
        <DraggableFlatList
          ref={ref => flatListRef = ref}
          onStartShouldSetResponder={true}
          onResponderRelease={false}
          activationDistance={10}
          data={sections}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onDragEnd={dragEndSection}
        />
      </Animated.View>
    );
  };

  return(
    <View style={styles.fillScreen}>
      {renderSections()}
    </View>
  );
}

interface IPropsFromState {
  sections: SectionDTO[];
}

interface IProps extends IPropsFromState, IOwnProps {
  updateSectionPairDisplayOrderCarteFromCatalog: Function;
}

interface IOwnProps {
  anyProductInDB: boolean;
}

const mapStateToProps = (state: AppState, ownProps: IOwnProps): IPropsFromState => {
  return {
    sections: [...state.providerCatalogProducts.sections.list],
  };
};

const mapDispathToProps = dispatch => ({
  updateSectionPairDisplayOrderCarteFromCatalog: (data, to) => dispatch(updateSectionPairDisplayOrderCarteFromCatalog(data, to))
});

const mergeProps = (propsFromState: IPropsFromState, propsFromDispatch: any, ownProps: IOwnProps) => {
  const anyProductInDB = propsFromState.sections.length > 0
  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    anyProductInDB
  };
};

const DisplayOrderSectionsScreen = connect(
  mapStateToProps,
  mapDispathToProps,
  mergeProps
)(DisplayOrderSectionsScreenComponent);

export { DisplayOrderSectionsScreen };
