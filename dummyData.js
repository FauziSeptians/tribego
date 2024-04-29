module.exports = {
  getData: function () {
    const users = [
      {
        id: 0,
        image: "",
        name: "Fauzan",
      },
      {
        id: 1,
        image: "",
        name: "Another User",
      },
    ];

    const destinations = [
      {
        id: 0,
        title: "Title 1",
        location: "Location ",
        description: "Description",
        price: "Price",
        promo: "Promo",
      },
      {
        id: 1,
        title: "Title 2",
        location: "Location ",
        description: "Description",
        price: "Price",
        promo: "Promo",
      },
      {
        id: 2,
        title: "Title 3",
        location: "Location ",
        description: "Description",
        price: "Price",
        promo: "Promo",
      },
    ];

    return {
      Users: users,
      Services: [
        {
          images: "",
          title: "",
          description: "",
        },
      ],
      Destinations: destinations,
      Contact: [
        {
          id: 1,
          user: users[0],
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        },
        {
          id: 2,
          user: users[1],
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        },
      ],
      Reviews: [
        {
          id: 1,
          user: users[0],
          destinationsId: destinations[0],
          startPoint: 1,
          description: "",
        },
        {
          id: 2,
          user: users[1],
          destinationsId: destinations[2],
          startPoint: 4,
          description: "",
        },
      ],
      Bookings: [
        {
          id: 1,
          user: users[0],
          destinationsId: destinations[0],
          guest: "",
          startDate: "",
          endDate: "",
          total: 0,
        },
        {
          id: 2,
          user: users[1],
          destinationsId: destinations[2],
          guest: "",
          startDate: "",
          endDate: "",
          total: 0,
        },
      ],
    };
  },
};
