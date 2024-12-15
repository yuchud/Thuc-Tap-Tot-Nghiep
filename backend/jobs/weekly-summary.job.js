const cron = require('node-cron');
const notificationService = require('../services/notification.service');
const accountService = require('../services/account.service');
const WeeklyLearnTrackerModel = require('../models/weekly-learn-tracker.model');
const LearnStreakModel = require('../models/learn-streak.model');
const { formatDate } = require('../utils/date.util');

const weeklySummaryJob = {
  sendWeeklySummary: async () => {
    try {
      const currentDate = new Date();
      // console.log('Sending weekly summary at:', currentDate);
      const accountsData = await accountService.getAllAccounts((limit = 0));
      const accounts = await accountsData.accounts;
      if (!accounts) {
        return;
      }
      for (const account of accounts) {
        const weeklyLearnTracker = await WeeklyLearnTrackerModel.findAll({
          where: { account_id: account.id },
        });
        if (!weeklyLearnTracker || weeklyLearnTracker.length === 0) {
          continue;
        }

        const daysLearnedInWeek = weeklyLearnTracker.length;
        const learnStreak = await LearnStreakModel.findOne({
          where: { account_id: account.id },
        });
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - dayOfWeek + 1); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
        const currentStreak = learnStreak ? learnStreak.current_learned_day_streak : 0;
        const longestStreak = learnStreak ? learnStreak.longest_learned_day_streak : 0;
        const message = `Từ ngày ${formatDate(startOfWeek)} đến ngày ${formatDate(
          endOfWeek
        )}, Bạn đã học ${daysLearnedInWeek} ngày trong tuần này. \nChuỗi học hiện tại của bạn là ${currentStreak} ngày. \nChuỗi học dài nhất của bạn là ${longestStreak} ngày.`;
        await notificationService.sendNotificationToAccounts(
          null, // sender_id (null for system notifications)
          [account.id], // recipient_ids
          'Báo cáo hàng tuần', // title
          message
        );
      }

      // Clear the weekly learn tracker table
      await WeeklyLearnTrackerModel.destroy({ where: {} });

      console.log('Weekly summary sent and weekly tracker cleared.');
    } catch (error) {
      console.error('Error in weekly summary job:', error);
    }
  },
};

// Schedule the job to run every Sunday at 11:59 PM
cron.schedule('59 23 * * 0', weeklySummaryJob.sendWeeklySummary);

// Test the job by running it every 10s
// cron.schedule('*/30 * * * * *', weeklySummaryJob.sendWeeklySummary);
module.exports = weeklySummaryJob;
