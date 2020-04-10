const impact = (data) => {
  if (data.periodType === 'days') {
    return (Math.trunc(data.timeToElapse / 3));
  }
  if (data.periodType === 'weeks') {
    return (Math.trunc((data.timeToElapse * 7) / 3));
  }
  if (data.periodType === 'months') {
    return (Math.trunc((data.timeToElapse * 30) / 3));
  }
  return 0;
};
const covid19ImpactEstimator = (data) => ({
  data: {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  },
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: (data.reportedCases * 10) * (2 ** (impact(data)))
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: (data.reportedCases * 50) * (2 ** (impact(data)))
  }
});
export default covid19ImpactEstimator;
