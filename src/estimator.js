const covid19ImpactEstimator = (data) => {
  const conversion = (periodType, period) => {
    let days;
    if (periodType === 'days') {
      days = period;
    } else if (periodType === 'weeks') {
      days = period * 7;
    } else if (periodType === 'months') {
      days = period * 30;
    }
    return days;
  };
  return {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: (data.reportedCases * 10)
      * (2 ** (conversion(data.periodType, data.timeToElapse) / 3))
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: (data.reportedCases * 10)
      * (2 ** (conversion(data.periodType, data.timeToElapse) / 3))
    }
  };
};
export default covid19ImpactEstimator;
