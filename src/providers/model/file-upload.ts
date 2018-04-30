export class FileUpload {

  name?: string;
  file?: string;
  key$?: string;

  constructor(file: string, name: string) {
    this.file = file;
    this.name = name;
  }
}
