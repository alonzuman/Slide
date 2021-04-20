import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import { useQuery } from 'react-query';
import API from '../API/API';
import useUpdateUser from './useUpdateUser';

export default function useNotifications() {
  const { updateUser } = useUpdateUser()
  const { data: notifications, isLoading } = useQuery('notifications', API.Activity.getMyNotifications)

  // Request permissions
  async function requestNotificationsPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken()
      // Update current device token if changed
      await updateUser({ FCMToken: token })
    }
  }

  // Fetch notifications
  useEffect(() => {
    // dispatch(notificationsActions.setFetching())
    // dispatch(notificationsActions.fetchNotifications())
  }, [])

  useEffect(() => {
    requestNotificationsPermission()
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async message => {
      // dispatch(notificationsActions.setActiveNotification(message.notification))
      // dispatch(notificationsActions.refreshNotifications())

      setTimeout(() => {
        // dispatch(notificationsActions.clearActiveNotification())
      }, 3000);
    })

    return unsubscribe
  }, [])

  return { notifications, isLoading };
}
