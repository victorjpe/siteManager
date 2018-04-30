import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { FileUpload } from '../model/file-upload';
import { Picture } from '../model/picture';

/*
 Generated class for the UploadServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
*/
@Injectable()
export class UploadServiceProvider {

  private basePath = '/sitesImages';
  fileUploads: AngularFireList<FileUpload[]>;

  constructor(private db: AngularFireDatabase) { }

  pushFileToStorage(fileUpload: FileUpload, reference: string) {
    return new Observable(observe => {

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.name}`)
        .putString(fileUpload.file, 'base64', { contentType: 'image/jpg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
        },
        (error) => {
          // fail
          console.log(error);
          observe.next();
          observe.complete();
        },
        () => {
          // success
          const picture = new Picture();
          picture.name = fileUpload.name;
          picture.url = uploadTask.snapshot.downloadURL;
          this.saveFileData(picture, reference);
          observe.next();
          observe.complete();
        }
      );
    });
  }

  private saveFileData(fileUpload: FileUpload, reference: string) {
    this.db.list(`sites/${reference}/`).push(fileUpload)
  }

  getFileUploads(query = {}) {
    this.fileUploads = this.db.list(this.basePath);
    return this.fileUploads
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.name)
      .then(() => {
        this.deleteFileStorage(fileUpload.name)
      });
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key)
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref()
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
