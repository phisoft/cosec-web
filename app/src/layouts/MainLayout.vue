<template>
<div>
  <div class="q-pr-none">
    <q-layout view="hHh Lpr lff" container style="height: 600px" class="shadow-2 box-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Cosecretary</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer

        v-model="drawer"
        show-if-above

        :mini="!drawer || miniState"
        @click.capture="drawerClick"

        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple :to="{path: '/documents'}">
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Documents
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="assignment" />
              </q-item-section>

              <q-item-section>
                Files
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{path: '/users'}">
              <q-item-section avatar>
                <q-icon name="face" />
              </q-item-section>

              <q-item-section>
               Users
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
               Setting
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

  <q-page-container>
     <router-view />
 </q-page-container>
    </q-layout>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      miniState: false,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },

  methods: {
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
