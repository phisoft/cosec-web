<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Username',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'fullname', align: 'center', label: 'Full Name', field: 'fullname', sortable: true },
        { name: 'email', label: 'Email', field: 'email', sortable: true },
        { name: 'roles', label: 'Roles', field: 'roles' }
      ],
      data: [
        {
          name: 'Aiman Taher',
          fullname: 'Mohammad Aiman Taher',
          email: 'aiman12@yahoo.com',
          roles: 'manager'
        },
        {
          name: 'Harry Jack',
          fullname: 'Harold James ',
          email: 'harold11@yahoo.com',
          roles: 'assistant manager'
        }
      ]
    }
  }
}
</script>
