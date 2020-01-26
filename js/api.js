var token = {
  headers: {
    'X-Auth-Token': '6434dbc29f2a4d51888aea3a68e33431'
  }
};
var base_url = "https://api.football-data.org/v2/";
var comp = "competitions/";
var fltr_comp = "?plan=TIER_ONE"
var fl_teams = "teams/";
var fl_macth = "matches/";
var fl_standing = "2021/standings?standingType=TOTAL";
var fl_standingById = "/standings?standingType=TOTAL";
//var base_url = "http://api.football-data.org/v2/competitions/2021/"; // team url  /teams PL Inggris

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}


function getAllTeams() {
  // jika tersimpan di chace
  if ('caches' in window) {
    caches.match(base_url + fl_teams).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var temasHTML = "";
          data.teams.forEach(function (array_data) {
            //  if (array_data.crestUrl != null) { "./images/img_null.jpg";
            let urlTeamImage = array_data.crestUrl;
            if (urlTeamImage == null || urlTeamImage == '') {
              urlTeamImage = './images/img_null.jpg';
            } else {
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            }
            temasHTML += `
                          <div class="col s12 m4">
                          <div class="card small">
                            <div class="card-image">
                                <a href="./teams.html?id=${array_data.id}">                            
                                    <img class="responsive-img" src="${urlTeamImage}" >                          
                                </a>
                            </div>
                            <div class="card-content center-align">
                            <h5 class="blue-text">${array_data.name}</h5>
                            </div>
                          </div>
                        </div>`;

          });
          // Sisipkan komponen card ke dalam elemen dengan id #teams
          document.getElementById("teams").innerHTML = temasHTML;
        })
      }
    })
  }

  fetch(base_url + fl_teams, token)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var temasHTML = "";
      data.teams.forEach(function (array_data) {
        let urlTeamImage = array_data.crestUrl;
        if (urlTeamImage == null || urlTeamImage == '') {
          urlTeamImage = './images/img_null.jpg';
        } else {
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
        }
        temasHTML += `
                 <div class="col s12 m4">
                  <div class="card small">
                    <div class="card-image">
                        <a href="./teams.html?id=${array_data.id}">                            
                            <img class="responsive-img" style="padding:10px;" src="${urlTeamImage}" >                          
                        </a>
                    </div>
                    <div class="card-content center-align">
                    <h5 class="blue-text">${array_data.name}</h5>
                    </div>
                  </div>
                </div>`;

      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = temasHTML;
    })
    .catch(error);
}

