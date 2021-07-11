import React from 'react';
import { Platform, TouchableNativeFeedback, View } from 'react-native';
import {
  TypoGraphyNunitoSemiBold, TypoGraphyNunitoWithHighlight, TouchableItem
} from 'components';
import ClientIcon from '../../../assets/notification/client.svg'
import ProductIcon from '../../../assets/notification/product.svg'
import ProviderIcon from '../../../assets/notification/provider.svg'
import styles from './NotificationCard.component.styles'
import { NotificationCategory } from '../../model/DTOs/NotificationItemDTO'
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../constants'
import { useNavigation, useNavigationState } from 'react-navigation-hooks';
import { INotificationCardProps } from 'store/notifications';
function NotificationCardContent ({title, firstText, highlightText, secondText, category, isRead} : INotificationCardProps) {
 return (
   <View style={isRead ? styles.cardContentRead : styles.cardContent}>
     <View style={isRead ? styles.cardIconRead : styles.cardIcon}>
      {(category == NotificationCategory.AccessToCatalogConsumerRequest || category == NotificationCategory.General) && <ClientIcon/>}
      {(category == NotificationCategory.AccessToCatalogConsumerAccepted || category == NotificationCategory.UnsubscribedFromCatalog) && <ProviderIcon style={styles.icon}/>}
      {(category == NotificationCategory.RemovedProduct) && <ProductIcon/>}
     </View>
    <View style={styles.cardInfo}>
      <TypoGraphyNunitoSemiBold style={isRead ? styles.cardTitleRead : styles.cardTitle} text={title}/>
      <TypoGraphyNunitoWithHighlight style={isRead ? styles.cardDescriptionRead : styles.cardDescription} text={firstText} highlightText={highlightText} secondText={secondText}/>
    </View>
   </View>
 ) 
}
function NotificationCard(
  { title, firstText, highlightText, secondText, category, isRead } : INotificationCardProps) {
  var navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <TouchableItem
      onPress={() => {}}
      item={(<View style={isRead ? styles.cardContainerRead : styles.cardContainer}>
        <View style={isRead ? styles.cardLeftBorderRead : category == NotificationCategory.AccessToCatalogConsumerRequest ? styles.cardLeftBorderPositive : styles.cardLeftBorderNegative}>
        <NotificationCardContent title={title} firstText={firstText} category={category} isRead={isRead} highlightText={highlightText ? highlightText : ""} secondText={secondText ? secondText : ""}/>
        </View>
        </View>)}
      selectedProperty={null}/>
  ) 
 }
 export { NotificationCard }