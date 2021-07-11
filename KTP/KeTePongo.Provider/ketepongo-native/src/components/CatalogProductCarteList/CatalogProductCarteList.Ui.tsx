import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { SIZE, TYPOGRAPHY, ALLERGENSIMAGES } from "constants";
import {
  TypoGraphyOpenSansWithHighlight,
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TouchableIcon,
  DualOptionButtons,
  LongSquareButton
} from "components";

import { CatalogProductDTO, AllergenDTO } from "model/DTOs";

import styles from "./CatalogProductCarteList.component.styles";
import PencilEdit from "../../../assets/All_Icons/basic/pencil_grey.svg";
import VeganIcon from "../../../assets/All_Icons/tag-vegan.svg";
import WatchAllergensIcon from "../../../assets/All_Icons/allergens/watchAlergenButton.svg";
import AllergensIcon from "../../../assets/All_Icons/allergens/Alergenos.svg";
import TrashIcon from "../../../assets/All_Icons/trash.svg";
import NoProductsIcon from "../../../assets/All_Icons/noproducts.svg";
import XIcon from "../../../assets/All_Icons/basic/x_grey.svg";
import ClosedEyeGrey from "../../../assets/All_Icons/closedEyeGrey.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import MoveIconOff from "../../../assets/All_Icons/drag/MoveIconOff.svg";
import MoveIconOn from "../../../assets/All_Icons/drag/MoveIconOn.svg";

export const TransitionNoProductsCarte = ({
  navigateToCreateProductCarte,
  navigateToCreateNewSection
}) => (
  <View style={styles.fillScreen}>
  <View style={styles.transitionContainer}>
    <View style={styles.icon_wrapper}>
      <NoProductsIcon {...styles.lost_icon} />
    </View>
    <View style={styles.transition_text_wrapper}>
      <TypoGraphyOpenSansBold
        style={styles.transition_title}
        text={"Todavía no has añadido ningún producto a tu carta."}
      />
      <TypoGraphyOpenSansWithHighlight
        style={styles.transition_body}
        text={""}
        highlightText={"Añade productos"}
        secondText={
          " para que tus clientes puedan ver tu carta desde el móvil."
        }
      />
      <TypoGraphyOpenSansWithHighlight
        style={styles.transition_footer}
        text={"Recomendamos empezar por"}
        highlightText={" añadir secciones"}
        secondText={" para organizar mejor los productos dentro de tu carta."}
      />
    </View>

    <View style={styles.btn_wrapper}>
      <LongSquareButton
        btnText={
          <TypoGraphyOpenSansSemiBold
            text={"Añadir Sección"}
            style={styles.add_btn_text}
          />
        }
        onPress={() => navigateToCreateNewSection()}
        btnStyle={styles.main_btn}
      />
    </View>
    <View style={styles.btn_wrapper}>
      <LongSquareButton
        isWhiteBackground={true}
        btnText={
          <TypoGraphyOpenSansSemiBold
            text={"Añadir Producto"}
            style={styles.add_btn_secondary_text}
          />
        }
        onPress={() => navigateToCreateProductCarte()}
        btnStyle={styles.secondary_btn}
      />
    </View>
  </View>
  </View>
);

const ProductCarteDetail = ({
  details,
  detailHeading
}: {
  details: string;
  detailHeading: string;
}) => (
  <Text numberOfLines={1} maxLength={20}>
    <TypoGraphyOpenSansLight style={styles.description} text={detailHeading} />
    <TypoGraphyOpenSans style={styles.content} text={details} />
  </Text>
);