function getTeamsById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + fl_teams + idParam, token).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var datatabel_comp = "";
            var datatabel_play = "";
            var no_play = 1;
            var no_comp = 1;
            if (data.crestUrl === null) {
              data.crestUrl = "./images/img_null.jpg";
            }
            var articleHTML = `      
                                <div class="card-image waves-effect waves-block waves-light">
                                  <img class="responsive-img" style="padding:10px;" src="${data.crestUrl}" />
                                </div>
                                <div class="card-content">
                                <h4> <i class="Medium material-icons">flag</i>${data.name}</h4>
                                    <table >
                                        <thead>
                                            <tr>
                                                <th>Info</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Club Name</td>
                                                <td>${data.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Club Color</td>
                                                <td>${data.clubColors}</td>
                                            </tr>
                                            <tr>
                                                <td>Venue </td>
                                                <td>${data.venue}</td>
                                            </tr>
                                            <tr>
                                                <td>Founded</td>
                                                <td>${data.founded}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>${data.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>${data.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>${data.website}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>${data.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>`;
            // data compotitions
            data.activeCompetitions.forEach(function (data_comp) {
              datatabel_comp += `
                <tr>
                    <td>${no_comp++}</td>
                    <td>${data_comp.name}</td>
                    <td>${data_comp.code}</td>
                    <td>${data_comp.plan}</td>
                </tr>`;

            });
            //data player squad
            data.squad.forEach(function (data_squad) {
              datatabel_play += `
                <tr>
                    <td>${no_play++}</td>
                    <td>${data_squad.name}</td>
                    <td>${data_squad.position}</td>
                </tr>`;

            });

            document.getElementById("body-content").innerHTML = articleHTML;
            document.getElementById("tabel-comp").innerHTML = datatabel_comp;
            document.getElementById("tabel-player").innerHTML = datatabel_play;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    // in online request
    fetch(base_url + fl_teams + idParam, token)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        var datatabel_comp = "";
        var datatabel_play = "";
        var no_play = 1;
        var no_comp = 1;
        if (data.crestUrl === null) {
          data.crestUrl = "./images/img_null.jpg";
        }
        var articleHTML = `      
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="responsive-img" style="padding:10px;" src="${data.crestUrl}" />
                            </div>
                            <div class="card-content">
                            <h4> <i class="Medium material-icons">flag</i>${data.name}</h4>
                                <table >
                                    <thead>
                                        <tr>
                                            <th>Info</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Club Name</td>
                                            <td>${data.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Club Color</td>
                                            <td>${data.clubColors}</td>
                                        </tr>
                                        <tr>
                                            <td>Venue </td>
                                            <td>${data.venue}</td>
                                        </tr>
                                        <tr>
                                            <td>Founded</td>
                                            <td>${data.founded}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>${data.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>${data.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Website</td>
                                            <td>${data.website}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>${data.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>`;
        // data compotitions
        data.activeCompetitions.forEach(function (data_comp) {
          datatabel_comp += `
            <tr>
                <td>${no_comp++}</td>
                <td>${data_comp.name}</td>
                <td>${data_comp.code}</td>
                <td>${data_comp.plan}</td>
            </tr>`;

        });
        //data player squad
        data.squad.forEach(function (data_squad) {
          datatabel_play += `
            <tr>
                <td>${no_play++}</td>
                <td>${data_squad.name}</td>
                <td>${data_squad.position}</td>
            </tr>`;

        });

        document.getElementById("body-content").innerHTML = articleHTML;
        document.getElementById("tabel-comp").innerHTML = datatabel_comp;
        document.getElementById("tabel-player").innerHTML = datatabel_play;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

// ========= standing
function getStandingComp() {
  // jika tersimpan di chace
  if ('caches' in window) {
    caches.match(base_url + comp + fl_standing).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          // Objek/array JavaScript dari response.json() masuk lewat data.
          var compName = "";
          var data_reguler_sesion = "";

          compName += `<h5 class="center-align">
                <i class="small material-icons">flag</i>${data.competition.name}
                </h5></br>
                <h6 class="center-align"> Match Day : ${data.season.currentMatchday}</h6>
                `;

          data.standings[0].table.forEach(function (data_regses) {
            let urlTeamImage = data_regses.team.crestUrl;
            if (urlTeamImage == null || urlTeamImage == '') {
              urlTeamImage = 'images/img_null.jpg';
            } else {
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            }
            data_reguler_sesion += `
                              <tr>
                                  <td>${data_regses.position}</td>  
                                  <td>
                                      <img src="${urlTeamImage}" alt="${data_regses.team.name}" class="responsive-img" style="height:30px">
                                      </br>${data_regses.team.name}
                                  </td>                                  
                                  <td>${data_regses.playedGames}&nbsp;</td>
                                  <td>${data_regses.won}&nbsp;</td>
                                  <td>${data_regses.draw}&nbsp;</td>
                                  <td>${data_regses.lost}&nbsp;</td>
                                  <td>${data_regses.points}&nbsp;</td>
                                  <td>${data_regses.goalsFor}&nbsp;</td>
                                  <td>${data_regses.goalsAgainst}&nbsp;</td>
                                  <td>${data_regses.goalDifference}&nbsp;</td>
                              </tr>`;
          });
          document.getElementById("comp-name").innerHTML = compName;
          document.getElementById("tabel-sesion").innerHTML = data_reguler_sesion;
        })
      }
    })
  }

  fetch(base_url + comp + fl_standing, token)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var compName = "";
      var data_reguler_sesion = "";

      compName += `<h5 class="center-align">
      <i class="small material-icons">flag</i>${data.competition.name}
      </h5></br>
      <h6 class="center-align"> Match Day : ${data.season.currentMatchday}</h6>
      `;

      data.standings[0].table.forEach(function (data_regses) {
        let urlTeamImage = data_regses.team.crestUrl;
        if (urlTeamImage == null || urlTeamImage == '') {
          urlTeamImage = 'images/img_null.jpg';
        } else {
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
        }
        data_reguler_sesion += `
                            <tr>
                                <td>${data_regses.position}</td>  
                                <td>
                                    <img src="${urlTeamImage}" alt="${data_regses.team.name}" class="responsive-img" style="height:30px">
                                    </br>${data_regses.team.name}
                                </td>                                  
                                <td>${data_regses.playedGames}&nbsp;</td>
                                <td>${data_regses.won}&nbsp;</td>
                                <td>${data_regses.draw}&nbsp;</td>
                                <td>${data_regses.lost}&nbsp;</td>
                                <td>${data_regses.points}&nbsp;</td>
                                <td>${data_regses.goalsFor}&nbsp;</td>
                                <td>${data_regses.goalsAgainst}&nbsp;</td>
                                <td>${data_regses.goalDifference}&nbsp;</td>
                            </tr>`;
      });


      document.getElementById("comp-name").innerHTML = compName;
      document.getElementById("tabel-sesion").innerHTML = data_reguler_sesion;
    })
    .catch(error);
}

