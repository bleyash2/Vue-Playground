<template>
  <div v-if="post.postType == 'text'" class="card">
    <div class="authorSection">
      <div class="ppPlaceholder">{{ userInfo.name | initals }}</div>
      {{ userInfo.name }}
      <div class="date">{{ post.postDate | date }}</div>
    </div>
    <hr />
    <div class="content">
      {{ post.postData }}
    </div>
  </div>
  <div v-else class="card"></div>
</template>

<script>
import * as fb from "../../firebase";
export default {
  data: () => {
    return {
      userInfo: {},
    };
  },
  props: {
    post: { postType: String, postData: String, userId: String, postDate: Date },
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      const snapshot = await fb.usersCollection.doc(this.$props.post.userId).get();
      this.userInfo = snapshot.data();
      console.log(snapshot.data());
    },
  },
  filters: {
    initals: function (value) {
      if (value) return value.toString().trim().charAt(0).toUpperCase();
    },
    date: function (value) {
      const date = new Date(value);
      return " - " + date.toLocaleString("en-AU");
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  margin: 1rem;
  padding: 1rem;
  border-radius: 5px;
}

.card .authorSection {
  display: flex;
  padding: 2px;
  flex-direction: row;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  font-weight: 600;
}

.card .ppPlaceholder {
  margin-right: 10px;
  height: 30px;
  width: 30px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  background-color: grey;
  color: white;
}

.card br {
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

.card .date {
  font-weight: 300;
  font-size: smaller;
}
</style>
