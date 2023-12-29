export const getMockStore = (): Pick<State, 'auth'> => ({
  auth: {
    login: null,
  },
});
