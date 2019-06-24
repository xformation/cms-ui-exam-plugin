import * as React from 'react';

import { GrafanaInputFactory } from '../../../../components/form/FormElements';
import { NotEmpty } from '../../../../components/form/Constraints';
import PartialForm from '../../../../components/form/PartialForm';

const examData = [
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'examType',
        label: 'Exam Type',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'subject',
        label: 'Subject',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'date',
        label: 'Date',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'day',
        label: 'Day',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
        {
        elementComponentFactory: GrafanaInputFactory,
        name: 'duration',
        label: 'Duration',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'startTime',
        label: 'Start Time',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'endTime',
        label: 'End Time',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'totalMarks',
        label: 'Total Marks',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    },
    {
        elementComponentFactory: GrafanaInputFactory,
        name: 'passingMarks',
        label: 'Passing Marks',
        constraint: NotEmpty,
        className: 'gf-form--grow form-control-container',
    }
];

const ExamData = ({ modelData, onChange }: any) => {
    return (<PartialForm onChange={onChange} formElements={examData} modelData={modelData} className="gf-form-inline" />);
};

export default ExamData;
