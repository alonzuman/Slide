import React, { createContext, useReducer } from "react";
import reducer, {
  UPDATE_META,
  initialState,
  UPDATE_FIELD,
} from "../reducers/createEvent";

export const EventCreateContext = createContext();

export default function EventCreateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateMeta = (args: any) =>
    dispatch({ type: UPDATE_META, payload: args });

  const updateField = (args: any) => {
    dispatch({ type: UPDATE_FIELD, payload: args });
  };

  return (
    <EventCreateContext.Provider value={{ state, updateMeta, updateField }}>
      {children}
    </EventCreateContext.Provider>
  );
}
