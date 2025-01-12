import {
    getFocusStyle,
    getTheme,
    IChoiceGroupStyles,
    IChoiceGroupOptionStyles,
    IDropdownStyles,
    IStackItemStyles,
    IStackStyles,
    IStackTokens,
    ITheme,
    mergeStyleSets,
    FontSizes,
    ITextFieldStyles,
    IDetailsListStyles,
    IStyleSet,
    IPivotStyles,
    IButtonStyles,
    ITextStyles
} from '@fluentui/react';

import { theme } from '../core/ui/fluent';

export {
    actionButtonStyles,
    choiceGroupStyles,
    choiceItemStyles,
    choiceStackTokens,
    detailListStyles,
    exportPivotAssistiveTextStyles,
    exportPivotAssistiveToastTextStyles,
    exportPivotStyles,
    templateExportInfoStackTokens,
    templatePickerDropdownStyles,
    templatePickerItemListStyles,
    templatePickerStackStyles,
    templatePickerStackItemStyles,
    templatePickerStackSeparatorStyles,
    templatePickerStackItemListStyles,
    templatePickerNonShrinkingStackItemStyles,
    templatePickerStackTokens,
    templateTypeIconStyles,
    templateTypeIconOptionStyles,
    templateTypeInfoIconStyles,
    textFieldStyles
};

const defaultTheme: ITheme = getTheme();

// Buttons
const actionButtonStyles: IButtonStyles = {
        root: {
            boxSizing: 'border-box',
            display: 'flex',
            padding: 10,
            selectors: {
                '&:hover': { background: theme.palette.neutralLight },
                '&:focus': { background: theme.palette.neutralLighterAlt }
            }
        },
        icon: { color: theme.palette.neutralPrimary },
        iconHovered: { color: theme.palette.neutralDark },
        iconPressed: { color: theme.palette.neutralDark },
        label: { color: theme.palette.neutralPrimary },
        labelHovered: { color: theme.palette.neutralDark }
    },
    templateTypeIconStyles: IButtonStyles = {
        icon: { color: theme.palette.neutralPrimary },
        iconHovered: { color: theme.palette.neutralDark },
        iconPressed: { color: theme.palette.neutralDark }
    },
    templateTypeIconOptionStyles: IButtonStyles = {
        ...templateTypeIconStyles,
        ...{
            root: {
                marginRight: '8px',
                cursor: 'pointer'
            }
        }
    },
    templateTypeInfoIconStyles: IButtonStyles = {
        root: {
            cursor: 'pointer'
        }
    };

// Horizontal choice group (settings pivot)
const choiceGroupStyles: IChoiceGroupStyles = {
        flexContainer: {
            display: 'flex',
            flexWrap: 'wrap'
        }
    },
    choiceItemStyles: IChoiceGroupOptionStyles = {
        root: {
            paddingRight: '16px'
        }
    },
    choiceStackTokens: IStackTokens = { childrenGap: 10 };

// Template picker items
const templatePickerItemListStyles = mergeStyleSets({
        itemCell: [
            getFocusStyle(defaultTheme, { inset: -1 }),
            {
                minHeight: 34,
                padding: 10,
                boxSizing: 'border-box',
                borderBottom: `1px solid ${theme.palette.neutralLighterAlt}`,
                display: 'flex',
                selectors: {
                    '&:hover': { background: theme.palette.neutralLight },
                    '&:focus': { background: theme.palette.neutralLighterAlt },
                    '&[tabindex="0"]': {
                        background: theme.palette.neutralLighterAlt
                    }
                }
            }
        ],
        itemImage: {
            flexShrink: 0
        },
        itemContent: {
            overflow: 'hidden',
            flexGrow: 1,
            fontSize: FontSizes.smallPlus
        },
        itemName: [
            {
                fontSize: FontSizes.medium,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        ],
        itemIndex: {
            fontSize: FontSizes.small,
            color: theme.palette.neutralTertiary,
            marginBottom: 10
        },
        chevron: {
            alignSelf: 'center',
            marginLeft: 10,
            color: theme.palette.neutralTertiary,
            fontSize: FontSizes.large,
            flexShrink: 0
        }
    }),
    templatePickerStackStyles: IStackStyles = {
        root: {
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%'
        }
    },
    templatePickerStackItemStyles: IStackItemStyles = {
        root: {
            display: 'flex',
            maxHeight: '100%'
        }
    },
    templatePickerStackSeparatorStyles: IStackStyles = {
        ...templatePickerStackItemStyles,
        ...{
            root: { width: 15 }
        }
    },
    templatePickerStackItemListStyles: IStackItemStyles = {
        ...templatePickerStackItemStyles,
        ...{
            root: { overflowY: 'auto', width: 300, maxWidth: 300 }
        }
    },
    templatePickerNonShrinkingStackItemStyles: IStackItemStyles = {
        ...templatePickerStackStyles,
        ...{
            root: {
                overflowY: 'auto'
            }
        }
    },
    templatePickerStackTokens: IStackTokens = {
        childrenGap: 50
    },
    templateExportInfoStackTokens: IStackTokens = {
        childrenGap: 5
    },
    templatePickerDropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 }
    };

// Export dialog - pivot-level assistive text
const exportPivotAssistiveTextStyles: ITextStyles = {
        root: {
            display: 'inline-block',
            paddingTop: '8px'
        }
    },
    exportPivotAssistiveToastTextStyles: ITextStyles = {
        root: {
            display: 'inline-block',
            paddingTop: '8px',
            paddingRight: '8px'
        }
    },
    exportPivotStyles: Partial<IStyleSet<IPivotStyles>> = {
        itemContainer: {
            marginTop: '10px',
            height: '100%'
        }
    };

// Form fields
const textFieldStyles: Partial<ITextFieldStyles> = {
        root: { marginLeft: 35, width: 300 }
    },
    detailListStyles: IDetailsListStyles = {
        root: {},
        headerWrapper: {
            root: {
                borderBottom: null
            }
        },
        focusZone: {
            borderBottom: null
        },
        contentWrapper: {}
    };
