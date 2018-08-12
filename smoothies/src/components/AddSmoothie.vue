<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
              <label for="ingredient">Ingredients:</label>
              <input type="text" name="ingredient" v-model="ingredients[index]">
              <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
            </div>
            <div class="field add-ingredients">
                <label for="ingredients">Add Ingridient:</label>
                <input type="text" name="ingredient" @keydown.tab.prevent="addIngredient" v-model="ingredient">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      ingredients: [],
      ingredient: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        // Create slug title
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()%'"!\-:@#^]/g,
          lower: true
        });

        // Insert to firestore
        db
          .collection("smoothies")
          .add({
            title: this.title,
            slug: this.slug,
            ingredients: this.ingredients
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
            alert("error");
          });
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    },
    addIngredient() {
      if (this.ingredient) {
        this.feedback = null;
        this.ingredients.push(this.ingredient);
        this.ingredient = null;
      } else {
        this.feedback = "You must enter a value to add a ingredient";
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      })
    }
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
  position: relative;
  margin: 20px auto;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

