import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Icon, Text, Badge } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { LinearProgress } from '@rneui/base';
import { API_URL } from '../../constants/API';

export default function HomeScreen() {
  const [courses, setCourses] = useState([]);
  const [account, setAccount] = useState({});
  const navigation = useNavigation();
  const fetchCourses = async () => {
    setCourses([]);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/courses/public?page=1&limit=24&account_id=${id}`, {
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
      // const JSONData = JSON.parse(data);
      setCourses(data.courses);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleGetAccount = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/accounts/${id}`, {
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
      setAccount(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleOpenDecksInCourse = (courseId, courseName, isNeedPro) => {
    if (isNeedPro && !account.is_pro) {
      navigation.navigate('pricing');
      return;
    }
    navigation.navigate('decks', { courseId, courseName });
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetAccount();
      fetchCourses();
    }, [])
  );
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={course.id}
            onPress={() => handleOpenDecksInCourse(course.id, course.name, course.is_need_pro)}
          >
            <Card
              containerStyle={[
                course.is_need_pro ? styles.proCard : styles.card,
                course.isLearned && styles.learnedCard,
                course.isLearning && styles.isLearningCard,
              ]}
            >
              {course.is_need_pro && (
                <Badge
                  value="PRO"
                  status="warning"
                  containerStyle={styles.badgeContainer}
                  textStyle={styles.badgeText}
                />
              )}
              <Card.Title>{course.name || 'Course Name'}</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={{
                  uri: course.image_url,
                }}
              />
              <Text style={styles.description} numberOfLines={3}>
                {course.description || 'Course Description'}
              </Text>
              <View style={styles.row}>
                <Icon name="user" type="font-awesome" color="#111" />
                <Text style={styles.LearnedCountText}>{course.learned_account_count}</Text>
              </View>
              <LinearProgress
                value={course.learned_card_count / course.card_count}
                variant="determinate"
                style={{ width: '100%' }}
                color="primary"
              />
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    backgroundColor: '#eff',
  },
  container: {
    flex: 1,
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
  proCard: {
    marginBottom: 20,
    borderColor: 'yellow',
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
    marginTop: 10,
    alignSelf: 'center',
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    height: 60,
    overflow: 'hidden',
  },
  LearnedCountText: {
    fontSize: 15,
    padding: 5,
  },
  badgeContainer: {
    position: 'absolute',
    right: 10,
  },
  badgeText: {
    fontSize: 12,
  },
});
