<template>
    <div class="view-profile container">
        <div class="card" v-if="profile">
            <h2 class="deep-purple-text center">{{ profile.alias}}'s' Wall</h2>
            <ul class="comments collection">
              <li v-for="(comment, index) in comments" :key="index">
                <div class="deep-purple-text">{{ comment.from }}</div>
                <div class="grey-text text-darken-2">{{ comment.content }}</div>
              </li>
            </ul>
            <form @submit.prevent="addComment()">
              <div class="field">
                <label for="comment">Add A Comment</label>
                <input type="text" name="comment" v-model="comment">
                <p v-if="feedback" class="red-text center">{{ feedback }}</p>
              </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      comment: null,
      feedback: null,
      user: null,
      comments: []
    };
  },
  methods: {
    addComment() {
      if (this.comment) {
        this.feedback = null;
        db
          .collection("comments")
          .add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.comment,
            time: Date.now()
          })
          .then(() => {
            this.comment = null;
          });
      } else {
        this.feedback = "You must enter a comment to add it!";
      }
    }
  },
  created() {
    let ref = db.collection("users");
    // get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
        });
      });

    // profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });

    // comments
    db
      .collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content,
              time: change.doc.data().time
            });
          }
        });
      });
  }
};
</script>

<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}
.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
