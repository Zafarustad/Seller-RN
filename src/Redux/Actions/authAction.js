export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

export const isAuthenticatedAction = (value) => ({
  type: IS_AUTHENTICATED,
  payload: value,
});
