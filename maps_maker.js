var fs = require('fs')

let PoleToID = new Array(["Bureau" , 1], [ 
"Pôle Alternatif" , 2], [
"Pôle Classique" , 3], [
"Pôle Ciné" , 4], [
"Pôle Comédie Musicale" , 5], [
"Pôle Sorties/Expos/Arts du spectacle" , 6], [
"Pôle Culinaire" , 7], [
"Pôle Jam-Jazz" , 8], [
"Pôle Littérature" , 9], [
"Pôle Opéra/Ballet" , 10], [
"Pôle Théâtre" , 11], [
"Pôle Salle Ins/Salle Piano" , 12], [
"Pôle Radio" , 13], [
"Pôle Rap" , 14], [
"Pôle Mode" , 15], [
"Pôle Stand-up" , 16], [
"Pôle Comm'" , 17], [
"Pôle RSI" , 18]);


var IDToPole = new Array()

for (let pole of PoleToID) {
    IDToPole.push([pole[1], pole[0]]);
}

fs.writeFile("IDToPole.json", JSON.stringify(IDToPole));
fs.writeFile("PoleToID.json", JSON.stringify(PoleToID));