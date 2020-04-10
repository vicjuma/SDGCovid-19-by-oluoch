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
  data,
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
