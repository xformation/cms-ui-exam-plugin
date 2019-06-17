export const ExamServices = {
  getExamBranches,
  getExamDepartments,
  getExamYears,
  getExamSections,
  getSemesters,
};

const url = 'http://18.234.66.133:8080/api/';

function getRequestOptions(method: any) {
  let requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return requestOptions;
}

function getExamBranches() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}branches`, requestOptions).then(response => response.json());
}
function getExamDepartments() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}departments`, requestOptions).then(response => response.json());
}

function getExamYears() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}batches`, requestOptions).then(response => response.json());
}

function getExamSections() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}sections`, requestOptions).then(response => response.json());
}

function getSemesters() {
  let requestOptions = getRequestOptions('GET');
  return fetch(`${url}cmssemesters`, requestOptions).then(response => response.json());
}
