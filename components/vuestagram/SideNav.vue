<template>
  <div class="sideNavWrapper">
    <div class="header">Vuestagram</div>
    <ul>
      <li
        v-bind:class="{ active: link.active }"
        v-for="link in links"
        :key="link.displayName"
        @click="link.onClickMethod()"
      >
        {{ link.displayName }}
      </li>
    </ul>
    <div class="profileSection">
      <div class="ppPlaceholder">{{ userProfile.name | initals }}</div>
      {{ userProfile.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    links: Array,
    userProfile: {
      title: String,
      name: String,
    },
  },
  filters: {
    initals: function (value) {
      return value.toString().trim().charAt(0).toUpperCase();
    },
  },
};
</script>

<style scoped>
.sideNavWrapper {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  border-right: 1px solid rgba(128, 128, 128, 0.479);
}

.sideNavWrapper .header {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  height: 20px;
  padding: 1rem;
  font-weight: 500;
  font-size: 20px;
}

.sideNavWrapper ul {
  padding: 0;
  list-style: none;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
}

.sideNavWrapper li {
  border-radius: 20px;
  border: 1px solid #3b6a80;
  color: #3b6a80;
  padding: 1rem;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.sideNavWrapper li:hover {
  cursor: pointer;
  color: #fff;
  background-color: #3b6a80;
}

.sideNavWrapper .profileSection {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin-bottom: 1rem;
}

.sideNavWrapper .ppPlaceholder {
  height: 50px;
  width: 50px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  background-color: grey;
  color: white;
}
</style>
>
