import { getCookie } from 'tiny-cookie'

export default {
  config: {
    host: 'http://127.0.0.1:8080', // https://sls.sabahsociety.org',
    acHost: 'https://ac.sabahlawsociety.org',
    pwaHost: 'https://app.sabahlawsociety.org'
  },

  state: {
    toolbarTitle: 'Sabah Law Society',
    auth: getCookie('auth') || false,
    roles: getCookie('roles') || [null],
    username: getCookie('username') || null,
    password: getCookie('password') || null,
    database: getCookie('database') || 'sabahlawsociety-test',
    member: JSON.parse(getCookie('member')) || {}
  },
  mailchimp: {
    apiUrl: `${window.location.origin}/3.0`,
    apiKey: '979e723beded9bad0dc844dd27fec9b3-us4' // 3d18c6d82c83523616fcc9521d6dd6d6-us5
  }
}