function getStandingCompById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  // jika tersimpan di chace
  if ('caches' in window) {
    caches.match(base_url + comp + idParam + fl_standingById).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var head_tbl = document.getElementById("tabel-head");
          var compName = "";
          var data_reguler_sesion = "";

          compName += `
                <h5 class="center-align">
                <i class="small material-icons">flag</i>${data.competition.name}
                </h5></br>
                <h6 class="center-align"> Match Day : ${data.season.currentMatchday}</h6>
                `;

          document.getElementById("comp-name").innerHTML = compName;

          if (data.standings <= 0 || data.standings == '') {
            head_tbl.style.display = 'none';
            data_reguler_sesion += `
                              <tr>
                                <div class="container">
                                <div class="col s12">
                                  <div class="card-panel blue">
                                    <span class="white-text ">
                                      <i class="tiny material-icons">info_outline</i> Belum ada Data Yang Tersimpan
                                    </span>
                                  </div>
                                </div>
                              </div>
                              </tr>`;

            document.getElementById("tabel-sesion").innerHTML = data_reguler_sesion;
          } else { // jika ada
            data.standings[0].table.forEach(function (data_regses) {
              let urlTeamImage = data_regses.team.crestUrl;
              if (urlTeamImage == null || urlTeamImage == '') {
                urlTeamImage = 'images/img_null.jpg';
              } else {
                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
              }
              data_reguler_sesion += `
                                        <tr>
                                            <td>${data_regses.position}</td>  
                                            <td>
                                                <img src="${urlTeamImage}" alt="${data_regses.team.name}" class="responsive-img" style="height:30px">
                                                </br>${data_regses.team.name}
                                            </td>                                  
                                            <td>${data_regses.playedGames}&nbsp;</td>
                                            <td>${data_regses.won}&nbsp;</td>
                                            <td>${data_regses.draw}&nbsp;</td>
                                            <td>${data_regses.lost}&nbsp;</td>
                                            <td>${data_regses.points}&nbsp;</td>
                                            <td>${data_regses.goalsFor}&nbsp;</td>
                                            <td>${data_regses.goalsAgainst}&nbsp;</td>
                                            <td>${data_regses.goalDifference}&nbsp;</td>
                                        </tr>`;
            });
            document.getElementById("tabel-sesion").innerHTML = data_reguler_sesion;

          }

        })
      }
    })
  }

  fetch(base_url + comp + idParam + fl_standingById, token)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var head_tbl = document.getElementById("tabel-head");
      var compName = "";
      var data_reguler_sesion = "";

      compName += `<h5 class="center-align">
              <i class="small material-icons">flag</i>${data.competition.name}
              </h5></br>
              <h6 class="center-align"> Match Day : ${data.season.currentMatchday}</h6>
              `;

      document.getElementById("comp-name").innerHTML = compName;

      if (data.standings <= 0 || data.standings == '') {
        head_tbl.style.display = 'none';
        data_reguler_sesion += `
                    <tr>
                      <div class="container">
                      <div class="col s12">
                        <div class="card-panel blue">
                          <span class="white-text ">
                            <i class="tiny material-icons">info_outline</i> Belum ada Data Yang Tersimpan
                          </span>
                        </div>
                      </div>
                    </div>
                    </tr>`;

        document.getElementById("tabel-sesion").innerHTML = data_reguler_sesion;
      } else { // jika ada
        data.standings[0].table.forEach(function (data_regses) {
          let urlTeamImage = data_regses.team.crestUrl;
          if (urlTeamImage == null || urlTeamImage == '') {
            urlTeamImage = 'images/img_null.jpg';
          } else {
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
          }
          data_reguler_sesion += `
                              <tr>
                                  <td>${data_regses.position}</td>  
                                  <td>
                                      <img src="${urlTeamImage}" alt="${data_regses.team.name}" class="responsive-img" style="height:30px">
                                      </br>${data_regses.team.name}
                                  </td>                                  
                                  <td>${data_regses.playedGames}&nbsp;</td>
                                  <td>${data_regses.won}&nbsp;</td>
                                  <td>${data_regses.draw}&nbsp;</td>
                                  <td>${data_regses.lost}&nbsp;</td>
                                  <td>${data_regses.points}&nbsp;</td>
                                  <td>${data_regses.goalsFor}&nbsp;</td>
                                  <td>${data_regses.goalsAgainst}&nbsp;</td>
                                  <td>${data_regses.goalDifference}&nbsp;</td>
                              </tr>`;
        });
        document.getElementById("tabel-sesion").innerHTML = data_reguler_sesion;

      }
    })
    .catch(error);
}

