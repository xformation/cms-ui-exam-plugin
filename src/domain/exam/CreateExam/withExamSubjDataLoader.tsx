import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as moment from 'moment';
import * as LoadExamSubjQueryGql from './LoadExamSubjQuery.graphql';
import {ReactFunctionOrComponentClass, LoadExamSubjQueryCacheForAdmin} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';


type withExamSubjPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;

  }>;

type TargetComponentProps = {
    data: QueryProps & LoadExamSubjQueryCacheForAdmin ;
};

const withExamSubjDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {

  const params = new URLSearchParams(location.search);
  let ayId = params.get('ayid') ;
  let bId = params.get('bid');

  if(ayId == null || ayId == undefined) {
    ayId = "0";
  } 
  if(bId == null || bId == undefined){
    bId ="0";
  }
  console.log("Academic year id from URL : ",ayId); 
console.log("Branch id from URL : ",bId);
    return graphql<LoadExamSubjQueryCacheForAdmin, withExamSubjPageDataLoaderProps, TargetComponentProps>(LoadExamSubjQueryGql, {
      options: ({ match }) => ({
        variables: {
      
          academicyearId: ayId,
         branchId: bId
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withExamSubjDataLoader 


