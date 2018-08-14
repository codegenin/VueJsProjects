<template>
    <div class="new-message">
        <form @submit.prevent="addMessage()">
            <label for="new-message">New Message (enter to add)</label>
            <p class="red-text" v-if="feedback">{{feedback}}</p>
            <input type="text" name="new-message" v-model="newMessage">
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "NewMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        this.feedback = null;
        db
          .collection("messages")
          .add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });

        this.newMessage = null;
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    }
  }
};
</script>

<style>
</style>
