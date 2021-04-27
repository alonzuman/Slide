import React, { useEffect, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import { useQuery } from 'react-query';
import API from '../API/API';
import { Notification } from '../types';
import { useUser } from './useUser';

export default function useNotifications() {
  const { updateUser } = useUser()
  const { data: notifications, isLoading, refetch } = useQuery('notifications', API.Activity.getMyNotifications)
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null)
  const unreadNotifications = notifications?.filter(v => !v?.readAt)

  const clearActiveNotification = () => setActiveNotification(null)

  // Request permissions
  async function requestNotificationsPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken()
      // Update current device token if changed
      updateUser({ FCMToken: token })
    }
  }

  useEffect(() => {
    requestNotificationsPermission()
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async message => {
      setActiveNotification(message.notification)
      refetch()
    })

    return unsubscribe
  }, [])

  return { notifications, unreadNotifications, isLoading, activeNotification, clearActiveNotification };
}
