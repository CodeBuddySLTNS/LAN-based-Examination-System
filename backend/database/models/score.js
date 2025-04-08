const { UNAUTHORIZED } = require("../../constants/statusCodes");
const CustomError = require("../../utils/customError");
const sqlQuery = require("../sqlQuery");
const { ScoresTableQuery } = require("../tableQueries");

class ScoreModel {
  async createResponsesTable() {
    await sqlQuery(ScoresTableQuery);
  }
}

module.exports = ScoreModel;
