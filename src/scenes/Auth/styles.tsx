import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  input: {
    marginTop: 12,
    marginHorizontal: 12
  },

  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 88,
    marginTop: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  },

  countryCodeText: {
    textAlign: 'center',
    flex: 1
  },

  error: {
    marginTop: 4,
    paddingHorizontal: 12
  },

  logo: {
    alignSelf: 'center',
    height: 48,
    width: 112,
    marginBottom: 8
  }
})

