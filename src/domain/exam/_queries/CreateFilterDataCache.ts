import gql from 'graphql-tag';

export const CREATE_FILTER_DATA_CACHE = gql`
  query createExamFilterDataCache($branchId: Long, $academicYearId: Long) {
    createExamFilterDataCache(branchId: $branchId, academicYearId: $academicYearId) {
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
        academicyear {
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
        countvalue
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
      semesters {
        id
        description
      }
    }
  }
`;
