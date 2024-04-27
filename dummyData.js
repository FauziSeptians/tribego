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

    return {
      Users: users,
      Services: [
        {
          image: "",
          title: "",
          description: "",
        },
      ],
      Destinations: [
        {
          id: 0,
        },
      ],
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
          rating: 1,
          description: "",
        },
        {
          id: 2,
          user: users[1],
          rating: 4,
          description: "",
        },
      ],
    };
  },
};
