import init from '../domain/exam/ExamReport/ExamReportApp';

export class ExamReport {
  static templateUrl = '/partials/report.html';
  constructor() {
    init();
  }
}
