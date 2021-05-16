import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Typography from "./Typography";

type Props = {
  primary?: string;
  secondary?: string;
  style?: object;
  onRefresh?: () => void;
  isRefreshing?: boolean;
};

export default function EmptyState({
  style,
  primary,
  secondary,
  onRefresh,
  isRefreshing = false,
}: Props) {
  if (onRefresh) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ ...styles.container, ...style }}
      >
        {_render(primary, secondary)}
      </ScrollView>
    );
  }

  return (
    <View style={{ ...styles.container, ...style }}>
      {_render(primary, secondary)}
    </View>
  );
}

const _render = (
  primary: string | undefined,
  secondary: string | undefined
) => (
  <>
    {!!primary && (
      <Typography style={styles.primary} variant="h3">
        {primary}
      </Typography>
    )}
    {!!secondary && (
      <Typography style={styles.secondary}>{secondary}</Typography>
    )}
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },

  primary: {
    marginBottom: 8,
  },

  secondary: {
    textAlign: "center",
  },
});
