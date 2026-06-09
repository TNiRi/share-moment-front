<template>
    <h1 style="text-align: center;" class="text-light-green-darken-4">Marker Menu</h1>
    <v-table>
    <thead>
      <tr class="bg-light-green-darken-3">
        <th class="text-center">label</th>
        <th class="text-center">description</th>
        <th class="text-center">radius</th>
        <th class="text-center">access</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{  }}</td>
        <td>{{  }}</td>
        <td>{{  }}</td>
        <td>{{  }}</td>

      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
    name: 'MarkerMenuView',
}
</script>