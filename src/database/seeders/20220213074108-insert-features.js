"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */
    /* 
        visibility,
    match,
    control,
    consistence,
    recognition,
    efficiency,
    minimalism,
    error_prevention,
    */

    return await queryInterface.bulkInsert("features", [
      {
        name: "visibility",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "match",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "control",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "consistence",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "recognition",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "efficiency",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "minimalism",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "error_prevention",
        value: 0,
        active: true,
        feeding_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete("features", null, {});
  },
};
