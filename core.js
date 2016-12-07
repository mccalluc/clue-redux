function greeter(state, action) {
  if (typeof state === 'undefined') {
    return 'World';
  }

  return action.name;
}

var store = Redux.createStore(greeter);

function render() {
  $('#output').html(store.getState().toString());
}

render();
store.subscribe(render);

$('#input').change(function () {
  store.dispatch({ type: 'RESET', name: $(this).val()});
});