<template>
  <div class="dashboard">
    <side-nav
      :links="[
        { displayName: 'Home' },
        { displayName: 'Settings' },
        { displayName: 'New Post', onClickMethod: toggleDialog },
      ]"
      :userProfile="userProfile"
    />
    <div class="postSection">
      <post-card v-for="(post, index) in posts" :post="post" :key="index" />
    </div>
    <Dialog
      v-if="dialog.active"
      :button1Text="'Post'"
      :button1Click="handlePostClick"
      :button2Text="'Cancel'"
      :button2Click="toggleDialog"
    >
      <textarea v-model="dialog.text" id="DialogTextArea" />
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../../components/vuestagram/Dialog.vue";
import PostCard from "../../components/vuestagram/PostCard.vue";
import sideNav from "../../components/vuestagram/sideNav.vue";
import * as fb from "../../firebase";
export default {
  data() {
    return {
      posts: [],
      dialog: {
        active: false,
        text: "",
      },
    };
  },
  components: { sideNav, PostCard, Dialog },
  computed: {
    userProfile() {
      return this.$store.state.authentication.userProfile;
    },
  },
  middleware: "authenticated",
  mounted() {
    console.log("Creating Snapshot Listener");
    const doc = fb.postsCollection.orderBy("postDate", "desc").onSnapshot(
      (documentSnapshot) => {
        this.posts = documentSnapshot.docs.map((doc) => doc.data());
      },
      (error) => {
        console.error(error);
      }
    );
  },
  async fetch() {
    const snapshot = await fb.postsCollection.orderBy("postDate", "desc").get();
    this.posts = snapshot.docs.map((doc) => doc.data());
  },
  methods: {
    handlePostClick: async function () {
      await fb.postsCollection.add({
        userId: this.userProfile.id,
        postType: "text",
        postData: this.dialog.text,
        postDate: Date.now(),
      });
      this.toggleDialog();
    },
    toggleDialog: function () {
      if (this.dialog.active) {
        this.dialog.active = false;
        this.dialog.text = "";
      } else {
        this.dialog.active = true;
      }
    },
  },
};
</script>

<style>
.dashboard {
  display: flex;
  width: 100vw;
  height: 100vh;
}
html {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.dashboard .postSection {
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: rgba(128, 128, 128, 0.281);
  overflow-y: scroll;
  height: 100%;
}

#DialogTextArea {
  width: 100%;
  resize: none;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}
</style>
