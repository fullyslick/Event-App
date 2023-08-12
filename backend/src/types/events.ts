export class EventbriteEvent {
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
    public displayPrice: string,
    public currency: string,
    public ticketsWishList: number
  ) {}
}

export type EventbriteResponseEvent = {
  id: string;
  name: {
    text: string;
  };
  description: {
    text: string;
  };
  start: {
    local: string;
  };
  venue: {
    name?: string;
    address?: {
      localized_address_display?: string;
    };
  };
  logo: {
    url: string;
    original: {
      url: string;
    };
  };
  category: {
    name: string;
  };
  capacity: number;
  ticket_availability: {
    maximum_ticket_price: {
      value: number;
      major_value: string;
      currency: string;
    };
  };
};
