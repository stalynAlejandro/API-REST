import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store";
import {
  IAuthState,
  initializeAuthenticationState,
  navigateToUpgradeScreen,
} from "../store/authentication";
import { UpgradeAppScreen } from "components";

function withAuthentication(
  Component: any,
  hasToDisableAuthentication?: boolean
) {
  function WrappedComponent(props: any) {
    const authenticationState = useSelector<AppState, IAuthState>(
      (state) => state.authentication
    );
    const dispatch = useDispatch();

    useEffect(() => {
      if (
        authenticationState.isInitialAuthenticationStateRetrieved &&
        !authenticationState.isAppUpdated
      ) {
        dispatch(navigateToUpgradeScreen());
      }
    }, [authenticationState.isAppUpdated]);

    if (!authenticationState.isInitialAuthenticationStateRetrieved) {
      dispatch(initializeAuthenticationState());
      return null;
    }

    if (!authenticationState.isAppUpdated) {
      return (
        <UpgradeAppScreen
          isDisconnectedFromServer={false}
          retryConnection={() => {
            dispatch(initializeAuthenticationState());
          }}
        />
      );
    }

    if (
      authenticationState.isInitialAuthenticationStateRetrieved &&
      !authenticationState.hasConnectionWithServer &&
      !authenticationState.isUserLogged
    ) {
      return (
        <UpgradeAppScreen
          isDisconnectedFromServer={true}
          retryConnection={() => {
            dispatch(initializeAuthenticationState());
          }}
        />
      );
    }

    if (hasToDisableAuthentication) {
      return <Component {...props} />;
    }

    return <Component {...props} />;
  }
  WrappedComponent.displayName = `withAuthentication(${WrappedComponent.name})`;
  return WrappedComponent;
}

export default withAuthentication;
