import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  input: {
    marginTop: 12,
    marginHorizontal: 12,
  },

  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    width: 88,
    marginTop: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 32,
    padding: 12,
  },

  countryCodeText: {
    textAlign: "center",
    flex: 1,
  },

  error: {
    marginTop: 4,
    paddingHorizontal: 12,
  },

  logo: {
    alignSelf: "center",
    height: 48,
    width: 112,
    marginBottom: 8,
  },

  disclaimerText: {
    textAlign: "center",
    padding: 12,
  },

  disclaimerLink: {
    marginTop: -16,
    marginLeft: -8,
    marginRight: -8,
  },

  disclaimerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
