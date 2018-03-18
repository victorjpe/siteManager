export class FileUpload {

    name?: string;
    url?: string;
    file?: string;

    constructor(file: string, name: string) {
        this.file = file;
        this.name = name;
    }
}