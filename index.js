// con la DOM Manipulation noi potremo ALTERARE il contenuto della pagina GIA' precedentemente creata
// potremo quindi INSERIRE/MODIFICARE/ELIMINARE qualsiasi cosa renderizzata al suo interno!
// possiamo anche quindi fare modifiche nel tempo anche a partire da una interazione con l'utente (es. il click su un elemento)

// !!! IMPORTANTE !!!
// il processo si compone di DUE FASI:

// 1) SELEZIONE dell'elemento (DOM Traversing) - prima seleziono l'elemento che mi interessa
// 2) MANIPOLAIZONE dell'elemento (DOM Manipulation) - poi lo modifico effettivamente per stile...contenuto...presenza nella pagina

// per selezionare i nostri elementi faremo SEMPRE riferimento a dei metodi che il browser ci ha fornito,
// e tipicamente partiremo dal nostro elemento principale: document

// il document rappresenta l'intera pagina.
// dentro di sé ha contenute le informazioni che lo riguardano e quelle dei figli che contiene

// __________ METODI DI SELEZIONE _________________________________________________________________
// 1) SELEZIONE PER ID

// .getElementById(string) - cercherà un singolo elemento con un determinato id, vuole una stringa come argomento
const menu = document.getElementById("menu"); // se troverà una corrispondenza ci tornerà il NODO dell'elemento, altrimenti null se non ha trovato nulla
console.log(menu); // questo ci ritorna una vista a tag HTML nella console
console.dir(menu); // questo ci ritorna una vista, stile cartella (directory), con cui possiamo visualizzare l'elemento come oggetto
//  e relative proprietà che lo compongono

// 2) SELEZIONE PER CLASSE
// tutti i metodi con la "s" per elementS nel nome, ritornano una HTMLCollection di NODI
// bisognerà quindi selezionare gli elementi prima di poterli modificare, o direttamente o tramite un ciclo
const allTheBodyText = document.getElementsByClassName("body-text");
console.log(allTheBodyText);
console.log(allTheBodyText[0]);

// in questo modo stiamo selezionado un elemento tramite la sua classe, ma siccome il metodo ci torna una HTMLCollection,
// selezioniamo già il primo e unico elemento prima di salvarlo nella variabile
// così la variabile conterrà già da subito l'elemento che ci interessa
const mainTitle = document.getElementsByClassName("main-title")[0];
console.log(mainTitle);

// 3) SELEZIONE PER TAG NAME
const main = document.getElementsByTagName("main")[0];
console.log(main);

const allLis = document.getElementsByTagName("li");
console.log(allLis);

// con il metodo getElementsByTagName otteniamo una lista, che andremo poi a ciclare per AVERE ACCESSO ai singoli elementi interni alla lista
for (let i = 0; i < allLis.length; i++) {
  console.log(allLis[i]); // qui ho accesso all'elemento
}

// HTMLCollection non ha la possibilità di essere ciclata tramite metodi avanzati degli array
// A MENO CHE.... non si converta la lista semplice in un VERO array
Array.from(allLis).forEach(li => console.log("FOREACH", li));

// METODI DI SELEZIONE PIU' RECENTI

// VANTAGGI: facilità di utilizzo, e la possibilità di usare selettori CSS avanzati
// SVANTAGI: più pesanti a livello di performance

// 4) .querySelector(stringa di selettore CSS)
// BISOGNA RICORDARSI dei simboli di selezione di CSS (. e #)
// il query selector torna già il PRIMO ELEMENTO che trova, non una collezione di elementi su cui selezionare una posizione!

const loneWolf = document.querySelector(".lone-wolf");
console.log(loneWolf);
const loneWolfSpan = document.querySelector(".lone-wolf span");
console.log(loneWolfSpan);

const mainTitleWithQS = document.querySelector(".main-title");
console.log(mainTitleWithQS);

const menuWithQS = document.querySelector("#menu"); // utilizzo di qualsiasi selettore CSS avanzato in combinazione col querySelector
console.log(menuWithQS);
const liInMmenuWithQS = document.querySelector("#menu li:nth-child(3)"); // utilizzo di qualsiasi selettore CSS avanzato in combinazione col querySelector
console.log(liInMmenuWithQS);
// 5) .querySelectorAll(stringa di selettore CSS)
// BISOGNA RICORDARSI dei simboli di selezione di CSS (. e #)
// il query selector torna una NodeList che dovremo eventualmente ciclare (è presente il forEach, ma NON map..filter..ecc)

const allLisWithQS = document.querySelectorAll("li");
console.log(allLisWithQS);

const allBodyTextWithQS = document.querySelectorAll(".body-text");
console.log(allBodyTextWithQS);
allBodyTextWithQS.forEach(p => console.log(p)); // con la NodeList possiamo usare il forEach

// partire da un elemento per selezionare dei figli più interni (senza partire dal document)
// questo è un metodo per scendere ulteriormente nella ricerca di nodi più interni, a partire da un elemento già trovato
const firstMainLi = main.querySelector("li");
console.log(firstMainLi);

// METODI PER RISALIRE L'ALBERO DI NODI