// ============================= read Comp =================================================

function getAllComp() {
  // jika tersimpan di chace
  if ('caches' in window) {
    caches.match(base_url + comp + fltr_comp).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var compHTML = "";
          data.competitions.forEach(function (array_data) {
            compHTML += `
                  <div class="col s12 m4">
                  <div class="card small">
                    <div class="card-image">
                        <a href="./competitions.html?id=${array_data.id}">                            
                            <img class="responsive-img" src="images/comps/${array_data.code}.png" >                          
                        </a>
                    </div>
                    <div class="card-content center-align">
                    <h5 class="blue-text">${array_data.name}</h5>
                    </div>
                  </div>
                </div>`;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #teams
          document.getElementById("comps").innerHTML = compHTML;
        })
      }
    })
  }

  fetch(base_url + comp + fltr_comp, token)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var compHTML = "";
      data.competitions.forEach(function (array_data) {
        compHTML += `
              <div class="col s12 m4">
              <div class="card small">
                <div class="card-image">
                    <a href="./competitions.html?id=${array_data.id}">                            
                        <img class="responsive-img" src="images/comps/${array_data.code}.png" >                          
                    </a>
                </div>
                <div class="card-content center-align">
                <h5 class="blue-text">${array_data.name}</h5>
                </div>
              </div>
            </div>`;

      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("comps").innerHTML = compHTML;

    })
    .catch(error);
}

