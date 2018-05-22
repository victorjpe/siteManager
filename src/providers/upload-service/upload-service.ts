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
    const pushId = this.db.createPushId();
    this.db.list(`sites/${reference}`).set(pushId, { key: pushId, ...fileUpload })
  }

  deletePicture(path: string, fileUpload: FileUpload) {
    console.log(path);
    this.deleteFromDatabase(path, fileUpload.key).then(() => {
      this.deleteFromStorage(fileUpload.name);
    });
  }

  private deleteFromDatabase(path: string, key: string) {
    return this.db.list(`sites/${path}`).remove(key);
  }

  private deleteFromStorage(name: string) {
    const storageRef = firebase.storage().ref()
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
