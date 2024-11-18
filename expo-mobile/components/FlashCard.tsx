import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { Image } from 'expo-image';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function FlashCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));
  const [frontImage, setFrontImage] = useState(null);
  const [sound, setSound] = useState(null);

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const playSound = async () => {
    // e.stopPropagation();
    if (card?.front_audio_url) {
      const { sound } = await Audio.Sound.createAsync({ uri: card?.front_audio_url });
      setSound(sound);
      await sound.playAsync();
    }
  };

  useEffect(() => {
    // Reset the flip animation and state when the card changes
    setIsFlipped(false);
    flipAnimation.setValue(0);
  }, [card]);

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <>
      <TouchableOpacity onPress={flipCard}>
        <View style={styles.container}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, !isFlipped && styles.hidden]}>
            <Card containerStyle={styles.card}>
              {card?.front_image ? (
                <Image source={{ uri: card?.front_image }} style={styles.image} />
              ) : (
                <Text>No Image Available</Text>
              )}
              <Text style={styles.text}>{card?.front_text}</Text>
              <Card.Divider />
              <Text style={styles.pronunciation}>{card?.front_pronunciation}</Text>
            </Card>
          </Animated.View>

          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, isFlipped && styles.hidden]}>
            <Card containerStyle={styles.card}>
              <Text style={styles.text}>{card?.back_text}</Text>
            </Card>
          </Animated.View>
        </View>
      </TouchableOpacity>
      {card?.front_audio_url && (
        <TouchableOpacity onPress={playSound} style={styles.soundIcon}>
          <Text>Nghe phát âm 🔊</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 300,
    marginBottom: 25,
  },
  flipCard: {
    backfaceVisibility: 'hidden',
    height: 200,
    width: 300,
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
  hidden: {
    zIndex: -1,
  },
  card: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  pronunciation: {
    fontSize: 16,
    textAlign: 'center', 
    color: 'gray',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  soundIcon: {
    // marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
