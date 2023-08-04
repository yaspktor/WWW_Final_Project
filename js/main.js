var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var ile = 0;
var pw = false; //tryb hasla
let pwd = false;
var commands = []; 

setTimeout(function() { 
  loopLines(baner, "", 80);
  textarea.focus();  
}, 100);


addLine("   <br>", "no-animation", 1200);
//input
window.addEventListener("keyup", enterKey);

//sekret
console.log(
  "%cHaslo: zaq1@WSX ",
  "color: #04ff00; font-weight: bold; font-size: 24px;"
);

//init
textarea.value = "";
command.innerHTML = textarea.value;
console.log();

//Po kliknieciu

function enterKey(e) {
 
  //TODO mozliwosc pisania bez klikania w pole tekstowe
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  //jesli tryb hasla
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (textarea.value === password) { // jesli dobre haslo
      pwd = true;
    }
    if (pwd && e.keyCode == 13) { //po enterze obsluga poprawnosi hasla
      loopLines(secret, "color2 margin", 120);
      command.innerHTML = "";
      textarea.value = "";
      pwd = false;
      pw = false;
      liner.classList.remove("password");
      //obsługa złego hasła
    } else if (e.keyCode == 13) {
      addLine("Błędne hasło.", "error", 0);
      command.innerHTML = "";
      textarea.value = "";
      pw = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML); //dodanie do tablicy listy uzytych komend
      ile = commands.length; // ile uzyto komend
      addLine("zaq1@my-terminal:~$ " + command.innerHTML, "no-animation", 0);
      //console.log("zaq1@Terminal:~$ " + command.innerHTML);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    //dzialanie strzalek, czyli wyciąganie z wcześniej utworzonej tablicy odpowiednich elementów 
    if (e.keyCode == 38 && ile != 0) {
      ile -= 1;
      textarea.value = commands[ile];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && ile != commands.length) {
      ile += 1;
      if (commands[ile] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[ile];
      }
      command.innerHTML = textarea.value;
    }
  }
}
//ogólna obsługa uzywanych komend za pomocą funkcji 
function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "muzyka":
      addLine('Włączanie muzyki...', "color2", 80);
      document.getElementById("music").src = "zasoby/music.mp3";
      document.getElementById('audio').load();
      play();
      break;
    case "wycisz":
      addLine('Wyłączanie muzyki...', "color2", 80);
      mute();
      break;
    case "wyłącz tło":
      addLine("Wyłączanie tła...", "color2", 80);
      document.getElementById("full").style="filter:opacity(0%);";
      document.getElementById("window").style = "background: rgba(33, 29, 27, 1);";
      break;
    case "tło":
      addLine("Włączanie tła...", "color2", 80);
      document.getElementById("full").style="filter:opacity(70%);";
      document.getElementById("window").style = "background: rgba(0, 0, 0, 0.705);";
      break;  
    case "o stronie":
      loopLines(ostronie, "color2 margin", 80);
      break;    
    case "sudo":
      addLine("Niestety nie jesteś administratorem...", "error", 80);       
      break;
    case "sekret":
      liner.classList.add("password");
      pw = true;
      break;
    case "projekty":
      loopLines(projekty, "error margin", 80);
      break;
    case "hasło":
      addLine("<span class=\"inherit\"> Szukaj dalej </span>", "error", 100);
      break;
    case "historia":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine("<br>", "", 10);
      addLine('Brak danych', "color2 margin", 80);
      addLine("<br>", "", 100);
      textarea.value = "";
      break;
    case "baner":
      loopLines(baner, "no-animation", 80);
      addLine(baner[1], "no-animation", 1100);
      textarea.focus();
      break;
    case "alert": //bootstrap
      addLine("Wyświetlanie aletru...", "color2", 80);
      addLine("<br>","no-animation",120);
      const toastLive = document.getElementById('liveToast');
      const toast = new bootstrap.Toast(toastLive);
      toast.show();
        break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "sortowanie":
      const cond = document.getElementById('array') || false
      if (cond) {
        const newItem = document.createElement('div');
        // newItem.className = "podmiana";
        // newItem.innerHTML = "Posortowana"
        document.getElementById('array').parentNode.replaceChild(newItem, document.getElementById('array'));
        //document.getElementById('array').remove();
      } else {
          console.log("ok");
      } 
        addLine("Generowanie danych...", "color2", 80);
        addLine("<div id='array'></div>","no-animation",120);
        addLine("<br>","no-animation",120);
        // generator
        setTimeout(function() {
          generatearray();
          BubbleSort();
        }, 1300); 
        addLine("Sortowanie...", "color2", 80);
      // bubble
         break;
    case "ip":
        addLine("Twój adres ip to...", "color2", 0);
        loopLines(ip, "no-animation inherit", 80);
        $.getJSON("https://api.ipify.org?format=json", function (data) {
        $(".ip").text(data.ip);
        });
        addLine("<br>", "color2", 0);
        break;
    default:
        addLine("<span class=\"inherit\">Błędna komenda, aby wyświetlić listę dostępnych komend wpisz <span class=\"command\">'help'</span>.</span>", "error", 100);
        break;
  }
}

