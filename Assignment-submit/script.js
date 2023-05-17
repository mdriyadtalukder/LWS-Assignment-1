const addItems = document.getElementById('addMatch');
const allItems = document.querySelector('.all-matches');
const resetButton = document.getElementById('reset');

let initialState = {
  1: 0,
  active: 1,
};
 
let selector = 2; 

const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const ADDMATCH = 'addMatch';
const RESET = 'reset';

const increment = (e) => {
  return {
    type: INCREMENT,
    id: e.target.parentNode.parentNode.parentNode.id.charAt(
      e.target.parentNode.parentNode.parentNode.id.length - 1
    ),
    payload: parseInt(e.target.value),
  };
};

const decrement = (e) => {
  return {
    type: DECREMENT,
    id: e.target.parentNode.parentNode.parentNode.id.charAt(
      e.target.parentNode.parentNode.parentNode.id.length - 1
    ),
    payload: parseInt(e.target.value),
  };
};

const addMatch = () => {
  return {
    type: ADDMATCH,
    id: selector,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      [action.id]: state[action.id] + action.payload,
      active: action.id,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      [action.id]:
        (state[action.id] - action.payload || state[action.id]) > 0
          ? state[action.id] - action.payload
          : 0,
      active: action.id,
    };
  } else if (action.type === ADDMATCH) {
    const node = document.querySelector('.match');
    const clone = node.cloneNode(true);

    document
      .querySelector('.all-matches')
      .appendChild(clone)
      .setAttribute('id', `matches${selector}`);
    document
      .getElementById(`matches${selector}`)
      .querySelector('.wrapper')
      .querySelector('.lws-matchName').innerText = `Match ${selector}`;

    selector++;

    return {
      ...state,
      [action.id]: 0,
      active: action.id,
    };
  } else if (action.type === RESET) {
    const resetState = {
      ...state,
    };

    Object.keys(resetState).forEach((key) => {
      resetState[key] = 0;
    });

    return resetState;
  } else {
    return state;
  }
}

const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();

  if (state.active) {
    const matchName = 'matches' + state.active;
    document
      .getElementById(`${matchName}`)
      .querySelector('.numbers')
      .querySelector('.lws-singleResult').innerText = state[state.active];
  } else {
    document.querySelectorAll('.lws-singleResult').forEach((el) => {
      el.innerText = 0;
    });
  }
};

render();

store.subscribe(render);

allItems.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();

    if (e.target.id === 'increment') {
      store.dispatch(increment(e));
    } else if (e.target.id === 'decrement') {
      store.dispatch(decrement(e));
    }

    e.target.value = '';
  }
});

addItems.addEventListener('click', () => {
  store.dispatch(addMatch());
});

resetButton.addEventListener('click', () => {
  store.dispatch(reset());
});
