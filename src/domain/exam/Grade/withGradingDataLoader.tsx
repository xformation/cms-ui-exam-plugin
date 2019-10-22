import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as TypeOfGradingsGql from './TypeOfGradings.graphql';
import {ReactFunctionOrComponentClass, TypeOfGradings} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type withFeeSetupPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;
  }>;

type TargetComponentProps = {
    data: QueryProps & TypeOfGradings ;
};

const withGradingDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
  const params = new URLSearchParams(location.search);
  let ayId = params.get('ayid') ;
  if(ayId == null || ayId == undefined) {
    ayId = "0";
  } 

  let bId = params.get('bid');
  if(bId == null || bId == undefined){
    bId ="0";
  }
    return graphql<TypeOfGradings, withFeeSetupPageDataLoaderProps, TargetComponentProps>(TypeOfGradingsGql, {
      options: ({ match }) => ({
        variables: {
          academicyearId: ayId,
          branchId: bId
         
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withGradingDataLoader 


