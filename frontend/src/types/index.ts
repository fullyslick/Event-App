export class EventListing {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public date: string,
    public location: string,
    public address: string,
    public imageOriginal: string,
    public image: string,
    public category: string,
    public availableTickets: number,
    public capacity: number,
    public price: number,
    public displayPrice: number,
    public currency: string,
    public ticketsWishList: number
  ) {}
}

export type EventListings = EventListing[];
