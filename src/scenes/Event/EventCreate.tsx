import React, { useReducer } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import TextField from "../../core/TextField";
import reducer, {
  initialState,
  UPDATE_META,
} from "../../reducers/createEvent";
import { eventCreate } from "./styles";

export default function EventCreate() {
  const [state, dispatch] = useReducer(initialState, reducer);

  const updateMeta = (args) => dispatch({ type: UPDATE_META, payload: args });

  return (
    <KeyboardAvoidingView
      style={eventCreate.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TextField
        value={event.meta.name}
        onChangeText={(text) => updateMeta({ name: text })}
      />
    </KeyboardAvoidingView>
  );
}
