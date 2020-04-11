const covid19ImpactEstimator = (data) => {
  const {
    periodType, timeToElapse, totalHospitalBeds, reportedCases, region
  } = data;

  const impact = () => {
    if (periodType === 'days') {
      return timeToElapse;
    }
    if (periodType === 'weeks') {
      return timeToElapse * 7;
    }
    if (periodType === 'months') {
      return timeToElapse * 30;
    }
    return 0;
  };

  const impactCurrentlyInfected = reportedCases * 10;
  const severeImpactCurrentlyInfected = reportedCases * 50;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected
  * (2 ** (Math.trunc(impact() / 3)));
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected
  * (2 ** (Math.trunc(impact() / 3)));
  const impactSevereCasesByRequestedTime = Math.trunc(impactInfectionsByRequestedTime * 0.15);
  const severeImpactSevereCasesByRequestedTime = Math.trunc(severeImpactInfectionsByRequestedTime
    * 0.15);
  return {
    data,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: Math.trunc((totalHospitalBeds * 0.35)
      - impactSevereCasesByRequestedTime),
      casesForICUByRequestedTime: Math.trunc(impactInfectionsByRequestedTime * 0.05),
      casesForVentilatorsByRequestedTime: Math.trunc(impactInfectionsByRequestedTime * 0.02),
      dollarsInFlight: Math.trunc((impactInfectionsByRequestedTime
      * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation) / impact())
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: Math.trunc((totalHospitalBeds * 0.35)
      - severeImpactSevereCasesByRequestedTime),
      casesForICUByRequestedTime: Math.trunc(severeImpactSevereCasesByRequestedTime * 0.05),
      casesForVentilatorsByRequestedTime: Math.trunc(impactInfectionsByRequestedTime * 0.02),
      dollarsInFlight: Math.trunc((severeImpactSevereCasesByRequestedTime
      * region.avgDailyIncomeInUSD * region.avgDailyIncomePopulation) / impact())
    }
  };
};

export default covid19ImpactEstimator;
