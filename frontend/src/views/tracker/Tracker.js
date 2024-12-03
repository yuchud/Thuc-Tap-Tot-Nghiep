import React, { useEffect, useState } from 'react';
import {
  fetchGetLearnStreak,
  fetchGetWeeklyLearnTracker,
  fetchGetLearnedCardsCount,
} from '../../services/AccountService';
import {
  fetchTopCurrentLearnStreaks,
  fetchTopLongestLearnStreaks,
  fetchTopLearnedCardsCount,
} from '../../services/TrackerService';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';
import '../../assets/css/Tracker.css';
import TopTable from '../../components/TopTable';
const Progress = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [isDayLearnedList, setIsDayLearnedList] = useState([]);
  const [learnedCardsCount, setLearnedCardsCount] = useState(0);
  const [topCurrentLearnStreak, setTopCurrentLearnStreak] = useState([]);
  const [topLongestLearnStreak, setTopLongestLearnStreak] = useState([]);
  const [topLearnedCardsCount, setTopLearnedCardsCount] = useState([]);
  const Weekdays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
  const fetchProgressData = async () => {
    const learnStreak = await fetchGetLearnStreak();
    if (learnStreak === null) {
      setCurrentStreak(0);
      setLongestStreak(0);
    } else {
      setCurrentStreak(learnStreak.current_learned_day_streak);
      setLongestStreak(learnStreak.longest_learned_day_streak);
    }
    const learnedCardsCountData = await fetchGetLearnedCardsCount();
    setLearnedCardsCount(learnedCardsCountData);
    const progress = await fetchGetWeeklyLearnTracker();
    const isLearnedList = [0, 0, 0, 0, 0, 0, 0];
    progress.forEach((progressObject) => {
      isLearnedList[progressObject.day_of_week - 1] = 1;
    });
    const topCurrentLearnStreakData = await fetchTopCurrentLearnStreaks();
    const topLongestLearnStreakData = await fetchTopLongestLearnStreaks();
    const topLearnedCardsCountData = await fetchTopLearnedCardsCount();
    setTopCurrentLearnStreak(topCurrentLearnStreakData);
    setTopLongestLearnStreak(topLongestLearnStreakData);
    setTopLearnedCardsCount(topLearnedCardsCountData);
    setWeeklyProgress(progress);
    setIsDayLearnedList(isLearnedList);
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  return (
    <Box>
      <Box className="progress-container">
        <Typography variant="h4">Tiến trình học</Typography>
        <Box className="weekly-progress">
          {/* {weeklyProgress.map((day, index) => (
          <Box key={index} className="day-progress">
            {day.learned ? <FaCheckCircle /> : <FaRegCircle />}
            <Typography variant="body2">Day {index + 1}</Typography>
          </Box>
        ))} */}

          {isDayLearnedList.map((isLearned, index) => (
            <Box key={index} className="day-progress">
              {isLearned ? <FaCheckCircle /> : <FaRegCircle />}
              <Typography variant="body2">{Weekdays[index]}</Typography>
            </Box>
          ))}
        </Box>
        <Box className="streak-info">
          <Typography variant="h6">Số từ đã học: {learnedCardsCount}</Typography>
          <Typography variant="h6">
            Chuỗi ngày học liên tục hiện tại: {currentStreak} ngày
          </Typography>
          <Typography variant="h6">
            Chuỗi ngày học liên tục dài nhất: {longestStreak} ngày
          </Typography>
        </Box>
        <TopTable
          data={topLearnedCardsCount}
          table_name={'Bảng xếp hạng tài khoản có số từ học nhiều nhất'}
          value_name={'Số từ học'}
        />
        <TopTable
          data={topCurrentLearnStreak}
          table_name={'Bảng xếp hạng tài khoản có chuỗi học hiện tại dài nhất'}
          value_name={'Chuỗi hiện tại'}
        />
        <TopTable
          data={topLongestLearnStreak}
          table_name={'Bảng xếp hạng tài khoản có chuỗi học dài nhất'}
          value_name={'Chuỗi dài nhất'}
        />
      </Box>
    </Box>
  );
};

export default Progress;
