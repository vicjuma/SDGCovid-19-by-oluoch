const steps = require('./steps');

const covid19ImpactEstimator = (data) => {
  const allSteps = ({ impact, severeImpact }) => {
    steps.currentInFectedEstimator({ data, impact, severeImpact });
    steps.calcInFectionBytime({ data, impact, severeImpact });

    steps.serioulsyInfectedCases({ impact, severeImpact });
    steps.getAvailablebedByDuaration({ data, impact, severeImpact });

    // challenge 3
    steps.findICUImpact({ impact, severeImpact });
    steps.caseForVentilation({ impact, severeImpact });
    steps.dollarsInflightImpact({ data, impact, severeImpact });

    return { data, impact, severeImpact };
  };

  return allSteps({
    data,
    impact: {},
    severeImpact: {}
  });
};

export default covid19ImpactEstimator;
