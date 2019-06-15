export const settingsReducer = (switchValue = true, action) => {
  if (action.type === 'SELECT_HAND') {
    return action.payload
  }
  return switchValue
}
