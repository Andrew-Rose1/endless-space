// clicker: hashmap for variables that need updating
    var clicker = {
      gold:0,
      total_gps:0,
      clicks: {
        multiplier: 1,
        cost: 500,
        default_cost: 500,
        name: "Clicker Multiplier"
      },
      upgrades: {
        upgrade_1: {
          amount:0,
          default_cost:40,
          cost:40,
          default_gps:1,
          gps:1,
          name:"Manual Labor"
        },
        upgrade_2: {
          amount:0,
          default_cost:125,
          cost:125,
          default_gps:3,
          gps:3,
          name:"Excavator"
        },
        upgrade_3: {
          amount:0,
          default_cost:1000,
          cost:1000,
          default_gps:9,
          gps:9,
          name:"Excavator"
        },
        upgrade_4: {
          amount:0,
          default_cost:11000,
          cost:11000,
          default_gps:55,
          gps:55,
          name:"Excavator"
        }
      },
      eff_upgrades: {
        upgrade_1: {
          amount:0,
          default_cost:250,
          cost:250,
          multiplier:2,
          name:"Jackhammers"
        },
        upgrade_2: {
          amount:0,
          default_cost:1250,
          cost:1250,
          multiplier:2,
          name:"Mine Carts"
        },
        upgrade_3: {
          amount:0,
          default_cost:10000,
          cost:10000,
          multiplier:2,
          name:"Mine Carts"
        },
        upgrade_4: {
          amount:0,
          default_cost:11000,
          cost:110000,
          multiplier:2,
          name:"Mine Carts"
        }
      }
    };
    var delay = 0;


// calculate_totalgps(): Calculates the sum of all upgrades' gps.
// This function is called inside of something_clicked(), right before update_upgrades() is called.
    function calculate_totalgps(){
      clicker.total_gps = 0;
      for (i in clicker.upgrades) {
        clicker.total_gps += clicker.upgrades[i].amount * clicker.upgrades[i].gps;
      }
    }


    function increase_click_mult() {
      if (clicker.clicks.cost <= clicker.gold) {
        clicker.gold -= clicker.clicks.cost;
        clicker.clicks.multiplier *= 2;
        clicker.clicks.cost += Math.round(clicker.clicks.cost*5)
        update_eff_clicks();
      }
    }

    function update_eff_clicks() {
      document.querySelector("#eff_click_h").innerHTML = clicker.clicks.name;
      document.querySelector("#eff_click_cost").innerHTML = "Cost: " + numberformat.format(Number(String(clicker.clicks.cost)));
      document.querySelector("#eff_click_mult").innerHTML = "Total per click: " + numberformat.format(Number(String(clicker.clicks.multiplier)));
    }


// reset_progress(): Resets the game's statistics.
// This function is called when you hit the reset button (located in h3 tag at the bottom of this code).
    function reset_progress(){
      for (i in clicker.upgrades) {
        clicker.upgrades[i].amount = 0;
        clicker.upgrades[i].gps = clicker.upgrades[i].default_gps;
        clicker.upgrades[i].cost = clicker.upgrades[i].default_cost;
      }
      for (i in clicker.eff_upgrades) {
        clicker.eff_upgrades[i].amount = 0;
        clicker.eff_upgrades[i].cost = clicker.eff_upgrades[i].default_cost;
      }
      clicker.gold = 0;
      clicker.total_gps = 0;
      clicker.clicks.cost = clicker.clicks.default_cost;
      clicker.clicks.multiplier = 1;
      update_eff_clicks();
      update_upgrades();
      update_eff_upgrades();
    }


// somethingclicked(something): Updates the statistics for whatever object is passed into it (eg. upgrades).
// This function is called when one of the buttons inside of the 'upgrades' div is pressed. Function will then update the total gp and 'upgrades' div text.
    function something_clicked(something){
      if(clicker.upgrades[something].cost <= clicker.gold){
        clicker.gold-= clicker.upgrades[something].cost;
        clicker.upgrades[something].amount++;
<!-- "The multuply by 0.15 is the price increase per upgrade cost" -->
        clicker.upgrades[something].cost += Math.round(clicker.upgrades[something].cost*0.15)
        calculate_totalgps();
        update_upgrades();
      }
    }


