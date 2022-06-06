const AllClasses = require('./lib/AllClasses.json');
const Action = require('./lib/classes/Action.json');
const Contract = require('./lib/classes/Contract.json');
const Fact = require('./lib/classes/Fact.json');
const Interval = require('./lib/classes/Interval.json');
const IPEntity = require('./lib/classes/IPEntity.json');
const MCODeonticExpression = require('./lib/classes/MCODeonticExpression.json');
const Party = require('./lib/classes/Party.json');
const Service = require('./lib/classes/Service.json');
const TextClause = require('./lib/classes/TextClause.json');
const Timeline = require('./lib/classes/Timeline.json');
const Track = require('./lib/classes/Track.json');

const extraAll = require('./lib/extra/AllClasses.json');
const extraFact = require('./lib/extra/classes/Fact.json');

module.exports = {
  AllClasses: { ...AllClasses, ...extraAll },
  Action,
  Contract,
  Fact: { ...Fact, ...extraFact },
  Interval,
  IPEntity,
  MCODeonticExpression,
  Party,
  Service,
  TextClause,
  Timeline,
  Track,
};
