import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Card, Icon } from 'react-native-elements';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { LinearProgress } from '@rneui/base';
import { API_URL } from '../../constants/API';
export default function DecksScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId, courseName } = route.params;
  const [decks, setDecks] = useState([]);

  const fetchDecks = async () => {
    setDecks([]);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/courses/${courseId}/decks/public?page=1&limit=24&account_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        return;
      }

      const data = await response.json();

      setDecks(data.decks);
      console.log('fetchDecks -> deck', data.decks);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleOpenCardsInDeck = (deckId, deckName, courseId, courseName) => {
    console.log('handleOpenCardsInDeck -> deckId', deckId);
    navigation.navigate('cards', { deckId, deckName, courseId, courseName });
  };

  useEffect(() => {
    fetchDecks();
  }, [courseId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchDecks();
    }, [courseId])
  );

  return (
    <>
      <Header
        backgroundColor="#fff"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: courseName,
          style: { color: '#000' },
        }}
        centerContainerStyle={{}}
        containerStyle={{ width: '100%' }}
        leftComponent={{
          icon: 'keyboard-backspace',
          color: '#f60143',
          onPress: () => navigation.goBack(),
        }}
        leftContainerStyle={{}}
        // linearGradientProps={{}}
        placement="left"
        // rightComponent={{ icon: 'done', color: '#000', onPress: () => handleUpdateProfile() }}
        // rightContainerStyle={{}}
        statusBarProps={{}}
      />
      <ScrollView style={styles.scrollView}>
        {decks.map((deck, index) => (
          <TouchableOpacity
            key={deck.id}
            onPress={() => handleOpenCardsInDeck(deck.id, deck.name, courseId, courseName)}
          >
            <Card
              containerStyle={[
                styles.card,
                deck.isLearned && styles.learnedCard,
                deck.isLearning && styles.isLearningCard,
              ]}
            >
              <Card.Title>{deck.name || 'Course Name'}</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={{
                  uri: deck.image_url,
                }}
              />
              <Text style={styles.description} numberOfLines={3}>
                {deck.description || 'Course Description'}
              </Text>
              <View style={styles.row}>
                <Icon name="user" type="font-awesome" color="#111" />
                <Text style={styles.LearnedCountText}>{deck.learned_account_count}</Text>
              </View>
              <LinearProgress
                value={deck.learned_card_count / deck.card_count}
                variant="determinate"
                style={{ width: '100%' }}
                color="primary"
              />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    padding: 20,
    backgroundColor: '#eff',
  },
  fonts: {
    marginBottom: 8,
  },
  card: {
    marginBottom: 20,
  },
  isLearningCard: {
    borderWidth: 1,
    borderColor: 'orange',
  },
  learnedCard: {
    borderWidth: 1,
    borderColor: 'green',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  icon: {
    marginRight: 6,
  },
  description: {
    marginBottom: 6,
  },
  LearnedCountText: {
    marginLeft: 6,
  },
});
