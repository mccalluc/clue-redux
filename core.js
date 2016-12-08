function reducer(state, action) {
  if (typeof state === 'undefined') {
    var name = 'World';
    return Immutable.Map({
      name: name,
      history: Immutable.Stack([name]),
      future: Immutable.Stack([])
    });
  }

  switch (action.type) {
    case 'RESET':
      return {
        name: action.name,
        history: state.history.push(action.name),
        future: []
      };
    case 'UNDO':
      var new_future = state.future.push(state.history.peek());
      var new_history = state.history.pop();
      return {
        name: new_history.peek(),
        history: new_history,
        future: new_future
      };
    case 'REDO':
      var new_history = state.history.push(state.future.peek());
      var new_future = state.future.pop();
      return {
        name: new_history.peek(),
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
  $('#undo').prop('disabled', state.history.size == 1);
  $('#redo').prop('disabled', state.future.size == 0);
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