module.exports = {
  async sendAbsentSMS({ to, studentName, date }) {
    const message = `Sri Sakthi Nursing College Karur: ${studentName} was absent on ${date}.`;
    console.log(`SMS -> ${to}: ${message}`);
    return true;
  }
};