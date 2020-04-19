export default field => ({
  requestGet: () => ({
    type: field.REQUEST_GET,
  }),
  receiveGet: value => ({
    type: field.RECEIVE_GET,
    value,
  }),
  changeEdit: () => ({
    type: field.CHANGE_EDIT,
  }),
  requestSet: () => ({
    type: field.REQUEST_SET,
  }),
  receiveSet: () => ({
    type: field.RECEIVE_SET,
  }),
});
