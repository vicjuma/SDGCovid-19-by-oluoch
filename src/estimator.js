const covid19ImpactEstimator = (data) => {
  const impact = () => {
    if (data.periodType === 'days') {
      return (Math.trunc((data.timeToElapse * 1) / 3));
    }
    if (data.periodType === 'weeks') {
      return (Math.trunc((data.timeToElapse * 7) / 3));
    }
    if (data.periodType === 'months') {
      return (Math.trunc((data.timeToElapse * 30) / 3));
    }
    return 0;
  };
  return {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: (data.reportedCases * 10) * (2 ** (impact())),
      severeCasesByRequestedTime: (data.reportedCases * 10) * (2 ** (impact())) * 0.15,
      hospitalBedsByRequestedTime: (data.totalHospitalBeds * 0.35)
      - ((data.reportedCases * 10) * (2 ** (impact())) * 0.15)
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: (data.reportedCases * 50) * (2 ** (impact())),
      severeCasesByRequestedTime: (data.reportedCases * 50) * (2 ** (impact())) * 0.15,
      hospitalBedsByRequestedTime: (data.totalHospitalBeds * 0.35)
      - ((data.reportedCases * 50) * Math.trunc(2 ** (impact())) * 0.15)
    }
  };
};

export default covid19ImpactEstimator;
