export const initialState = {
  meta: {
    name: "",
    imageURL: "",
    description: "",
  },
  date: null,
  guests: [],
};

export default function (state, action) {
  const { payload, type } = action;

  switch (type) {
    case UPDATE_FIELD:
      return {
        ...state,
        ...payload,
      };
    case UPDATE_META:
      return {
        ...state,
        meta: {
          ...state.meta,
          ...payload,
        },
      };
    default:
      return state;
  }
}

export const UPDATE_FIELD = "EVENT/UPDATE_FIELD";
export const UPDATE_META = "EVENT/UPDATE_META";
