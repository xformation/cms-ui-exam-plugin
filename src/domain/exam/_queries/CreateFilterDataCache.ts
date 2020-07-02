import gql from 'graphql-tag';

export const CREATE_FILTER_DATA_CACHE = gql`
  query createExamFilterDataCache(
    $branchId: Long
    $departmentId: Long
    $academicYearId: Long
  ) {
    createExamFilterDataCache(
      branchId: $branchId
      departmentId: $departmentId
      academicYearId: $academicYearId
    ) {
      branches {
        id
        branchName
      }
      departments {
        id
        name
        branch {
          id
        }
      }
      batches {
        id
        batch
        department {
          id
        }
      }
      sections {
        id
        section
        batch {
          id
        }
      }
      academicExamSettings {
        id
        examName
        departmentId
        batchId
      }

      subjects {
        id
        subjectType
        subjectCode
        subjectDesc
        department {
          id
        }
        batch {
          id
        }
      }

      academicExamSettings {
        id
        examName
        semester
        examDate
        strexamDate
        day
        duration
        startTime
        gradeType
        departmentId
        batchId
        sectionId
        branchId
        academicyearId
        subjectId
        academicyear {
          id
        }
        subject {
          id
          subjectDesc
        }
        branch {
          id
          branchName
        }
        department {
          id
          name
        }
        section {
          id
          section
        }
        batch {
          id
          batch
        }
      }
    }
  }
`;
