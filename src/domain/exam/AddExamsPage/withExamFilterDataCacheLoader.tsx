import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as LoadExamFilterDataCacheQueryGql from './LoadExamFilterDataCacheQuery.graphql';
import {ReactFunctionOrComponentClass, LoadExamSubjQueryCacheForAdmin} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';


type withExamFilterDataCachePageDataLoaderProps = RouteComponentProps<{
  collegeId: string;
  academicYearId:  string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadExamSubjQueryCacheForAdmin ;
};

const withExamFilterDataCacheLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<LoadExamSubjQueryCacheForAdmin, withExamFilterDataCachePageDataLoaderProps, TargetComponentProps>(LoadExamFilterDataCacheQueryGql, {
      options: ({ match }) => ({
        variables: {
          // collegeId: match.params.collegeId,
          // academicYearId: match.params.academicYearId,
          
          collegeId: 1801,
          academicYearId: 1701
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withExamFilterDataCacheLoader 


