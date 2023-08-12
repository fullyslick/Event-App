export interface event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  address: string;
  imageOriginal: string;
  image: string;
  category: string;
  availableTickets: number;
  capacity: number;
  price: number;
  displayPrice: number;
  currency: string;
  ticketsWishList: number;
}

export type events = event[];
