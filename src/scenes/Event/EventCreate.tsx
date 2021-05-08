import React, { useReducer, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import AvatarsGroup from "../../core/AvatarsGroup";
import FileUploader from "../../core/FileUploader";
import HeaderLeft from "../../core/HeaderLeft";
import IconButton from "../../core/IconButton";
import PrimaryButton from "../../core/PrimaryButton";
import Section from "../../core/Section";
import TextField from "../../core/TextField";
import Typography from "../../core/Typography";
import useScreenOptions from "../../hooks/useScreenOptions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { eventCreate } from "./styles";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/core";
import useEventCreate from "../../hooks/useEventCreate";
import API from "../../API/API";

export default function EventCreate() {
  const [isLoading, setIsLoading] = useState(false)
  const { state, updateMeta } = useEventCreate();
  const { colors } = useTheme();
  const { push } = useNavigation();

  useScreenOptions({
    headerLeft: () => <HeaderLeft mode="modal" />,
    headerTitle: "Create Event",
  });

  const handleSubmit = async () => {
    setIsLoading(true)
    const event = {
      ...state,
      guests: state?.guests?.map(v => v?._id)
    }
    await API.Events.createEvent(event)
    setIsLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={eventCreate.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Section
        title="General information"
        subtitle="Provide general information about the event you are creating"
      >
        <View style={styles.fields}>
          {state?.meta?.imageURL ? (
            <Image
              source={{ uri: state?.meta?.imageURL }}
              style={styles.imageURL}
            />
          ) : (
            <FileUploader
              isActive={true}
              onFinish={(url) => updateMeta({ imageURL: url })}
              path={`/events/${Date.now()}`}
              style={styles.imageURL}
            >
              <View
                style={{ ...styles.imageURL, backgroundColor: colors.cardAlt }}
              >
                <Typography style={styles.imageURLText}>
                  Press here to add an image to your event 📷
                </Typography>
              </View>
            </FileUploader>
          )}
          <TextField
            style={styles.input}
            placeholder="Event name"
            value={state.meta.name}
            onChangeText={(text) => updateMeta({ name: text })}
          />
          <TextField
            style={styles.input}
            placeholder="Event description"
            multiline
            numberOfLines={4}
            inputStyle={styles.description}
            value={state.meta.description}
            onChangeText={(text) => updateMeta({ description: text })}
          />
        </View>
      </Section>
      <Section
        title="Invite guests"
        subtitle="Guests will be have the permission to go on stage as soon as they join the stream."
      >
        <View style={styles.guests}>
          {state?.guests?.length > 0 ? (
            <AvatarsGroup max={4} users={state?.guests} />
          ) : (
            <IconButton onPress={() => push("Event Create Guests")}>
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={colors.text}
              />
            </IconButton>
          )}
        </View>
      </Section>
      <Section title='Pick a date' subtitle='Choose a date for your event'>

      </Section>
      <PrimaryButton title="Create" onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fields: {
    paddingHorizontal: 12,
  },

  imageURL: {
    borderRadius: 12,
    height: 160,
    justifyContent: "center",
  },

  imageURLText: {
    textAlign: "center",
  },

  input: {
    marginTop: 12,
  },

  description: {
    height: 96,
  },

  guests: {
    paddingHorizontal: 12,
  },
});
