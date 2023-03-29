/**
 * 입찰가, 입찰 시 메시지로 구성된 경매 모델
 */

const Sequelize = require("sequelize");

module.exports = class Auction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        bid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        msg: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Auction",
        tableName: "auctions",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // an auction belongs to many users
    db.Auction.belongsTo(db.User);
    // an auction belongs to many goods
    db.Auction.belongsTo(db.Good);
  }
};
