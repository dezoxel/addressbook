'use strcit'

angular.module('addressbookApp')
  .service('Addressbook', function() {
    var _data = [
      {
        "id": 1,
        "name": "Laura Morin",
        "address": "P.O. Box 825, 7962 Ante, Ave"
      },
      {
        "id": 2,
        "name": "Teegan Medina",
        "address": "757-3869 Non St."
      },
      {
        "id": 3,
        "name": "Nina Guy",
        "address": "P.O. Box 241, 3444 Purus, Road"
      },
      {
        "id": 4,
        "name": "Elmo Frazier",
        "address": "4989 Proin Rd."
      },
      {
        "id": 5,
        "name": "Nyssa Leonard",
        "address": "387-6263 Pede. Av."
      },
      {
        "id": 6,
        "name": "Dexter Christian",
        "address": "967-8847 Vehicula Road"
      },
      {
        "id": 7,
        "name": "Joan Reynolds",
        "address": "285-1928 In St."
      },
      {
        "id": 8,
        "name": "Audrey Gross",
        "address": "7130 Suspendisse Street"
      },
      {
        "id": 9,
        "name": "Keely Mendez",
        "address": "P.O. Box 958, 9844 Nulla Rd."
      },
      {
        "id": 10,
        "name": "Desiree Fulton",
        "address": "9898 Cras Rd."
      },
      {
        "id": 11,
        "name": "Madonna Whitney",
        "address": "Ap #144-9793 Velit Rd."
      },
      {
        "id": 12,
        "name": "Judah Edwards",
        "address": "718-6866 Dui St."
      },
      {
        "id": 13,
        "name": "MacKensie Richards",
        "address": "Ap #179-8525 Laoreet Rd."
      },
      {
        "id": 14,
        "name": "Malachi Mayo",
        "address": "Ap #630-6212 Donec St."
      },
      {
        "id": 15,
        "name": "Todd Salinas",
        "address": "978-2515 Sed Av."
      },
      {
        "id": 16,
        "name": "Cassady Craig",
        "address": "652-9907 Elit. St."
      },
      {
        "id": 17,
        "name": "Meghan Fuentes",
        "address": "P.O. Box 532, 4020 Id Avenue"
      },
      {
        "id": 18,
        "name": "Quentin Holmes",
        "address": "Ap #718-7947 Massa. Rd."
      },
      {
        "id": 19,
        "name": "Clare Willis",
        "address": "Ap #739-3923 Suspendisse Street"
      },
      {
        "id": 20,
        "name": "Wylie Benton",
        "address": "Ap #223-309 Elit, Road"
      },
      {
        "id": 21,
        "name": "Zia Hernandez",
        "address": "P.O. Box 333, 198 Odio. Rd."
      },
      {
        "id": 22,
        "name": "Nichole Mathis",
        "address": "8302 Egestas, Av."
      },
      {
        "id": 23,
        "name": "Veronica Mcknight",
        "address": "P.O. Box 321, 9992 Dictum Road"
      },
      {
        "id": 24,
        "name": "Nell Carter",
        "address": "106-416 Pellentesque, St."
      },
      {
        "id": 25,
        "name": "Joan Griffith",
        "address": "P.O. Box 944, 1666 Ut Avenue"
      },
      {
        "id": 26,
        "name": "Drew Barr",
        "address": "961-5777 Integer Rd."
      },
      {
        "id": 27,
        "name": "Catherine Hobbs",
        "address": "Ap #380-4770 Enim St."
      },
      {
        "id": 28,
        "name": "Linus Davidson",
        "address": "P.O. Box 331, 578 Mus. Ave"
      },
      {
        "id": 29,
        "name": "Solomon Tyson",
        "address": "P.O. Box 549, 9317 Sem, Av."
      },
      {
        "id": 30,
        "name": "Bryar Walters",
        "address": "P.O. Box 414, 5895 Proin St."
      },
      {
        "id": 31,
        "name": "Mollie Cleveland",
        "address": "955 Mus. St."
      },
      {
        "id": 32,
        "name": "Brent Barr",
        "address": "115-6243 Sem Road"
      },
      {
        "id": 33,
        "name": "Eugenia Garza",
        "address": "995-9897 Dui Ave"
      },
      {
        "id": 34,
        "name": "Glenna Wiggins",
        "address": "Ap #457-1050 Fringilla Avenue"
      },
      {
        "id": 35,
        "name": "Nolan Williams",
        "address": "5909 Vel, Street"
      },
      {
        "id": 36,
        "name": "George Hill",
        "address": "6327 Lectus Rd."
      },
      {
        "id": 37,
        "name": "Charles Curtis",
        "address": "P.O. Box 487, 9425 Consequat, Road"
      },
      {
        "id": 38,
        "name": "Indigo Hood",
        "address": "Ap #136-2309 Cursus. Street"
      },
      {
        "id": 39,
        "name": "Echo Shelton",
        "address": "9334 Nibh Rd."
      },
      {
        "id": 40,
        "name": "Jerome Mack",
        "address": "P.O. Box 479, 834 Et, St."
      },
      {
        "id": 41,
        "name": "Jackson Cruz",
        "address": "2129 Aliquam Rd."
      },
      {
        "id": 42,
        "name": "Aristotle Finley",
        "address": "218 Justo Street"
      },
      {
        "id": 43,
        "name": "Maggy Calderon",
        "address": "8922 Vitae, Street"
      },
      {
        "id": 44,
        "name": "Ignacia Mayer",
        "address": "Ap #679-4245 Pede Av."
      },
      {
        "id": 45,
        "name": "Joseph James",
        "address": "Ap #328-6393 At Road"
      },
      {
        "id": 46,
        "name": "Bree Bush",
        "address": "750-6920 Venenatis Av."
      },
      {
        "id": 47,
        "name": "Lacy Spencer",
        "address": "Ap #887-546 Velit. Rd."
      },
      {
        "id": 48,
        "name": "Evan Berry",
        "address": "728-9769 Adipiscing Av."
      },
      {
        "id": 49,
        "name": "Abraham Combs",
        "address": "355-9329 Ipsum. St."
      },
      {
        "id": 50,
        "name": "Naomi Leonard",
        "address": "Ap #761-2081 Convallis, St."
      }
    ];

    this.all = function() {
      return _data;
    };

    this.destroyByIndex = function(i) {
      _data.splice(i, 1);
    };

  });