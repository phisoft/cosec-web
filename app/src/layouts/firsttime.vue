<template>
<div>
    <div class="flex row full-height justify-center content-center q-px-md">
    <q-card class="login-container q-pa-xs no-shadow">
      <q-card-section>
        <div style="margin-top: 60px;" class="text-h5 q-pb-lg"> Account Verification </div>
      <q-form
        ref="form"
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-xs q-mt-md q-pt-xs"
      >
        <q-input
          v-model="data.nric"
          label="New NRIC"
          mask="############"
          outlined
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Required field']" >
        <template v-slot:append>
            <q-icon name="fas fa-user" />
          </template>
        </q-input>

        <q-input
          v-model="data.email"
          label="Email"
          outlined
          lazy-rules
          :rules="[ emailRules ]" >
        <template v-slot:append>
            <q-icon name="fas fa-at" />
          </template>
        </q-input>

        <q-card-actions align="center" class="q-gutter-y-xs">
          <div class="col-7 q-py-xs"><q-btn label="Submit" type="submit" color="primary" class="full-width text-capitalize" /></div>
          <div class="col-7 q-py-xs"><q-btn label="Reset" outline type="reset" color="primary" class="full-width text-capitalize" /></div>
          <div class="col-7 q-pt-lg"><q-btn style="width: 60px;" label="Login" color="black"  to="/login" outline class="text-caption text-capitalize text-weight-light" /></div>
        </q-card-actions>
        </q-form>
        </q-card-section>
    </q-card>
  </div>
   <q-dialog v-model="Msg" width="300" >
      <q-card>
        <q-card-section>
          <div> {{ text }} </div>
        </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
// import store from './../../store'
// import Db from './../../db'
import axios from 'axios'
export default {
  data () {
    return {
      data: {},
      emailRules: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'email must be valid',
      Msg: false,
      text: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        let apiUrl = `${window.location.origin}/api/member/register`
        console.log('apiurl', apiUrl)
        axios.post(apiUrl, this.data)
          // eslint-disable-next-line
          .catch(err => {
            console.log(err)
            console.log('err res', err.response)
            if (err.response.data === 'invalid nric') {
              // eslint-disable-next-line
              this.text = "Error! invalid NRIC. Please try again."
              this.Msg = true
            }
          })
          .then(res => {
            if (res.status === 200) {
              console.log('success', res)
              // eslint-disable-next-line
              this.text = "Verification successful. Please check your email for registration process."
              this.Msg = true
            }
          })
      }
    },
    onReset () {
      this.data.nric = null
      this.data.email = null
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