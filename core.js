function reducer(state, action) {
  if (typeof state === 'undefined') {
    var name = 'World';
    return Immutable.Map({
      name: name,
      history: Immutable.Stack([name]),
      future: Immutable.Stack()
    });
  }

  switch (action.type) {
    case 'RESET':
      return Immutable.Map({
        name: action.name,
        history: state.get('history').push(action.name),
        future: Immutable.Stack()
      });
    case 'UNDO':
      var new_future = state.get('future').push(state.get('history').peek());
      var new_history = state.get('history').pop();
      return Immutable.Map({
        name: new_history.peek(),
        history: new_history,
        future: new_future
      });
    case 'REDO':
      var new_history = state.get('history').push(state.get('future').peek());
      var new_future = state.get('future').pop();
      return Immutable.Map({
        name: new_history.peek(),
        history: new_history,
        future: new_future
      });
    default:
      return state;
  }
}

var store = Redux.createStore(reducer);

function render() {
  var state = store.getState();
  var name = state.get('name');
  $('#input').val(name);
  $('#output').html(name);
  $('#undo').prop('disabled', state.get('history').size == 1);
  $('#redo').prop('disabled', state.get('future').size == 0);
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