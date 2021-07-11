import React from 'react';
import PropTypes from 'prop-types';

import { 
	ImageCoverPhotoWithProvider,
	ImageCoverNoPhotoWithProvider,
	NoImageCoverPhoto, 
	ImageCoverPhoto 
} from './CoverPhoto.UI';

const renderImageCoverForProvider = (
	imageUrl, 
	onPressBack,
	onPressUpload,
	providerInfo
	) => {
	if (!imageUrl) {
		return (
			<ImageCoverNoPhotoWithProvider
				onPressBack={onPressBack}
				onPressUpload={onPressUpload}
				providerInfo={providerInfo}
			/>
		)
	}
	
	return (
		<ImageCoverPhotoWithProvider
			onPressBack={onPressBack}
			onPressUpload={onPressUpload}
			imageUrl={imageUrl}
			providerInfo={providerInfo}
		/>
	)
}

const CoverPhoto = ({
	imageUrl,
	onPressBack,
	onPressUpload,
	providerInfo
}) => {
	if (providerInfo) {
		return renderImageCoverForProvider(imageUrl, onPressBack, onPressUpload, providerInfo);
	}
	
	if (!imageUrl) {
		return <NoImageCoverPhoto onPressBack={onPressBack} onPressUpload={onPressUpload} />;
	}

	return (
		<ImageCoverPhoto
			onPressBack={onPressBack}
			onPressUpload={onPressUpload}
			imageUrl={imageUrl}
		/>
	);
};

CoverPhoto.propTypes = {
	providerInfo: PropTypes.object,
	imageUrl: PropTypes.string,
	onPressBack: PropTypes.func.isRequired,
	onPressUpload: PropTypes.func.isRequired
};

export { CoverPhoto };