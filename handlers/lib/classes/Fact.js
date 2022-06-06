const { addElement } = require('../../../generators/lib/AddElement');
const generators = require('../../../generators/');
const { addToObjectsSet, getType, parsed } = require('../Utils');
const lut = require('../../../lookup-tables/');
const { handleIPEntity } = require('./IPEntity');
const { handleParty } = require('./Party');
const { handleAction } = require('./Action');

const handleFact = (
  jsonLDGraph,
  mediaContractualObjects,
  classData,
  element,
  parentContractId
) => {
  if (parsed(mediaContractualObjects, element)) return;
  // generate a fact object
  const factObj = generators.generateFact(classData, element);
  // save the object
  addToObjectsSet(mediaContractualObjects, factObj.identifier, factObj);

  // update contract
  const referencedContract = mediaContractualObjects[parentContractId];
  addElement(
    { facts: 'array' },
    referencedContract,
    'facts',
    factObj.identifier
  );

  // traverse related elements
  if (factObj.composedFacts !== undefined) {
    factObj.composedFacts.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        parentContractId
      );
    });
  }
  if (factObj.makesTrue !== undefined) {
    // TODO EVENT
    factObj.makesTrue.forEach((actionId) => {
      const actEle = jsonLDGraph[actionId];
      const actClassData = lut.AllClasses[getType(actEle).toLowerCase()];
      handleAction(
        jsonLDGraph,
        mediaContractualObjects,
        actClassData,
        actEle,
        parentContractId
      );
    });
  }
  if (factObj.withIPEntity !== undefined) {
    const ipentityEle = jsonLDGraph[factObj.withIPEntity];
    const ipentityClassData =
      lut.AllClasses[getType(ipentityEle).toLowerCase()];
    handleIPEntity(
      jsonLDGraph,
      mediaContractualObjects,
      ipentityClassData,
      ipentityEle,
      parentContractId
    );
  }
  if (factObj.partOf !== undefined) {
    factObj.partOf.forEach((ipentityId) => {
      const ipentityEle = jsonLDGraph[ipentityId];
      const ipentityClassData =
        lut.AllClasses[getType(ipentityEle).toLowerCase()];
      handleIPEntity(
        jsonLDGraph,
        mediaContractualObjects,
        ipentityClassData,
        ipentityEle,
        parentContractId
      );
    });
  }
  // personal data
  if (factObj.hasDataController !== undefined) {
    const partyEle = jsonLDGraph[factObj.hasDataController];
    const partyClassData = lut.AllClasses[getType(partyEle).toLowerCase()];
    handleParty(
      jsonLDGraph,
      mediaContractualObjects,
      partyClassData,
      partyEle,
      parentContractId
    );
  }
  if (factObj.hasDataSubject !== undefined) {
    const partyEle = jsonLDGraph[factObj.hasDataSubject];
    const partyClassData = lut.AllClasses[getType(partyEle).toLowerCase()];
    handleParty(
      jsonLDGraph,
      mediaContractualObjects,
      partyClassData,
      partyEle,
      parentContractId
    );
  }
  if (factObj.hasLegalBasis !== undefined) {
    factObj.hasLegalBasis.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        parentContractId
      );
    });
  }
  if (factObj.hasPersonalData !== undefined) {
    factObj.hasPersonalData.forEach((ipentityId) => {
      const ipentityEle = jsonLDGraph[ipentityId];
      const ipentityClassData =
        lut.AllClasses[getType(ipentityEle).toLowerCase()];
      handleIPEntity(
        jsonLDGraph,
        mediaContractualObjects,
        ipentityClassData,
        ipentityEle,
        parentContractId
      );
    });
  }
  if (factObj.hasPersonalDataHandling !== undefined) {
    factObj.hasPersonalDataHandling.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        parentContractId
      );
    });
  }
  if (factObj.hasProcessing !== undefined) {
    factObj.hasProcessing.forEach((factId) => {
      const actionEle = jsonLDGraph[factId];
      const actionClassData = lut.AllClasses[getType(actionEle).toLowerCase()];
      handleAction(
        jsonLDGraph,
        mediaContractualObjects,
        actionClassData,
        actionEle,
        parentContractId
      );
    });
  }
  if (factObj.hasPurpose !== undefined) {
    factObj.hasPurpose.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        parentContractId
      );
    });
  }
  if (factObj.hasRecipient !== undefined) {
    factObj.hasRecipient.forEach((factId) => {
      const partyEle = jsonLDGraph[factId];
      const partyClassData = lut.AllClasses[getType(partyEle).toLowerCase()];
      handleParty(
        jsonLDGraph,
        mediaContractualObjects,
        partyClassData,
        partyEle,
        parentContractId
      );
    });
  }
  if (factObj.hasRight !== undefined) {
    factObj.hasRight.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        parentContractId
      );
    });
  }
  if (factObj.hasRisk !== undefined) {
    factObj.hasRisk.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        parentContractId
      );
    });
  }
  if (factObj.hasTechnicalOrganisationalMeasure !== undefined) {
    factObj.hasTechnicalOrganisationalMeasure.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        parentContractId
      );
    });
  }
};

module.exports = { handleFact };
