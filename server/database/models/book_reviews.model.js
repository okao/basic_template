module.exports = (sequelize, Sequelize) => {
  const BookReview = sequelize.define(
    "book_reviews",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bookName: {
        type: Sequelize.STRING,
        field: "book_name",
        allowNull: false,
      },
      bookReview: {
        type: Sequelize.STRING,
        field: "book_review",
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );
  return BookReview;
};
