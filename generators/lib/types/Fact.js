const factObj = {
  identifier: 'string',
  type: 'string',
  isTrue: 'boolean',
};
const factCompositionObj = {
  ...factObj,
  compositionType: 'string',
  composedFacts: 'array',
};
const actionEventFactObj = {
  ...factObj,
  validity: 'string',
  withDelay: 'string',
  status: 'string',
  makesTrue: 'array',
};
const togetherWithObj = {
  ...factObj,
  withIPEntity: 'string',
};
const onlyRestrictionObj = {
  ...factObj,
  restriction: 'string',
};
const ipentityContextObj = {
  ...factObj,
  partOf: 'array',
};
const languageObj = {
  ...factObj,
  languages: 'array',
};
const lengthObj = {
  ...factObj,
  maxLength: 'string',
};
const materialFormatObj = {
  ...factObj,
  matchesFormatComplianceProfile: 'string',
  aspectRatio: 'string',
  audioFormat: 'string',
  format: 'string',
  maxBitrate: 'number',
  maxLines: 'number',
  minBitrate: 'number',
  minLines: 'number',
  videoFormat: 'string',
};
const runsObj = {
  ...factObj,
  numberOfRuns: 'number',
  validity: 'string',
  numberOfRepetitions: 'number',
};
const serviceChannelContextObj = {
  ...factObj,
  servicesAndChannels: 'array',
};
const spatialContextObj = {
  ...factObj,
  countries: 'array',
};
const temporalContextObj = {
  ...factObj,
  afterDate: 'string',
  beforeDate: 'string',
};
const userTimeAccessObj = {
  ...factObj,
  restriction: 'string',
  validity: 'string',
};

// personal data handling
const personalDataObj = {
  ...factObj,
  restriction: 'string',
  hasDataController: 'string',
  hasDataSubject: 'string',
  hasLegalBasis: 'array',
  hasPersonalData: 'array',
  hasPersonalDataHandling: 'array',
  hasProcessing: 'array',
  hasPurpose: 'array',
  hasRecipient: 'array',
  hasRight: 'array',
  hasRisk: 'array',
  hasTechnicalOrganisationalMeasure: 'array',
};
const consentObj = {
  ...personalDataObj,
  hasConsentNotice: 'string',
  hasExpiry: 'string',
  hasExpiryCondition: 'string',
  hasExpiryTime: 'string',
  hasProvisionBy: 'string',
  hasProvisionByJustification: 'string',
  hasProvisionMethod: 'string',
  hasProvisionTime: 'string',
  hasWithdrawalBy: 'string',
  hasWithdrawalByJustification: 'string',
  hasWithdrawalMethod: 'string',
  hasWithdrawalTime: 'string',
  isExplicit: 'boolean',
};

module.exports = {
  factObj,
  factCompositionObj,
  actionEventFactObj,
  togetherWithObj,
  onlyRestrictionObj,
  ipentityContextObj,
  languageObj,
  lengthObj,
  materialFormatObj,
  runsObj,
  serviceChannelContextObj,
  spatialContextObj,
  temporalContextObj,
  userTimeAccessObj,
  personalDataObj,
  consentObj,
};
