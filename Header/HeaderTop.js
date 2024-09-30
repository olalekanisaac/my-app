import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const { width: windowWidth } = Dimensions.get('window');
const { height: windowHeight } = Dimensions.get('window'); // Get window height
const HeaderTop = () => {
  
  return (
    <SafeAreaView style={styles.container} >
    <View >
      <View style={styles.head}>
        <Text style={styles.text}>TIC TAK TOE</Text>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default HeaderTop

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray', // Header background color
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: windowHeight * 0.1, // Responsive height (10% of screen height)
    position: 'absolute', // Position it absolutely
    top: 1, // Align to the top of the screen
    zIndex: 2, // Ensure it's above other components
    // paddingTop: 20, // Add padding to position text vertically
    // marginBottom: 70,
  },

  text: {
    color: 'white',
    fontSize: windowWidth * 0.06, // Responsive font size (6% of screen width)
    fontWeight: 'bold',
    marginTop: 30,

  }
})