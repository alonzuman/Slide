import React from "react";
import { View, ActivityIndicator } from "react-native";
import AvatarsGroup from "../../core/AvatarsGroup";
import Typography from "../../core/Typography";
import {
  useStreamAudience,
  useStreamIsJoined,
  useStreamMeta,
  useStreamOwners,
} from "../../hooks/useStream";

export default function StreamHeaderLeft() {
  const meta = useStreamMeta();
  const owners = useStreamOwners();
  const isJoined = useStreamIsJoined();
  const audience = useStreamAudience();
  const ownersData = audience?.filter((v) => owners?.includes(v?._id));

  return (
    <View style={{ paddingHorizontal: 12, alignItems: 'flex-start' }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AvatarsGroup users={ownersData} size="m" style={{ marginRight: 8 }} />
        {!!meta?.name && (
          <Typography style={{ marginRight: 8, color: "#fff" }} variant="h4">
            {meta?.name}
          </Typography>
        )}
        {!isJoined && <ActivityIndicator />}
      </View>
    </View>
  );
}
