import React, { useEffect, useState } from 'react';
import { fetchGetLearnStreak } from '../services/AccountService';
import { FaBolt } from 'react-icons/fa';
import '../assets/css/Streak.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Streak = () => {
  const navigate = useNavigate();
  const [currentStreak, setCurrentStreak] = useState();

  const fetchStreak = async () => {
    const LearnStreak = await fetchGetLearnStreak();
    if (LearnStreak === null) {
      setCurrentStreak(0);
    } else {
      setCurrentStreak(LearnStreak.current_learned_day_streak);
    }
  };

  useEffect(() => {
    fetchStreak();
  }, []);

  const handleClick = () => {
    navigate('/tracker');
  };
  return (
    <Button
      className="streak"
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2rem',
        color: '#f39c12',
        border: '1px solid #f39c12',
        borderRadius: '5px',
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#f39c12',
          color: '#fff',
        },
      }}
    >
      <FaBolt />
      <span>{currentStreak}</span>
    </Button>
  );
};

export default Streak;
