//déclaration des variables
let input_value = document.getElementById("input_value");
let text = document.getElementById("text");
let number = document.getElementById("number");
let span_text = document.getElementById("span-text");
let span_number = document.getElementById("span-number");
let inside_income = document.getElementById("inside-income");
text.onblur = function (event) {
  if (event.target.value == "") {
    span_text.removeAttribute("hidden");
  } else {
    span_text.setAttribute("hidden", "");
  }
};
text.oninput = function (event) {
  if (event.target.value !== "") {
    span_text.setAttribute("hidden", "");
  }
};
number.onblur = function (event) {
  if (event.target.value == "") {
    span_number.removeAttribute("hidden");
  } else {
    span_number.setAttribute("hidden", "");
  }
};
number.oninput = function (event) {
  if (event.target.value !== "") {
    span_number.setAttribute("hidden", "");
  }
};

number.onkeyup = function (touche) {
  if (touche.key == "Enter") {
    if (text.value != "" && number.value != "") {
      let render_income = document.createElement("div");
      render_income.innerHTML = `
        <div
                  class="render-income"
                  style="
                    border-top: 1px solid #eee;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                  "
                >
                  <span>${text.value}</span>
                  <span>${number.value}</span>
                </div>
        `;
      inside_income.appendChild(render_income);
      text.value = "";
      number.value = "";
    }
  }
};
