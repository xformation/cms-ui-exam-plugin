import init from '../domain/exam/ExamTabApp';

export class ExamTab {
  static templateUrl = '/partials/examtab.html';
  constructor() {
    init();
  }
}