function getCompById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + comp + idParam, token).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log(data);
            var no = 1;
            var datatabel_result = "";
            var datatabel_sesions = "";
            var matchHTML = `      
                                <h4 class="center-align"> <i class="Medium material-icons">flag</i>${data.name}</h4>                              
                                </div>`;
            // data result
            datatabel_result += `                                  
                        <tr>
                            <td>Star Date</td>
                            <td>${data.currentSeason.startDate}</td>
                        </tr>
                        <tr>
                            <td>End Date</td>
                            <td>${data.currentSeason.endDate}</td>
                        </tr>
                        <tr>
                            <td>Current Match Day</td>
                            <td>${data.currentSeason.currentMatchday}</td>
                        </tr>
                        <tr>
                            <td>Winner</td>
                            <td>${data.currentSeason.winner}</td>
                        </tr>
                        <tr>                        
                            <td><a href="./standingId.html?id=${data.id}" class="waves-effect waves-light btn">View Standing</a></td>
                        </tr>`;

            data.seasons.forEach(function (data_ref) {
              var tm_win = ""
              if (data_ref.winner != null) {
                tm_win += `<p>${data_ref.winner.name}</P>`;

              }
              datatabel_sesions += `
                                <tr>
                                    <td>${no++}</td>
                                    <td>${data_ref.startDate}</td>                                
                                    <td>${data_ref.endDate}</td>                                
                                    <td>${data_ref.currentMatchday}</td>                                
                                    <td> ${tm_win}</td>
                                </tr>`;

            });

            document.getElementById("body-content").innerHTML = matchHTML;
            document.getElementById("tabel-result").innerHTML = datatabel_result;
            document.getElementById("tabel-sesions").innerHTML = datatabel_sesions;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    // in online request
    fetch(base_url + comp + idParam, token)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        var no = 1;
        var datatabel_result = "";
        var datatabel_sesions = "";
        var matchHTML = `      
                            <h4 class="center-align"> <i class="Medium material-icons">flag</i>${data.name}</h4>                              
                            </div>`;
        // data result
        datatabel_result += `                                  
                    <tr>
                        <td>Star Date</td>
                        <td>${data.currentSeason.startDate}</td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td>${data.currentSeason.endDate}</td>
                    </tr>
                    <tr>
                        <td>Current Match Day</td>
                        <td>${data.currentSeason.currentMatchday}</td>
                    </tr>
                    <tr>
                        <td>Winner</td>
                        <td>${data.currentSeason.winner}</td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>${data.id}</td>
                    </tr>
                    <tr>                        
                        <td><a href="./standingId.html?id=${data.id}" class="waves-effect waves-light btn">View Standing</a></td>
                    </tr>`;

        //data referees
        data.seasons.forEach(function (data_ref) {
          var tm_win = ""
          if (data_ref.winner != null) {
            tm_win += `<p>${data_ref.winner.name}</P>`;

          }
          datatabel_sesions += `
                            <tr>
                                <td>${no++}</td>
                                <td>${data_ref.startDate}</td>                                
                                <td>${data_ref.endDate}</td>                                
                                <td>${data_ref.currentMatchday}</td>                                
                                <td> ${tm_win}</td>
                            </tr>`;

        });

        document.getElementById("body-content").innerHTML = matchHTML;
        document.getElementById("tabel-result").innerHTML = datatabel_result;
        document.getElementById("tabel-sesions").innerHTML = datatabel_sesions;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}


// ===================   read and get data on indeXdb  =================================
// ===== teams
function getSaved_Teams() {
  getsvd_teams().then(function (teams) {
    console.log(teams);
    var teamsHTML = "";
    if (teams <= 0) {
      teamsHTML += `
      <div class="container">
      <div class="col s12">
        <div class="card-panel blue">
          <span class="white-text ">
            <i class="tiny material-icons">info_outline</i> Belum ada Data Yang Tersimpan
          </span>
        </div>
      </div>
    </div>`;

    } else {
      teams.forEach(function (teams) {
        teamsHTML += `
        <div class="col s12 m4">
        <div class="card small">
          <div class="card-image">
              <a href="./teams.html?id=${teams.id}&saved=true">                            
                  <img class="responsive-img" style="padding:10px;" src="${teams.crestUrl}" >                          
              </a>
          </div>
          <div class="card-content center-align">
          <h5 class="blue-text">${teams.name}</h5>
          </div>
        </div>
      </div>`;
      });

    }
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("team-svd").innerHTML = teamsHTML;
  });
}

