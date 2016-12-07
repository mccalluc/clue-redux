function reducer(state, action) {
  if (typeof state === 'undefined') {
    var name = 'World';
    return {name: name, history: [name]};
  }

  switch (action.type) {
    case 'RESET':
      var new_history = state.history.slice();
      new_history.push(action.name);
      return {name: action.name, history: new_history};
    case 'UNDO':
      var new_history = state.history.slice();
      new_history.pop();
      return {name: new_history[new_history.length - 1], history: new_history};
    default:
      return state;
  }
}

var store = Redux.createStore(reducer);

function render() {
  var state = store.getState();
  var name = state.name;
  $('#input').val(name);
  $('#output').html(name);
  $('#undo').prop('disabled', state.history.length == 1)
}

render();
store.subscribe(render);

$('#input').change(function () {
  store.dispatch({
    type: 'RESET',
    name: $(this).val()
  });
});
$('#undo').click(function () {
  store.dispatch({
    type: 'UNDO'
  })
});