
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { View } from 'react-native';
import API from '../../API/API';
import Constants from '../../constants/Constants';
import HeaderLeft from '../../core/HeaderLeft';
import PrimaryButton from '../../core/PrimaryButton';
import TextField from '../../core/TextField';
import useScreenOptions from '../../hooks/useScreenOptions';

export default function Feedback({ route }) {
  const {
    type = Constants.FeedbackTypes.GENERAL,
    userID = '',
    headerTitle = 'Feedback',
    placeholder = 'Tell use what happened'
  } = route.params;
  const { goBack } = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState({
    type,
    user: userID,
    content: '',
  })

  const handlePress = async () => {
    if (feedback?.content) {
      setIsLoading(true)
      await API.Feedback.sendFeeback(feedback)
      setIsLoading(false)
      goBack()
    }
  }

  useScreenOptions({
    headerTitle,
    headerShown: true,
    headerLeft: () => <HeaderLeft mode='modal' />,
  })

  return (
    <View style={{ padding: 12 }}>
      <TextField
        placeholder={placeholder}
        value={feedback?.content}
        multiline
        inputStyle={{ height: 96 }}
        onChangeText={v => setFeedback({ ...feedback, content: v })}
      />
      <PrimaryButton
        style={{ marginTop: 12 }}
        title='Submit'
        onPress={handlePress}
        isLoading={isLoading}
        disabled={feedback?.content?.length === 0}
      />
    </View>
  )
}
