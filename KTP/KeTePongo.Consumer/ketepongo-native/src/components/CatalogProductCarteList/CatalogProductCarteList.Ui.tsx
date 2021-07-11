import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { TYPOGRAPHY, ALLERGENSIMAGES } from "constants";
import {
  TypoGraphyOpenSansSemiBold,
  TypoGraphyOpenSansLight,
  TypoGraphyOpenSansBold,
  TypoGraphyOpenSans,
  TypoGraphyNunitoSemiBold,
  TypoGraphyNunitoBold,
  TypoGraphyNunitoRegular,
  TouchableIcon,
  DualOptionButtons,
} from "components";

import { CatalogProductDTO, AllergenDTO } from "model/DTOs";

import styles from "./CatalogProductCarteList.component.styles";
import AddCart from "../../../assets/svg/buttons/addCartButton.svg";
import VeganIcon from "../../../assets/All_Icons/tag-vegan.svg";
import WatchAllergensIcon from "../../../assets/All_Icons/allergens/watchAlergenButton.svg";
import XIcon from "../../../assets/All_Icons/basic/x_grey.svg";
import { CatalogProductQuantity } from "../CatalogProductQuantity";

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
  name,
  isVegan,
  hasToDisplayAllergensLabel,
  openAllergensInformation,
  product
}: {

  name: string;
  isVegan: boolean;
  hasToDisplayAllergensLabel: boolean;
  openAllergensInformation: Function;
  product: CatalogProductDTO;
}) => (
  <View style={styles.name_wrapper}>
    <TypoGraphyOpenSansSemiBold
      style={styles.productCarte_name}
      text={capitalize(name)}
    />
    {isVegan && (
      <TouchableIcon onPress={() => {}} styles={{}} icon={<VeganIcon />} />
    )}
     {hasToDisplayAllergensLabel && (
          <AllergensLabel onPress={()=>{openAllergensInformation(product)}}/>
        )}
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

export const AddAlertBox = ({ onPressYes, onPressNo, productName }: any) => (
  <View style={styles.delete_alert_wrapper}>
    <TypoGraphyOpenSansBold
      text={`¿Deseas añadir ${(productName && productName!=="")?productName: "este producto"}?`}
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

AddAlertBox.propTypes = {
  onPressYes: PropTypes.func.isRequired,
  onPressNo: PropTypes.func.isRequired
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

export const AllergensLabel = React.memo(function AllergensLabel({onPress}){
  return <TouchableIcon
  isWhiteBackground={true}
    onPress={onPress}
    icon={<WatchAllergensIcon/>}
  />
})

export const AddToCartButton = ({onPress}) =>
<TouchableIcon
  isWhiteBackground={true}
  onPress={onPress}
  styles={styles.edit_button }
  icon={<AddCart />}
/>
export const SingleCatalogProductCarte = React.memo((props: any) => {
  const {
    item,
    navigateToEditProductCarte,
    deleteProductCarte,
    addProductCarte,
    openAllergensInformation,
    openDescriptionInformation,
    hasToDisplayAllergensLabel,
    containerStyle,
    orderLineQuantity,
  } = props
  const onPressDelete = ()=>deleteProductCarte(item);
  const onPressAdd = ()=>addProductCarte(item);
  const onPressNavigate = ()=>navigateToEditProductCarte(item.id);

  return (
    <View style={containerStyle}>
      <ProductCarteNameWithVeganLabel name={item.name} isVegan={item.isVegan} hasToDisplayAllergensLabel={hasToDisplayAllergensLabel} openAllergensInformation={openAllergensInformation} item={item}/>
      <View style={styles.productCarte_interactionContainer}>
        <ProductCarteDescription
            item={item}
            isEditDisplayOrder={false}
            openDescriptionInformation={openDescriptionInformation}
        />
      </View>
      <View style={styles.productCarte_interactionContainer}>
        <TypoGraphyNunitoBold style={(styles.pvpLabel)} text={`${(Number(item.pvp)).toFixed(2)} €`} />

        <View style={styles.productCarte_interaction_buttons_container}>
          {item.isInConsumption && 
          <TouchableIcon
          isWhiteBackground={true}
          onPress={onPressDelete}
          icon={(
              <TypoGraphyNunitoRegular text={"Quitar de tu lista"} style={styles.remove_product}/>
          )}
      />}
      {!item.isInConsumption && 
        <TouchableIcon
            isWhiteBackground={true}
            onPress={onPressAdd}
            icon={(
                <TypoGraphyNunitoSemiBold text={"+ Añadir a tu lista"} style={styles.add_product}/>
            )}
        />}

          
            <CatalogProductQuantity product={item} orderLineQuantity={orderLineQuantity} />
          
        </View>
      </View>
    </View>
  );
});

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

export const NoContentBody = () => <TypoGraphyOpenSans style={styles.no_products_hint} text={"Esta sección aún no tiene productos"} />
export const NoContentMostConsumedBody = () => <TypoGraphyOpenSans style={styles.no_products_hint} text={"No tienes elementos consumidos en esta sección"} />
export const FilterNoResults = ()=><TypoGraphyOpenSansBold style={styles.no_products_for_filters} text={"No hay resultados para los filtros seleccionados."} />