// somethingclicked(something): Updates the statistics for whatever object is passed into it (eg. upgrades).
// This function is called when one of the buttons inside of the 'upgrades' div is pressed. Function will then update the total gp and 'upgrades' div text.
    function eff_upgrade_purchases(something){
      if(clicker.eff_upgrades[something].cost <= clicker.gold){
        clicker.gold-= clicker.eff_upgrades[something].cost;
        clicker.eff_upgrades[something].amount++;
        clicker.upgrades[something].gps *= clicker.eff_upgrades[something].multiplier
        clicker.eff_upgrades[something].cost += Math.round(clicker.eff_upgrades[something].cost*4.5)
        calculate_totalgps();
        update_eff_upgrades();
        update_upgrades();
      }
    }

// THIS WAS THE ONE THAT USED THE FOR LOOP. EVENTUALLY MAKE IT INTO THIS FORMAT.
// update_upgrades(): Placeholder for all upgrade buttons. Will pass in the desired upgrade into something_clicked(something).
//This function is placed in the 'upgrades' div near the bottom of the code.
//    function update_upgrades() {
//      document.querySelector("#upgrades").innerHTML=""
//      for (i in clicker.upgrades) {
//        document.querySelector("#upgrades").innerHTML+= `<br> <button onclick="something_clicked('${i}')">${clicker.upgrades[i].name}</button> you have ${clicker.upgrades[i].amount}. Cost: ${numberformat.format(Number(String(clicker.upgrades[i].cost)))}. Generating: ${ numberformat.format(Number(String(clicker.upgrades[i].gps * clicker.upgrades[i].amount)))} gps`;
//      }
//    }


    function update_upgrades() {
      var counter = 1;
      for (i in clicker.upgrades) {
        j = "up" + counter
        document.querySelector("#" + j + "_h").innerHTML = clicker.upgrades[i].name;
        document.querySelector("#" + j + "_cost").innerHTML = "Cost: " + numberformat.format(Number(String(clicker.upgrades[i].cost)));
        document.querySelector("#" + j + "_amount").innerHTML = "Amount: " + numberformat.format(Number(String(clicker.upgrades[i].amount)));
        document.querySelector("#" + j + "_gps").innerHTML = "Generating " + numberformat.format(Number(String((clicker.upgrades[i].gps * clicker.upgrades[i].amount)))) + " gps";

        counter++;
      }
    }
/*  OLD CODE THAT WAS NOT ITTERATIVE
      var counter = 1;
      i = "factorio_machine"
      j = "up" + counter
      document.querySelector("#" + j + "_h").innerHTML = clicker.upgrades[i].name;
      document.querySelector("#" + j + "_cost").innerHTML = "Cost: " + numberformat.format(Number(String(clicker.upgrades[i].cost)));
      document.querySelector("#" + j + "_amount").innerHTML = "Amount: " + numberformat.format(Number(String(clicker.upgrades[i].amount)));
      document.querySelector("#" + j + "_gps").innerHTML = "Generating " + numberformat.format(Number(String((clicker.upgrades[i].gps * clicker.upgrades[i].amount)))) + " gps";
      i = "factorio_machine2"
      j = "up2"
      document.querySelector("#" + j + "_h").innerHTML = clicker.upgrades[i].name;
      document.querySelector("#" + j + "_cost").innerHTML = "Cost: " + numberformat.format(Number(String(clicker.upgrades[i].cost)));
      document.querySelector("#" + j + "_amount").innerHTML = "Amount: " + numberformat.format(Number(String(clicker.upgrades[i].amount)));
      document.querySelector("#" + j + "_gps").innerHTML = "Generating " + numberformat.format(Number(String((clicker.upgrades[i].gps * clicker.upgrades[i].amount)))) + " gps";
*/


// THIS WAS THE ONE THAT USED THE FOR LOOP. EVENTUALLY MAKE IT INTO THIS FORMAT.
// update_upgrades(): Placeholder for all upgrade buttons. Will pass in the desired upgrade into something_clicked(something).
//This function is placed in the 'upgrades' div near the bottom of the code.
//    function update_eff_upgrades() {
//    document.querySelector("#eff_upgrades").innerHTML=""
//    for (i in clicker.eff_upgrades) {
//      document.querySelector("#eff_upgrades").innerHTML+= `<br> <button onclick="eff_upgrade_purchases('${i}')">${clicker.eff_upgrades[i].name}</button> you have ${clicker.eff_upgrades[i].amount}. Cost: ${numberformat.format(Number(String(clicker.eff_upgrades[i].cost)))}. Total multiplier: ${clicker.eff_upgrades[i].multiplier * clicker.eff_upgrades[i].amount}`;
    //  }
    //}

    function update_eff_upgrades() {
      var counter = 1;
      for (i in clicker.eff_upgrades) {
        j = "up" + counter
        document.querySelector("#eff_" + j + "_h").innerHTML = clicker.eff_upgrades[i].name;
        document.querySelector("#eff_" + j + "_cost").innerHTML = "Cost: " + numberformat.format(Number(String(clicker.eff_upgrades[i].cost)));
        document.querySelector("#eff_" + j + "_amount").innerHTML = "Amount: " + numberformat.format(Number(String(clicker.eff_upgrades[i].amount)));
        document.querySelector("#eff_" + j + "_multiplier").innerHTML = "Multiplier: x" + (clicker.eff_upgrades[i].multiplier ** clicker.eff_upgrades[i].amount).toFixed(2);

        counter++;
      }
    }

