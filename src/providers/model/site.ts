export class Site {

  siteName?: string;
  user?: string;
  assignee?: string;
  vendorName?: string;
  siteId?: string;
  district?: string;
  typeOfWork?: string;
  createdUser?: string;
  location?: Location;
}

export class Location {

  message: string;
  latitude: number;
  longitude: number;

  constructor(message: string) {
    this.message = message;
  }
}
