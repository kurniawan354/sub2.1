var dbPromised = idb.open("Detail-football", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
  });
  teamsObjectStore.createIndex("id_team", "id", { unique: false });
});

function saveForLater(team) {
  dbPromised
      .then(function(db) {
          var tx = db.transaction("teams", "readwrite");
          var store = tx.objectStore("teams");
         // console.log(team);
          store.add(team);
          return tx.complete;
      })
      .then(function() {
          console.log("Artikel berhasil di simpan.");
      });
}

function getAll() {
  return new Promise(function(resolve, reject) {
      dbPromised
          .then(function(db) {
              var tx = db.transaction("teams", "readonly");
              var store = tx.objectStore("teams");
              return store.getAll();
          })
          .then(function(teams) {
              resolve(teams);
          });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
      dbPromised
          .then(function(db) {
              var tx = db.transaction("teams", "readonly");
              var store = tx.objectStore("teams");
              return store.get(id);
          })
          .then(function(team) {
              console.log(team)
              resolve(team);
          });
  });
}