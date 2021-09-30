// Pour une présentation de notre séléction littéraire
// nous utilisons un page web il nous faut donc la libraire http
// afin de créer notre serveur
const http = require("http");

// Formater la date de parution
const dayjs = require("dayjs");
// Plugin dayjs pour la gestion des intervalles de dates
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Plugin dayjs pour la gestion du format local des dates
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

// Traduction en français
require('dayjs/locale/fr');
// Définition de la locale par défaut
dayjs.locale('fr');

// Séléction de livres incontournables
const books = [
  {
    title: "The Fellowship of the Ring",
    language: "English",
    country: "United Kingdom",
    author: "J.R.R. Tolkien",
    date: "1954-07-29",
  },
  {
    title: "Prelude to foundation",
    language: "English",
    country: "United States",
    author: "Isaac Asimov",
    date: "1988-11-08",
  },
  {
    title: "Voyage au centre de la terre",
    language: "Français",
    country: "France",
    author: "Jules Verne",
    date: "1864-11-25",
  },
  {
    title: "La nuit des temps",
    language: "Français",
    country: "France",
    author: "René Barjavel",
    date: "1968-05-20",
  },
  {
    title: "Carrion Comfort",
    language: "English",
    country: "United States",
    author: "Dan Simmons",
    date: "1989-02-15",
  },
];

// Création de notre serveur
const server = http.createServer((req, res) => {
  // On court-circuite l'appel automatique du navigateur au favicon.ico
  // sinon l'appel au script ce fera 2 fois et il ecrira "Hum, 50 alors ?" dedans
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }

  // On envoi les header de la réponse http
  // ici nous voulons une réponse de type text encodé en UTF-8
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  // On écrit l'entête de notre page html
  res.write(
    '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge">    <title>BookShelf</title></head><body style="background-color: grey;">'
  );

  let table = "";

  table += `
    <table>
      <thead>
          <tr style="text-align: center;">
            <th>Titre</th>
            <th>Langue</th>
            <th>Pays</th>
            <th>Auteur</th>
            <th>Date</th>
            <th>Age du livre</th>
          </tr>
      </thead>
      <tbody>
    `;

  for (let i = 0; i < books.length; i++) {
    table += `
      <tr>
        <td>${books[i].title}</td>
        <td>${books[i].language}</td>
        <td>${books[i].country}</td>
        <td>${books[i].author}</td>
        <!-- Formatage de la date avec dayjs-->
        <td>${dayjs(books[i].date).format("LL")}</td>
        <!-- Age du livre -->
        <td>${dayjs(books[i].date).fromNow()}</td>
      </tr>
    `;
  }

  table += `
      </tbody>
    </table>
  `;

  // Corps de la page
  res.write(table);

  // On écrit le pied de page de notre page html
  res.write("</body></html>");

  // On à fini d'envoyer nos informations au client
  res.end();
});

// Notre serveur sera sur le port 3000
server.listen(3000);
