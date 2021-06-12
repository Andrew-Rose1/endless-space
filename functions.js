// clicker: hashmap for variables that need updating
    var clicker = {
      gold:0,
      total_gps:0,
      upgrades: {
        factorio_machine: {
          amount:0,
          default_cost:10,
          cost:10,
          gps:1,
          name:"Factorio Assmebly Machine MK1"
        },
        factorio_machine2: {
          amount:0,
          default_cost:10,
          cost:10,
          gps:10,
          name:"Factorio Assmebly Machine MK2"
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


// reset_progress(): Resets the game's statistics.
// This function is called when you hit the reset button (located in h3 tag at the bottom of this code).
    function reset_progress(){
      for (i in clicker.upgrades) {
        clicker.upgrades[i].amount = 0;
        clicker.upgrades[i].cost = clicker.upgrades[i].default_cost;
      }
      clicker.gold = 0;
      clicker.total_gps = 0;
      update_upgrades();
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


// update_upgrades(): Placeholder for all upgrade buttons. Will pass in the desired upgrade into something_clicked(something).
//This function is placed in the 'upgrades' div near the bottom of the code.
    function update_upgrades() {
      document.querySelector("#upgrades").innerHTML=""
      for (i in clicker.upgrades) {
        document.querySelector("#upgrades").innerHTML+= `<br> <button onclick="something_clicked('${i}')">${clicker.upgrades[i].name}</button> you have ${clicker.upgrades[i].amount}. Cost: ${clicker.upgrades[i].cost}. Generating: ${clicker.upgrades[i].gps * clicker.upgrades[i].amount} gps`;
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
      update_upgrades();
      setInterval(() => {
        for(i in clicker.upgrades) {
          // Divided by 20 because 50ms in a 20th of a second
          clicker.gold+=clicker.upgrades[i].amount * clicker.upgrades[i].gps/20;
        }
        document.querySelector("#gold").innerHTML = "Current gold: " + String(clicker.gold).split(".")[0];
        document.querySelector("#total_gps").innerHTML = "Current gps: " + String(clicker.total_gps).split(".")[0];
        save_game();
      }, 50);
    }