// .parentNode (è la proprietà associata al nodo, NON E' un metodo!)
console.dir(menuWithQS);
console.log(menuWithQS.parentNode.parentNode); // risaliamo di due livelli fino ad arrivare al tag <header>
// risaliamo di due livelli, arrivando al tag main, per poi scendere a selezionare l'h1
// tre metodi validi per risalire e poi scendere di un livello
console.dir(firstMainLi.parentNode.parentNode.firstElementChild);
console.dir(firstMainLi.parentNode.parentNode.querySelector("h1"));
console.dir(firstMainLi.parentNode.parentNode.children[0]);

// .closest(css selector) - è un metodo che si applica a qualsiasi nodo del DOM e chiede un selettore CSS per
// cercare verso l'alto il primo match con quel selettore
console.log(liInMmenuWithQS.closest(".nav-menu"));
console.log(liInMmenuWithQS.closest("header")); // è come scrivere liInMmenuWithQS.parentNode.parentNode.parentNode

// ___________ MANIPOLAZIONE DEGLI ELEMENTI ____________________________________________________________________

// MODIFICA DI STILE attraverso la proprietà style esistente su un qualsiasi nodo del DOM

// applicazione di stili attraverso proprietà dell'oggetto style:
// loneWolf.style.backgroundColor = "palegreen";
// loneWolf.style.fontSize = "20px";
// loneWolf.style.letterSpacing = "2px";

// applicazione di stile sovrascrivendo la proprietà style con una stringa (come se fosse l'attributo style di un tag html)
loneWolf.style = "background-color: palegreen; font-size: 20px; letter-spacing: 2px";

// MODIFICA DEL CONTENUTO, attraverso innerText (per solo testo) e innerHTML (per valutare anche del codice html)
loneWolf.innerText = "TI HO CAMBIATO AHAHAHAH"; // innerText per aggiungere semplice testo
loneWolf.innerHTML = `Lorem ipsum, dolor sit <span style="color: red">amet consectetur adipisicing elit</span>. Tenetur vitae, enim beatae cumque
tempora commodi
natus alias dignissimos quaerat officiis! Asperiores,<strong> ab saepe nihil</strong> quisquam odit repellat aspernatur
veniam laudantium!
Dignissimos, beatae iure!`;
// innerHTML per inserire stringa contenente tag HTML che verranno interpretati e generati nella pagina

const toBeRemoved = document.getElementById("to-be-removed");
console.dir(toBeRemoved);

// toBeRemoved.className = "temporary-class"; // questo metodo SOVRASCRIVE L'INTERA CLASSE dell'elemento
toBeRemoved.classList.add("temporary-class"); // con questo metodo riusciamo ad aggiungere una classe senza sovrascrivere le altre già presenti
toBeRemoved.classList.remove("another-class"); // con questo metodo riusciamo ad aggiungere una classe senza sovrascrivere le altre già presenti

// il setTimeout eseguirà la funzione dopo 1000ms (1s)

// cambiamo testo dopo 1 secondo
setTimeout(() => {
  toBeRemoved.innerText = " me ne sto per andare...";
}, 1000);

// dopo un altro secondo l'elemento scomparirà per via dell'applicazione della classe hidden creata in precedenza nel nostro CSS
setTimeout(() => {
  toBeRemoved.classList.add("hidden");
}, 2000);

// CREAZIONE DI NUOVI ELEMENTI

const newDiv = document.createElement("div"); // creazione IN MEMORIA di un elemento di tipo "div"
// modifica dei connotati di questo nuovo elemento...
newDiv.className = "new-div";
newDiv.id = "lone-div";

console.log(newDiv);

const newP = document.createElement("p");
newP.innerText = "SONO IL NUOVO ELEMENTO lorem ipsum sit dolor....";
newP.style.color = "white";
newP.style.backgroundColor = "red";

newDiv.appendChild(newP); // inserimento di <p> dentro a <div>

// metodo per l'inserimento di nodi all'interno della pagina
// .appendChild(node)
// l'inserimento di un nuovo nodo in uno già presente nella pagina, decreterà la sua esistenza
main.appendChild(newDiv); // inserimento di div (con p all'interno) dentro <main>

// Creiamo una nuova immagine
const image = document.createElement("img");
image.src = "https://images.unsplash.com/photo-1709991014067-756232b4ca96?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
image.alt = "racing car goodyear tire";
image.width = "300";
console.log(image);

// seleziono il contenitore dove andare ad inserire l'immagine
const imageContainer = document.getElementById("image-wrapper");
imageContainer.appendChild(image);

// Creazione di un link
const link = document.createElement("a");
link.href = "https://epicode.com";
link.target = "_blank";
link.innerText = "Go to Epicode -->";

// applicazione di attributo custom
link.setAttribute("data-custom-attribute", "test");

document.body.appendChild(link);

// lettura di attributo
console.log(link.href);
console.log(link.getAttribute("data-custom-attribute"));

// applicazione di evento di tipo "click"

//1) seleziono l'elemento
const button = document.querySelector("button");
console.dir(button);

//2) applicazione di una funzione all'evento onclick
button.onclick = function () {
  // questa funzione scatterà solo quando il browser rileverà un click sul bottone

  //   image.classList.add("hidden"); // nasconde solamente l'elemento
  image.remove(); // rimuove il nodo completamente (cesserà di esistere)

  allLisWithQS.forEach(li => li.remove()); // rimuove tutti i "li" precedentemente selezionati nella pagina
};
