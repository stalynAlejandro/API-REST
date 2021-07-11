import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import {
  NotificationCard, TitleSection, TypoGraphyNunitoRegular, Spinner, TypoGraphyNunitoBold, TypoGraphyNunitoLight, BasicHeaderComponent
} from 'components';
import styles from './NotificationsScreen.component.styles'
import { FlatList } from 'react-native-gesture-handler';
import { AppState } from '../../store'
import NoNotificationsSplash from '../../../assets/notification/noNotificationsSplash.svg'
import ErrorIcon from '../../../assets/notification/error.svg';
import SuccessIcon from '../../../assets/notification/success.svg'
import { COLORS } from '../../constants';

export function LoadingNotifications() { 
    return <View>
    <ActivityIndicator style={styles.spinner} size={'large'} color={COLORS.main_strong} />
    <TypoGraphyNunitoRegular style={styles.textSpinner} text={"Estamos cargando las notificaciones,\nespera unos segundos..."}/>
</View>
}
export function FailedLoadingNotifications() {
    const notifications = useSelector((state: AppState) => state.notifications);  
    return <FlatList
      style={styles.scroll}
      data={notifications.renderedList}
      ListHeaderComponent={
      <View style={styles.headerMessage}>
        <ErrorIcon/>
        <TypoGraphyNunitoLight style={styles.errorMessage} text={"Ha habido un problema al cargar las nuevas notificaciones. Estamos intentando solucionar el problema..."}/>
      </View>
      }
      renderItem={({item}) => <NotificationCard title={item.title} firstText={item.description} category={item.category} isRead={item.isRead}/>}/>   
    }
export function SuccededLoadingNotifications() {
    const notifications = useSelector((state: AppState) => state.notifications);  
    return <FlatList
    style={styles.scroll}
    data={notifications.renderedList}
    ListHeaderComponent={
    <View style={styles.headerMessage}>
        <SuccessIcon/>
        <TypoGraphyNunitoLight style={styles.successMessage} text={"¡Se han actualizado las notificaciones con éxito!"}/>
    </View>
    }
    renderItem={({item}) => <NotificationCard title={item.title} firstText={item.description} category={item.category} isRead={item.isRead}/>}      
    />
}
export function LoadedNotifications(){
    const notifications = useSelector((state: AppState) => state.notifications);  
    return <FlatList
    style={styles.scroll}
    data={notifications.renderedList}
    renderItem={({item}) => <NotificationCard title={item.title} firstText={item.description} category={item.category} isRead={item.isRead}/>}      
    />
  }
export function NoNotifications() {
    return <View style={styles.noNotifications}>
        <NoNotificationsSplash style={styles.splash}/>
        <TypoGraphyNunitoRegular style={styles.textSplash} text={"Todavía no tienes notificaciones. Aquí\n encontrarás todas las alertas relativas a tus\n proveedores y los productos de tus listas."}/>
    </View>
}