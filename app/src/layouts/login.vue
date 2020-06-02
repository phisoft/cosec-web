<template>
<div class="flex row full-height justify-center content-center q-px-md">
  <q-card class="login-container q-pa-xs no-shadow">
    <q-card-section>
      <img src="./../assets/banner0.jpg" width="200" />
      <div class="text-subtitle"> COSECRETARY </div>
    <q-form
      ref="form"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-xs q-mt-md"
    >
      <q-input
        v-model="username"
        label="New NRIC"
        outlined
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Required field']" >
       <template v-slot:append>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>

      <q-input
        v-model="password"
        label="Password"
        type="password"
        outlined
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Required field' ]" >
       <template v-slot:append>
          <q-icon name="fas fa-lock" />
        </template>
      </q-input>

      <q-card-actions align="center" class="q-gutter-y-xs">
        <div class="col-7 q-py-xs"><q-btn label="Login" type="submit" color="primary" class="full-width text-capitalize" /></div>
        <div class="col-7 q-py-xs"><q-btn label="Reset" outline type="reset" color="primary" class="full-width text-capitalize" /></div>
        <div class="col-7 q-pt-lg"><q-btn label="First time login" outline @click.stop="firstTimeLogin" color="black" class="text-caption text-capitalize text-weight-light" /></div>
      </q-card-actions>
      </q-form>
      </q-card-section>
  </q-card>
</div>
</template>

<script>
import store from './../store'
import Db from './../db'
import { setCookie } from 'tiny-cookie'
export default {
  data () {
    return {
      leftDrawerOpen: false,
      sharedState: store.state,
      username: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        console.log('submit')
        const db = Db(store)
        const config = {
          ajax: {
            headers: {
              Authorization: 'Basic ' + window.btoa([this.username, this.password].join(':'))
            }
          }
        }
        db.logIn(this.username, this.password, config)
          .then(res => {
            console.log('res before getuser', res)
            db.getUser(res.name, (err, user) => {
              console.log('user', user)
              if (!err && user.active) {
                // user.roles = '[member]' // dev mode
                setCookie('auth', true)
                setCookie('roles', user.roles)
                setCookie('username', user.name)
                setCookie('database', user.database)
                setCookie('password', this.password)
                store.state.username = this.username
                store.state.password = this.password
                store.state.nickname = user.username
                store.state.database = user.database
                store.state.roles = user.roles
                store.state.auth = true
                console.log('res', res)
                if (user.roles.includes('member')) {
                  this.$router.push({ path: '/circular-list' })
                  this.fetchMember(user.name)
                } else if (['staff', 'admin'].includes(user.roles.toString())) {
                  this.$router.push({ path: '/event-staff' })
                }
              }
            })
          })
          .catch(err => {
            this.showError = true
            setTimeout(() => { this.showError = false }, 2000)
            // eslint-disable-next-line
            console.error(err)
          })
      }
    },
    fetchMember (nric) {
      const db = Db(store)
      const params = {
        key: nric,
        limit: 1
      }
      db.query('member/by_ic', params)
        .catch(err => console.err(err))
        .then(res => {
          db.get(res.rows[0].id)
            .catch(err => console.err(err))
            .then(res => {
              this.sharedState.member = res
            })
        })
    },
    firstTimeLogin () {
      this.$router.push({ path: '/verification' })
    },
    onReset () {
      this.username = null
      this.password = null
    }
  }
}
</script>

<style>
.login-container {
  text-align: center;
  margin-top: 15vh;
  width: 390px;
}
.logo-text {
  font-size: 24pt;
  padding-top: 1em;
}
.logo-tagline {
  font-size: 11pt;
  padding-bottom: 4em;
}
</style>