/*  OLD CODE THAT WAS NOT ITTERATIVE
        i = "factorio_machine"
        document.querySelector("#MK1_h").innerHTML = clicker.eff_upgrades[i].name;
        document.querySelector("#MK1_cost").innerHTML = "Cost: " + numberformat.format(Number(String(clicker.eff_upgrades[i].cost)));
        document.querySelector("#MK1_amount").innerHTML = "Amount: " + numberformat.format(Number(String(clicker.eff_upgrades[i].amount)));
        document.querySelector("#MK1_multiplier").innerHTML = "Multiplier: " + numberformat.format(Number(String((clicker.eff_upgrades[i].multiplier ** clicker.eff_upgrades[i].amount))));

        i = "factorio_machine2"
        document.querySelector("#MK2_h").innerHTML = clicker.eff_upgrades[i].name;
        document.querySelector("#MK2_cost").innerHTML = "Cost: " + numberformat.format(Number(String(clicker.eff_upgrades[i].cost)));
        document.querySelector("#MK2_amount").innerHTML = "Amount: " + numberformat.format(Number(String(clicker.eff_upgrades[i].amount)));
        document.querySelector("#MK2_multiplier").innerHTML = "Multiplier: " + numberformat.format(Number(String(clicker.eff_upgrades[i].multiplier)));
        //i = "factorio_machine2"
        //document.querySelector("#eff_MK2").innerHTML+= `<br> <onclick="eff_upgrade_purchases('${i}')">${clicker.eff_upgrades[i].name}</button> you have ${clicker.eff_upgrades[i].amount}. Cost: ${numberformat.format(Number(String(clicker.eff_upgrades[i].cost)))}. Total multiplier: ${clicker.eff_upgrades[i].multiplier * clicker.eff_upgrades[i].amount}`;

    //  }
    }
*/

//var modal = document.getElementById('simpleModal');
const modal = document.querySelector('#mainSystem');
const modalBtn = document.querySelector('#mapBtn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
modal.style.display = 'block';
}

// Close
function closeModal() {
modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
if (e.target == modal) {
  modal.style.display = 'none';
}
}




// load_game():
    function load_game() {
      if(localStorage.getItem('clicker') != null && localStorage.getItem('clicker') != "undefined"){
        var clicker1 = JSON.parse(localStorage.getItem('clicker'));
        for(i in clicker.upgrades){
          if(clicker1.upgrades[i] == null){
            clicker1.upgrades[i] = clicker.upgrades[i];
          }
        }
        clicker = clicker1;
      }
    }


// save_game():
    function save_game() {
      delay++;
      if(delay >= 40){
        localStorage.setItem('clicker', JSON.stringify(clicker));
        delay = 0;
      }
    }


// updateCount(): Calls load_game, save_game, update_upgrades and updates the player's total gold. Then updates the h1 and h3 tags for total gold and total gps respectively.
// This function is called once onload in the body tag, and runs ever 50ms using setInterval.
    function updateCount(){
      load_game();
      update_eff_clicks();
      update_upgrades();
      update_eff_upgrades();
      setInterval(() => {
        for(i in clicker.upgrades) {
          // Divided by 20 because 50ms in a 20th of a second
          clicker.gold+=clicker.upgrades[i].amount * clicker.upgrades[i].gps/20;
        }
        document.querySelector("#gold").innerHTML = "Current gold: " + numberformat.format(Number(String(clicker.gold)));
        document.querySelector("#total_gps").innerHTML = "Current gps: " +  numberformat.format(Number(String(clicker.total_gps)));
        save_game();
      }, 50);
    }
