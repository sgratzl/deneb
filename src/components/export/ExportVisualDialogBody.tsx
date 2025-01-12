import * as React from 'react';
import { useSelector } from 'react-redux';

import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';

import {
    modalDialogStackStyles,
    modalDialogStackItemStyles,
    modalDialogStackItemWrapperStyles,
    modalDialogInnerStackTokens
} from '../../core/ui/modal';
import { state } from '../../store';
import ExportValidation from './ExportValidation';
import ExportVisualDialogPivot from './ExportVisualDialogPivot';
import TemplateExportDatasetPane from './TemplateExportDatasetPane';
import TemplateExportInformationPane from './TemplateExportInformationPane';
import TemplateExportJsonPane from './TemplateExportJsonPane';
import { validateSpecificationForExport } from '../../core/template';
import { i18nValue } from '../../core/ui/i18n';

export const ExportVisualDialogBody = () => {
    const root = useSelector(state),
        {
            selectedExportOperation,
            templateExportState,
            templateExportErrorMessage
        } = root.templates,
        resolveExportPivot = () => {
            switch (templateExportState) {
                case 'Editing': {
                    return <ExportVisualDialogPivot />;
                }
                default:
                    return null;
            }
        },
        resolveExportBodyContent = () => {
            switch (templateExportState) {
                case 'None': {
                    validateSpecificationForExport();
                    return '';
                }
                case 'Validating':
                    return <ExportValidation />;
                case 'Editing':
                    switch (selectedExportOperation) {
                        case 'information':
                            return <TemplateExportInformationPane />;
                        case 'dataset':
                            return <TemplateExportDatasetPane />;
                        case 'template':
                            return <TemplateExportJsonPane />;
                        default:
                            return null;
                    }

                case 'Error':
                    return <p>Error: {templateExportErrorMessage}</p>;
                default:
                    return <p>{templateExportState}</p>;
            }
        };

    return (
        <Stack
            styles={modalDialogStackStyles}
            tokens={modalDialogInnerStackTokens}
        >
            <Stack.Item shrink styles={modalDialogStackItemStyles}>
                <Text variant='small'>
                    {i18nValue('Export_Spec_Assistive')}
                </Text>
            </Stack.Item>
            <Stack.Item shrink styles={modalDialogStackItemStyles}>
                <div className='editor-pane-pivot'>{resolveExportPivot()}</div>
            </Stack.Item>
            <Stack.Item verticalFill styles={modalDialogStackItemWrapperStyles}>
                <div className='export-spec-container'>
                    {resolveExportBodyContent()}
                </div>
            </Stack.Item>
        </Stack>
    );
};

export default ExportVisualDialogBody;
