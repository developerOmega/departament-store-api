let fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;

class DropboxApi {
    static instance;

    constructor(){
        this.dbx = new Dropbox({accessToken: 'rAiom9haNiAAAAAAAAACuvrOwmSUcaU7zEO5lXm3wsPXh4HJQyU5s7coK7hdseOD', fetch});  
    }

    init(){
        this.dbx.filesListFolder({path: ''})
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        }); 
    }

    static on(){
        this.instance = this.instance || new DropboxApi();
        return this.instance;
    }
}

module.exports = DropboxApi;