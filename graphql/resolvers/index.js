const briefResolver = require('./briefs')
const brandResolver = require('./brands')
const docResolver = require('./docs')
const imageResolver = require('./images')

const rootResolver = {
  ...brandResolver,
  ...briefResolver,
  ...docResolver,
  ...imageResolver
}

module.exports = rootResolver