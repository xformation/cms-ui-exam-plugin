import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as LoadExamFilterDataCacheQueryGql from './LoadExamFilterDataCacheQuery.graphql';
import {ReactFunctionOrComponentClass, LoadExamFilterDataCacheType} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';


type withExamFilterDataCachePageDataLoaderProps = RouteComponentProps<{
  collegeId: string;
  academicYearId:  string;
  }>;

type TargetComponentProps = {
    data: QueryProps & LoadExamFilterDataCacheType ;
};

const withExamFilterDataCacheLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<LoadExamFilterDataCacheType, withExamFilterDataCachePageDataLoaderProps, TargetComponentProps>(LoadExamFilterDataCacheQueryGql, {
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


