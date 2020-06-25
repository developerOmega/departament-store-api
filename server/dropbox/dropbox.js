let fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;

class DropboxApi {
    static instance;

    constructor(){
        this.dbx = new Dropbox({accessToken: 'rAiom9haNiAAAAAAAAAC82arolu397MRkZr5f4e4r-rBhStIsbJSmH_V_tZVJLyQ', fetch});  
    }

    static on(){
      this.instance = this.instance || new DropboxApi();
      return this.instance;
    }

    listFolder(path, callback){
      this.dbx.filesListFolder({path})
        .then(response => callback(null, response))
        .catch(error => callback(error)); 
    }

    upload(path, contents, callback ){
      this.dbx.filesUpload({path, contents})
        .then( response => callback(null, response))
        .catch( error => callback(error));
    }

    sharedLink(path, callback){
      this.dbx.sharingCreateSharedLinkWithSettings({path})
        .then(response => callback(null, response))
        .catch(error => callback(error));
    }

    delete(path, callback){
      this.dbx.filesDelete({path})
        .then(response => callback(null, response))
        .catch(error => callback(error));
    }

}

module.exports = DropboxApi;