// get detail yang di simpan di indexed DB
function getsvd_teamsByid() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById_tmSVD(idParam).then(function (teams) {
    console.log(teams);
    var datatabel_comp = "";
    var datatabel_play = "";
    var no_play = 1;
    var no_comp = 1;
    var articleHTML = `      
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="responsive-img" style="padding:10px;" src="${teams.crestUrl}" />
                            </div>
                            <div class="card-content">
                            <h4> <i class="Medium material-icons">flag</i>${teams.name}</h4>
                                <table >
                                    <thead>
                                        <tr>
                                            <th>Info</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Club Name</td>
                                            <td>${teams.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Club Color</td>
                                            <td>${teams.clubColors}</td>
                                        </tr>
                                        <tr>
                                            <td>Venue </td>
                                            <td>${teams.venue}</td>
                                        </tr>
                                        <tr>
                                            <td>Founded</td>
                                            <td>${teams.founded}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>${teams.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>${teams.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Website</td>
                                            <td>${teams.website}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>${teams.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>`;
    // data compotitions
    teams.activeCompetitions.forEach(function (data_comp) {
      datatabel_comp += `
              <tr>
                  <td>${no_comp++}</td>
                  <td>${data_comp.name}</td>
                  <td>${data_comp.code}</td>
                  <td>${data_comp.plan}</td>
              </tr>`;

    });
    //data player squad
    teams.squad.forEach(function (data_squad) {
      datatabel_play += `
              <tr>
                  <td>${no_play++}</td>
                  <td>${data_squad.name}</td>
                  <td>${data_squad.position}</td>
              </tr>`;

    });

    document.getElementById("body-content").innerHTML = articleHTML;
    document.getElementById("tabel-comp").innerHTML = datatabel_comp;
    document.getElementById("tabel-player").innerHTML = datatabel_play;

  });
}

//======== comps

function getSaved_Comps() {
  getsvd_comps().then(function (competitions) {
    console.log(competitions);
    var compsHTML = "";
    if (competitions <= 0) {
      compsHTML += `
      <div class="container">
      <div class="col s12">
        <div class="card-panel blue">
          <span class="white-text ">
            <i class="tiny material-icons">info_outline</i> Belum ada Data Yang Tersimpan
          </span>
        </div>
      </div>
    </div>`;

    } else {
      competitions.forEach(function (array_data) {
        if (array_data.emblemUrl === null) {
          array_data.emblemUrl = "/images/images.png";
        }
        compsHTML += `
        <div class="col s12 m4">
        <div class="card small">
          <div class="card-image">
              <a href="./competitions.html?id=${array_data.id}&saved=true">                            
              <img class="responsive-img" src="images/comps/${array_data.code}.png" >                        
              </a>
          </div>
          <div class="card-content center-align">
          <h5 class="blue-text">${array_data.name}</h5>
          </div>
        </div>
      </div>`;
      });

    }
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("comps-svd").innerHTML = compsHTML;
  });
}

function getsvd_compsByid() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById_cmSVD(idParam).then(function (data) {
    console.log(data);
    var no = 1;
    var datatabel_result = "";
    var datatabel_sesions = "";
    var matchHTML = `      
                                <h4 class="center-align"> <i class="Medium material-icons">flag</i>${data.name}</h4>                              
                                </div>`;
    // data result
    datatabel_result += `                                  
                        <tr>
                            <td>Star Date</td>
                            <td>${data.currentSeason.startDate}</td>
                        </tr>
                        <tr>
                            <td>End Date</td>
                            <td>${data.currentSeason.endDate}</td>
                        </tr>
                        <tr>
                            <td>Current Match Day</td>
                            <td>${data.currentSeason.currentMatchday}</td>
                        </tr>
                        <tr>
                            <td>Winner</td>
                            <td>${data.currentSeason.winner}</td>
                        </tr>`;

    //data referees
    data.seasons.forEach(function (data_ref) {
      var tm_win = ""
      if (data_ref.winner != null) {
        tm_win += `<p>${data_ref.winner.name}</P>`;

      }
      datatabel_sesions += `
                                <tr>
                                    <td>${no++}</td>
                                    <td>${data_ref.startDate}</td>                                
                                    <td>${data_ref.endDate}</td>                                
                                    <td>${data_ref.currentMatchday}</td>                                
                                    <td> ${tm_win}</td>
                                </tr>`;

    });

    document.getElementById("body-content").innerHTML = matchHTML;
    document.getElementById("tabel-result").innerHTML = datatabel_result;
    document.getElementById("tabel-sesions").innerHTML = datatabel_sesions;
  });
}
