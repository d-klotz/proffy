import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, //makes it occupy the whole space left
    backgroundColor: '#8257E5',
    justifyContent: "center",
    padding: 40,
  },
  banner : {
    width: '100%',
    resizeMode: 'contain'
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
    fontFamily: 'Poppins_400Regular'
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold'
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between'
  },
  button: {
    height: 150,
    width: '48%',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between'
  },
  buttonPrimary: {
    backgroundColor: '#9871F5',
  },
  buttonSecondary: {
    backgroundColor: '#04d361',
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 20
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40
  }
});

export default styles;