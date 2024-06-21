import React from "react";

export default (input) => {
  let output = {};

  let permitivityOfFreeSpace = 8.85e-12;
  let boltzmannConstant = 1.38064852e-23;
  let electronCharge = 1.602176634e-19;
  let avagadroNumber = 6.02214076e23;
  let faradayConstant = electronCharge * avagadroNumber;
  let gasConstant = boltzmannConstant * avagadroNumber;
  let pi = Math.PI;
  let siliconDensity = 2330;
  let siliconSpecificHeatCapacity = 710;
  let siliconDioxideDensity = 2270;
  let siliconDioxideSpecificHeatCapacity = 730;
  let titaniumDensity = 4520;
  let titaniumSpecificHeatCapacity = 540;
  let aluminaDensity = 3965;
  let aluminaSpecificHeatCapacity = 753;
  let aluminumDensity = 2710;
  let aluminumSpecificHeatCapacity = 887;
  let ironDensity = 7874;
  let ironSpecificHeatCapacity = 462;
  let CNTDensity = 1400;
  let CNTSpecificHeatCapacity = 500;
  let dielectricDensity = 9680;
  let dielectricSpecificHeatCapacity = 120;
  // functionalization molecule
  let areaOfMoleculeOnCNTSurface = Math.pow(input["radiusOfMolecule"], 2) * pi;
  let moleculeAreaWithGap = Math.pow(
    input["radiusOfMolecule"] * 2 + input["gapBetweenMolecules"],
    2
  );
  let volumeOfMolecule =
    Math.pow(input["radiusOfMolecule"], 2) * pi * input["lengthOfMolecule"];
  let moleculeLength = input["lengthOfMolecule"];
  output["areaOfMoleculeOnCNTSurface"] = areaOfMoleculeOnCNTSurface;
  output["moleculeAreaWithGap"] = moleculeAreaWithGap;
  output["volumeOfMolecule"] = volumeOfMolecule;
  // analyte molecule
  let areaOfMoleculeOnCNTSurfaceAnalyte =
    Math.pow(input["radiusOfMoleculeAnalyte"], 2) * pi;
  let moleculeAreaWithGapAnalyte = Math.pow(
    input["radiusOfMoleculeAnalyte"] * 2 + input["gapBetweenMoleculeAnalyte"],
    2
  );

  let volumeOfMoleculeAnalyte =
    Math.pow(input["radiusOfMoleculeAnalyte"], 2) *
    pi *
    input["lengthOfMoleculeAnalyte"];
  let moleculeLengthAnalyte = input["lengthOfMoleculeAnalyte"];
  output["areaOfMoleculeOnCNTSurfaceAnalyte"] =
    areaOfMoleculeOnCNTSurfaceAnalyte;

  output["moleculeAreaWithGapAnalyte"] = moleculeAreaWithGapAnalyte;
  output["volumeOfMoleculeAnalyte"] = volumeOfMoleculeAnalyte;

  // 1 nanostructure with 1 CNTs
  console.log(input);
  let CNTRadius = input["radiusOfCNTs"];
  let CNTBaseArea = Math.pow(CNTRadius, 2) * pi;
  console.log(CNTBaseArea);
  console.log("CNT base area");
  let CNTLength = input["lengthOfCNTs"];
  let surfaceAreaOneCNT = CNTLength * CNTRadius * 2 * pi + CNTBaseArea;
  let areaOneCNTAndGap = Math.pow(2 * CNTRadius + input["gapBetweenCNTs"], 2);

  let nanostructureLength = input["lengthOfBase"];
  let nanostructureWidth = input["widthOfBase"];
  let nanostructureBaseArea = nanostructureLength * nanostructureWidth;
  let numberOfCNTsInOneNanostructure = nanostructureBaseArea / areaOneCNTAndGap;
  let surfaceAreaOneNanostructure =
    numberOfCNTsInOneNanostructure * surfaceAreaOneCNT;
  output["surfaceAreaOneCNT"] = surfaceAreaOneCNT;
  output["CNTBaseArea"] = CNTBaseArea;
  output["areaOneCNTAndGap"] = areaOneCNTAndGap;
  output["nanostructureBaseArea"] = nanostructureBaseArea;
  output["numberOfCNTsInOneNanostructure"] = numberOfCNTsInOneNanostructure;
  output["surfaceAreaOneNanostructure"] = surfaceAreaOneNanostructure;
  //chip with nanostructures
  let numberOfNanostructurePairsOnChipNum =
    input["lengthOfChip"] * input["widthOfChip"];
  let numberOfNanostructurePairsOnChipDen =
    nanostructureBaseArea * 2 +
    nanostructureLength * input["gapBetweenNanostructures"];
  let numberOfNanostructurePairsOnChip =
    numberOfNanostructurePairsOnChipNum / numberOfNanostructurePairsOnChipDen;
  let areaBetweenNanostructures =
    input["gapBetweenNanostructures"] * nanostructureLength;
  output["numberOfNanostructurePairsOnChip"] = numberOfNanostructurePairsOnChip;

  output["areaBetweenNanostructures"] = areaBetweenNanostructures;
  // NS capacitance of analyte molecule
  let capacitanceFunctionalAnalytePerUnitArea =
    (input["dielectricOfMoleculeAnalyte"] * permitivityOfFreeSpace) /
    moleculeLengthAnalyte;
  let capacitancePerCNTAnalyte =
    capacitanceFunctionalAnalytePerUnitArea * surfaceAreaOneCNT;
  let capacitanceFunctionalAnalytePerNanostructure1 =
    capacitancePerCNTAnalyte * numberOfCNTsInOneNanostructure;
  let capacitanceFunctionalAnalytePerNanostructure2 =
    capacitanceFunctionalAnalytePerUnitArea * surfaceAreaOneCNT;
  output["capacitanceFunctionalAnalytePerUnitArea"] =
    capacitanceFunctionalAnalytePerUnitArea;

  output["capacitancePerCNTAnalyte"] = capacitancePerCNTAnalyte;
  output["capacitanceFunctionalAnalytePerNanostructure1"] =
    capacitanceFunctionalAnalytePerNanostructure1;

  output["capacitanceFunctionalAnalytePerNanostructure2"] =
    capacitanceFunctionalAnalytePerNanostructure2;

  // NS Cpacitance of Functionalized Molecule
  let capacitanceFunctionalPerUnitArea =
    (input["dielectricOfMolecule"] * permitivityOfFreeSpace) / moleculeLength;
  let capacitancePerCNT =
    capacitanceFunctionalAnalytePerUnitArea * surfaceAreaOneCNT;
  let capacitanceFunctionalPerNanostructure1 =
    capacitancePerCNT * numberOfCNTsInOneNanostructure;
  let capacitanceFunctionalPerNanostructure2 =
    capacitanceFunctionalPerUnitArea * surfaceAreaOneCNT;
  output["capacitanceFunctionalPerUnitArea"] = capacitanceFunctionalPerUnitArea;

  output["capacitancePerCNT"] = capacitancePerCNT;
  output["capacitanceFunctionalPerNanostructure1"] =
    capacitanceFunctionalPerNanostructure1;

  output["capacitanceFunctionalPerNanostructure2"] =
    capacitanceFunctionalPerNanostructure2;

  // functionalized NS
  let numberOfMoleculesOnOneCNTFunctionalized =
    surfaceAreaOneCNT / moleculeAreaWithGap;
  let totalFunctionalizedMoleculesOnNanostructure =
    numberOfMoleculesOnOneCNTFunctionalized * numberOfCNTsInOneNanostructure;
  let concentrationOfFunctionalizedMoleculesOnOneNanostructureMolesPerMeterCubed =
    totalFunctionalizedMoleculesOnNanostructure / avagadroNumber;
  let concentrationOfFunctionalizedMoleculesOnOneNanostructureMolarity =
    concentrationOfFunctionalizedMoleculesOnOneNanostructureMolesPerMeterCubed /
    1000;
  output["numberOfMoleculesOnOneCNTFunctionalized"] =
    numberOfMoleculesOnOneCNTFunctionalized;

  output["totalFunctionalizedMoleculesOnNanostructure"] =
    totalFunctionalizedMoleculesOnNanostructure;

  output[
    "concentrationOfFunctionalizedMoleculesOnOneNanostructureMolesPerMeterCubed"
  ] = concentrationOfFunctionalizedMoleculesOnOneNanostructureMolesPerMeterCubed;

  output["concentrationOfFunctionalizedMoleculesOnOneNanostructureMolarity"] =
    concentrationOfFunctionalizedMoleculesOnOneNanostructureMolarity;

  // CAP
  let capacitanceOfOnePairNanostructure =
    (permitivityOfFreeSpace *
      input["relativePermittivity"] *
      surfaceAreaOneNanostructure) /
    input["gapBetweenNanostructures"];
  let impedanceAtFrequency =
    1 / (input["frequency"] * 2 * pi * capacitanceOfOnePairNanostructure);
  let energyNanostructure =
    Math.pow(input["voltage"], 2) * 0.5 * capacitanceOfOnePairNanostructure;
  let energy = energyNanostructure;
  let chipEnergy = numberOfNanostructurePairsOnChip * energyNanostructure;
  let power = Math.pow(input["voltage"], 2) / impedanceAtFrequency;
  let chipPower = power * numberOfNanostructurePairsOnChip;
  let chipImpedance = impedanceAtFrequency * numberOfNanostructurePairsOnChip;
  let chipCapacitance =
    numberOfNanostructurePairsOnChip * capacitanceOfOnePairNanostructure;
  output["capacitanceOfOnePairNanostructure"] =
    capacitanceOfOnePairNanostructure;
  output["impedanceAtFrequency"] = impedanceAtFrequency;
  output["energyNanostructure"] = energyNanostructure;
  output["chipEnergy"] = chipEnergy;
  output["power"] = power;
  output["chipPower"] = chipPower;
  output["chipImpedance"] = capacitancePerCNT;
  output["chipCapacitance"] = chipCapacitance;
  // EDL Cap
  let boltzmannTemp = boltzmannConstant * input["temperatureOfSolvent"];
  let concentrationOfStandardStateMolarity =
    input["concentrationOfStandardState"] / 1000;
  let EDLLength = Math.sqrt(
    (input["relativePermittivity"] * permitivityOfFreeSpace * boltzmannTemp) /
      (2 *
        avagadroNumber *
        input["concentrationOfStandardState"] *
        Math.pow(input["chargeOfIonSpecies"], 2) *
        Math.pow(electronCharge, 2))
  );

  let capacitanceEDLByLength =
    (input["relativePermittivity"] * permitivityOfFreeSpace) / EDLLength;
  let capacitanceEDLByLengthWithCoshFactor =
    capacitanceEDLByLength *
    Math.cosh(
      (input["zetaPotential"] * input["chargeOfIonSpecies"] * electronCharge) /
        (2 * boltzmannTemp)
    );

  let capacitanceEDLByArea =
    (capacitanceEDLByLengthWithCoshFactor / capacitanceEDLByLength) *
    Math.sqrt(
      (avagadroNumber *
        2 *
        input["concentrationOfStandardState"] *
        input["relativePermittivity"] *
        permitivityOfFreeSpace *
        Math.pow(input["chargeOfIonSpecies"], 2) *
        Math.pow(electronCharge, 2)) /
        boltzmannTemp
    );

  let capacitanceEDLPerCNT = capacitanceEDLByArea * surfaceAreaOneCNT;
  let capacitanceEDLPerNanostructure =
    capacitanceEDLPerCNT * numberOfCNTsInOneNanostructure;
  output["concentrationOfStandardStateMolarity"] =
    concentrationOfStandardStateMolarity;

  output["EDLLength"] = EDLLength;
  output["capacitanceEDLByLength"] = capacitanceEDLByLength;
  output["capacitanceEDLByLengthWithCoshFactor"] =
    capacitanceEDLByLengthWithCoshFactor;

  output["capacitanceEDLByArea"] = capacitanceEDLByArea;
  output["capacitanceEDLPerCNT"] = capacitanceEDLPerCNT;
  output["capacitanceEDLPerNanostructure"] = capacitanceEDLPerNanostructure;
  // echem signal
  let capacitanceOfEDLAndFunctionalizationAndAnalyte =
    1 /
    (1 / capacitanceEDLPerNanostructure +
      1 / capacitanceFunctionalPerNanostructure1 +
      1 / capacitanceFunctionalAnalytePerNanostructure1);
  let capacitanceOfEDLAndFunctionalization =
    1 /
    (1 / capacitanceEDLPerNanostructure +
      1 / capacitanceFunctionalPerNanostructure1);
  let changeInCapacitanceWithAnalyte =
    capacitanceOfEDLAndFunctionalizationAndAnalyte -
    capacitanceOfEDLAndFunctionalization;
  let impedanceOfEDLAndFunctionalizationAndAnalyte =
    1 /
    capacitanceOfEDLAndFunctionalizationAndAnalyte /
    2 /
    pi /
    input["frequency"];
  let totalSeriesImpedanceWithEDLAndFunctionalizationAndAnalyte =
    input["seriesResistanceOfSolution"] +
    impedanceOfEDLAndFunctionalizationAndAnalyte;
  let impedadanceOfEDLAndFunctionalization =
    1 / capacitanceOfEDLAndFunctionalization / 2 / pi / input["frequency"];
  let totalSeriesImpedanceWithEDLAndFunctionalization =
    impedadanceOfEDLAndFunctionalization + input["seriesResistanceOfSolution"];
  let changeInTotalSeriesImpedance =
    totalSeriesImpedanceWithEDLAndFunctionalization -
    totalSeriesImpedanceWithEDLAndFunctionalizationAndAnalyte;
  let totalImpedanceMagnitudeWithEDLandFunctionalization = Math.sqrt(
    Math.pow(impedadanceOfEDLAndFunctionalization, 2) +
      Math.pow(input["seriesResistanceOfSolution"], 2)
  );

  let totalImpedanceMagnitudeWithEDLandFunctionalizationAndAnalyte = Math.sqrt(
    Math.pow(impedanceOfEDLAndFunctionalizationAndAnalyte, 2) +
      Math.pow(input["seriesResistanceOfSolution"], 2)
  );

  let maxCurrentWithSolventAndEDLAndFunctionalization =
    input["zetaPotential"] / totalImpedanceMagnitudeWithEDLandFunctionalization;
  let maxCurrentWithSolventAndEDLAndFunctionalizationAndAnalyte =
    input["zetaPotential"] /
    totalImpedanceMagnitudeWithEDLandFunctionalizationAndAnalyte;
  let changeInMaxCurrent =
    maxCurrentWithSolventAndEDLAndFunctionalizationAndAnalyte -
    maxCurrentWithSolventAndEDLAndFunctionalization;
  let resistanceForMaxCurrentEDLAndFunctionalizationAndAnalyte =
    input["maxVOut"] /
    maxCurrentWithSolventAndEDLAndFunctionalizationAndAnalyte;
  let resistanceForMaxCurrentEDLAndFunctionalization =
    input["maxVOut"] / maxCurrentWithSolventAndEDLAndFunctionalization;
  output["capacitanceOfEDLAndFunctionalizationAndAnalyte"] =
    capacitanceOfEDLAndFunctionalizationAndAnalyte;

  output["capacitanceOfEDLAndFunctionalization"] =
    capacitanceOfEDLAndFunctionalization;

  output["changeInCapacitanceWithAnalyte"] = changeInCapacitanceWithAnalyte;
  output["impedanceOfEDLAndFunctionalizationAndAnalyte"] =
    impedanceOfEDLAndFunctionalizationAndAnalyte;

  output["totalSeriesImpedanceWithEDLAndFunctionalizationAndAnalyte"] =
    totalSeriesImpedanceWithEDLAndFunctionalizationAndAnalyte;

  output["impedadanceOfEDLAndFunctionalization"] =
    impedadanceOfEDLAndFunctionalization;

  output["totalSeriesImpedanceWithEDLAndFunctionalization"] =
    totalSeriesImpedanceWithEDLAndFunctionalization;

  output["changeInTotalSeriesImpedance"] = changeInTotalSeriesImpedance;
  output["totalImpedanceMagnitudeWithEDLandFunctionalization"] =
    totalImpedanceMagnitudeWithEDLandFunctionalization;

  output["totalImpedanceMagnitudeWithEDLandFunctionalizationAndAnalyte"] =
    totalImpedanceMagnitudeWithEDLandFunctionalizationAndAnalyte;

  output["maxCurrentWithSolventAndEDLAndFunctionalization"] =
    maxCurrentWithSolventAndEDLAndFunctionalization;

  output["maxCurrentWithSolventAndEDLAndFunctionalizationAndAnalyte"] =
    maxCurrentWithSolventAndEDLAndFunctionalizationAndAnalyte;

  output["changeInMaxCurrent"] = changeInMaxCurrent;
  output["resistanceForMaxCurrentEDLAndFunctionalizationAndAnalyte"] =
    resistanceForMaxCurrentEDLAndFunctionalizationAndAnalyte;

  output["resistanceForMaxCurrentEDLAndFunctionalization"] =
    resistanceForMaxCurrentEDLAndFunctionalization;

  // si material properties
  let siliconVolume = input["siliconThickness"] * nanostructureBaseArea;
  let siliconMass = siliconVolume * siliconDensity;
  let siliconMassTimesHeatCapacity = siliconMass * siliconSpecificHeatCapacity;
  let siliconTemperatureChange = energy / siliconMassTimesHeatCapacity;
  output["siliconVolume"] = siliconVolume;
  output["siliconMass"] = siliconMass;
  output["siliconMassTimesHeatCapacity"] = siliconMassTimesHeatCapacity;
  output["siliconTemperatureChange"] = siliconTemperatureChange;
  // sio2 1 material properties
  let siliconDioxideVolume =
    input["siliconDioxideThickness"] * nanostructureBaseArea;
  let siliconDioxideMass = siliconDioxideVolume * siliconDioxideDensity;
  let siliconDioxideMassTimesHeatCapacity =
    siliconDioxideMass * siliconDioxideSpecificHeatCapacity;
  let siliconDioxideTemperatureChange =
    energy / siliconDioxideMassTimesHeatCapacity;
  output["siliconDioxideVolume"] = siliconDioxideVolume;
  output["siliconDioxideMass"] = siliconDioxideMass;
  output["siliconDioxideMassTimesHeatCapacity"] =
    siliconDioxideMassTimesHeatCapacity;

  output["siliconDioxideTemperatureChange"] = siliconDioxideTemperatureChange;
  // sio2 2 material properties
  let siliconDioxideVolume2 =
    input["siliconDioxideThickness2"] * nanostructureBaseArea;
  let siliconDioxideMass2 = siliconDioxideVolume2 * siliconDioxideDensity;
  let siliconDioxideMassTimesHeatCapacity2 =
    siliconDioxideMass2 * siliconDioxideSpecificHeatCapacity;
  let siliconDioxideTemperatureChange2 =
    energy / siliconDioxideMassTimesHeatCapacity2;
  output["siliconDioxideVolume2"] = siliconDioxideVolume2;
  output["siliconDioxideMass2"] = siliconDioxideMass2;
  output["siliconDioxideMassTimesHeatCapacity2"] =
    siliconDioxideMassTimesHeatCapacity2;

  output["siliconDioxideTemperatureChange2"] = siliconDioxideTemperatureChange2;

  // Ti material properties
  let titaniumVolume = input["titaniumThickness"] * nanostructureBaseArea;
  let titaniumMass = titaniumVolume * titaniumDensity;
  let titaniumMassTimesHeatCapacity =
    titaniumMass * titaniumSpecificHeatCapacity;
  let titaniumTemperatureChange = energy / titaniumMassTimesHeatCapacity;
  output["titaniumVolume"] = titaniumVolume;
  output["titaniumMass"] = titaniumMass;
  output["titaniumMassTimesHeatCapacity"] = titaniumMassTimesHeatCapacity;
  output["titaniumTemperatureChange"] = titaniumTemperatureChange;
  // alumina material properties
  let aluminaVolume = input["aluminaThickness"] * nanostructureBaseArea;
  let aluminaMass = aluminaVolume * aluminaDensity;
  let aluminaMassTimesHeatCapacity = aluminaMass * aluminaSpecificHeatCapacity;
  let aluminaTemperatureChange = energy / aluminaMassTimesHeatCapacity;
  output["aluminaVolume"] = aluminaVolume;
  output["aluminaMass"] = aluminaMass;
  output["aluminaMassTimesHeatCapacity"] = aluminaMassTimesHeatCapacity;
  output["aluminaTemperatureChange"] = aluminaTemperatureChange;
  // aluminum material properties
  let aluminumVolume = input["aluminumThickness"] * nanostructureBaseArea;
  let aluminumMass = aluminumVolume * aluminumDensity;
  let aluminumMassTimesHeatCapacity =
    aluminumMass * aluminumSpecificHeatCapacity;
  let aluminumTemperatureChange = energy / aluminumMassTimesHeatCapacity;
  output["aluminumVolume"] = aluminumVolume;
  output["aluminumMass"] = aluminumMass;
  output["aluminumMassTimesHeatCapacity"] = aluminumMassTimesHeatCapacity;
  output["aluminumTemperatureChange"] = aluminumTemperatureChange;
  // iron material properties
  let ironVolume = input["ironThickness"] * nanostructureBaseArea;
  let ironMass = ironVolume * ironDensity;
  let ironMassTimesHeatCapacity = ironMass * ironSpecificHeatCapacity;
  let ironTemperatureChange = energy / ironMassTimesHeatCapacity;
  output["ironVolume"] = ironVolume;
  output["ironMass"] = ironMass;
  output["ironMassTimesHeatCapacity"] = ironMassTimesHeatCapacity;
  output["ironTemperatureChange"] = ironTemperatureChange;
  // CNT material properties
  let CNTVolume = input["lengthOfCNTs"] * nanostructureBaseArea;
  let CNTMass = CNTVolume * CNTDensity;
  let CNTMassTimesHeatCapacity = CNTMass * CNTSpecificHeatCapacity;
  let CNTTemperatureChange = energy / CNTMassTimesHeatCapacity;
  output["CNTVolume"] = CNTVolume;
  output["CNTMass"] = CNTMass;
  output["CNTMassTimesHeatCapacity"] = CNTMassTimesHeatCapacity;
  output["CNTTemperatureChange"] = CNTTemperatureChange;
  // Dielectric material properties
  let dielectricVolume =
    (input["gapBetweenNanostructures"] / 2) * nanostructureBaseArea;
  let dielectricMass = dielectricVolume * dielectricDensity;
  let dielectricMassTimesHeatCapacity =
    dielectricMass * dielectricSpecificHeatCapacity;
  let dielectricTemperatureChange = energy / dielectricMassTimesHeatCapacity;
  output["dielectricVolume"] = dielectricVolume;
  output["dielectricMass"] = dielectricMass;
  output["dielectricMassTimesHeatCapacity"] = dielectricMassTimesHeatCapacity;
  output["dielectricTemperatureChange"] = dielectricTemperatureChange;
  // Si Gap Between Nanostructure Materials
  let siliconGapVolume = input["siliconThickness"] * nanostructureBaseArea;
  let siliconGapThickness = input["siliconThickness"];
  let siliconGapMass = siliconGapVolume * siliconDensity;
  let siliconGapMassTimesHeatCapacity =
    siliconGapMass * siliconSpecificHeatCapacity;
  let siliconGapTemperatureChange = energy / siliconGapMassTimesHeatCapacity;
  output["siliconGapVolume"] = siliconGapVolume;
  output["siliconGapThickness"] = siliconGapThickness;
  output["siliconGapMass"] = siliconGapMass;
  output["siliconGapMassTimesHeatCapacity"] = siliconGapMassTimesHeatCapacity;
  output["siliconGapTemperatureChange"] = siliconGapTemperatureChange;
  // SiO2 Gap Between Nanostructure Materials
  let siliconDioxideGapVolume =
    (input["titaniumThickness"] +
      input["siliconDioxideThickness"] +
      input["siliconDioxideThickness2"]) *
    nanostructureBaseArea;
  let siliconDioxideGapThickness =
    input["titaniumThickness"] +
    input["siliconDioxideThickness"] +
    input["siliconDioxideThickness2"];
  let siliconDioxideGapMass = siliconDioxideGapVolume * siliconDioxideDensity;
  let siliconDioxideGapMassTimesHeatCapacity =
    siliconDioxideGapMass * siliconDioxideSpecificHeatCapacity;
  let siliconDioxideGapTemperatureChange =
    energy / siliconDioxideGapMassTimesHeatCapacity;
  output["siliconDioxideGapVolume"] = siliconDioxideGapVolume;
  output["siliconDioxideGapThickness"] = siliconDioxideGapThickness;
  output["siliconDioxideGapMass"] = siliconDioxideGapMass;
  output["siliconDioxideGapMassTimesHeatCapacity"] =
    siliconDioxideGapMassTimesHeatCapacity;

  output["siliconDioxideGapTemperatureChange"] =
    siliconDioxideGapTemperatureChange;

  // Dielectric Gap Between Nanostructure Materials
  let dielectricGapVolume =
    (input["gapBetweenNanostructures"] / 2 +
      input["lengthOfCNTs"] +
      input["ironThickness"] +
      input["aluminumThickness"] +
      input["aluminaThickness"]) *
    nanostructureBaseArea;
  let dielectricGapThickness =
    input["gapBetweenNanostructures"] / 2 +
    input["lengthOfCNTs"] +
    input["ironThickness"] +
    input["aluminumThickness"] +
    input["aluminaThickness"];
  let dielectricGapMass = dielectricGapVolume * dielectricDensity;
  let dielectricGapMassTimesHeatCapacity =
    dielectricGapMass * dielectricSpecificHeatCapacity;
  let dielectricGapTemperatureChange =
    energy / dielectricGapMassTimesHeatCapacity;
  output["dielectricGapVolume"] = dielectricGapVolume;
  output["dielectricGapThickness"] = dielectricGapThickness;
  output["dielectricGapMass"] = dielectricGapMass;
  output["dielectricGapMassTimesHeatCapacity"] =
    dielectricGapMassTimesHeatCapacity;

  output["dielectricGapTemperatureChange"] = dielectricGapTemperatureChange;
  // temperature change mass
  let totalMassTimesHeatCapacity =
    dielectricMassTimesHeatCapacity +
    CNTMassTimesHeatCapacity +
    ironMassTimesHeatCapacity +
    aluminumMassTimesHeatCapacity +
    aluminaMassTimesHeatCapacity +
    titaniumMassTimesHeatCapacity +
    siliconDioxideMassTimesHeatCapacity2 +
    siliconDioxideMassTimesHeatCapacity +
    siliconMassTimesHeatCapacity;
  let powerLoss = chipImpedance * Math.pow(input["chargingCurrent"], 2);
  let chargingTime =
    (input["chargingVoltage"] * chipImpedance) / input["chargingCurrent"];
  let energyLoss = powerLoss * chargingTime;
  let totalTemperatureChange = energyLoss / totalMassTimesHeatCapacity;
  output["powerLoss"] = powerLoss;
  output["chargingTime"] = chargingTime;
  output["energyLoss"] = energyLoss;
  output["totalTemperatureChange"] = totalTemperatureChange;
  // mass and volume of NS pair
  let massForOneNanostructure =
    dielectricMass +
    CNTMass +
    ironMass +
    aluminumMass +
    aluminaMass +
    titaniumMass +
    siliconDioxideMass +
    siliconDioxideMass2 +
    siliconMass;
  let massForTwoNanostructure = massForOneNanostructure * 2;
  let massGap = dielectricGapMass + siliconDioxideGapMass + siliconGapMass;
  let massNanostructurePairWithGap = massGap + massForTwoNanostructure;
  let volumeForOneNanostructure =
    dielectricVolume +
    CNTVolume +
    ironVolume +
    aluminumVolume +
    aluminaVolume +
    titaniumVolume +
    siliconDioxideVolume +
    siliconDioxideVolume2 +
    siliconVolume;
  let volumeForTwoNanostructure = volumeForOneNanostructure * 2;
  let volumeGap =
    dielectricGapVolume + siliconDioxideGapVolume + siliconGapVolume;
  let volumeNanostructurePairWithGap = volumeGap + volumeForTwoNanostructure;
  let massChip =
    massNanostructurePairWithGap * numberOfNanostructurePairsOnChip;
  let volumeChip =
    volumeNanostructurePairWithGap * numberOfNanostructurePairsOnChip;
  output["massForOneNanostructure"] = massForOneNanostructure;
  output["massForTwoNanostructure"] = massForTwoNanostructure;
  output["massGap"] = massGap;
  output["massNanostructurePairWithGap"] = massNanostructurePairWithGap;
  output["volumeForOneNanostructure"] = volumeForOneNanostructure;
  output["volumeForTwoNanostructure"] = volumeForTwoNanostructure;
  output["volumeGap"] = volumeGap;
  output["volumeNanostructurePairWithGap"] = volumeNanostructurePairWithGap;
  output["massChip"] = massChip;
  output["volumeChip"] = volumeChip;
  // cap design
  let energyDensityWattHoursPerMetersCubedDesigned =
    input["energyDensityWattHoursPerLiterDesigned"] * 1000;
  let energyPerNanostructureWithGapDesigned =
    energyDensityWattHoursPerMetersCubedDesigned *
    volumeNanostructurePairWithGap;
  let joulesInOneNanostructurePairWithGapDesigned =
    energyPerNanostructureWithGapDesigned * 3600;
  output["energyDensityWattHoursPerMetersCubedDesigned"] =
    energyDensityWattHoursPerMetersCubedDesigned;

  output["energyPerNanostructureWithGapDesigned"] =
    energyPerNanostructureWithGapDesigned;

  output["joulesInOneNanostructurePairWithGapDesigned"] =
    joulesInOneNanostructurePairWithGapDesigned;

  // chip energy
  let chipEnergyWattHour = chipEnergy / 3600;
  let nanostructurePairEnergyPerMass =
    energyNanostructure / massForTwoNanostructure;
  let nanostructurePairEnergyPerVolume =
    energyNanostructure / volumeForTwoNanostructure;
  let chipEnergyPerMass = chipEnergyWattHour / massChip;
  let chipEnergyWattHoursPerKilogram = chipEnergyPerMass;
  let chipEnergyPerVolume = chipEnergyWattHour / volumeChip;
  let chipEnergyWattHoursPerMetersCubed = chipEnergyPerVolume;
  let chipEnergyWattHoursPerLiter = chipEnergyWattHoursPerMetersCubed / 1000;
  output["chipEnergyWattHour"] = chipEnergyWattHour;
  output["nanostructurePairEnergyPerMass"] = nanostructurePairEnergyPerMass;
  output["nanostructurePairEnergyPerVolume"] = nanostructurePairEnergyPerVolume;

  output["chipEnergyPerMass"] = chipEnergyPerMass;
  output["chipEnergyWattHoursPerKilogram"] = chipEnergyWattHoursPerKilogram;
  output["chipEnergyPerVolume"] = chipEnergyPerVolume;
  output["chipEnergyWattHoursPerMetersCubed"] =
    chipEnergyWattHoursPerMetersCubed;

  output["chipEnergyWattHoursPerLiter"] = chipEnergyWattHoursPerLiter;

  console.log("experiment happened");
  console.log(output);

  return output;
};