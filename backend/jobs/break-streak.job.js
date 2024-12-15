const cron = require('node-cron');
const LearnStreakModel = require('../models/learn-streak.model');
const WeeklyLearnTrackerModel = require('../models/weekly-learn-tracker.model');
const { getCurrentDayOfWeek } = require('../utils/date.util');
const accountService = require('../services/account.service');
const notificationService = require('../services/notification.service');
const breakStreakJob = {
  checkAndBreakStreak: async () => {
    try {
      const dayOfWeek = getCurrentDayOfWeek();
      const accountsData = await accountService.getAllAccounts((limit = 0));
      const accounts = await accountsData.accounts;

      if (!accounts) {
        return;
      }
      for (const account of accounts) {
        const isTodayLearned = await WeeklyLearnTrackerModel.findOne({
          where: {
            account_id: account.id,
            day_of_week: dayOfWeek,
          },
        });
        const learnStreak = await LearnStreakModel.findOne({
          where: { account_id: account.id },
        });

        if (!learnStreak) {
          return;
        }

        if (!isTodayLearned && learnStreak.current_learned_day_streak > 0) {
          await LearnStreakModel.update({ current_learned_day_streak: 0 }, { where: { account_id: account.id } });
          await notificationService.sendNotificationToAccounts(
            null,
            [account.id],
            'Chuỗi ngày học của bạn đã bị hủy',
            'Chuỗi ngày học liên tục của bạn đã bị hủy vì bạn không học hôm nay. Hãy bắt đầu lại từ ngày mai nhé!'
          );
        }
      }

      console.log('Streaks checked and updated.');
    } catch (error) {
      console.error('Error in break streak job:', error);
    }
  },
};

// Schedule the job to run every day at 11:59 PM
cron.schedule('59 23 * * *', breakStreakJob.checkAndBreakStreak);

// Schedule the job to test every minute
// cron.schedule('*/10 * * * * *', breakStreakJob.checkAndBreakStreak);

module.exports = breakStreakJob;
