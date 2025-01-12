import * as React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

import { state } from '../../store';
import { updateBooleanProperty } from '../../core/ui/commands';
import { isContextMenuEnabled } from '../../core/interactivity/selection';
import { i18nValue } from '../../core/ui/i18n';

const ContextMenuCheckbox = () => {
    const { settings } = useSelector(state).visual,
        { vega } = settings,
        handleContextMenu = React.useCallback(
            (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
                const value = !!checked;
                updateBooleanProperty('enableContextMenu', value);
            },
            []
        );
    return (
        isContextMenuEnabled && (
            <Checkbox
                label={i18nValue('Objects_Vega_EnableContextMenu')}
                checked={vega.enableContextMenu}
                onChange={handleContextMenu}
            />
        )
    );
};

export default ContextMenuCheckbox;
