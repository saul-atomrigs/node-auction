/**
 * 이메일, 닉네임, 비밀번호, 보유자금으로 구성되는 사용자 모델
 */

const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        money: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  // 사용자가 입찰을 여러번 할 수 있으므로, 사용자모델과 경매모델은 1:N 관계 (a user has many auctions):
  static associate(db) {
    db.User.hasMany(db.Auction);
  }
};
