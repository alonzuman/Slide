import { StyleSheet } from "react-native";
import { Colors } from "../../types";

export const streamLiveIndicatorStyles = (colors: Colors, isLive: boolean) =>
  StyleSheet.create({
    root: {
      marginRight: 8,
      backgroundColor: isLive ? `${colors.error}20` : `${colors.border}20`,
      borderColor: isLive ? `${colors.error}50` : `${colors.border}50`,
    },
  });

export const streamFooterAudienceStyles = (colors: Colors) =>
  StyleSheet.create({
    footerIconButton: {
      marginLeft: 12,
      marginRight: 8,
    },

    footerAvatarContainer: {
      position: "relative",
      marginRight: 8,
    },

    footerAvatarWave: {
      position: "absolute",
      top: -4,
      right: -4,
    },

    footerAvatarWaveTypography: {
      fontSize: 10,
    },

    footerHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

export const streamBodyStyles = StyleSheet.create({
  streamBody: {
    flex: 1,
    justifyContent: "flex-end",
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    overflow: "hidden",
    // position: "relative",
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  },

  streamBodyOverlay: {
    flex: 1,
  },
});

export const streamControlsStyles = StyleSheet.create({
  streamControls: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 16,
  },

  streamControlIcon: {
    shadowColor: "#00000050",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  streamControlText: {
    textShadowColor: "rgba(0, 0, 0, .3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    fontSize: 24,
  },
});
