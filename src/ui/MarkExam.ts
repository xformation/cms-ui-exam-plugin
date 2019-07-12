import init from '../domain/exam/CreateExam/MarkExamApp';

export class MarkExam {
  static templateUrl = '/partials/addexam.html';
  constructor() {
    init();
  }
}
