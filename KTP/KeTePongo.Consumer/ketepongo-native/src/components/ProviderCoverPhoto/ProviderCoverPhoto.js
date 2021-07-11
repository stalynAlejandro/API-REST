import React from "react";
import PropTypes from "prop-types";

import {
  NoImageProviderCoverPhoto,
  ImageProviderCoverPhoto
} from "./ProviderCoverPhoto.UI";
import { useFormContext } from "react-hook-form";
import {View} from "react-native"
import {DefaultInputError} from "components"

const ProviderCoverPhoto = ({ image, name, onSetImage, onRemove, ...extraProps }) => {
  const { errors } = useFormContext();

  if (!image || !image.uri || image.uri==="" || image === "" || typeof image.uri === "object") {
    return (
      <NoImageProviderCoverPhoto onSetImage={onSetImage} {...extraProps} />
    );
  }

  return (
    <View>
      <ImageProviderCoverPhoto
        {...extraProps}
        onSetImage={onSetImage}
        onRemove={onRemove}
        value={image.uri}
      />

      {errors &&<DefaultInputError errorMessage={errors[name]?.message} />}
    </View>
  );
};

ProviderCoverPhoto.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.string,
};

export { ProviderCoverPhoto };
