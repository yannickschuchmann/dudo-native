export const selectHand = switchValue => {
  return {
    type: 'SELECT_HAND',
    payload: !switchValue
  }
}
