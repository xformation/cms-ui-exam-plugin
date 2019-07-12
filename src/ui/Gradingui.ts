import init from '../domain/exam/Grade/GradingApp';

export class Gradingui {
  static templateUrl = '/partials/grading.html';
  constructor() {
    init();
  }
}
