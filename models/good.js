/**
 * 상품명, 이미지, 가격으로 구성된 상품 모델
 */

const Sequelize = require("sequelize");

module.exports = class Good extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "Good",
        tableName: "goods",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // 유저가 등록한 상품:
    db.Good.belongsTo(db.User, { as: "Owner" });
    // 유저가 낙찰받은 상품:
    db.Good.belongsTo(db.User, { as: "Sold" });
    // 한 상품에 여러명이 낙찰한다 (a good has many auctions):
    db.Good.hasMany(db.Auction);
  }
};
