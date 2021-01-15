<template>
  <div class="dialogWrapper">
    <div class="dialog">
      <div class="header">New Post</div>
      <div class="content"><slot /></div>
      <div class="buttons">
        <div @click="button1Click">{{ button1Text }}</div>
        <div @click="button2Click">{{ button2Text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: String,
    button1Text: String,
    button1Click: Function,
    button2Text: String,
    button2Click: Function,
  },
};
</script>

<style scoped>
.dialogWrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  justify-content: space-around;
}

.dialog {
  padding: 0.5rem;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  margin: 2rem;
  flex-direction: column;
  justify-content: space-between;
}

.dialog .header {
  font-weight: 500;
  font-size: large;
}

.dialog .buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}

.dialog .buttons div {
  padding: 0.5rem;
  border-radius: 20px;
  border: 1px solid #3b6a80;
  color: #3b6a80;
}

.dialog .buttons div:hover {
  cursor: pointer;
  color: #fff;
  background-color: #3b6a80;
}
</style>
