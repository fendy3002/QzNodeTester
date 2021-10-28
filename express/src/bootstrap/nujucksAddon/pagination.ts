const lo = require('lodash');
import * as coreType from '../../types';

let populatePaginationButton = ({
    link, query, pageKey, current, rowCount, pageLimit }) => {
    let pageCount = Math.ceil(rowCount / pageLimit);
    let formatLink = link;
    lo.forOwn(query, (val, key) => {
        if (key != pageKey) {
            return formatLink += "&" + key + "=" + val;
        }
    })

    let result = [];
    let minPage = Math.max(current - 3, 1);
    let maxPage = Math.min(minPage + 6, pageCount);

    if (minPage > 1) {
        result.push(`<li class="page-item">
            <a class="page-link rounded-0" href="${ formatLink.replace("{current}", 1)}"> 1</a>
        </li>`);
        result.push(`<li class="page-item">
            <a class="page-link rounded-0" href="${ formatLink.replace("{current}", minPage - 1)}"
                onClick="window._u.changePageEvent('${pageCount}','${pageKey}')(event)"> &hellip;</a>
        </li>`);
    }

    for (let i = minPage; i <= maxPage; i++) {
        if (i == current) {
            result.push(`<li class="page-item active">
                <a class="page-link rounded-0"> ${i}</a>
            </li>`);
        }
        else {
            result.push(`<li class="page-item">
                <a class="page-link rounded-0" href="${ formatLink.replace("{current}", i)}"> ${i}</a>
            </li>`);
        }
    }

    if (maxPage < pageCount) {
        result.push(`<li class="page-item">
            <a class="page-link rounded-0" href="${ formatLink.replace("{current}", maxPage)}" 
                onClick="window._u.changePageEvent('${pageCount}','${pageKey}')(event)"> &hellip;</a>
        </li>`);
        result.push(`<li class="page-item">
            <a class="page-link rounded-0" href="${ formatLink.replace("{current}", pageCount)}"> ${pageCount}</a>
        </li>`);
    }

    return `<ul class="pagination pagination-sm">
        ${result.join("")}
    </ul>`;
};

let getPageLimitSelect = ({
    pageLimit, pageLimitKey
}) => {
    let options = '';
    let perPageChoices = [25, 50, 75, 100];
    try {
        pageLimit = parseInt(pageLimit);
    }
    catch (ex) {
        pageLimit = 25;
    }

    if (perPageChoices.indexOf(pageLimit) < 0) {
        perPageChoices = lo.sortBy(perPageChoices.concat([pageLimit]));
    }
    for (let cnt of perPageChoices) {
        let selected = cnt == pageLimit ? "selected" : "";
        options += `<option value="${cnt}" ${selected}>${cnt}</option>`;
    }

    return `<div style="display: inline-block; margin-left: 12px;" class="nav">
        <select class="form-select form-select-sm rounded-0" name="${pageLimitKey}" onChange="window._u.changePageLimitEvent(this)">
            ${options}
        </select>
    </div>`;
};

export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addGlobal("_pagination", ({
        link, current, rowCount, cssClass,
        query, pageKey = "page", pageLimit, pageLimitKey = "page_limit",
    }) => {
        if (rowCount <= 0) {
            return "";
        }
        let recordData = "";
        recordData = `<span style="margin-left: 12px; line-height:26px; vertical-align:middle;">
                Showing</span>${getPageLimitSelect({ pageLimit, pageLimitKey })}&nbsp;
            <span style="line-height:26px; vertical-align:middle;">of ${rowCount} records</span>`;
        return `<nav class="nav ${cssClass}">
            ${populatePaginationButton({ link, current, pageKey, query, rowCount, pageLimit })}
            ${recordData}
            </nav>`;
    });
}