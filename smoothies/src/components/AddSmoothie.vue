<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>

            <div class="field add-ingredients">
                <label for="ingredients">Add Ingridient:</label>
                <input type="text" name="ingredient" @keydown.tab="AddIngredient" v-model="ingredient">
            </div>

            <div class="field center-align">
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      ingredients: [],
      ingredient: null
    };
  },
  methods: {
    AddSmoothie() {
      console.log(this.title);
    },
    AddIngredient() {}
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
}
</style>

