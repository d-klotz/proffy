import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import teachIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {

  const navigation = useNavigation();

  const handleNavigationToTeachPage = () => {
    navigation.navigate('Teach');
  }

  const handleNavigationToStudyPage = () => {
    navigation.navigate('Study');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.banner}/>

      <Text style={styles.title}>
        Welcome,{'\n'}
        <Text style={styles.titleBold}>What do you want to do?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
          onPress={handleNavigationToStudyPage} 
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon}/>
          <Text style={styles.buttonText}>Study</Text>
        </RectButton>

        <RectButton 
          onPress={handleNavigationToTeachPage} 
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={teachIcon}/>
          <Text style={styles.buttonText}>Teach</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        More than 200 connections made {' '}
        <Image source={heartIcon}/>
      </Text>
    </View>
  );
}

export default Landing;