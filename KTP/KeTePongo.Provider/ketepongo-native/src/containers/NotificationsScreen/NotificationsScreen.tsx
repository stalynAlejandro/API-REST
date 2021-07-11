import React, { useLayoutEffect, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import {
  HorizontalLogoWithBurguerHeader, NotificationCard, TitleSection, TypoGraphyNunitoRegular, Spinner, TypoGraphyNunitoBold, TypoGraphyNunitoLight
} from 'components';
import styles from './NotificationsScreen.component.styles'
import { FlatList, State } from 'react-native-gesture-handler';
import { store } from 'App';
import { AppState } from '../../store'
import { useFocusEffect, useFocusState, useIsFocused, useNavigationState} from 'react-navigation-hooks'
import { markNotificationsAsRead, NotificationStatus, NotificationTypes, switchNotificationsTimer } from '../../store/notifications';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FailedLoadingNotifications, LoadedNotifications, LoadingNotifications, NoNotifications, SuccededLoadingNotifications } from './NotificationsScreen.UI';

function NotificationScreenStatus(){
  const notifications = useSelector((state: AppState) => state.notifications);
  if(notifications.status == NotificationStatus.LOADING_OFF_SCREEN || notifications.status == NotificationStatus.LOADING_FAILED_OFF_SCREEN){
    return <LoadingNotifications/>
  }
  else if(notifications.renderedList.length != 0){
    if(notifications.status == NotificationStatus.LOADING_FAILED_ON_SCREEN || notifications.status == NotificationStatus.LOADING_ON_SCREEN)
    {
      return <FailedLoadingNotifications/>
    }
    if(notifications.status == NotificationStatus.LOADED_ON_SCREEN){
      return <SuccededLoadingNotifications/>
    }
    return <LoadedNotifications />
  }
  return <NoNotifications/>
  }
function NotificationsScreen() {
  
  const dispatch = useDispatch()

  const notifications = useSelector((state: AppState) => state.notifications);
  const isFocused = useIsFocused();

  
  useEffect(() => {
    dispatch({type: NotificationTypes.SWITCH_ON_SCREEN})
    dispatch(switchNotificationsTimer());
    return () => { if(!notifications.isNotificationsScreen) dispatch(markNotificationsAsRead()); }
  }, [isFocused])
  return (
    <View style={styles.body}>
      <HorizontalLogoWithBurguerHeader />
      <TypoGraphyNunitoBold text="Notificaciones" style={styles.title}/>
      <SafeAreaView style={styles.scroll}>
        <NotificationScreenStatus/>
      </SafeAreaView>
    </View>
  )
}

export { NotificationsScreen }