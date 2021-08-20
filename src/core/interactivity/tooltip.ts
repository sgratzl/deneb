export { getTooltipHandler, isHandlerEnabled };

import powerbi from 'powerbi-visuals-api';
import ITooltipService = powerbi.extensibility.ITooltipService;
import VisualTooltipDataItem = powerbi.extensibility.VisualTooltipDataItem;

import indexOf from 'lodash/indexOf';
import isDate from 'lodash/isDate';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import reduce from 'lodash/reduce';
import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';

import { isInteractivityReservedWord, resolveCoordinates } from '.';
import { i18nValue } from '../ui/i18n';
import { getJsonAsIndentedString } from '../utils/json';
import { IVegaViewDatum } from '../vega';

import { isFeatureEnabled } from '../utils/features';
import { getSelectionIdentitiesFromData } from './selection';
import {
    getMetadataByKeys,
    resolveDataFromItem,
    resolveDatumToArray
} from '../data/dataset';
import { createFormatterFromString } from '../utils/formatting';

/**
 * Convenience constant for tooltip events, as it's required by Power BI.
 */
const isTouchEvent = true;

/**
 * Convenience constant that confirms whether the `tooltipHandler` feature switch is enabled via features.
 */
const isHandlerEnabled = isFeatureEnabled('tooltipHandler');

/**
 *  Confirms whether the `tooltipResolveNumberFieldFormat` feature switch is enabled via features.
 */
const isResolveNumberFormatEnabled = () =>
    isHandlerEnabled && isFeatureEnabled('tooltipResolveNumberFieldFormat');

/**
 * For a given Vega `tooltip` object (key-value pairs), extract any non-reserved keys, and structure suitably as an array of standard Power BI tooltip items (`VisualTooltipDataItem[]`).
 */
const extractTooltipDataItemsFromObject = (
    tooltip: Object,
    autoFormatFields: IVegaViewDatum
): VisualTooltipDataItem[] => {
    const autoFormatMetadata = getMetadataByKeys(keys(autoFormatFields));
    return resolveDatumToArray(tooltip, false).map(([k, v]) => ({
        displayName: `${k}`,
        value: `${
            (autoFormatMetadata[k] &&
                createFormatterFromString(autoFormatMetadata[k].format).format(
                    (autoFormatMetadata[k].type.numeric && toNumber(v)) ||
                        (autoFormatMetadata[k].type.dateTime && v)
                )) ||
            getCuratedTooltipItem(k, getSanitisedTooltipValue(v))
        }`
    }));
};

/**
 * For given Vega `tooltip` object (key-value pairs), return an object of fields from the visual dataset's metadata that are in the tooltip, and eligible for automatic formatting. Eligibility criteria is as follows:
 *
 *  - The `tooltipResolveNumberFieldFormat` feature is enabled, and:
 *  - The field display name has a corresponding entry in the visual datset's metadata, and:
 *  - The field is a number type, and:
 *  - The tooltip value exactly matches the number representation in the `datum`.
 */
const getFieldsEligibleForAutoFormat = (tooltip: Object) =>
    pickBy(tooltip, (v, k) => {
        const ttKeys = keys(tooltip),
            mdKeys = keys(getMetadataByKeys(ttKeys));
        return (
            indexOf(mdKeys, k) > -1 &&
            isResolveNumberFormatEnabled() &&
            toNumber(tooltip[k])
        );
    });

/**
 * 'Redact' any interactivity values to flag that they are present rather than exposing them completely.
 */
const getRedactedTooltipObject = (object: Object) =>
    reduce(
        object,
        (result, value, key) => {
            result[key] = getCuratedTooltipItem(key, value);
            return result;
        },
        {}
    );

/**
 * For a given tooltip item, if it's a reserved workd, return something more sensible to the end user than a complex object.
 */
const getCuratedTooltipItem = (key: string, value: any) =>
    isInteractivityReservedWord(key)
        ? i18nValue('Selection_KW_Present')
        : value;

/**
 * Ensure that tooltip values are correctly sanitised for output into a default tooltip.
 */
const getSanitisedTooltipValue = (value: any) =>
    isObject(value) && !isDate(value)
        ? getJsonAsIndentedString(getRedactedTooltipObject(value), 'tooltip')
        : toString(value);

/**
 * Get a new custom Vega tooltip handler for Power BI. If the supplied setting is enabled, will return a `resolveTooltipContent` handler for the supplied `tooltipService`.
 */
const getTooltipHandler = (
    isSettingEnabled: boolean,
    tooltipService: ITooltipService
) =>
    (isHandlerEnabled &&
        isSettingEnabled &&
        resolveTooltipContent(tooltipService)) ||
    undefined;

/**
 * Request Power BI hides the tooltip.
 */
const hideTooltip = (tooltipService: ITooltipService) => {
    const immediately = true;
    tooltipService.hide({
        immediately,
        isTouchEvent
    });
};

/**
 * For the supplied Power BI `ITooltipService` service instance from the visual host, apply the `vegaTooltip` object (https://github.com/vega/vega-tooltip/blob/master/docs/APIs.md)
 * supplied by the Vega view and attempt to show or hide a Power BI tooltip based on its contents.
 */
const resolveTooltipContent =
    (tooltipService: ITooltipService) =>
    (handler: any, event: MouseEvent, item: any, value: any) => {
        const coordinates = resolveCoordinates(event);
        if (item) {
            const datum = resolveDataFromItem(item),
                tooltip = { ...item.tooltip },
                autoFormatFields = getFieldsEligibleForAutoFormat(tooltip),
                dataItems = extractTooltipDataItemsFromObject(
                    tooltip,
                    autoFormatFields
                ),
                identity = getSelectionIdentitiesFromData(datum);
            switch (event.type) {
                case 'mouseover':
                case 'mousemove': {
                    tooltipService.show({
                        coordinates,
                        dataItems,
                        isTouchEvent,
                        identities: identity
                    });
                    break;
                }
                default: {
                    hideTooltip(tooltipService);
                }
            }
        } else {
            hideTooltip(tooltipService);
        }
    };