//dodanie linii
function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t; //dodanie zawartosci
    next.className = style; //dodanie stylu wczesniej opisanego w css

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.getElementById("window").offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style,  index * time); //kazdy element tablicy pojawia sie w czasie po sobie
  });
}

//audio 
var audioeo = document.getElementById("audio");
function play(){
    if(document.getElementById("audio").muted===true){
        document.getElementById('audio').play() 
        document.getElementById("audio").muted=false
    }
    else{
        
        document.getElementById("audio").pause()
        document.getElementById("audio").muted=true  
    }   
}

function mute(){
  document.getElementById('audio').play() 
  document.getElementById("audio").muted=true;
}


//-----------Sortowanie bąbelkowe------------------
//generoqwanie
function generatearray() {
  var kontener = document.getElementById("array");
	for (var i = 0; i < 20; i++) {
		var wartosc = Math.ceil(Math.random() * 100);
		// tworzenie diva
		var element_tablicy = document.createElement("div");
		// dodanie klasy block
		element_tablicy.classList.add("block");
		// dodanie cssa
		element_tablicy.style.height = `${wartosc * 3}px`;
		element_tablicy.style.transform = `translate(${i * 30}px)`; 
		// rozmiar
		var element_label = document.createElement("label");
		element_label.classList.add("block_id");
		element_label.innerText = wartosc;
		element_tablicy.appendChild(element_label);
		kontener.appendChild(element_tablicy);
	}
}

// swap 
function swap(el1, el2) {
  var kontener = document.getElementById("array");
	return new Promise((resolve) => {
		// zamiana stylów dwóch bloków
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;
		window.requestAnimationFrame(function() {
			// wait 
			setTimeout(() => {
				kontener.insertBefore(el2, el1);
				resolve();
			}, 150);
		});
	});
}

// buble sort async
// faktyczny algorytm sortowania 
async function BubbleSort(delay = 10) {
	var bloki = document.querySelectorAll(".block");
  var kontener = document.getElementById("array");
	// algorytm
	for (var i = 0; i < bloki.length; i += 1) {
		for (var j = 0; j < bloki.length - i - 1; j += 1) {
			// zmiana tla
			// porownanych blokow
			bloki[j].style.backgroundColor = "#FF4949";
			bloki[j + 1].style.backgroundColor = "#FF4949";
			// w8 1s
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);
			//console.log("run");
			var wart1 = Number(bloki[j].childNodes[0].innerHTML);
			var wart2 = Number(bloki[j + 1]
						.childNodes[0].innerHTML);
			// porownanie wartosci 2 blokow
			if (wart1 > wart2) {
				await swap(bloki[j], bloki[j + 1]);
				bloki = document.querySelectorAll(".block");
			}
			// zmiana koloru pierwszego
			bloki[j].style.backgroundColor = "#6b5b95";
			bloki[j + 1].style.backgroundColor = "#6b5b95";
		}
		//zmiana koloru wiekszegho	
		bloki[bloki.length - i - 1]
				.style.backgroundColor = "#13CE66";
	}
}