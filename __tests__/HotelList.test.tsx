import React from "react";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import HotelList from "../components/HotelList";

const hotels = [
  {
    id: 1,
    name: 'Test hotel',
    stars: 4,
    city: 'Test city',
    address: 'Test address',
    photos: ['http://photo-1', 'http://photo-2'],
    roomTypes: [
      [{ description: 'Room combo 1', price: 100 }]
    ],
  }
];

describe('HotelList', () => {
    it('renders no results message', () => {
      render(
        <HotelList
          hotels={hotels}
          showNoResults
        />
      );

      const noResultsMessage = screen.getByText('No results');
      expect(noResultsMessage).toBeInTheDocument();
    });
});

describe('HotelList', () => {
  it('renders correct hotel info', () => {
    render(
      <HotelList
        hotels={hotels}
        showNoResults={false}
      />
    );

    const hotelName = screen.getByText(hotels[0].name);
    const hotelAddress = screen.getByText(hotels[0].name);
    const roomDescription = screen.getByText(hotels[0].roomTypes[0][0].description);
    const roomPrice = screen.getByText(`${hotels[0].roomTypes[0][0].price}€ / night`);
    expect(hotelName).toBeInTheDocument();
    expect(hotelAddress).toBeInTheDocument();
    expect(roomDescription).toBeInTheDocument();
    expect(roomPrice).toBeInTheDocument();
  });
});
