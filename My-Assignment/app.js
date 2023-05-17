const add = () => {
  return {
    type: "ADD",
  }
}

const inc = (matchId, value) => {
  return {
    type: "INC",
    payload: {
      id: matchId,
      value,
    }
  }
}

const dec = (matchId, value) => {
  return {
    type: "DEC",
    payload: {
      id: matchId,
      value,
    }
  }
}
const del = (matchId) => {
  return {
    type: "DEL",
    payload: {
      id: matchId,
    }
  }
}
const resett = () => {
  return {
    type: "RESET"
  }
}

const initialState = {
  uid: 2,
  matches: [
    {
      id: 1,
      total: 0
    }
  ]
}

function reducers(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        uid: state.uid + 1,
        matches: [...state.matches, {
          id: state.uid,
          total: 0,
        }

        ]
      }

    case "INC":
      const values = state.matches.map((m) => {
        if (m.id === action.payload.id) {
          return {
            ...m,
            total: m.total + action.payload.value
          }
        }
        else {
          return { ...m }
        }
      })
      return {
        ...state,
        matches: values
      }

    case "DEC":
      const dec = state.matches.map((m) => {
        if (m.id === action.payload.id) {
          return {
            ...m,
            total: Math.max(m.total - action.payload.value, 0)
          }
        }
        else {
          return { ...m }
        }
      })
      return {
        ...state,
        matches: dec
      }

    case "DEL":
      const del = state.matches.filter((m) =>
        m.id !== action.payload.id
      )

      return {
        ...state,
        matches: del
      }
    case "RESET":
      const resett = state.matches.map(m => {
        return {
          ...m,
          total: 0
        }
      })
      return {
        ...state,
        matches: resett,
      }


    default:
      return state;
  }
}

const store = Redux.createStore(reducers);

const idbe = () => {

  Array.from(document.querySelectorAll(".incrementForm")).forEach((element) => {
    element.addEventListener('submit', function (e) {  //arrow function e kaj krbe na
      e.preventDefault();
      store.dispatch(inc(Number(this.dataset.matchId), Number(this.elements.increment.value)))
      console.log(this.dataset);
      console.log(this.elements);

    })
  })
  Array.from(document.querySelectorAll(".decrementForm")).forEach((element) => {
    element.addEventListener("submit", function (e) {
      e.preventDefault();


      store.dispatch(dec(Number(this.dataset.matchId), Math.abs(this.elements.decrement.value)));
    });
  });
  Array.from(document.querySelectorAll(".lws-delete")).forEach((element) => {
    element.addEventListener("click", function () {
      store.dispatch(del(Number(this.dataset.matchId)))
    })

  })
}


const createtemple = (m) => {
  const { id, total } = m;
  return `<div class="match">
    <div class="wrapper" >
      <button class="lws-delete" data-match-id="${id}">
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${id}</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm" data-match-id="${id}">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" />
      </form>
      <form class="decrementForm" data-match-id="${id}">
        <h4>Decrement</h4>
        <input type="number" name="decrement" class="lws-decrement" />
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">${total}</h2>
    </div>
  </div>
</div>`;
}

const createString = (matches) => {
  return matches.map((m) => createtemple(m));
}

const render = () => {
  const state = store.getState();
  const matches = state.matches;

  const strings = createString(matches);
  document.querySelector(".all-matches").innerHTML = strings;
  idbe();

}

render();

store.subscribe(render);

document.querySelector(".lws-addMatch").addEventListener("click", () => {
  store.dispatch(add())
})
document.querySelector(".lws-reset").addEventListener("click", () => {
  store.dispatch(resett());
})