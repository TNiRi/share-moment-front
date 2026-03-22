<template> 
    <button @click="clicks++">{{clicks}}</button>
    <p v-if="clicks>=10 && clicks<20">Вы получили приз!</p>
    <p v-else-if="clicks>=20">Вы получили большой приз!</p>
    <input type="text" v-model="newColour">
    <button @click="addColour">add</button>
    <ul>
        <li v-for="(colour, i) in colours" :key="i">{{ colour }} <button @click="removeItem(i)">X</button></li>
    </ul>
</template>

<script>
export default {
    data() {
    return {
      clicks: 0,
      colours: ['red', 'blue', 'yellow'],
      newColour: ''
    }
  },
  methods: {
    addColour() {
        this.colours.push(this.newColour);
        this.newColour = "";
    },
    removeItem(i) {
        this.colours.splice(i, 1);
    }
  }
}
</script>