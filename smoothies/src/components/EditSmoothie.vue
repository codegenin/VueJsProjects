<template>
    <div class="edit-smoothie container" v-if="smoothie">
        <h2>Edit {{smoothie.title}} Smoothie</h2>
        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
              <label for="ingredient">Ingredients:</label>
              <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
              <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
            </div>
            <div class="field add-ingredients">
                <label for="ingredients">Add Ingridient:</label>
                <input type="text" name="ingredient" @keydown.tab.prevent="addIngredient" v-model="ingredient">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      ingredient: null,
      feedback: null
    };
  },
  methods: {
    addIngredient() {
      if (this.ingredient) {
        this.feedback = null;
        this.smoothie.ingredients.push(this.ingredient);
        this.ingredient = null;
      } else {
        this.feedback = "You must enter a value to add a ingredient";
      }
    },
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        // Create slug title
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()%'"!\-:@#^]/g,
          lower: true
        });

        // Update firestore record
        db
          .collection("smoothies").doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            slug: this.smoothie.slug,
            ingredients: this.smoothie.ingredients
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
    deleteIngredient(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient != ing;
        }
      );
    }
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  position: relative;
  margin: 20px auto;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>


