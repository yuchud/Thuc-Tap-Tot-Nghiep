import * as React from 'react';
import { LinearProgress } from '@rneui/base';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../../constants/API';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
export default function Tracker() {
  const [currentStreak, setCurrentStreak] = React.useState(0);
  const [longestStreak, setLongestStreak] = React.useState(0);
  const [learnedCardsCount, setLearnedCardsCount] = React.useState(0);
  const [isDayLearnedList, setIsDayLearnedList] = React.useState([0, 0, 0, 0, 0, 0, 0]);

  const fetchGetCurrentStreak = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/accounts/${id}/learn-streak`, {
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
      console.log(data);
      if (data) {
        setCurrentStreak(data.current_learned_day_streak);
        setLongestStreak(data.longest_learned_day_streak);
      } else {
        setCurrentStreak(0);
        setLongestStreak(0);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const fetchGetLearnedCardsCount = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/accounts/${id}/learned-cards-count`, {
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
      setLearnedCardsCount(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const fetchGetIsDayLearnedList = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/accounts/${id}/weekly-learn-tracker`, {
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
      const isLearnedList = [0, 0, 0, 0, 0, 0, 0];
      data.forEach((element) => {
        isLearnedList[element.day_of_week - 1] = 1;
      });
      setIsDayLearnedList(isLearnedList);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };
  const fetchData = async () => {
    fetchGetCurrentStreak();
    fetchGetLearnedCardsCount();
    fetchGetIsDayLearnedList();
  };
  React.useEffect(() => {
    // Fetch data from your API and update the state variables
    // Example:
    fetchData();
    // setLongestStreak(fetchedLongestStreak);
    // setLearnedCardsCount(fetchedLearnedCardsCount);
    // setIsDayLearnedList(fetchedIsDayLearnedList);
  }, []);

  const Weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>Tiến độ học tập</Text>
      <View style={styles.weeklyProgress}>
        {isDayLearnedList.map((isLearned, index) => (
          <View key={index} style={styles.dayProgress}>
            <TabBarIcon name={isLearned ? 'checkmark-circle' : 'ellipse-outline'} />
            <Text style={styles.dayText}>{Weekdays[index]}</Text>
          </View>
        ))}
      </View>
      <View style={styles.streakInfo}>
        <Text style={styles.streakText}>Số thẻ đã học: {learnedCardsCount}</Text>
        <Text style={styles.streakText}>Chuỗi học dài nhất hiện tại: {currentStreak} ngày</Text>
        <Text style={styles.streakText}>Chuỗi học dài nhất: {longestStreak} ngày</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  streakInfo: {
    padding: 20,
    alignItems: 'center',
  },
  streakText: {
    fontSize: 18,
    marginVertical: 5,
  },
  weeklyProgress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  dayProgress: {
    alignItems: 'center',
  },
  dayText: {
    marginTop: 5,
    fontSize: 16,
  },
});
