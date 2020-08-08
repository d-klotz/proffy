import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import styles from './styles';

import teachBGImage from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';

const Teach: React.FC = () => {

  const { goBack } = useNavigation();

  const handleNavigateGoBack = () => {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMethod="auto" 
        source={teachBGImage} 
        style={styles.content}
      >
        <Text style={styles.title}>Do you want to be a teacher?</Text>
        <Text style={styles.description}>To get started, you need to create your profile in our web platform</Text>
      </ImageBackground>

      <RectButton 
        onPress={handleNavigateGoBack}
        style={styles.okButton}>
        <Text style={styles.okButtonText}>Ok</Text>
      </RectButton>
    </View>
  );
}

export default Teach;