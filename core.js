function reducer(state, action) {
  if (typeof state === 'undefined') {
    var name = 'World';
    return {name: name, history: [name], future: []};
  }

  switch (action.type) {
    case 'RESET':
      var new_history = state.history.slice();
      new_history.push(action.name);
      return {
        name: action.name,
        history: new_history,
        future: []
      };
    case 'UNDO':
      var new_history = state.history.slice();
      var new_future = state.future.slice();
      new_future.unshift(new_history.pop());
      return {
        name: new_history[new_history.length - 1],
        history: new_history,
        future: new_future
      };
    case 'REDO':
      var new_history = state.history.slice();
      var new_future = state.future.slice();
      new_history.push(new_future.shift());
      return {
        name: new_history[new_history.length - 1],
        history: new_history,
        future: new_future
      };
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
  $('#undo').prop('disabled', state.history.length == 1);
  $('#redo').prop('disabled', state.future.length == 0);
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
$('#redo').click(function () {
  store.dispatch({
    type: 'REDO'
  })
});