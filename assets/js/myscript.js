//déclaration des variables
/** Variables de récupération des 3 champs par leur id**/
let input_value = document.getElementById("input_value");
let text = document.getElementById("text");
let number = document.getElementById("number");

/** Variables de récupération des 2 spans pour les erreurs sur les champs description et valeur**/
let span_text = document.getElementById("span-text");
let span_number = document.getElementById("span-number");

/** Variables de récupération des 2 blocs pour l'injection du code par la modification du DOM pour lister les revenus et les depenses**/
let inside_income = document.getElementById("inside-income");
let inside_expenses = document.getElementById("inside-expenses");

/** Variables de récupération de l'element icon **/
let check_icon = document.getElementById("check-icon");

/** Déclaration des tableaux de revenus et de depenses**/
let tab_income = [];
let tab_expenses = [];

/** Variables de récupération des valeurs des champs description et valeur**/
let value_text;
let value_number;

/** Variables de récupération des blocs pour l'affichage des revenus et des dépenses */
let display_income = document.getElementById("display_income");
let display_expenses = document.getElementById("display_expenses");

/** */
let display_ecart = document.getElementById("ecart");

//Gestion des erreurs sur les champs Obligatoires Description et Valeur a la sortie du champ et lorsque l'utilisateur finit de taper dans le champs.
text.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    span_text.removeAttribute("hidden");
  } else {
    span_text.setAttribute("hidden", "");
  }
});
number.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    span_number.removeAttribute("hidden");
  } else {
    span_number.setAttribute("hidden", "");
  }
});
text.addEventListener("input", () => {
  span_text.setAttribute("hidden", "");
});
number.addEventListener("input", () => {
  span_text.setAttribute("hidden", "");
});

//Affichage du nombre null par defaut(income et expenses)
if (tab_income.length == 0) {
  display_income.innerHTML = "+ 00.00";
}
if (tab_expenses.length == 0) {
  display_expenses.innerHTML = "- 00.00";
}
if (tab_income.length == 0 && tab_expenses.length == 0) {
  display_ecart.innerHTML = "+0.00";
}

//Curseur en forme de main sur l'icon
check_icon.style.cursor = "pointer";
//fonction supprimer income
function delete_income(indice) {
  if (confirm("Voulez vous supprimer ce revenu?")) {
    tab_income.splice(indice, 1);
    ajoutIncome();
  }
}
//fonction delete_expenses
function delete_expenses(indice) {
  if (confirm("Voulez vous supprimer cette dépense?")) {
    tab_expenses.splice(indice, 1);
    ajoutExpenses();
  }
}
//fonction ajout income
function ajoutIncome() {
  //Lister les revenus dans le bloc inside income
  inside_income.innerHTML = "";
  let somme = 0;
  tab_income.forEach((element, indice) => {
    somme = somme + element.Valeur;
    let Onediv = `
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
    <span style="color:#555">${element.Description}</span>
    <span style="padding-right:10px">+ ${element.Valeur} 
    <i class="fa-solid fa-trash" style="margin-left:15px;cursor:pointer" onclick="delete_income('${indice}')"></i></span>
  </div>
    `;
    inside_income.innerHTML = inside_income.innerHTML + Onediv;
    display_income.innerHTML = `+ ${somme.toFixed(2)}`;
  });
}

//fonction ajout expenses
function ajoutExpenses() {
  //Lister les revenus dans le bloc inside_expenses
  inside_expenses.innerHTML = "";
  let somme = 0;
  tab_expenses.forEach((element, indice) => {
    somme = somme + element.Valeur;
    let Onediv = `
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
  <span style="color:#555">${element.Description}</span>
  <span style="padding-right:10px">- ${element.Valeur} 
  <i class="fa-solid fa-trash" style="margin-left:15px;cursor:pointer" onclick = "delete_expenses('${indice}')"></i></span>
</div>
  `;
    inside_expenses.innerHTML = inside_expenses.innerHTML + Onediv;
    display_expenses.innerHTML = `- ${somme.toFixed(2)}`;
  });
}

// Definition de la fonction gestion qui assure l'ajout d'un revenu complet(Description et valeur) dans le tableau des revenus ou des dépenses suite a l'appuie de la touche Enter sur le champs valeur ou sur l'icone
function gestion() {
  if (text.value != "" && number.value != "" && input_value.value == "+") {
    value_text = text.value.trim();
    value_number = number.value;
    tab_income.push({
      Description: value_text,
      Valeur: Number(value_number),
    });
    ajoutIncome();
  }

  if (text.value != "" && number.value != "" && input_value.value == "-") {
    value_text = text.value.trim();
    value_number = number.value;
    tab_expenses.push({
      Description: value_text,
      Valeur: Number(value_number),
    });
    ajoutExpenses();
  }
  let somme_incomes = 0;
  let somme_expenses = 0;

  for (let i = 0; i < tab_income.length; i++) {
    somme_incomes = somme_incomes + tab_income[i].Valeur;
  }
  for (let j = 0; j < tab_expenses.length; j++) {
    somme_expenses = somme_expenses + tab_expenses[j].Valeur;
  }
  let ecart = somme_incomes - somme_expenses;
  display_ecart.innerHTML = `+ ${Math.abs(ecart.toFixed(2))}`;
  if (ecart == 0) {
    display_ecart.innerHTML = "+0.00";
  }
  console.log(somme_incomes);
  console.log(somme_expenses);
  console.log(ecart);
  //Remise a zero des valeur des champs apres enregistrement
  text.value = "";
  number.value = "";
  //Retirer le focus sur le champs value apres enregistrement
  number.blur();
  //retirer l'erreur sur le champs description qui sera vide apres enregistrement
  span_number.setAttribute("hidden", "");
}

//Appel de la fonction gestion suite a l'appuie de la touche
number.onkeyup = function (touche) {
  if (touche.key == "Enter") {
    gestion();
  }
};

//Appel de la fonction gestion suite a l'appuie de l'icon
check_icon.addEventListener("click", () => {
  if (text.value == "" && number.value == "") {
    span_text.removeAttribute("hidden");
    span_number.removeAttribute("hidden");
  } else {
    gestion();
  }
});

//Gestion de la couleur de l'icon et des bordures des champs
input_value.onchange = function () {
  if (input_value.value === "-") {
    check_icon.style.color = "#ff3859";
    text.style.borderColor = "#ff3859";
    number.style.borderColor = "#ff3859";
  }
  if (input_value.value === "+") {
    check_icon.style.color = "#fba90a";
    text.style.borderColor = "#fba90a";
    number.style.borderColor = "#fba90a";
    text.oninput = function () {
      text.style.borderColor = "#fba90a";
    };
    number.oninput = function () {
      text.style.borderColor = "#fba90a";
    };
  }
};

//changer la couleur des bordure des champs a la couleur initiale une fois hors du champs
text.onblur = function () {
  text.style.borderColor = "#eee";
};
number.onblur = function () {
  text.style.borderColor = "#eee";
};
