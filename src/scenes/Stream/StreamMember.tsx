import React from "react";
import { View } from "react-native";
import Avatar from "../../core/Avatar";
import HeaderLeft from "../../core/HeaderLeft";
import IconButton from "../../core/IconButton";
import ListItem from "../../core/ListItem";
import PrimaryButton from "../../core/PrimaryButton";
import SecondaryButton from "../../core/SecondaryButton";
import Typography from "../../core/Typography";
import useScreenOptions from "../../hooks/useScreenOptions";
import useStream, {
  useStreamAudienceMember,
  useStreamMeta,
  useStreamOnStage,
  useStreamOwners,
  useStreamRaisedHands,
} from "../../hooks/useStream";
import { useUser } from "../../hooks/useUser";
import ProfileFollowButton from "../Profile/ProfileFollowButton";

export default function StreamMember({ userID }: { userID: string }) {
  const { makeAudience, makeSpeaker } = useStream();
  const onStage = useStreamOnStage();
  const raisedHands = useStreamRaisedHands();
  const owners = useStreamOwners();
  const meta = useStreamMeta();
  const { user } = useUser();
  const { name, avatar } = useStreamAudienceMember(userID);

  // Make a seperate hook to check to these and stop listening to the arrays
  const isOwner = owners?.includes(user?._id);
  const isSpeaker = onStage?.includes(userID);
  const isMe = userID === user?._id;
  const isRaisingHand = raisedHands?.includes(userID);

  const _renderAction = () => {
    if (isMe) return null;
    if (isOwner) {
      return isSpeaker ? (
        <SecondaryButton
          size="s"
          title="Make Audience"
          onPress={() => makeAudience(onStage, userID)}
        />
      ) : (
        <PrimaryButton
          onPress={() => makeSpeaker(onStage, userID)}
          size="s"
          title="Make Speaker"
        />
      );
    }

    return <ProfileFollowButton userID={userID} name={name} avatar={avatar} />;
  };

  return (
    <ListItem
      key={userID}
      label={isSpeaker ? "Speaker" : "Audience"}
      primary={name}
      renderBefore={
        <View style={{ position: "relative" }}>
          <Avatar size="s" uri={avatar} />
          {isRaisingHand && (
            <IconButton
              style={{ position: "absolute", top: -8, right: -8 }}
              size="s"
              card
            >
              <Typography style={{ fontSize: 12 }}>👋</Typography>
            </IconButton>
          )}
        </View>
      }
      renderAfter={_renderAction()}
    />
  );
}
