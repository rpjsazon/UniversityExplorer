var university = ["Oxford University","Harvard University","Cambridge University","Stanford University","Massachusetts Institue of Technology","California Institue of Technology","Princeton University","Berkeley, University of California","Yale University","Imperial College London","Columbia University","ETH Zurich","Chicago University","Pennsylvania University","Johns Hopkins University","Tsinghua University","Peking University","Toronto University","Singapore National University","Cornell University","Los Angeles, University of California","UCL London","Michigan-Ann Arbor University","New York University","Duke University","Northwestern University","Washington University","Carnigie Mellon University","Edinburgh University","Munich Technical University","Hong Kong University","San Diego, California University","LMU Munich","Melbourne University","Kings College London","Nanyang Technological University","London School of Economics and Political Science","Georgia Institute of Technology","Tokyo University","British Columbia University","Ecole Polytechnique Federale de Lausanne","KU Leuven","Heidelberg Universitat","Monash University","Chinese University of Hong Kong","McGill University","PSL Research University Paris","Urbana-Champaign University of Illinois","Texas at Austin University","Karolina Institute","Fudan University","Shanghai Jiao Tong University","Queensland University","Manchester University","Sydney University","Seoul National University","Washington University in St Louis","Hong Kong University of Science and Technology","Wageningen University and Research","Amsterdam University","Brown University","Australian National University","Santa Barbara, University of California","Southern California University","Utrect University","Zhejiang University","Kyoto University","Chapel Hill University of North Carolina","Delft University of Technology","Boston University","UNSW Sydney","Charite Universitatsmedizin Berlin","China University of Science and Technology","Groningen University","Bristol University","Leiden University","Yonsei University","Hong Kong Polytechnic University","Erasmus University Rotterdam","Wisconsin-Madison University","Emory University","Glasgow University","Zurich University","McMaster University","Humboldt University of Berlin","Tubingen University","Adelaide University","Bonn University","Sorbonne University","Free University of Belin","KAIST Korea Advanced Institute of Science and Technology","Paris-Saclay Universite","Bern University","Ivine, Universtity of California","Intsitut Polytechnique de Paris","Nanjing University","Vanderbilt University","Hong Kong City University","RWTH Aachen University"]
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

/* Autocompleate search "on" */
autocomplete(document.getElementById("myInput"), university);
