import * as fb from "../firebase";

export const state = () => ({
  auth: false,
  userProfile: {},
});

export const mutations = {
  setUserProfile(state, userData) {
    state.userProfile = userData;
  },
  setAuth(state, auth) {
    state.auth = auth;
  },
};

export const actions = {
  async login({ dispatch }, { email, password }) {
    const { user } = await fb.auth.signInWithEmailAndPassword(email, password);
    dispatch("fetchUserProfile", user);
  },
  async fetchUserProfile({ commit }, user) {
    const userProfile = await fb.usersCollection.doc(user.uid).get();
    commit("setUserProfile", { ...userProfile.data(), id: user.uid });
    commit("setAuth", true);
  },
  async signup({ dispatch }, { form }) {
    const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
    await fb.usersCollection.doc(user.uid).set({
      name: form.name,
      title: form.title,
    });
    dispatch("fetchUserProfile", user);
  },
};
