import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import Flashcard from '../../components/FlashCard';
import { API_URL } from '../../constants/API';
import { ScrollView } from 'react-native';

export default function LearningScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckId, deckName, courseId, courseName } = route.params;
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedCards, setLearnedCards] = useState([]);

  const fetchCards = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/learning/deck?account_id=${id}&deck_id=${deckId}`, {
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
      setCards(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleKnown = () => {
    handleNextCard(true);
  };
  const handleUnknown = () => {
    handleNextCard(false);
  };

  const handleNextCard = async (isKnown) => {
    const currentCard = cards[currentIndex];
    const performanceChange = isKnown ? 1 : -1;
    currentCard.performance += performanceChange;
    currentCard.learned_count += 1;
    let newCards = cards.slice(1);
    if (currentCard.learned_count < 2) {
      newCards.push(currentCard);
    } else {
      setLearnedCards([...learnedCards, currentCard]);
    }
    // if (newCards.length === 0) {
    // await handleFinishLearning();
    // return;
    // }
    setCards(newCards);
  };

  const handleFinishLearning = async () => {
    if (learnedCards.length === 0) {
      return;
    }
    const userToken = await AsyncStorage.getItem('userToken');
    const decodedToken = jwtDecode(userToken);
    const { id } = decodedToken;
    const response = await fetch(`${API_URL}/learning/finish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_id: id,
        learned_cards: learnedCards,
      }),
    });
    if (!response.ok) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      return;
    }
    alert('Hoàn thành bài học');
    navigation.navigate('cards', { deckId, deckName, courseId, courseName });
  };

  // useEffect(() => {
  //   fetchCards();
  // }, [deckId]);
  const refetchData = async () => {
    setCards([]);
    setLearnedCards([]);
    await fetchCards();
  };
  useFocusEffect(
    React.useCallback(() => {
      refetchData();
    }, [deckId])
  );
  useEffect(() => {
    if (cards.length === 0) {
      handleFinishLearning();
    }
  }, [cards]);
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
          onPress: () => navigation.navigate('cards', { deckId, deckName, courseId, courseName }),
        }}
      />
      <ScrollView style={styles.scrollView}>
        <Flashcard card={cards[currentIndex]} />
        {/* <Text>Còn {cards.length}</Text> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.dontKnowButton} onPress={handleUnknown}>
            <Text style={styles.buttonText}>Chưa nhớ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.knowButton} onPress={handleKnown}>
            <Text style={styles.buttonText}>Đã Nhớ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = {
  scrollView: {
    padding: 20,
    backgroundColor: '#eff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  dontKnowButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 90,
    marginLeft: 10,
  },
  knowButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 90,
    marginRight: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
};
