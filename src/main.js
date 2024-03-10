const { invoke } = window.__TAURI__.tauri;

const btns = document.querySelectorAll(".box")
const label = document.getElementById("label-result")
const resset_btn = document.getElementById("rst-btn")

var turn = true
var map = [[2, 2, 2], [2, 2, 2], [2, 2, 2]]

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (!btn.getAttribute("value")) {
      if (turn) {
        setValue(btn, "X")
        turn = !turn
      } else {
        setValue(btn, 0)
        turn = !turn
      }
    }
    check(map)
  })
})

resset_btn.addEventListener("click", function(e){
  resset()
})

function setValue(obj, value) {
  let row = obj.getAttribute("row")
  let col = Array.from(obj.parentNode.children).indexOf(obj)

  obj.textContent = value
  obj.setAttribute("value", value)
  if (!value == 0) {
    map[row][col] = 1
  } else {
    map[row][col] = value
  }

}

function check(map) {
  invoke("check", { map: map }).then((buf) => {
    if (buf == 1) {
      label.textContent = "Player 1 wins";
      resset_btn.hidden = false
    } 
    if (buf == 0) {
      label.textContent = "Player 2 wins";
      resset_btn.hidden = false
    }

    if ([...btns].every(btn => btn.getAttribute("value") !== "")) {
      label.textContent = "Tie";
      resset_btn.hidden = false
    }
  });
}

function resset(){
  btns.forEach((btn) =>{
    btn.setAttribute("value", "")
    btn.textContent = ""
    label.textContent = ""
  })
  map = [[2, 2, 2], [2, 2, 2], [2, 2, 2]]
  resset_btn.hidden = true
}