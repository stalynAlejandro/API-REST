import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getBottomBarIndex } from '../../navigation/NavigationService'
import { navigateToRequest, navigateToOffer } from '../../store/buying'
import { BottomBar } from './BottomComponent.UI'

export const BottomComponent = () => {

    const dispatch = useDispatch();
    const { index } = getBottomBarIndex()

    const goToRequest = () => dispatch(navigateToRequest());
    const goToOffer = () => dispatch(navigateToOffer());

    return (
        <BottomBar onFocus={index} onPressLeft={goToRequest} onPressRight={goToOffer} />
    )
}
