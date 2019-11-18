import gql from 'graphql-tag';

export const CREATE_FILTER_DATA_CACHE = gql`

query createExamFilterDataCache($collegeId:String!, $academicYearId:String!){
  createExamFilterDataCache(collegeId:$collegeId, academicYearId:$academicYearId  ) {
   branches{ id,branchName},
   departments{
      id,name, branch{ id }, academicyear{id } },
   batches{ id, batch,department{id}},
   sections{id, section, batch{id}},
   academicExamSettings {id,examName,countvalue,department{id}, batch{id}}
subjects{id,subjectType,subjectCode,subjectDesc,department{id}, batch{id}},     semesters{ id, description}
    
}
}

`;
