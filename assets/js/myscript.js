//déclaration des variables
let input_value = document.getElementById("input_value");
let text = document.getElementById("text");
let number = document.getElementById("number");
let span_text = document.getElementById("span-text");
let span_number = document.getElementById("span-number");
let inside_income = document.getElementById("inside-income");
let inside_expenses = document.getElementById("inside-expenses");
let check_icon = document.getElementById("check-icon");
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
    if (text.value != "" && number.value != "" && input_value.value == "+") {
      let render_income = document.createElement("div");
      render_income.innerHTML = `
        <div
                  class="render-income"
                  style="
                    border-top: 1px solid #eee;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    padding:8px 0;
                    margin-top:3px
                  "
                >
                  <span style="color:#555">${text.value}</span>
                  <span style="padding-right:10px">+ ${number.value}</span>
                </div>
        `;
      inside_income.appendChild(render_income);
      text.value = "";
      number.value = "";
      number.blur();
      span_number.setAttribute("hidden", "");
      number.style.borderColor = "#eee";
    }
    if (text.value != "" && number.value != "" && input_value.value == "-") {
      let render_expenses = document.createElement("div");
      render_expenses.innerHTML = `
        <div
                  class="render-expenses"
                  style="
                    border-top: 1px solid #eee;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    padding:8px 0;
                    margin-top:3px
                  "
                >
                  <span style="color:#555">${text.value}</span>
                  <span style="padding-right:10px">- ${number.value}</span>
                </div>
        `;
      inside_expenses.appendChild(render_expenses);
      text.value = "";
      number.value = "";
    }
  }
};
input_value.onchange = function () {
  if (input_value.value === "-") {
    check_icon.style.color = "#ff3859";
  }
  if (input_value.value === "+") {
    text.oninput = function () {
      text.style.borderColor = "#fba90a";
    };
    number.oninput = function () {
      number.style.borderColor = "#fba90a";
    };
  }
  if (input_value.value === "-") {
    text.oninput = function () {
      text.style.borderColor = "#ff3859";
    };
    number.oninput = function () {
      number.style.borderColor = "#ff3859";
    };
  }
};

text.onblur = function () {
  text.style.borderColor = "#eee";
};
number.onblur = function () {
  text.style.borderColor = "#eee";
};
