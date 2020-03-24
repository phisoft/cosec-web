const PouchDB = require('pouchdb/dist/pouchdb')
const PouchAuth = require('pouchdb-authentication/dist/pouchdb.authentication')
PouchDB.plugin(PouchAuth)
PouchDB.plugin(require('pouchdb-find').default)

export default function (store) {
  var params = {
    skip_setup: true,
    auth: {
      username: store.state.username,
      password: store.state.password
    }
  }
  if (!params.auth.password) {
    delete params.auth
  }
  const db = [window.location.origin, store.state.database].join('/')
  return new PouchDB(db, params)
}
