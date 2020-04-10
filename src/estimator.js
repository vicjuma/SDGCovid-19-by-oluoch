const covid19ImpactEstimator = (data) => {
  const conversionFunc = (periodType) => {
    let days;
    switch (periodType) {
      case 'days':
        days = data.timeToElapse;
        break;
      case 'weeks':
        days = data.timeToElapse * 7;
        break;
      case 'months':
        days = data.timeToElapse * 30;
        break;
      default:
        days = data.timeToElapse;
    }
    return days;
  };
  return {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: (data.reportedCases * 10)
      * (2 ** (conversionFunc(data.periodType) / 3))
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: (data.reportedCases * 50)
      * (2 ** (conversionFunc(data.periodType) / 3))
    }
  };
};
export default covid19ImpactEstimator;