ProductCarteDetail.propTypes = {
  details: PropTypes.string.isRequired,
  detailHeading: PropTypes.string.isRequired
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const ProductCarteNameWithVeganLabel = ({
  isHiddenInCarte,
  name,
  isVegan
}: {
  isHiddenInCarte:boolean;
  name: string;
  isVegan: boolean;
}) => (
  <View style={styles.name_wrapper}>
    <TypoGraphyOpenSansSemiBold
      style={isHiddenInCarte?styles.productCarte_name_hidden: styles.productCarte_name}
      text={capitalize(name)}
    />
    {isVegan && (
      <TouchableIcon onPress={() => {}} styles={{}} icon={<VeganIcon />} />
    )}
  </View>
);
const ProductCarteDescription = ({
  item,
  openDescriptionInformation,
  isEditDisplayOrder
}: {
  item: CatalogProductDTO;
  openDescriptionInformation: Function;
  isEditDisplayOrder:boolean
}) => {
  const { description } = item;
  const hasToHideExtraText = description.length > 80;
  const displayDescription = hasToHideExtraText
    ? `${description.substr(0, 80)}...`
    : description;
  if (hasToHideExtraText) {
    return (
      <Text
        style={{ ...TYPOGRAPHY.openSans, ...styles.productCarte_descriptionText }}
      >
        <Text>{displayDescription}</Text>
        <Text
          onPress={() => isEditDisplayOrder?()=>{}: openDescriptionInformation(item)}
          style={{ ...styles.watch_more, ...TYPOGRAPHY.openSansBold }}
        >
          {" "}
          Ver más
        </Text>
      </Text>
    );
  }

  return (
    <TypoGraphyOpenSansLight
      numberOfLines={2}
      style={styles.productCarte_description}
      text={displayDescription}
    />
  );
};

export const DeleteAlertBox = ({ onPressYes, onPressNo, productName }: any) => (
  <View style={styles.delete_alert_wrapper}>
    <TypoGraphyOpenSansBold
      text={`¿Deseas eliminar ${(productName && productName!=="")?productName: "este producto"} definitivamente?`}
      style={styles.delete_alert_text}
    />

    <DualOptionButtons
      textLeft={"Sí"}
      textRight={"No"}
      onPressLeft={() => onPressYes()}
      onPressRight={() => onPressNo()}
    />
  </View>
);

DeleteAlertBox.propTypes = {
  onPressYes: PropTypes.func.isRequired,
  onPressNo: PropTypes.func.isRequired
};

interface SingleCatalogProductCarteWithEditAndDeleteButtonProps {
  navigateToEditProductCarte: Function;
  item: CatalogProductDTO;
  deleteProductCarte: Function;
  openAllergensInformation: Function;
  openDescriptionInformation: Function;
  isDragActive:boolean;
  hasToDisplayAllergensLabel: boolean;
  containerStyle: any;
}

const Hidden = ()=><View style={styles.productCarte_hidden_container}>
<TypoGraphyOpenSans style={styles.hidden} text={"Oculto en la carta"} />
<ClosedEyeGrey/>
</View>

export const AllergensLabel = React.memo(function AllergensLabel({onPress}){
  return <TouchableIcon
  isWhiteBackground={true}
    onPress={onPress}
    icon={<WatchAllergensIcon/>}
  />
})

export const DeleteButton = ({onPress}) =>
<TouchableIcon
  isWhiteBackground={true}
  onPress={onPress}
  styles={styles.edit_areaTwoButtons}
  icon={<TrashIcon />}
/>

export const EditButton = ({onPress}) =>
<TouchableIcon
  isWhiteBackground={true}
  onPress={onPress}
  styles={styles.edit_button }
  icon={<PencilEdit />}
/>

export const SingleCatalogProductCarteWithEditAndDeleteButton = React.memo((props: SingleCatalogProductCarteWithEditAndDeleteButtonProps) => {
  const {
    item,
    navigateToEditProductCarte,
    deleteProductCarte,
    openAllergensInformation,
    openDescriptionInformation,
    hasToDisplayAllergensLabel,
    containerStyle
  } = props
  const onPressDelete = ()=>deleteProductCarte(item.id);
  const onPressNavigate = ()=>navigateToEditProductCarte(item.id);

  return (
    <View style={containerStyle}>
      <ProductCarteNameWithVeganLabel isHiddenInCarte={item.isHiddenInCarte} name={item.name} isVegan={item.isVegan} />
      <View style={styles.productCarte_interactionContainer}>
        <ProductCarteDescription
            item={item}
            isEditDisplayOrder={false}
            openDescriptionInformation={openDescriptionInformation}
        />
      </View>
      <View style={styles.productCarte_interactionContainer}>
        <TypoGraphyOpenSans style={((item.isHiddenInCarte)?styles.pvpLabel_hidden: styles.pvpLabel)} text={`${(Number(item.pvp)).toFixed(2)} €`} />
        {hasToDisplayAllergensLabel && (
          <AllergensLabel onPress={()=>{openAllergensInformation(item)}}/>
        )}
        {item.isHiddenInCarte && <Hidden/>}

        <View style={styles.productCarte_interaction_buttons_container}>
          <DeleteButton onPress={onPressDelete}/>
          <EditButton onPress={onPressNavigate}/>
        </View>
      </View>
    </View>
  );
});

interface DraggableProductProps {
  item: CatalogProductDTO;
}

export const DraggableProduct = ({
  item,
  isDragActive
}: DraggableProductProps) => {
  const containerStyle= isDragActive? styles.productCarte_container_drag_active: (item.isHiddenInCarte?styles.productCarte_container_hidden: styles.productCarte_container)
  return (  
    <View style={containerStyle}>
      <ProductCarteNameWithVeganLabel isHiddenInCarte={item.isHiddenInCarte} name={item.name} isVegan={item.isVegan} />
      <View style={styles.productCarte_interactionContainer}>
        <ProductCarteDescription
          item={item}
          isEditDisplayOrder={true}
          openDescriptionInformation={()=>{}}
        />
        <View style={styles.productCarte_interaction_buttons_container}>
          <View style={styles.edit_areaTwoButtons}>
            {isDragActive? <MoveIconOn {...SIZE.square_20}/>:<MoveIconOff {...SIZE.square_20}/>}
          </View>
        </View>
        </View>
      <View style={styles.productCarte_interactionContainer}>
        <TypoGraphyOpenSans style={isDragActive? styles.pvpLabel_drag:((item.isHiddenInCarte)?styles.pvpLabel_hidden: styles.pvpLabel)} text={`${(Number(item.pvp)).toFixed(2)} €`} />
        {item.allergenIds.length > 0 && !item.isHiddenInCarte && <AllergensIcon style={{marginLeft:10}} />}
        {item.isHiddenInCarte && <View style={styles.productCarte_hidden_container}>
          <TypoGraphyOpenSans style={styles.hidden} text={"Oculto en la carta"} />
          <ClosedEyeGrey/>
          </View>}
        <View style={styles.productCarte_interaction_buttons_container}>
        </View>
      </View>
    </View>
  );
};

export const LoadingMessageDisplay = () => (
  <View style={styles.fillScreen}>
    <TypoGraphyOpenSans style={{}} text={"Cargando..."} />
  </View>
);


export const ProductCatalogeSectionHeader = ({ text, isEditDisplayOrder }) => (
  <View style={isEditDisplayOrder?styles.section_container_drag:styles.section_container}>
    <TypoGraphyOpenSansBold style={isEditDisplayOrder?styles.section_description_drag:styles.section_description} text={text} />
  </View>
);

export const AllergensDialog = ({
  allergensIds,
  allergens,
  closeDialog
}: {
  allergensIds: number[];
  allergens: { [id: number]: AllergenDTO };
  closeDialog: Function;
}) => (
  <View style={styles.productCarte_allergensDialogContainer}>
    <TypoGraphyOpenSansBold
      style={styles.productCarte_fullDescription_header}
      text={"Información de Alérgenos"}
    />
    <TypoGraphyOpenSans
      style={{
        ...styles.productCarte_fullDescription_text,
        ...styles.productCarte_allergens_Description
      }}
      text={"Este producto contiene los siguientes alérgenos"}
    />
    <ScrollView style={styles.allergens_list}>
      {allergensIds.map(x => {
        return(<View style={styles.allergen_row} key={x}>
          <Image
          source={ALLERGENSIMAGES[allergens[x].iconCode]}
          />
          <TypoGraphyOpenSans
            style={styles.allergens_list_allergen}
            text={allergens[x].name}
          />
        </View>)
      })}
    </ScrollView>
    <TypoGraphyOpenSans
      onPress={() => closeDialog()}
      style={styles.allergens_list_closeButton}
      text={"OK"}
    />
  </View>
);

export const ProductDescriptionDialog = ({
  productName,
  productDescription,
  closeDialog
}) => (
  <View style={{...styles.productCarte_fullDescription_container,...(productDescription.length>400?{top:100,}
  :{})}}>
    <TouchableIcon
      onPress={() => closeDialog()}
      styles={styles.productCarte_fullDescription_closeIcon}
      icon={<XIcon />}
    />
    <TypoGraphyOpenSansBold
      style={styles.productCarte_fullDescription_header}
      text={productName}
    />
    <TypoGraphyOpenSans
      style={styles.productCarte_fullDescription_text}
      text={productDescription}
    />
  </View>
);

export const NoContentBody = () => <TypoGraphyOpenSans style={styles.no_products_hint} text={"Todavía no has añadido productos a esta sección"} />
export const FilterNoResults = ()=><TypoGraphyOpenSansBold style={styles.no_products_for_filters} text={"No hay resultados para los filtros seleccionados."} />