const add = () => {
    return {
        type: "ADD"
    }
}

const inc = (idd, value) => {
    return {
        type: "INC",
        id: idd, value
    }
}

const dec = (idd, value) => {
    return {
        type: "DEC",
        id: idd, value
    }
}

const del = (idd) => {
    return {
        type: "DEL",
        id: idd
    }
}

const reset = () => {
    return {
        type: "RESET"
    }
}

const com = (cid) => {
    return {
        type: 'COM',
        id: cid,
    }

}
const initialState = {
    uid: 2,
    matches: [
        { id: 1, total: 0, com: 'Coom' }
    ],
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
                    com: 'Coom',
                }

                ]
            }
        case "INC":
            const inc = state.matches.map((m) => {
                if (m.id === action.id) {
                    return {
                        ...m,
                        total: m.total + action.value,
                    }
                }
                else {
                    return { ...m }
                }
            })

            return {
                ...state,
                matches: inc,
            }
        case "DEC":
            const dec = state.matches.map((m) => {
                if (m.id === action.id) {
                    return {
                        ...m,
                        total: Math.max(m.total - action.value, 0)
                    }
                }
                else {
                    return {
                        ...m
                    }
                }
            })
            return {
                ...state,
                matches: dec,
            }
        case "DEL":
            const del = state.matches.filter((m) =>
                m.id !== action.id
            )
            return {
                ...state,
                matches: del
            }

        case "RESET":
            const resett = state.matches.map((m) => {
                return {
                    ...m,
                    total: 0
                }
            })
            return {
                ...state,
                matches: resett,
            }

        case "COM":
            const com = state.matches.map((m) => {
                if (m.id === action.id) {
                    let c = 'complete'
                    return {
                        ...m,
                        com: c
                    }
                }
                else {
                    return {
                        ...m
                    }
                }
            })
            return {
                ...state,
                matches: com,
            }
        default:
            return { ...state }

    }
}


const store = Redux.createStore(reducers);

const incc = () => {
    Array.from(document.querySelectorAll(".incm")).forEach((element) => {
        element.addEventListener('submit', function (e) {
            e.preventDefault();
            store.dispatch(inc(Number(this.dataset.idd), Number(this.elements.inc.value)))
        })
    })

    Array.from(document.querySelectorAll(".decm")).forEach((element) => {
        element.addEventListener("submit", function (e) {
            e.preventDefault();
            store.dispatch(dec(Number(this.dataset.idd), Number(Math.abs(this.elements.dec.value))))
        })
    })

    Array.from(document.querySelectorAll(".icn")).forEach((element) => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            store.dispatch(del(Number(this.dataset.idd)))
        })
    })
    Array.from(document.querySelectorAll(".bttn")).forEach((element) => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            store.dispatch(com(Number(this.dataset.cid)))
        })
    })

}

const createtmp = (m) => {
    const { id, total, com } = m
    var str;
    var cm;
    if (id === 1) {
        str = ''
    }
    else {
        str = "<hr class='hr'>"
    }

    if (com === "complete") {
        cm = `<strike><span class='gn'>${com}</span></strike>`
    }
    else {
        cm = `<span>${com}</span>`
    }
    return `
    ${str}
    <section id=xx class="match ">
    <div id="ch">
        <i data-idd=${id} class="fa-regular icn fa-circle-xmark"></i>
        <h1>MATCH ${id}</h1>
    </div>
    <div id="ch-2">
        <form class="incm" data-idd=${id}>
            <p>Increment</p>
            <input data-id=5 name="inc" class="incr" type="text">
        </form>
        <form class="decm" data-idd=${id}>
            <p>Decrement</p>
            <input  name="dec" class="decr " type="number">
        </form>


        <button>${total}</button>

    </div>
    <div>
     ${cm}   
     <button class="bttn" data-cid=${id}>Complete</button>
    </div>
</section>`
}
const createhtml = (matches) => {
    return matches.map((m) => createtmp(m))
}

const render = () => {
    const state = store.getState();
    const matches = state.matches;
    const strings = createhtml(matches);
    document.querySelector(".all-match").innerHTML = strings;
    incc();
}

render();

store.subscribe(render);

document.querySelector('.btn').addEventListener('click', () => {
    store.dispatch(add())
})

document.querySelector(".pp").addEventListener('click', () => {
    store.dispatch(reset())
})