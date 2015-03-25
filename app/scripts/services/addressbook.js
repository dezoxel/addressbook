'use strcit'

angular.module('addressbookApp')
  .service('Addressbook', function() {
    var _data = [
      {
        "name": "Octavius Vega",
        "address": "160-8652 Consectetuer Street"
      },
      {
        "name": "Bruno Black",
        "address": "Ap #833-7833 Elementum St."
      },
      {
        "name": "Holmes Hays",
        "address": "Ap #799-1062 Dui St."
      },
      {
        "name": "Harrison Anderson",
        "address": "431-7614 Sed, St."
      },
      {
        "name": "Roth Nash",
        "address": "778-5475 Dictum Ave"
      },
      {
        "name": "Dane Camacho",
        "address": "P.O. Box 368, 1237 Ridiculus Rd."
      },
      {
        "name": "Zeph Young",
        "address": "3364 Metus Street"
      },
      {
        "name": "Alden Moran",
        "address": "3057 In Ave"
      },
      {
        "name": "Brock Jarvis",
        "address": "Ap #682-242 Elit. St."
      },
      {
        "name": "Griffith Baxter",
        "address": "P.O. Box 787, 1311 Congue, St."
      },
      {
        "name": "Calvin Ramirez",
        "address": "P.O. Box 437, 5853 Laoreet Avenue"
      },
      {
        "name": "Rafael Joseph",
        "address": "4327 Nibh Av."
      },
      {
        "name": "Ross Lewis",
        "address": "7890 Ullamcorper St."
      },
      {
        "name": "Bernard Clayton",
        "address": "Ap #281-6477 Ac St."
      },
      {
        "name": "Dale Graves",
        "address": "Ap #895-3052 Ligula. Road"
      },
      {
        "name": "Hall Carroll",
        "address": "909-521 Parturient Rd."
      },
      {
        "name": "Odysseus Winters",
        "address": "238-4608 Vel Ave"
      },
      {
        "name": "Thane Obrien",
        "address": "Ap #692-4248 Nulla Rd."
      },
      {
        "name": "Stewart Small",
        "address": "P.O. Box 545, 7148 Elementum, Rd."
      },
      {
        "name": "Thaddeus Chen",
        "address": "Ap #961-8880 Risus Rd."
      },
      {
        "name": "Solomon Nguyen",
        "address": "P.O. Box 871, 3716 Mauris Road"
      },
      {
        "name": "Emery Alvarado",
        "address": "881-3014 In Ave"
      },
      {
        "name": "Caldwell Frederick",
        "address": "531-2463 Tortor Rd."
      },
      {
        "name": "Lyle Benjamin",
        "address": "973-3743 Semper Street"
      },
      {
        "name": "Lamar Juarez",
        "address": "P.O. Box 381, 6039 Ipsum. Avenue"
      },
      {
        "name": "Judah Petty",
        "address": "P.O. Box 130, 8495 Nisl. Rd."
      },
      {
        "name": "Neil Gilmore",
        "address": "121-5600 Sed St."
      },
      {
        "name": "Amir Santos",
        "address": "704 Amet Street"
      },
      {
        "name": "Lionel Rosales",
        "address": "887-3038 Luctus Rd."
      },
      {
        "name": "Ronan Dudley",
        "address": "Ap #826-1584 Fusce Road"
      },
      {
        "name": "Talon Baldwin",
        "address": "Ap #214-1852 Nec, Rd."
      },
      {
        "name": "Jelani Blake",
        "address": "866 Lobortis Rd."
      },
      {
        "name": "Levi Tyler",
        "address": "3214 Torquent Avenue"
      },
      {
        "name": "Zeph Woods",
        "address": "7006 Eu Av."
      },
      {
        "name": "Benedict Sexton",
        "address": "P.O. Box 573, 3050 Etiam Rd."
      },
      {
        "name": "Hayes Decker",
        "address": "Ap #832-638 Duis St."
      },
      {
        "name": "Clinton Hopkins",
        "address": "8389 Sed Ave"
      },
      {
        "name": "Aidan Hood",
        "address": "9958 Dignissim St."
      },
      {
        "name": "Hyatt Jimenez",
        "address": "4760 Ultrices Rd."
      },
      {
        "name": "Jackson Lyons",
        "address": "958-3664 Sit Av."
      },
      {
        "name": "Judah Dorsey",
        "address": "P.O. Box 658, 3066 Dis Av."
      },
      {
        "name": "Demetrius Lucas",
        "address": "8148 Volutpat Rd."
      },
      {
        "name": "Erich Vega",
        "address": "3519 Metus. Ave"
      },
      {
        "name": "Alan Moran",
        "address": "623-1841 At, Av."
      },
      {
        "name": "Gareth Porter",
        "address": "884-2345 Sem Av."
      },
      {
        "name": "Zane Sloan",
        "address": "P.O. Box 506, 9207 Porttitor Street"
      },
      {
        "name": "Brian Thornton",
        "address": "1511 Sollicitudin Rd."
      },
      {
        "name": "Hamish Lynch",
        "address": "P.O. Box 547, 7071 Ornare. Street"
      },
      {
        "name": "Ciaran Butler",
        "address": "Ap #604-4845 Enim. Ave"
      },
      {
        "name": "Clarke Pena",
        "address": "517-6733 Integer Av."
      }
    ];

    this.all = function() {
      return _data;
    };

  });