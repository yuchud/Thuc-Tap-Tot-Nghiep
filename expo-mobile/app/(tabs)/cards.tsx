import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Header, Card, Icon } from 'react-native-elements';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListItem } from '@rneui/base';
import { API_URL } from '../../constants/API';
import { set } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function CardsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId, deckName, courseId, courseName } = route.params;
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    // console.log('fetchCards -> deckId', deckId);
    // console.log('fetchCards -> route.params', route.params);
    setCards([]);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/decks/${deckId}/cards/public?account_id=${id}`);
      if (!response.ok) {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        return;
      }
      const data = await response.json();
      setCards(data);
      // console.log('fetchCards -> data', data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleLearning = async (deckId, deckName) => {
    navigation.navigate('learning', { deckId, deckName, courseId, courseName });
  };

  useEffect(() => {
    setCards([]);
    fetchCards();
  }, [deckId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCards();
    }, [deckId])
  );

  return (
    <>
      <Header
        backgroundColor="#fff"
        centerComponent={{
          text: deckName,
          style: { color: '#000' },
        }}
        leftComponent={{
          icon: 'keyboard-backspace',
          color: '#f60143',
          onPress: () => navigation.navigate('decks', { courseId, courseName }),
        }}
        rightComponent={{
          text: 'Học ngay',
          style: { color: '#4287f5' },
          onPress: () => handleLearning(deckId, deckName),
        }}
        rightContainerStyle={{}}
      />
      <ScrollView style={styles.scrollView}>
        {cards.map((card) => (
          <ListItem bottomDivider containerStyle={[styles.card, card.is_learned && styles.learnedCard]} key={card.id}>
            <ListItem.Content>
              <ListItem.Title style={card.is_learned ? styles.learnedText : styles.text}>
                {card.front_text}
              </ListItem.Title>
              {/* <ListItem.Divider /> */}
              <ListItem.Subtitle style={[styles.description, card.is_learned ? styles.learnedText : styles.text]}>
                {card.back_text}
              </ListItem.Subtitle>
            </ListItem.Content>
            <View style={styles.rightContainer}>
              <Icon name="user" type="font-awesome" color="#111" />
              <Text style={styles.learnedCountText}>{card.learned_account_count}</Text>
            </View>
          </ListItem>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    backgroundColor: '#eff',
  },
  text: {
    color: '#111',
  },
  card: {
    marginBottom: 20,
  },
  learnedCard: {
    borderWidth: 1,
    borderColor: 'green',
  },
  description: {
    marginBottom: 6,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnedCountText: {
    marginLeft: 6,
    color: '#111',
  },
  learnedText: {
    color: 'green',
  },
});
