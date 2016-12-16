(function() {
  var words = [
      "Oanarosca",
      "M1guelpf",
      "Abhi2424shek",
      "Niccokunzmann",
      "Rhemon",
      "Hoangvanthien",
      "Jig08",
      "Hemantjadon",
      "Gaeun",
      "Ankitrgadiya",
      "Princu7",
      "Daminisatya",
      "PolBaladas",
      "Vickyjjj",
      "BohJieQi",
      "Adarsh-ideal",
      "Prabhdeep29",
      "Hpdang",
      "LeeCareGene",
      "Abhijeetmanohar",
      "Baidya99",
      "Nolik2000",
      "Pipix51",
      "Codethejason",
      "Shubham-padia",
      "Hesapadim",
      "Animeshsinghweb",
      "Dannymout",
      "Royalharsh",
      "Hesham-Burawi"
    ],
    i = 0;


  setInterval(function() {
    $('#name').fadeOut(function() {
      $(this).html(words[i = (i + 1) % words.length]).fadeIn();
    });
  }, 3000);

})();
