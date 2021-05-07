import React from "react";
import { View, FlatList } from "react-native";
import IconButton from "../../core/IconButton";
import Entypo from "react-native-vector-icons/Entypo";
import { useStreamAudience, useStreamRaisedHands } from "../../hooks/useStream";
import { streamFooterAudienceStyles } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import useStreamLayout from "../../hooks/useStreamLayout";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../core/Avatar";
import Typography from "../../core/Typography";

const SIZE = "m";

export default function StreamFooterAudienceBottom() {
  const audience = useStreamAudience();
  const raisedHands = useStreamRaisedHands();
  const { colors } = useTheme();
  const { setOpenModal } = useStreamLayout();
  const styles = streamFooterAudienceStyles(colors);

  const handlePress = () => setOpenModal("STREAM_MODALS/MEMBERS");
  const handleAvatarPress = (userID: string) => null;
  // const handleAvatarPress = (userID: string) =>
  //   setOpenModal("STREAM_MODALS/USER_PREVIEW", { userID });

  return (
    <FlatList
      data={audience}
      keyExtractor={(item) => item._id}
      horizontal
      contentContainerStyle={styles.footerAudienceContainer}
      renderItem={({ item, index }) => {
        const isHandRaised = raisedHands?.includes(item?._id);

        return (
          <>
            {index === 0 && (
              <IconButton
                onPress={handlePress}
                style={styles.footerIconButton}
                size={SIZE}
                key="iconButton"
              >
                <Entypo name="chevron-up" size={18} color={colors.text} />
              </IconButton>
            )}
            <View style={styles.footerAvatarContainer} key={item?._id}>
              <TouchableOpacity onPress={() => handleAvatarPress(item?._id)}>
                <Avatar size={SIZE} uri={item?.avatar} />
              </TouchableOpacity>
              {isHandRaised && (
                <IconButton
                  onPress={() => handleAvatarPress(item?._id)}
                  variant="blur"
                  size="xs"
                  style={styles.footerAvatarWave}
                >
                  <Typography style={styles.footerAvatarWaveTypography}>
                    👋
                  </Typography>
                </IconButton>
              )}
            </View>
          </>
        );
      }}
    />
  );
}
