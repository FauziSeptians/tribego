export default function getData() {
  const users = [
    {
      id: 0,
      name: "Fauzan",
      image: "uploads/users/r (1).jpg",
      email: "HqIjD@example.com",
    },
    {
      id: 1,
      name: "Another User",
      image: "uploads/users/r (2).jpg",
      email: "HqIjD@example.com",
    },
    {
      id: 2,
      name: "Another User",
      image: "uploads/users/r (3).jpg",
      email: "HqIjD@example.com",
    },
    {
      id: 3,
      name: "Another User",
      image: "uploads/users/r (4).jpg",
      email: "HqIjD@example.com",
    },
  ];

  const destinations = [
    {
      id: 0,
      title: "Title 1",
      location: "Location ",
      description: "Description",
      image: "uploads/destinations/p (1).jpg",
      price: "Price",
      promo: "Promo",
    },
    {
      id: 1,
      title: "Title 2",
      location: "Location ",
      description: "Description",
      image: "uploads/destinations/p (2).jpg",
      price: "Price",
      promo: "Promo",
    },
    {
      id: 2,
      title: "Title 3",
      location: "Location ",
      description: "Description",
      image: "uploads/destinations/p (3).jpg",
      price: "Price",
      promo: "Promo",
    },
  ];

  return {
    Users: users,
    Services: [
      {
        id: 1,
        images: "https://picsum.photos/200/300",
        title: "HALLO",
        description: "HALLO",
      },
      {
        id: 2,
        images: "https://picsum.photos/200/300",
        title: "HALLO",
        description: "HALLO",
      },
      {
        id: 3,
        images: "https://picsum.photos/200/300",
        title: "HALLO",
        description: "HALLO",
      },
      {
        id: 4,
        images: "https://picsum.photos/200/300",
        title: "HALLO",
        description: "HALLO",
      },
      {
        id: 5,
        images: "https://picsum.photos/200/300",
        title: "HALLO",
        description: "HALLO",
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
        destination: destinations[0],
        starReview: 1,
        description: "HALLO GUYS",
      },
      {
        id: 2,
        user: users[1],
        destination: destinations[2],
        starReview: 4,
        description: "KEMBALI LAGI",
      },
    ],
    Bookings: [
      {
        id: 1,
        user: users[0],
        destination: destinations[0],
        guest: "",
        startDate: "",
        endDate: "",
        total: 0,
      },
      {
        id: 2,
        user: users[1],
        destination: destinations[2],
        guest: "",
        startDate: "",
        endDate: "",
        total: 0,
      },
    ],
  };
}
