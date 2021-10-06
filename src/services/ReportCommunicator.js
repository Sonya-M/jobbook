import * as service from "./service.js";
import Report from "../entities/Report";

export default class ReportCommunicator {

  static getAll() {
    return service.getData("reports")
      .then(json => {
        // console.log("Reports results: ", json);
        // console.log("Reports:", json.map(r => new Report(r)));
        return (json.map(r => new Report(r)));
      });
  }

  static getAllForCandidate(candidateId) {
    return service.getData("reports", [{ key: "candidateId", value: candidateId }])
      .then(json => {
        return (json.map(r => new Report(r)));
      });
  }

  static save(report) {
    return service.saveData("reports", report.id ? "PUT" : "POST", report)
      .then(json => new Report(json));
  }

  static delete(reportID) {
    return service.deleteData("reports", reportID)
      .then(response => response);
  }

  static getById(id) {
    return service.getData("reports", [{ key: "id", value: id }])
      .then(json => {
        console.log("getSingleReport", json);
        const noResults = json.length === 0; // server returns empty array when no results
        if (noResults) console.log("getSingleReport: No results!");
        else console.assert(json.length === 1);
        return (noResults ? json : new Report(json[0]));
      });
  }

}