import React from 'react'
import { View, Text, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from '../../constants/Constants';
import Typography from '../../core/Typography';
import styles from './styles';

export default function AuthPolicyDisclaimer() {
  const insets = useSafeAreaInsets()

  const handleLinkPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Link not supported");
    }
  };

  return (
    <View style={{...styles.disclaimerContainer, bottom: insets.bottom || 12}}>
      <Typography
        style={styles.disclaimerText}
        variant="subtitle"
        color="secondary"
      >
        By signing in, you agree to the
      </Typography>
      <Typography
        style={styles.disclaimerLink}
        color="primary"
        onPress={() => handleLinkPress(Constants.URLs.TERMS_OF_SERVICE)}
        variant="subtitle"
      >
        terms of service
      </Typography>
      <Typography
        style={styles.disclaimerText}
        variant="subtitle"
        color="secondary"
      >
        and
      </Typography>
      <Typography
        style={styles.disclaimerLink}
        color="primary"
        onPress={() => handleLinkPress(Constants.URLs.PRIVACY_POLICY)}
        variant="subtitle"
      >
        privacy policy.
      </Typography>
    </View>
  );
}
