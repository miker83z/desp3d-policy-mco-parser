const { addElement } = require('../../../generators/lib/AddElement');
const generators = require('../../../generators/');
const { addToObjectsSet, getType, parsed } = require('../Utils');
const lut = require('../../../lookup-tables/');
const { handleIPEntity } = require('./IPEntity');
const { handleParty } = require('./Party');
const { handleTextClause } = require('./TextClause');
const { handleFact } = require('./Fact');
const { handleAction } = require('./Action');

const handleMCODeonticExpression = (
  jsonLDGraph,
  mediaContractualObjects,
  classData,
  element
) => {
  if (parsed(mediaContractualObjects, element)) return;
  // generate a deontic object
  const deonticObj = generators.generateMCODeonticExpression(
    classData,
    element
  );
  // save the object
  addToObjectsSet(mediaContractualObjects, deonticObj.identifier, deonticObj);

  // update contract
  const referencedContract = mediaContractualObjects[deonticObj.issuedIn];
  addElement(
    { deontics: 'array' },
    referencedContract,
    'deontics',
    deonticObj.identifier
  );
  // update party issuer
  const partyEle = jsonLDGraph[deonticObj.issuer];
  const partyClassData = lut.AllClasses[getType(partyEle).toLowerCase()];
  handleParty(
    jsonLDGraph,
    mediaContractualObjects,
    partyClassData,
    partyEle,
    deonticObj.issuedIn
  );
  const referencedParty = mediaContractualObjects[deonticObj.issuer];
  addElement(
    { deonticsIssued: 'array' },
    referencedParty,
    'deonticsIssued',
    deonticObj.identifier
  );
  //generate action
  if (deonticObj.act !== undefined) {
    const actEle = jsonLDGraph[deonticObj.act];
    const actClassData = lut.AllClasses[getType(actEle).toLowerCase()];
    handleAction(
      jsonLDGraph,
      mediaContractualObjects,
      actClassData,
      actEle,
      deonticObj.issuedIn
    );
    // update from action
    const actionObj = mediaContractualObjects[actEle['@id']];
    addElement(
      { actedBySubject: 'string' },
      deonticObj,
      'actedBySubject',
      actionObj.actedBy
    );
    if (actionObj.actedOver !== undefined) {
      //TODO SERVICE
      actionObj.actedOver.forEach((ipentityId) => {
        addElement(
          { actObjects: 'array' },
          deonticObj,
          'actObjects',
          ipentityId
        );
        const ipentityEle = jsonLDGraph[ipentityId];
        const ipentityClassData =
          lut.AllClasses[getType(ipentityEle).toLowerCase()];
        handleIPEntity(
          jsonLDGraph,
          mediaContractualObjects,
          ipentityClassData,
          ipentityEle,
          deonticObj.issuedIn
        );
      });
    }
    if (actionObj.resultsIn !== undefined) {
      actionObj.resultsIn.forEach((ipentityId) => {
        addElement(
          { resultantObject: 'array' },
          deonticObj,
          'resultantObject',
          ipentityId
        );
        const ipentityEle = jsonLDGraph[ipentityId];
        const ipentityClassData =
          lut.AllClasses[getType(ipentityEle).toLowerCase()];
        handleIPEntity(
          jsonLDGraph,
          mediaContractualObjects,
          ipentityClassData,
          ipentityEle,
          deonticObj.issuedIn
        );
      });
    }
  }

  // traverse related elements
  if (deonticObj.textClauses !== undefined) {
    deonticObj.textClauses.forEach((textClauseId) => {
      const textClauseEle = jsonLDGraph[textClauseId];
      const textClauseClassData =
        lut.AllClasses[getType(textClauseEle).toLowerCase()];
      handleTextClause(
        jsonLDGraph,
        mediaContractualObjects,
        textClauseClassData,
        textClauseEle,
        deonticObj.issuedIn
      );
    });
  }
  if (deonticObj.constraints !== undefined) {
    deonticObj.constraints.forEach((factId) => {
      const factEle = jsonLDGraph[factId];
      const factClassData = lut.AllClasses[getType(factEle).toLowerCase()];
      handleFact(
        jsonLDGraph,
        mediaContractualObjects,
        factClassData,
        factEle,
        deonticObj.issuedIn
      );
    });
  }
};

module.exports = { handleMCODeonticExpression };
