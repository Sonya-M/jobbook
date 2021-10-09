import { formatDate, shortFormattedDate } from "../utilities/helpers";

export default class Report {
  constructor(objectLiteral) {
    formatReport(objectLiteral);
    for (let key of Object.keys(objectLiteral)) {
      this[key] = objectLiteral[key];
    }
  }

  getInterviewDate() {
    return formatDate(new Date(this.interviewDate))
  }

  getShortInterviewDate() {
    return shortFormattedDate(new Date(this.interviewDate))
  }

}

/**
 * Formats given report so that strings match those in the wizard form used
 * for creating/editing Report objects.
 * @param {} r an object literal used as model for the Report class
 */
function formatReport(r) {
  let ph = r.phase.toLowerCase();
  switch (ph) {
    case ("cv"): { r.phase = "CV"; break; }
    case ("hr"): { r.phase = "HR"; break; }
    case ("tech"): { r.phase = "Tech"; break; }
    case ("final"): { r.phase = "Final"; break; }
    default: {// leave phase as is }
    }
  }
  let st = r.status.toLowerCase();
  r.status = st === "passed" ? "Passed" : "Declined";
  let id = r.id;
  r.id = +id; // just in case it's a string
}