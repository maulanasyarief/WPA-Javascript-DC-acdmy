var dbPromised = idb.open('Football-info', 1, upgradeDb => {
    var teamsObjectStore = upgradeDb.createObjectStore('teams', {
        keyPath: 'id'
    });
    teamsObjectStore.createIndex('name', 'name', {
        unique: false
    });

    var MtchObjectStore = upgradeDb.createObjectStore('competitions', {
        keyPath: 'id'
    });
    MtchObjectStore.createIndex('name', 'name', {
        unique: false
    });


});

//function save indexedDB
function addToFavorite(teams) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(teams);
            store.add(teams);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil di simpan.");
            M.toast({
                html: teams.shortName + ' Ditambahkan Ke Favorite',
                classes: 'rounded'
            });
        }).catch(error => {
            M.toast({
                html: ' Gagal di simpan',
                classes: 'rounded'
            })
            console.log(error);
        });
}

function addToFavorite_match(match) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("match", "readwrite");
            var store = tx.objectStore("match");
            console.log(match);
            store.add(match.match);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil di simpan.");
            M.toast({
                html: match.match.competition.name + ' Ditambahkan Ke Favorite',
                classes: 'rounded'
            });
        }).catch(error => {
            M.toast({
                html: ' Gagal di simpan',
                classes: 'rounded'
            })
            console.log(error);
        });
}

function addToFavorite_comp(competitions) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("competitions", "readwrite");
            var store = tx.objectStore("competitions");
            console.log(competitions);
            store.add(competitions);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil di simpan.");
            M.toast({
                html: competitions.name + ' Ditambahkan Ke Favorite',
                classes: 'rounded'
            });
        }).catch(error => {
            M.toast({
                html: ' Gagal di simpan',
                classes: 'rounded'
            })
            console.log(error);
        });
}

// ===================== teams saved  ============================

function getsvd_teams() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function getById_tmSVD(id) {
    var id_tm = parseInt(id);
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(id_tm);
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function delete_tmSVD(teams) {
    var id_tm = parseInt(teams);
    dbPromised
        .then(function (db) {
            var tx = db.transaction('teams', 'readwrite');
            var store = tx.objectStore('teams');
            store.delete(id_tm);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil di Hapus.");
            M.toast({
                html: ' Di hapus dari Favorite',
                classes: 'rounded'
            });
        }).catch(error => {
            M.toast({
                html: ' Gagal di Hapus',
                classes: 'rounded'
            })
            console.log(error);
        });
}

//======================================== comps saved ================

function getsvd_comps() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("competitions", "readonly");
                var store = tx.objectStore("competitions");
                return store.getAll();
            })
            .then(function (competitions) {
                resolve(competitions);
            });
    });
}

function getById_cmSVD(id) {
    var id_cm = parseInt(id);
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("competitions", "readonly");
                var store = tx.objectStore("competitions");
                return store.get(id_cm);
            })
            .then(function (competitions) {
                resolve(competitions);
            });
    });
}

function delete_cmSVD(competitions) {
    var id_cm = parseInt(competitions);
    dbPromised
        .then(function (db) {
            var tx = db.transaction('competitions', 'readwrite');
            var store = tx.objectStore('competitions');
            store.delete(id_cm);
            return tx.complete;
        })
        .then(function () {
            console.log("Data berhasil di Hapus.");
            M.toast({
                html: ' Di hapus dari Favorite',
                classes: 'rounded'
            });
        }).catch(error => {
            M.toast({
                html: ' Gagal di Hapus',
                classes: 'rounded'
            })
            console.log(error);
        });
}