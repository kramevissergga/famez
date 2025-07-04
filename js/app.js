(() => {
    "use strict";
    var __webpack_modules__ = {
        990: () => {
            if (typeof Object.assign !== "function") Object.assign = function(target) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                if (!target) throw TypeError("Cannot convert undefined or null to object");
                var _loop_1 = function(source) {
                    if (source) Object.keys(source).forEach((function(key) {
                        return target[key] = source[key];
                    }));
                };
                for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                    var source = args_1[_a];
                    _loop_1(source);
                }
                return target;
            };
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    const modules_flsModules = {};
    function getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function spoilers() {
        const spoilersArray = document.querySelectorAll("[data-spoilers]");
        if (spoilersArray.length > 0) {
            document.addEventListener("click", setspoilerAction);
            const spoilersRegular = Array.from(spoilersArray).filter((function(item, index, self) {
                return !item.dataset.spoilers.split(",")[0];
            }));
            if (spoilersRegular.length) initspoilers(spoilersRegular);
            let mdQueriesArray = dataMediaQueries(spoilersArray, "spoilers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initspoilers(spoilersArray, matchMedia = false) {
                spoilersArray.forEach((spoilersBlock => {
                    spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spoilersBlock.classList.add("_spoiler-init");
                        initspoilerBody(spoilersBlock);
                    } else {
                        spoilersBlock.classList.remove("_spoiler-init");
                        initspoilerBody(spoilersBlock, false);
                    }
                }));
            }
            function initspoilerBody(spoilersBlock, hidespoilerBody = true) {
                let spoilerItems = spoilersBlock.querySelectorAll("details");
                if (spoilerItems.length) spoilerItems.forEach((spoilerItem => {
                    let spoilerTitle = spoilerItem.querySelector("summary");
                    if (hidespoilerBody) {
                        spoilerTitle.removeAttribute("tabindex");
                        if (!spoilerItem.hasAttribute("data-open")) {
                            spoilerItem.open = false;
                            if (spoilerTitle.nextElementSibling) spoilerTitle.nextElementSibling.hidden = true;
                        } else {
                            spoilerTitle.classList.add("_spoiler-active");
                            spoilerItem.open = true;
                        }
                    } else {
                        spoilerTitle.setAttribute("tabindex", "-1");
                        spoilerTitle.classList.remove("_spoiler-active");
                        spoilerItem.open = true;
                        if (spoilerTitle.nextElementSibling) spoilerTitle.nextElementSibling.hidden = false;
                    }
                }));
            }
            function setspoilerAction(e) {
                const el = e.target;
                if (el.closest("summary") && el.closest("[data-spoilers]")) {
                    e.preventDefault();
                    const spoilerTitle = el.closest("summary");
                    const spoilerBlock = spoilerTitle.closest("details");
                    const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
                    if (!spoilerTitle.nextElementSibling) return;
                    if (spoilersBlock.classList.contains("_spoiler-init")) {
                        const onespoiler = spoilersBlock.hasAttribute("data-one-spoiler");
                        const scrollspoiler = spoilerBlock.hasAttribute("data-spoiler-scroll");
                        const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                        if (!spoilersBlock.querySelectorAll("._slide").length) {
                            if (onespoiler && !spoilerBlock.open) hidespoilersBody(spoilersBlock);
                            !spoilerBlock.open ? spoilerBlock.open = true : setTimeout((() => {
                                spoilerBlock.open = false;
                            }), spoilerSpeed);
                            spoilerTitle.classList.toggle("_spoiler-active");
                            let direction = spoilersBlock.closest("[data-hrz]") && window.matchMedia("(min-width: 68.74875em)").matches ? "horizontal" : "vertical";
                            _slideToggle(spoilerTitle.nextElementSibling, spoilerSpeed, direction);
                            if (scrollspoiler && spoilerTitle.classList.contains("_spoiler-active")) {
                                const scrollspoilerValue = spoilerBlock.dataset.spoilerScroll;
                                const scrollspoilerOffset = +scrollspoilerValue ? +scrollspoilerValue : 0;
                                const scrollspoilerNoHeader = spoilerBlock.hasAttribute("data-spoiler-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                                window.scrollTo({
                                    top: spoilerBlock.offsetTop - (scrollspoilerOffset + scrollspoilerNoHeader),
                                    behavior: "smooth"
                                });
                            }
                        }
                    }
                }
                if (!el.closest("[data-spoilers]")) {
                    const spoilersClose = document.querySelectorAll("[data-spoiler-close]");
                    if (spoilersClose.length) spoilersClose.forEach((spoilerClose => {
                        const spoilersBlock = spoilerClose.closest("[data-spoilers]");
                        const spoilerCloseBlock = spoilerClose.parentNode;
                        if (spoilersBlock.classList.contains("_spoiler-init")) {
                            const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                            spoilerClose.classList.remove("_spoiler-active");
                            let direction = spoilersBlock.closest("[data-hrz]") && window.matchMedia("(min-width: 68.74875em)").matches ? "horizontal" : "vertical";
                            _slideUp(spoilerCloseBlock.open ? spoilerClose.nextElementSibling : null, 500, direction);
                            setTimeout((() => {
                                spoilerCloseBlock.open = false;
                            }), spoilerSpeed);
                        }
                    }));
                }
            }
            function hidespoilersBody(spoilersBlock) {
                const spoilerActiveBlock = spoilersBlock.querySelector("details[open]");
                if (spoilerActiveBlock && !spoilersBlock.querySelectorAll("._slide").length) {
                    const spoilerActiveTitle = spoilerActiveBlock.querySelector("summary");
                    if (!spoilerActiveTitle.nextElementSibling) return;
                    const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                    spoilerActiveTitle.classList.remove("_spoiler-active");
                    let direction = spoilersBlock.closest("[data-hrz]") && window.matchMedia("(min-width: 68.74875em)").matches ? "horizontal" : "vertical";
                    _slideUp(spoilerActiveTitle.nextElementSibling, spoilerSpeed, direction);
                    setTimeout((() => {
                        spoilerActiveBlock.open = false;
                    }), spoilerSpeed);
                }
            }
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) tabsContent.forEach(((tabsContentItem, index) => {
                tabsTitles[index].setAttribute("data-tabs-title", "");
                tabsContentItem.setAttribute("data-tabs-item", "");
                if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
            }));
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function showMore() {
        window.addEventListener("load", (function(e) {
            const showMoreBlocks = document.querySelectorAll("[data-showmore]");
            let showMoreBlocksRegular;
            let mdQueriesArray;
            if (showMoreBlocks.length) {
                showMoreBlocksRegular = Array.from(showMoreBlocks).filter((function(item, index, self) {
                    return !item.dataset.showmoreMedia;
                }));
                showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                document.addEventListener("click", showMoreActions);
                window.addEventListener("resize", showMoreActions);
                mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
                if (mdQueriesArray && mdQueriesArray.length) {
                    mdQueriesArray.forEach((mdQueriesItem => {
                        mdQueriesItem.matchMedia.addEventListener("change", (function() {
                            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                        }));
                    }));
                    initItemsMedia(mdQueriesArray);
                }
            }
            function initItemsMedia(mdQueriesArray) {
                mdQueriesArray.forEach((mdQueriesItem => {
                    initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function initItems(showMoreBlocks, matchMedia) {
                showMoreBlocks.forEach((showMoreBlock => {
                    initItem(showMoreBlock, matchMedia);
                }));
            }
            function initItem(showMoreBlock, matchMedia = false) {
                showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
                let showMoreContent = showMoreBlock.querySelectorAll("[data-showmore-content]");
                let showMoreButton = showMoreBlock.querySelectorAll("[data-showmore-button]");
                showMoreContent = Array.from(showMoreContent).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                showMoreButton = Array.from(showMoreButton).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                if (matchMedia.matches || !matchMedia) if (hiddenHeight < getOriginalHeight(showMoreContent)) {
                    _slideUp(showMoreContent, 0, showMoreBlock.classList.contains("_showmore-active") ? getOriginalHeight(showMoreContent) : hiddenHeight);
                    showMoreButton.hidden = false;
                } else {
                    _slideDown(showMoreContent, 0, hiddenHeight);
                    showMoreButton.hidden = true;
                } else {
                    _slideDown(showMoreContent, 0, hiddenHeight);
                    showMoreButton.hidden = true;
                }
            }
            function getHeight(showMoreBlock, showMoreContent) {
                let hiddenHeight = 0;
                const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : "size";
                const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) ? parseFloat(getComputedStyle(showMoreContent).rowGap) : 0;
                if (showMoreType === "items") {
                    const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? parseInt(showMoreContent.dataset.showmoreContent) : 3;
                    const showMoreItems = showMoreContent.children;
                    const itemsToShow = Math.min(showMoreItems.length, showMoreTypeValue);
                    for (let index = 0; index < itemsToShow; index++) {
                        const showMoreItem = showMoreItems[index];
                        const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop) ? parseFloat(getComputedStyle(showMoreItem).marginTop) : 0;
                        const marginBottom = parseFloat(getComputedStyle(showMoreItem).marginBottom) ? parseFloat(getComputedStyle(showMoreItem).marginBottom) : 0;
                        hiddenHeight += showMoreItem.offsetHeight + marginTop;
                        if (index < itemsToShow - 1) hiddenHeight += marginBottom;
                    }
                    if (rowGap && itemsToShow > 1) hiddenHeight += (itemsToShow - 1) * rowGap;
                } else {
                    const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
                    hiddenHeight = showMoreTypeValue;
                }
                return hiddenHeight;
            }
            function getOriginalHeight(showMoreContent) {
                let parentHidden;
                let hiddenHeight = showMoreContent.offsetHeight;
                showMoreContent.style.removeProperty("height");
                if (showMoreContent.closest(`[hidden]`)) {
                    parentHidden = showMoreContent.closest(`[hidden]`);
                    parentHidden.hidden = false;
                }
                let originalHeight = showMoreContent.offsetHeight;
                parentHidden ? parentHidden.hidden = true : null;
                showMoreContent.style.height = `${hiddenHeight}px`;
                return originalHeight;
            }
            function showMoreActions(e) {
                const targetEvent = e.target;
                const targetType = e.type;
                if (targetType === "click") {
                    if (targetEvent.closest("[data-showmore-button]")) {
                        const showMoreButton = targetEvent.closest("[data-showmore-button]");
                        const showMoreBlock = showMoreButton.closest("[data-showmore]");
                        const showMoreContent = showMoreBlock.querySelector("[data-showmore-content]");
                        const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : "500";
                        const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                        if (!showMoreContent.classList.contains("_slide")) {
                            showMoreBlock.classList.contains("_showmore-active") ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
                            showMoreBlock.classList.toggle("_showmore-active");
                        }
                    }
                } else if (targetType === "resize") {
                    showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                    mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
                }
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                const headerElement = document.querySelector(headerItem);
                if (!headerElement.classList.contains("_header-scroll")) {
                    headerElement.style.cssText = `transition-duration: 0s;`;
                    headerElement.classList.add("_header-scroll");
                    headerItemHeight = headerElement.offsetHeight;
                    headerElement.classList.remove("_header-scroll");
                    setTimeout((() => {
                        headerElement.style.cssText = ``;
                    }), 0);
                } else headerItemHeight = headerElement.offsetHeight;
            }
            let options = {
                speedAsDuration: true,
                speed,
                header: headerItem,
                offset: offsetTop,
                easing: "easeOutQuad"
            };
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                window.scrollTo({
                    top: targetBlockElementPosition,
                    behavior: "smooth"
                });
            }
            functions_FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
        } else functions_FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
    };
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll("div.select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    function formRating() {
        const ratings = document.querySelectorAll("[data-rating]");
        if (ratings) ratings.forEach((rating => {
            const ratingValue = +rating.dataset.ratingValue;
            const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5;
            formRatingInit(rating, ratingSize);
            ratingValue ? formRatingSet(rating, ratingValue) : null;
            document.addEventListener("click", formRatingAction);
        }));
        function formRatingAction(e) {
            const targetElement = e.target;
            if (targetElement.closest(".rating__input")) {
                const currentElement = targetElement.closest(".rating__input");
                const ratingValue = +currentElement.value;
                const rating = currentElement.closest(".rating");
                const ratingSet = rating.dataset.rating === "set";
                ratingSet ? formRatingGet(rating, ratingValue) : null;
            }
        }
        function formRatingInit(rating, ratingSize) {
            let ratingItems = ``;
            for (let index = 0; index < ratingSize; index++) {
                index === 0 ? ratingItems += `<div class="rating__items">` : null;
                ratingItems += `\n\t\t\t\t<label class="rating__item">\n\t\t\t\t\t<input class="rating__input" type="radio" name="rating" value="${index + 1}">\n\t\t\t\t</label>`;
                index === ratingSize ? ratingItems += `</div">` : null;
            }
            rating.insertAdjacentHTML("beforeend", ratingItems);
        }
        function formRatingGet(rating, ratingValue) {
            const resultRating = ratingValue;
            formRatingSet(rating, resultRating);
        }
        function formRatingSet(rating, value) {
            const ratingItems = rating.querySelectorAll(".rating__item");
            const resultFullItems = parseInt(value);
            const resultPartItem = value - resultFullItems;
            rating.hasAttribute("data-rating-title") ? rating.title = value : null;
            ratingItems.forEach(((ratingItem, index) => {
                ratingItem.classList.remove("rating__item--active");
                ratingItem.querySelector("span") ? ratingItems[index].querySelector("span").remove() : null;
                if (index <= resultFullItems - 1) ratingItem.classList.add("rating__item--active");
                if (index === resultFullItems && resultPartItem) ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`);
            }));
        }
    }
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true,
                speed: 150
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Прокинувся, построїв селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, немає жодного select");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
            this.config.speed = +originalSelect.dataset.speed;
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if (targetType === "click") {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if (targetType === "focusin" || targetType === "focusout") {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
                setTimeout((() => {
                    selectItem.style.zIndex = "";
                }), originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;
            this.setOptionsPosition(selectItem);
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            setTimeout((() => {
                if (!selectOptions.classList.contains("_slide")) {
                    selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                    _slideToggle(selectOptions, originalSelect.dataset.speed);
                    if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) selectItem.style.zIndex = selectOpenzIndex; else setTimeout((() => {
                        selectItem.style.zIndex = "";
                    }), originalSelect.dataset.speed);
                }
            }), 0);
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            const selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ""} class="${this.selectClasses.classSelectOptionsScroll}">`;
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += `</div>`;
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected ? ` _selected` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        setOptionsPosition(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
            const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
            const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;
            if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
                selectOptions.hidden = false;
                const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue("max-height"));
                const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
                const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
                selectOptions.hidden = true;
                const selectItemHeight = selectItem.offsetHeight;
                const selectItemPos = selectItem.getBoundingClientRect().top;
                const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
                const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);
                if (selectItemResult < 0) {
                    const newMaxHeightValue = selectOptionsHeight + selectItemResult;
                    if (newMaxHeightValue < 100) {
                        selectItem.classList.add("select--show-top");
                        selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
                    } else {
                        selectItem.classList.remove("select--show-top");
                        selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
                    }
                }
            } else setTimeout((() => {
                selectItem.classList.remove("select--show-top");
                selectItemScroll.style.maxHeight = customMaxHeightValue;
            }), +originalSelect.dataset.speed);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
            if (!selectOptions.classList.contains("_slide")) {
                if (originalSelect.multiple) {
                    optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                    const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                    originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                        originalSelectSelectedItem.removeAttribute("selected");
                    }));
                    const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                    selectSelectedItems.forEach((selectSelectedItems => {
                        originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                    }));
                } else {
                    if (originalSelect.hasAttribute("data-show-selected")) {
                        selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOption)).forEach((item => item.classList.remove("_selected")));
                        optionItem.classList.add("_selected");
                    }
                    if (!originalSelect.hasAttribute("data-show-selected")) setTimeout((() => {
                        if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                        optionItem.hidden = true;
                    }), this.config.speed);
                    originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                    this.selectAction(selectItem);
                }
                this.setSelectTitleValue(selectItem, originalSelect);
                this.setSelectChange(originalSelect);
            }
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message} `) : null;
        }
    }
    window.select = new SelectConstructor({});
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
            writable: false
        });
        return Constructor;
    }
    /*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */    var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
    var CREATED = 1;
    var MOUNTED = 2;
    var IDLE = 3;
    var MOVING = 4;
    var SCROLLING = 5;
    var DRAGGING = 6;
    var DESTROYED = 7;
    var STATES = {
        CREATED,
        MOUNTED,
        IDLE,
        MOVING,
        SCROLLING,
        DRAGGING,
        DESTROYED
    };
    function empty(array) {
        array.length = 0;
    }
    function slice(arrayLike, start, end) {
        return Array.prototype.slice.call(arrayLike, start, end);
    }
    function apply(func) {
        return func.bind.apply(func, [ null ].concat(slice(arguments, 1)));
    }
    var nextTick = setTimeout;
    var noop = function noop() {};
    function raf(func) {
        return requestAnimationFrame(func);
    }
    function typeOf(type, subject) {
        return typeof subject === type;
    }
    function isObject(subject) {
        return !isNull(subject) && typeOf("object", subject);
    }
    var isArray = Array.isArray;
    var isFunction = apply(typeOf, "function");
    var isString = apply(typeOf, "string");
    var isUndefined = apply(typeOf, "undefined");
    function isNull(subject) {
        return subject === null;
    }
    function isHTMLElement(subject) {
        try {
            return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
        } catch (e) {
            return false;
        }
    }
    function toArray(value) {
        return isArray(value) ? value : [ value ];
    }
    function forEach(values, iteratee) {
        toArray(values).forEach(iteratee);
    }
    function includes(array, value) {
        return array.indexOf(value) > -1;
    }
    function push(array, items) {
        array.push.apply(array, toArray(items));
        return array;
    }
    function toggleClass(elm, classes, add) {
        if (elm) forEach(classes, (function(name) {
            if (name) elm.classList[add ? "add" : "remove"](name);
        }));
    }
    function addClass(elm, classes) {
        toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
    }
    function append(parent, children) {
        forEach(children, parent.appendChild.bind(parent));
    }
    function before(nodes, ref) {
        forEach(nodes, (function(node) {
            var parent = (ref || node).parentNode;
            if (parent) parent.insertBefore(node, ref);
        }));
    }
    function matches(elm, selector) {
        return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
    }
    function children(parent, selector) {
        var children2 = parent ? slice(parent.children) : [];
        return selector ? children2.filter((function(child) {
            return matches(child, selector);
        })) : children2;
    }
    function child(parent, selector) {
        return selector ? children(parent, selector)[0] : parent.firstElementChild;
    }
    var ownKeys = Object.keys;
    function forOwn(object, iteratee, right) {
        if (object) (right ? ownKeys(object).reverse() : ownKeys(object)).forEach((function(key) {
            key !== "__proto__" && iteratee(object[key], key);
        }));
        return object;
    }
    function splide_esm_assign(object) {
        slice(arguments, 1).forEach((function(source) {
            forOwn(source, (function(value, key) {
                object[key] = source[key];
            }));
        }));
        return object;
    }
    function merge(object) {
        slice(arguments, 1).forEach((function(source) {
            forOwn(source, (function(value, key) {
                if (isArray(value)) object[key] = value.slice(); else if (isObject(value)) object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value); else object[key] = value;
            }));
        }));
        return object;
    }
    function omit(object, keys) {
        forEach(keys || ownKeys(object), (function(key) {
            delete object[key];
        }));
    }
    function removeAttribute(elms, attrs) {
        forEach(elms, (function(elm) {
            forEach(attrs, (function(attr) {
                elm && elm.removeAttribute(attr);
            }));
        }));
    }
    function setAttribute(elms, attrs, value) {
        if (isObject(attrs)) forOwn(attrs, (function(value2, name) {
            setAttribute(elms, name, value2);
        })); else forEach(elms, (function(elm) {
            isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
        }));
    }
    function create(tag, attrs, parent) {
        var elm = document.createElement(tag);
        if (attrs) isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
        parent && append(parent, elm);
        return elm;
    }
    function style(elm, prop, value) {
        if (isUndefined(value)) return getComputedStyle(elm)[prop];
        if (!isNull(value)) elm.style[prop] = "" + value;
    }
    function display(elm, display2) {
        style(elm, "display", display2);
    }
    function splide_esm_focus(elm) {
        elm["setActive"] && elm["setActive"]() || elm.focus({
            preventScroll: true
        });
    }
    function getAttribute(elm, attr) {
        return elm.getAttribute(attr);
    }
    function hasClass(elm, className) {
        return elm && elm.classList.contains(className);
    }
    function rect(target) {
        return target.getBoundingClientRect();
    }
    function remove(nodes) {
        forEach(nodes, (function(node) {
            if (node && node.parentNode) node.parentNode.removeChild(node);
        }));
    }
    function parseHtml(html) {
        return child((new DOMParser).parseFromString(html, "text/html").body);
    }
    function prevent(e, stopPropagation) {
        e.preventDefault();
        if (stopPropagation) {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }
    function query(parent, selector) {
        return parent && parent.querySelector(selector);
    }
    function queryAll(parent, selector) {
        return selector ? slice(parent.querySelectorAll(selector)) : [];
    }
    function removeClass(elm, classes) {
        toggleClass(elm, classes, false);
    }
    function timeOf(e) {
        return e.timeStamp;
    }
    function unit(value) {
        return isString(value) ? value : value ? value + "px" : "";
    }
    var PROJECT_CODE = "splide";
    var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
    function assert(condition, message) {
        if (!condition) throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
    var min = Math.min, max = Math.max, floor = Math.floor, ceil = Math.ceil, abs = Math.abs;
    function approximatelyEqual(x, y, epsilon) {
        return abs(x - y) < epsilon;
    }
    function between(number, x, y, exclusive) {
        var minimum = min(x, y);
        var maximum = max(x, y);
        return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
    }
    function clamp(number, x, y) {
        var minimum = min(x, y);
        var maximum = max(x, y);
        return min(max(minimum, number), maximum);
    }
    function sign(x) {
        return +(x > 0) - +(x < 0);
    }
    function camelToKebab(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function format(string, replacements) {
        forEach(replacements, (function(replacement) {
            string = string.replace("%s", "" + replacement);
        }));
        return string;
    }
    function pad(number) {
        return number < 10 ? "0" + number : "" + number;
    }
    var ids = {};
    function uniqueId(prefix) {
        return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
    }
    function EventBinder() {
        var listeners = [];
        function bind(targets, events, callback, options) {
            forEachEvent(targets, events, (function(target, event, namespace) {
                var isEventTarget = "addEventListener" in target;
                var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
                isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
                listeners.push([ target, event, namespace, callback, remover ]);
            }));
        }
        function unbind(targets, events, callback) {
            forEachEvent(targets, events, (function(target, event, namespace) {
                listeners = listeners.filter((function(listener) {
                    if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
                        listener[4]();
                        return false;
                    }
                    return true;
                }));
            }));
        }
        function dispatch(target, type, detail) {
            var e;
            var bubbles = true;
            if (typeof CustomEvent === "function") e = new CustomEvent(type, {
                bubbles,
                detail
            }); else {
                e = document.createEvent("CustomEvent");
                e.initCustomEvent(type, bubbles, false, detail);
            }
            target.dispatchEvent(e);
            return e;
        }
        function forEachEvent(targets, events, iteratee) {
            forEach(targets, (function(target) {
                target && forEach(events, (function(events2) {
                    events2.split(" ").forEach((function(eventNS) {
                        var fragment = eventNS.split(".");
                        iteratee(target, fragment[0], fragment[1]);
                    }));
                }));
            }));
        }
        function destroy() {
            listeners.forEach((function(data) {
                data[4]();
            }));
            empty(listeners);
        }
        return {
            bind,
            unbind,
            dispatch,
            destroy
        };
    }
    var EVENT_MOUNTED = "mounted";
    var EVENT_READY = "ready";
    var EVENT_MOVE = "move";
    var EVENT_MOVED = "moved";
    var EVENT_CLICK = "click";
    var EVENT_ACTIVE = "active";
    var EVENT_INACTIVE = "inactive";
    var EVENT_VISIBLE = "visible";
    var EVENT_HIDDEN = "hidden";
    var EVENT_REFRESH = "refresh";
    var EVENT_UPDATED = "updated";
    var EVENT_RESIZE = "resize";
    var EVENT_RESIZED = "resized";
    var EVENT_DRAG = "drag";
    var EVENT_DRAGGING = "dragging";
    var EVENT_DRAGGED = "dragged";
    var EVENT_SCROLL = "scroll";
    var EVENT_SCROLLED = "scrolled";
    var EVENT_OVERFLOW = "overflow";
    var EVENT_DESTROY = "destroy";
    var EVENT_ARROWS_MOUNTED = "arrows:mounted";
    var EVENT_ARROWS_UPDATED = "arrows:updated";
    var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
    var EVENT_PAGINATION_UPDATED = "pagination:updated";
    var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
    var EVENT_AUTOPLAY_PLAY = "autoplay:play";
    var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
    var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
    var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
    var EVENT_SLIDE_KEYDOWN = "sk";
    var EVENT_SHIFTED = "sh";
    var EVENT_END_INDEX_CHANGED = "ei";
    function EventInterface(Splide2) {
        var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
        var binder = EventBinder();
        function on(events, callback) {
            binder.bind(bus, toArray(events).join(" "), (function(e) {
                callback.apply(callback, isArray(e.detail) ? e.detail : []);
            }));
        }
        function emit(event) {
            binder.dispatch(bus, event, slice(arguments, 1));
        }
        if (Splide2) Splide2.event.on(EVENT_DESTROY, binder.destroy);
        return splide_esm_assign(binder, {
            bus,
            on,
            off: apply(binder.unbind, bus),
            emit
        });
    }
    function RequestInterval(interval, onInterval, onUpdate, limit) {
        var now = Date.now;
        var startTime;
        var rate = 0;
        var id;
        var paused = true;
        var count = 0;
        function update() {
            if (!paused) {
                rate = interval ? min((now() - startTime) / interval, 1) : 1;
                onUpdate && onUpdate(rate);
                if (rate >= 1) {
                    onInterval();
                    startTime = now();
                    if (limit && ++count >= limit) return pause();
                }
                id = raf(update);
            }
        }
        function start(resume) {
            resume || cancel();
            startTime = now() - (resume ? rate * interval : 0);
            paused = false;
            id = raf(update);
        }
        function pause() {
            paused = true;
        }
        function rewind() {
            startTime = now();
            rate = 0;
            if (onUpdate) onUpdate(rate);
        }
        function cancel() {
            id && cancelAnimationFrame(id);
            rate = 0;
            id = 0;
            paused = true;
        }
        function set(time) {
            interval = time;
        }
        function isPaused() {
            return paused;
        }
        return {
            start,
            rewind,
            pause,
            cancel,
            set,
            isPaused
        };
    }
    function State(initialState) {
        var state = initialState;
        function set(value) {
            state = value;
        }
        function is(states) {
            return includes(toArray(states), state);
        }
        return {
            set,
            is
        };
    }
    function Throttle(func, duration) {
        var interval = RequestInterval(duration || 0, func, null, 1);
        return function() {
            interval.isPaused() && interval.start();
        };
    }
    function Media(Splide2, Components2, options) {
        var state = Splide2.state;
        var breakpoints = options.breakpoints || {};
        var reducedMotion = options.reducedMotion || {};
        var binder = EventBinder();
        var queries = [];
        function setup() {
            var isMin = options.mediaQuery === "min";
            ownKeys(breakpoints).sort((function(n, m) {
                return isMin ? +n - +m : +m - +n;
            })).forEach((function(key) {
                register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
            }));
            register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
            update();
        }
        function destroy(completely) {
            if (completely) binder.destroy();
        }
        function register(options2, query) {
            var queryList = matchMedia(query);
            binder.bind(queryList, "change", update);
            queries.push([ options2, queryList ]);
        }
        function update() {
            var destroyed = state.is(DESTROYED);
            var direction = options.direction;
            var merged = queries.reduce((function(merged2, entry) {
                return merge(merged2, entry[1].matches ? entry[0] : {});
            }), {});
            omit(options);
            set(merged);
            if (options.destroy) Splide2.destroy(options.destroy === "completely"); else if (destroyed) {
                destroy(true);
                Splide2.mount();
            } else direction !== options.direction && Splide2.refresh();
        }
        function reduce(enable) {
            if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
        }
        function set(opts, base, notify) {
            merge(options, opts);
            base && merge(Object.getPrototypeOf(options), opts);
            if (notify || !state.is(CREATED)) Splide2.emit(EVENT_UPDATED, options);
        }
        return {
            setup,
            destroy,
            reduce,
            set
        };
    }
    var ARROW = "Arrow";
    var ARROW_LEFT = ARROW + "Left";
    var ARROW_RIGHT = ARROW + "Right";
    var ARROW_UP = ARROW + "Up";
    var ARROW_DOWN = ARROW + "Down";
    var RTL = "rtl";
    var TTB = "ttb";
    var ORIENTATION_MAP = {
        width: [ "height" ],
        left: [ "top", "right" ],
        right: [ "bottom", "left" ],
        x: [ "y" ],
        X: [ "Y" ],
        Y: [ "X" ],
        ArrowLeft: [ ARROW_UP, ARROW_RIGHT ],
        ArrowRight: [ ARROW_DOWN, ARROW_LEFT ]
    };
    function Direction(Splide2, Components2, options) {
        function resolve(prop, axisOnly, direction) {
            direction = direction || options.direction;
            var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
            return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, (function(match, offset) {
                var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
                return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
            }));
        }
        function orient(value) {
            return value * (options.direction === RTL ? 1 : -1);
        }
        return {
            resolve,
            orient
        };
    }
    var ROLE = "role";
    var TAB_INDEX = "tabindex";
    var DISABLED = "disabled";
    var ARIA_PREFIX = "aria-";
    var ARIA_CONTROLS = ARIA_PREFIX + "controls";
    var ARIA_CURRENT = ARIA_PREFIX + "current";
    var ARIA_SELECTED = ARIA_PREFIX + "selected";
    var ARIA_LABEL = ARIA_PREFIX + "label";
    var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
    var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
    var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
    var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
    var ARIA_LIVE = ARIA_PREFIX + "live";
    var ARIA_BUSY = ARIA_PREFIX + "busy";
    var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
    var ALL_ATTRIBUTES = [ ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION ];
    var CLASS_PREFIX = PROJECT_CODE + "__";
    var STATUS_CLASS_PREFIX = "is-";
    var CLASS_ROOT = PROJECT_CODE;
    var CLASS_TRACK = CLASS_PREFIX + "track";
    var CLASS_LIST = CLASS_PREFIX + "list";
    var CLASS_SLIDE = CLASS_PREFIX + "slide";
    var CLASS_CLONE = CLASS_SLIDE + "--clone";
    var CLASS_CONTAINER = CLASS_SLIDE + "__container";
    var CLASS_ARROWS = CLASS_PREFIX + "arrows";
    var CLASS_ARROW = CLASS_PREFIX + "arrow";
    var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
    var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
    var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
    var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
    var CLASS_PROGRESS = CLASS_PREFIX + "progress";
    var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
    var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
    var CLASS_SPINNER = CLASS_PREFIX + "spinner";
    var CLASS_SR = CLASS_PREFIX + "sr";
    var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
    var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
    var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
    var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
    var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
    var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
    var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
    var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
    var STATUS_CLASSES = [ CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW ];
    var CLASSES = {
        slide: CLASS_SLIDE,
        clone: CLASS_CLONE,
        arrows: CLASS_ARROWS,
        arrow: CLASS_ARROW,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        pagination: CLASS_PAGINATION,
        page: CLASS_PAGINATION_PAGE,
        spinner: CLASS_SPINNER
    };
    function closest(from, selector) {
        if (isFunction(from.closest)) return from.closest(selector);
        var elm = from;
        while (elm && elm.nodeType === 1) {
            if (matches(elm, selector)) break;
            elm = elm.parentElement;
        }
        return elm;
    }
    var FRICTION = 5;
    var LOG_INTERVAL = 200;
    var POINTER_DOWN_EVENTS = "touchstart mousedown";
    var POINTER_MOVE_EVENTS = "touchmove mousemove";
    var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
    function Elements(Splide2, Components2, options) {
        var _EventInterface = EventInterface(Splide2), on = _EventInterface.on, bind = _EventInterface.bind;
        var root = Splide2.root;
        var i18n = options.i18n;
        var elements = {};
        var slides = [];
        var rootClasses = [];
        var trackClasses = [];
        var track;
        var list;
        var isUsingKey;
        function setup() {
            collect();
            init();
            update();
        }
        function mount() {
            on(EVENT_REFRESH, destroy);
            on(EVENT_REFRESH, setup);
            on(EVENT_UPDATED, update);
            bind(document, POINTER_DOWN_EVENTS + " keydown", (function(e) {
                isUsingKey = e.type === "keydown";
            }), {
                capture: true
            });
            bind(root, "focusin", (function() {
                toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
            }));
        }
        function destroy(completely) {
            var attrs = ALL_ATTRIBUTES.concat("style");
            empty(slides);
            removeClass(root, rootClasses);
            removeClass(track, trackClasses);
            removeAttribute([ track, list ], attrs);
            removeAttribute(root, completely ? attrs : [ "style", ARIA_ROLEDESCRIPTION ]);
        }
        function update() {
            removeClass(root, rootClasses);
            removeClass(track, trackClasses);
            rootClasses = getClasses(CLASS_ROOT);
            trackClasses = getClasses(CLASS_TRACK);
            addClass(root, rootClasses);
            addClass(track, trackClasses);
            setAttribute(root, ARIA_LABEL, options.label);
            setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
        }
        function collect() {
            track = find("." + CLASS_TRACK);
            list = child(track, "." + CLASS_LIST);
            assert(track && list, "A track/list element is missing.");
            push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
            forOwn({
                arrows: CLASS_ARROWS,
                pagination: CLASS_PAGINATION,
                prev: CLASS_ARROW_PREV,
                next: CLASS_ARROW_NEXT,
                bar: CLASS_PROGRESS_BAR,
                toggle: CLASS_TOGGLE
            }, (function(className, key) {
                elements[key] = find("." + className);
            }));
            splide_esm_assign(elements, {
                root,
                track,
                list,
                slides
            });
        }
        function init() {
            var id = root.id || uniqueId(PROJECT_CODE);
            var role = options.role;
            root.id = id;
            track.id = track.id || id + "-track";
            list.id = list.id || id + "-list";
            if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) setAttribute(root, ROLE, role);
            setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
            setAttribute(list, ROLE, "presentation");
        }
        function find(selector) {
            var elm = query(root, selector);
            return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
        }
        function getClasses(base) {
            return [ base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE ];
        }
        return splide_esm_assign(elements, {
            setup,
            mount,
            destroy
        });
    }
    var SLIDE = "slide";
    var LOOP = "loop";
    var FADE = "fade";
    function Slide$1(Splide2, index, slideIndex, slide) {
        var event = EventInterface(Splide2);
        var on = event.on, emit = event.emit, bind = event.bind;
        var Components = Splide2.Components, root = Splide2.root, options = Splide2.options;
        var isNavigation = options.isNavigation, updateOnMove = options.updateOnMove, i18n = options.i18n, pagination = options.pagination, slideFocus = options.slideFocus;
        var resolve = Components.Direction.resolve;
        var styles = getAttribute(slide, "style");
        var label = getAttribute(slide, ARIA_LABEL);
        var isClone = slideIndex > -1;
        var container = child(slide, "." + CLASS_CONTAINER);
        var destroyed;
        function mount() {
            if (!isClone) {
                slide.id = root.id + "-slide" + pad(index + 1);
                setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
                setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
                setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [ index + 1, Splide2.length ]));
            }
            listen();
        }
        function listen() {
            bind(slide, "click", apply(emit, EVENT_CLICK, self));
            bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
            on([ EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED ], update);
            on(EVENT_NAVIGATION_MOUNTED, initNavigation);
            if (updateOnMove) on(EVENT_MOVE, onMove);
        }
        function destroy() {
            destroyed = true;
            event.destroy();
            removeClass(slide, STATUS_CLASSES);
            removeAttribute(slide, ALL_ATTRIBUTES);
            setAttribute(slide, "style", styles);
            setAttribute(slide, ARIA_LABEL, label || "");
        }
        function initNavigation() {
            var controls = Splide2.splides.map((function(target) {
                var Slide2 = target.splide.Components.Slides.getAt(index);
                return Slide2 ? Slide2.slide.id : "";
            })).join(" ");
            setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
            setAttribute(slide, ARIA_CONTROLS, controls);
            setAttribute(slide, ROLE, slideFocus ? "button" : "");
            slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
        }
        function onMove() {
            if (!destroyed) update();
        }
        function update() {
            if (!destroyed) {
                var curr = Splide2.index;
                updateActivity();
                updateVisibility();
                toggleClass(slide, CLASS_PREV, index === curr - 1);
                toggleClass(slide, CLASS_NEXT, index === curr + 1);
            }
        }
        function updateActivity() {
            var active = isActive();
            if (active !== hasClass(slide, CLASS_ACTIVE)) {
                toggleClass(slide, CLASS_ACTIVE, active);
                setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
                emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
            }
        }
        function updateVisibility() {
            var visible = isVisible();
            var hidden = !visible && (!isActive() || isClone);
            if (!Splide2.state.is([ MOVING, SCROLLING ])) setAttribute(slide, ARIA_HIDDEN, hidden || "");
            setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
            if (slideFocus) setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
            if (visible !== hasClass(slide, CLASS_VISIBLE)) {
                toggleClass(slide, CLASS_VISIBLE, visible);
                emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
            }
            if (!visible && document.activeElement === slide) {
                var Slide2 = Components.Slides.getAt(Splide2.index);
                Slide2 && splide_esm_focus(Slide2.slide);
            }
        }
        function style$1(prop, value, useContainer) {
            style(useContainer && container || slide, prop, value);
        }
        function isActive() {
            var curr = Splide2.index;
            return curr === index || options.cloneStatus && curr === slideIndex;
        }
        function isVisible() {
            if (Splide2.is(FADE)) return isActive();
            var trackRect = rect(Components.Elements.track);
            var slideRect = rect(slide);
            var left = resolve("left", true);
            var right = resolve("right", true);
            return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
        }
        function isWithin(from, distance) {
            var diff = abs(from - index);
            if (!isClone && (options.rewind || Splide2.is(LOOP))) diff = min(diff, Splide2.length - diff);
            return diff <= distance;
        }
        var self = {
            index,
            slideIndex,
            slide,
            container,
            isClone,
            mount,
            destroy,
            update,
            style: style$1,
            isWithin
        };
        return self;
    }
    function Slides(Splide2, Components2, options) {
        var _EventInterface2 = EventInterface(Splide2), on = _EventInterface2.on, emit = _EventInterface2.emit, bind = _EventInterface2.bind;
        var _Components2$Elements = Components2.Elements, slides = _Components2$Elements.slides, list = _Components2$Elements.list;
        var Slides2 = [];
        function mount() {
            init();
            on(EVENT_REFRESH, destroy);
            on(EVENT_REFRESH, init);
        }
        function init() {
            slides.forEach((function(slide, index) {
                register(slide, index, -1);
            }));
        }
        function destroy() {
            forEach$1((function(Slide2) {
                Slide2.destroy();
            }));
            empty(Slides2);
        }
        function update() {
            forEach$1((function(Slide2) {
                Slide2.update();
            }));
        }
        function register(slide, index, slideIndex) {
            var object = Slide$1(Splide2, index, slideIndex, slide);
            object.mount();
            Slides2.push(object);
            Slides2.sort((function(Slide1, Slide2) {
                return Slide1.index - Slide2.index;
            }));
        }
        function get(excludeClones) {
            return excludeClones ? filter((function(Slide2) {
                return !Slide2.isClone;
            })) : Slides2;
        }
        function getIn(page) {
            var Controller = Components2.Controller;
            var index = Controller.toIndex(page);
            var max = Controller.hasFocus() ? 1 : options.perPage;
            return filter((function(Slide2) {
                return between(Slide2.index, index, index + max - 1);
            }));
        }
        function getAt(index) {
            return filter(index)[0];
        }
        function add(items, index) {
            forEach(items, (function(slide) {
                if (isString(slide)) slide = parseHtml(slide);
                if (isHTMLElement(slide)) {
                    var ref = slides[index];
                    ref ? before(slide, ref) : append(list, slide);
                    addClass(slide, options.classes.slide);
                    observeImages(slide, apply(emit, EVENT_RESIZE));
                }
            }));
            emit(EVENT_REFRESH);
        }
        function remove$1(matcher) {
            remove(filter(matcher).map((function(Slide2) {
                return Slide2.slide;
            })));
            emit(EVENT_REFRESH);
        }
        function forEach$1(iteratee, excludeClones) {
            get(excludeClones).forEach(iteratee);
        }
        function filter(matcher) {
            return Slides2.filter(isFunction(matcher) ? matcher : function(Slide2) {
                return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
            });
        }
        function style(prop, value, useContainer) {
            forEach$1((function(Slide2) {
                Slide2.style(prop, value, useContainer);
            }));
        }
        function observeImages(elm, callback) {
            var images = queryAll(elm, "img");
            var length = images.length;
            if (length) images.forEach((function(img) {
                bind(img, "load error", (function() {
                    if (! --length) callback();
                }));
            })); else callback();
        }
        function getLength(excludeClones) {
            return excludeClones ? slides.length : Slides2.length;
        }
        function isEnough() {
            return Slides2.length > options.perPage;
        }
        return {
            mount,
            destroy,
            update,
            register,
            get,
            getIn,
            getAt,
            add,
            remove: remove$1,
            forEach: forEach$1,
            filter,
            style,
            getLength,
            isEnough
        };
    }
    function Layout(Splide2, Components2, options) {
        var _EventInterface3 = EventInterface(Splide2), on = _EventInterface3.on, bind = _EventInterface3.bind, emit = _EventInterface3.emit;
        var Slides = Components2.Slides;
        var resolve = Components2.Direction.resolve;
        var _Components2$Elements2 = Components2.Elements, root = _Components2$Elements2.root, track = _Components2$Elements2.track, list = _Components2$Elements2.list;
        var getAt = Slides.getAt, styleSlides = Slides.style;
        var vertical;
        var rootRect;
        var overflow;
        function mount() {
            init();
            bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
            on([ EVENT_UPDATED, EVENT_REFRESH ], init);
            on(EVENT_RESIZE, resize);
        }
        function init() {
            vertical = options.direction === TTB;
            style(root, "maxWidth", unit(options.width));
            style(track, resolve("paddingLeft"), cssPadding(false));
            style(track, resolve("paddingRight"), cssPadding(true));
            resize(true);
        }
        function resize(force) {
            var newRect = rect(root);
            if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
                style(track, "height", cssTrackHeight());
                styleSlides(resolve("marginRight"), unit(options.gap));
                styleSlides("width", cssSlideWidth());
                styleSlides("height", cssSlideHeight(), true);
                rootRect = newRect;
                emit(EVENT_RESIZED);
                if (overflow !== (overflow = isOverflow())) {
                    toggleClass(root, CLASS_OVERFLOW, overflow);
                    emit(EVENT_OVERFLOW, overflow);
                }
            }
        }
        function cssPadding(right) {
            var padding = options.padding;
            var prop = resolve(right ? "right" : "left");
            return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
        }
        function cssTrackHeight() {
            var height = "";
            if (vertical) {
                height = cssHeight();
                assert(height, "height or heightRatio is missing.");
                height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
            }
            return height;
        }
        function cssHeight() {
            return unit(options.height || rect(list).width * options.heightRatio);
        }
        function cssSlideWidth() {
            return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
        }
        function cssSlideHeight() {
            return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
        }
        function cssSlideSize() {
            var gap = unit(options.gap);
            return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
        }
        function listSize() {
            return rect(list)[resolve("width")];
        }
        function slideSize(index, withoutGap) {
            var Slide = getAt(index || 0);
            return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
        }
        function totalSize(index, withoutGap) {
            var Slide = getAt(index);
            if (Slide) {
                var right = rect(Slide.slide)[resolve("right")];
                var left = rect(list)[resolve("left")];
                return abs(right - left) + (withoutGap ? 0 : getGap());
            }
            return 0;
        }
        function sliderSize(withoutGap) {
            return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
        }
        function getGap() {
            var Slide = getAt(0);
            return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
        }
        function getPadding(right) {
            return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
        }
        function isOverflow() {
            return Splide2.is(FADE) || sliderSize(true) > listSize();
        }
        return {
            mount,
            resize,
            listSize,
            slideSize,
            sliderSize,
            totalSize,
            getPadding,
            isOverflow
        };
    }
    var MULTIPLIER = 2;
    function Clones(Splide2, Components2, options) {
        var event = EventInterface(Splide2);
        var on = event.on;
        var Elements = Components2.Elements, Slides = Components2.Slides;
        var resolve = Components2.Direction.resolve;
        var clones = [];
        var cloneCount;
        function mount() {
            on(EVENT_REFRESH, remount);
            on([ EVENT_UPDATED, EVENT_RESIZE ], observe);
            if (cloneCount = computeCloneCount()) {
                generate(cloneCount);
                Components2.Layout.resize(true);
            }
        }
        function remount() {
            destroy();
            mount();
        }
        function destroy() {
            remove(clones);
            empty(clones);
            event.destroy();
        }
        function observe() {
            var count = computeCloneCount();
            if (cloneCount !== count) if (cloneCount < count || !count) event.emit(EVENT_REFRESH);
        }
        function generate(count) {
            var slides = Slides.get().slice();
            var length = slides.length;
            if (length) {
                while (slides.length < count) push(slides, slides);
                push(slides.slice(-count), slides.slice(0, count)).forEach((function(Slide, index) {
                    var isHead = index < count;
                    var clone = cloneDeep(Slide.slide, index);
                    isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
                    push(clones, clone);
                    Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
                }));
            }
        }
        function cloneDeep(elm, index) {
            var clone = elm.cloneNode(true);
            addClass(clone, options.classes.clone);
            clone.id = Splide2.root.id + "-clone" + pad(index + 1);
            return clone;
        }
        function computeCloneCount() {
            var clones2 = options.clones;
            if (!Splide2.is(LOOP)) clones2 = 0; else if (isUndefined(clones2)) {
                var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
                var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
                clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
            }
            return clones2;
        }
        return {
            mount,
            destroy
        };
    }
    function Move(Splide2, Components2, options) {
        var _EventInterface4 = EventInterface(Splide2), on = _EventInterface4.on, emit = _EventInterface4.emit;
        var set = Splide2.state.set;
        var _Components2$Layout = Components2.Layout, slideSize = _Components2$Layout.slideSize, getPadding = _Components2$Layout.getPadding, totalSize = _Components2$Layout.totalSize, listSize = _Components2$Layout.listSize, sliderSize = _Components2$Layout.sliderSize;
        var _Components2$Directio = Components2.Direction, resolve = _Components2$Directio.resolve, orient = _Components2$Directio.orient;
        var _Components2$Elements3 = Components2.Elements, list = _Components2$Elements3.list, track = _Components2$Elements3.track;
        var Transition;
        function mount() {
            Transition = Components2.Transition;
            on([ EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH ], reposition);
        }
        function reposition() {
            if (!Components2.Controller.isBusy()) {
                Components2.Scroll.cancel();
                jump(Splide2.index);
                Components2.Slides.update();
            }
        }
        function move(dest, index, prev, callback) {
            if (dest !== index && canShift(dest > prev)) {
                cancel();
                translate(shift(getPosition(), dest > prev), true);
            }
            set(MOVING);
            emit(EVENT_MOVE, index, prev, dest);
            Transition.start(index, (function() {
                set(IDLE);
                emit(EVENT_MOVED, index, prev, dest);
                callback && callback();
            }));
        }
        function jump(index) {
            translate(toPosition(index, true));
        }
        function translate(position, preventLoop) {
            if (!Splide2.is(FADE)) {
                var destination = preventLoop ? position : loop(position);
                style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
                position !== destination && emit(EVENT_SHIFTED);
            }
        }
        function loop(position) {
            if (Splide2.is(LOOP)) {
                var index = toIndex(position);
                var exceededMax = index > Components2.Controller.getEnd();
                var exceededMin = index < 0;
                if (exceededMin || exceededMax) position = shift(position, exceededMax);
            }
            return position;
        }
        function shift(position, backwards) {
            var excess = position - getLimit(backwards);
            var size = sliderSize();
            position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
            return position;
        }
        function cancel() {
            translate(getPosition(), true);
            Transition.cancel();
        }
        function toIndex(position) {
            var Slides = Components2.Slides.get();
            var index = 0;
            var minDistance = 1 / 0;
            for (var i = 0; i < Slides.length; i++) {
                var slideIndex = Slides[i].index;
                var distance = abs(toPosition(slideIndex, true) - position);
                if (distance <= minDistance) {
                    minDistance = distance;
                    index = slideIndex;
                } else break;
            }
            return index;
        }
        function toPosition(index, trimming) {
            var position = orient(totalSize(index - 1) - offset(index));
            return trimming ? trim(position) : position;
        }
        function getPosition() {
            var left = resolve("left");
            return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
        }
        function trim(position) {
            if (options.trimSpace && Splide2.is(SLIDE)) position = clamp(position, 0, orient(sliderSize(true) - listSize()));
            return position;
        }
        function offset(index) {
            var focus = options.focus;
            return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
        }
        function getLimit(max) {
            return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
        }
        function canShift(backwards) {
            var shifted = orient(shift(getPosition(), backwards));
            return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
        }
        function exceededLimit(max, position) {
            position = isUndefined(position) ? getPosition() : position;
            var exceededMin = max !== true && orient(position) < orient(getLimit(false));
            var exceededMax = max !== false && orient(position) > orient(getLimit(true));
            return exceededMin || exceededMax;
        }
        return {
            mount,
            move,
            jump,
            translate,
            shift,
            cancel,
            toIndex,
            toPosition,
            getPosition,
            getLimit,
            exceededLimit,
            reposition
        };
    }
    function Controller(Splide2, Components2, options) {
        var _EventInterface5 = EventInterface(Splide2), on = _EventInterface5.on, emit = _EventInterface5.emit;
        var Move = Components2.Move;
        var getPosition = Move.getPosition, getLimit = Move.getLimit, toPosition = Move.toPosition;
        var _Components2$Slides = Components2.Slides, isEnough = _Components2$Slides.isEnough, getLength = _Components2$Slides.getLength;
        var omitEnd = options.omitEnd;
        var isLoop = Splide2.is(LOOP);
        var isSlide = Splide2.is(SLIDE);
        var getNext = apply(getAdjacent, false);
        var getPrev = apply(getAdjacent, true);
        var currIndex = options.start || 0;
        var endIndex;
        var prevIndex = currIndex;
        var slideCount;
        var perMove;
        var perPage;
        function mount() {
            init();
            on([ EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED ], init);
            on(EVENT_RESIZED, onResized);
        }
        function init() {
            slideCount = getLength(true);
            perMove = options.perMove;
            perPage = options.perPage;
            endIndex = getEnd();
            var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
            if (index !== currIndex) {
                currIndex = index;
                Move.reposition();
            }
        }
        function onResized() {
            if (endIndex !== getEnd()) emit(EVENT_END_INDEX_CHANGED);
        }
        function go(control, allowSameIndex, callback) {
            if (!isBusy()) {
                var dest = parse(control);
                var index = loop(dest);
                if (index > -1 && (allowSameIndex || index !== currIndex)) {
                    setIndex(index);
                    Move.move(dest, index, prevIndex, callback);
                }
            }
        }
        function scroll(destination, duration, snap, callback) {
            Components2.Scroll.scroll(destination, duration, snap, (function() {
                var index = loop(Move.toIndex(getPosition()));
                setIndex(omitEnd ? min(index, endIndex) : index);
                callback && callback();
            }));
        }
        function parse(control) {
            var index = currIndex;
            if (isString(control)) {
                var _ref = control.match(/([+\-<>])(\d+)?/) || [], indicator = _ref[1], number = _ref[2];
                if (indicator === "+" || indicator === "-") index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex); else if (indicator === ">") index = number ? toIndex(+number) : getNext(true); else if (indicator === "<") index = getPrev(true);
            } else index = isLoop ? control : clamp(control, 0, endIndex);
            return index;
        }
        function getAdjacent(prev, destination) {
            var number = perMove || (hasFocus() ? 1 : perPage);
            var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
            if (dest === -1 && isSlide) if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) return prev ? 0 : endIndex;
            return destination ? dest : loop(dest);
        }
        function computeDestIndex(dest, from, snapPage) {
            if (isEnough() || hasFocus()) {
                var index = computeMovableDestIndex(dest);
                if (index !== dest) {
                    from = dest;
                    dest = index;
                    snapPage = false;
                }
                if (dest < 0 || dest > endIndex) if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) dest = toIndex(toPage(dest)); else if (isLoop) dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest; else if (options.rewind) dest = dest < 0 ? endIndex : 0; else dest = -1; else if (snapPage && dest !== from) dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
            } else dest = -1;
            return dest;
        }
        function computeMovableDestIndex(dest) {
            if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
                var position = getPosition();
                while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) dest < currIndex ? --dest : ++dest;
            }
            return dest;
        }
        function loop(index) {
            return isLoop ? (index + slideCount) % slideCount || 0 : index;
        }
        function getEnd() {
            var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
            while (omitEnd && end-- > 0) if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
                end++;
                break;
            }
            return clamp(end, 0, slideCount - 1);
        }
        function toIndex(page) {
            return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
        }
        function toPage(index) {
            return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
        }
        function toDest(destination) {
            var closest = Move.toIndex(destination);
            return isSlide ? clamp(closest, 0, endIndex) : closest;
        }
        function setIndex(index) {
            if (index !== currIndex) {
                prevIndex = currIndex;
                currIndex = index;
            }
        }
        function getIndex(prev) {
            return prev ? prevIndex : currIndex;
        }
        function hasFocus() {
            return !isUndefined(options.focus) || options.isNavigation;
        }
        function isBusy() {
            return Splide2.state.is([ MOVING, SCROLLING ]) && !!options.waitForTransition;
        }
        return {
            mount,
            go,
            scroll,
            getNext,
            getPrev,
            getAdjacent,
            getEnd,
            setIndex,
            getIndex,
            toIndex,
            toPage,
            toDest,
            hasFocus,
            isBusy
        };
    }
    var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
    var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
    var SIZE = 40;
    function Arrows(Splide2, Components2, options) {
        var event = EventInterface(Splide2);
        var on = event.on, bind = event.bind, emit = event.emit;
        var classes = options.classes, i18n = options.i18n;
        var Elements = Components2.Elements, Controller = Components2.Controller;
        var placeholder = Elements.arrows, track = Elements.track;
        var wrapper = placeholder;
        var prev = Elements.prev;
        var next = Elements.next;
        var created;
        var wrapperClasses;
        var arrows = {};
        function mount() {
            init();
            on(EVENT_UPDATED, remount);
        }
        function remount() {
            destroy();
            mount();
        }
        function init() {
            var enabled = options.arrows;
            if (enabled && !(prev && next)) createArrows();
            if (prev && next) {
                splide_esm_assign(arrows, {
                    prev,
                    next
                });
                display(wrapper, enabled ? "" : "none");
                addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
                if (enabled) {
                    listen();
                    update();
                    setAttribute([ prev, next ], ARIA_CONTROLS, track.id);
                    emit(EVENT_ARROWS_MOUNTED, prev, next);
                }
            }
        }
        function destroy() {
            event.destroy();
            removeClass(wrapper, wrapperClasses);
            if (created) {
                remove(placeholder ? [ prev, next ] : wrapper);
                prev = next = null;
            } else removeAttribute([ prev, next ], ALL_ATTRIBUTES);
        }
        function listen() {
            on([ EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED ], update);
            bind(next, "click", apply(go, ">"));
            bind(prev, "click", apply(go, "<"));
        }
        function go(control) {
            Controller.go(control, true);
        }
        function createArrows() {
            wrapper = placeholder || create("div", classes.arrows);
            prev = createArrow(true);
            next = createArrow(false);
            created = true;
            append(wrapper, [ prev, next ]);
            !placeholder && before(wrapper, track);
        }
        function createArrow(prev2) {
            var arrow = '<button class="' + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
            return parseHtml(arrow);
        }
        function update() {
            if (prev && next) {
                var index = Splide2.index;
                var prevIndex = Controller.getPrev();
                var nextIndex = Controller.getNext();
                var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
                var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
                prev.disabled = prevIndex < 0;
                next.disabled = nextIndex < 0;
                setAttribute(prev, ARIA_LABEL, prevLabel);
                setAttribute(next, ARIA_LABEL, nextLabel);
                emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
            }
        }
        return {
            arrows,
            mount,
            destroy,
            update
        };
    }
    var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
    function Autoplay(Splide2, Components2, options) {
        var _EventInterface6 = EventInterface(Splide2), on = _EventInterface6.on, bind = _EventInterface6.bind, emit = _EventInterface6.emit;
        var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
        var isPaused = interval.isPaused;
        var Elements = Components2.Elements, _Components2$Elements4 = Components2.Elements, root = _Components2$Elements4.root, toggle = _Components2$Elements4.toggle;
        var autoplay = options.autoplay;
        var hovered;
        var focused;
        var stopped = autoplay === "pause";
        function mount() {
            if (autoplay) {
                listen();
                toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
                stopped || play();
                update();
            }
        }
        function listen() {
            if (options.pauseOnHover) bind(root, "mouseenter mouseleave", (function(e) {
                hovered = e.type === "mouseenter";
                autoToggle();
            }));
            if (options.pauseOnFocus) bind(root, "focusin focusout", (function(e) {
                focused = e.type === "focusin";
                autoToggle();
            }));
            if (toggle) bind(toggle, "click", (function() {
                stopped ? play() : pause(true);
            }));
            on([ EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH ], interval.rewind);
            on(EVENT_MOVE, onMove);
        }
        function play() {
            if (isPaused() && Components2.Slides.isEnough()) {
                interval.start(!options.resetProgress);
                focused = hovered = stopped = false;
                update();
                emit(EVENT_AUTOPLAY_PLAY);
            }
        }
        function pause(stop) {
            if (stop === void 0) stop = true;
            stopped = !!stop;
            update();
            if (!isPaused()) {
                interval.pause();
                emit(EVENT_AUTOPLAY_PAUSE);
            }
        }
        function autoToggle() {
            if (!stopped) hovered || focused ? pause(false) : play();
        }
        function update() {
            if (toggle) {
                toggleClass(toggle, CLASS_ACTIVE, !stopped);
                setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
            }
        }
        function onAnimationFrame(rate) {
            var bar = Elements.bar;
            bar && style(bar, "width", rate * 100 + "%");
            emit(EVENT_AUTOPLAY_PLAYING, rate);
        }
        function onMove(index) {
            var Slide = Components2.Slides.getAt(index);
            interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
        }
        return {
            mount,
            destroy: interval.cancel,
            play,
            pause,
            isPaused
        };
    }
    function Cover(Splide2, Components2, options) {
        var _EventInterface7 = EventInterface(Splide2), on = _EventInterface7.on;
        function mount() {
            if (options.cover) {
                on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
                on([ EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH ], apply(cover, true));
            }
        }
        function cover(cover2) {
            Components2.Slides.forEach((function(Slide) {
                var img = child(Slide.container || Slide.slide, "img");
                if (img && img.src) toggle(cover2, img, Slide);
            }));
        }
        function toggle(cover2, img, Slide) {
            Slide.style("background", cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "", true);
            display(img, cover2 ? "none" : "");
        }
        return {
            mount,
            destroy: apply(cover, false)
        };
    }
    var BOUNCE_DIFF_THRESHOLD = 10;
    var BOUNCE_DURATION = 600;
    var FRICTION_FACTOR = .6;
    var BASE_VELOCITY = 1.5;
    var MIN_DURATION = 800;
    function Scroll(Splide2, Components2, options) {
        var _EventInterface8 = EventInterface(Splide2), on = _EventInterface8.on, emit = _EventInterface8.emit;
        var set = Splide2.state.set;
        var Move = Components2.Move;
        var getPosition = Move.getPosition, getLimit = Move.getLimit, exceededLimit = Move.exceededLimit, translate = Move.translate;
        var isSlide = Splide2.is(SLIDE);
        var interval;
        var callback;
        var friction = 1;
        function mount() {
            on(EVENT_MOVE, clear);
            on([ EVENT_UPDATED, EVENT_REFRESH ], cancel);
        }
        function scroll(destination, duration, snap, onScrolled, noConstrain) {
            var from = getPosition();
            clear();
            if (snap && (!isSlide || !exceededLimit())) {
                var size = Components2.Layout.sliderSize();
                var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
                destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
            }
            var noDistance = approximatelyEqual(from, destination, 1);
            friction = 1;
            duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
            callback = onScrolled;
            interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
            set(SCROLLING);
            emit(EVENT_SCROLL);
            interval.start();
        }
        function onEnd() {
            set(IDLE);
            callback && callback();
            emit(EVENT_SCROLLED);
        }
        function update(from, to, noConstrain, rate) {
            var position = getPosition();
            var target = from + (to - from) * easing(rate);
            var diff = (target - position) * friction;
            translate(position + diff);
            if (isSlide && !noConstrain && exceededLimit()) {
                friction *= FRICTION_FACTOR;
                if (abs(diff) < BOUNCE_DIFF_THRESHOLD) scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
            }
        }
        function clear() {
            if (interval) interval.cancel();
        }
        function cancel() {
            if (interval && !interval.isPaused()) {
                clear();
                onEnd();
            }
        }
        function easing(t) {
            var easingFunc = options.easingFunc;
            return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
        }
        return {
            mount,
            destroy: clear,
            scroll,
            cancel
        };
    }
    var SCROLL_LISTENER_OPTIONS = {
        passive: false,
        capture: true
    };
    function Drag(Splide2, Components2, options) {
        var _EventInterface9 = EventInterface(Splide2), on = _EventInterface9.on, emit = _EventInterface9.emit, bind = _EventInterface9.bind, unbind = _EventInterface9.unbind;
        var state = Splide2.state;
        var Move = Components2.Move, Scroll = Components2.Scroll, Controller = Components2.Controller, track = Components2.Elements.track, reduce = Components2.Media.reduce;
        var _Components2$Directio2 = Components2.Direction, resolve = _Components2$Directio2.resolve, orient = _Components2$Directio2.orient;
        var getPosition = Move.getPosition, exceededLimit = Move.exceededLimit;
        var basePosition;
        var baseEvent;
        var prevBaseEvent;
        var isFree;
        var dragging;
        var exceeded = false;
        var clickPrevented;
        var disabled;
        var target;
        function mount() {
            bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
            bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
            bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
            bind(track, "click", onClick, {
                capture: true
            });
            bind(track, "dragstart", prevent);
            on([ EVENT_MOUNTED, EVENT_UPDATED ], init);
        }
        function init() {
            var drag = options.drag;
            disable(!drag);
            isFree = drag === "free";
        }
        function onPointerDown(e) {
            clickPrevented = false;
            if (!disabled) {
                var isTouch = isTouchEvent(e);
                if (isDraggable(e.target) && (isTouch || !e.button)) if (!Controller.isBusy()) {
                    target = isTouch ? track : window;
                    dragging = state.is([ MOVING, SCROLLING ]);
                    prevBaseEvent = null;
                    bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
                    bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
                    Move.cancel();
                    Scroll.cancel();
                    save(e);
                } else prevent(e, true);
            }
        }
        function onPointerMove(e) {
            if (!state.is(DRAGGING)) {
                state.set(DRAGGING);
                emit(EVENT_DRAG);
            }
            if (e.cancelable) if (dragging) {
                Move.translate(basePosition + constrain(diffCoord(e)));
                var expired = diffTime(e) > LOG_INTERVAL;
                var hasExceeded = exceeded !== (exceeded = exceededLimit());
                if (expired || hasExceeded) save(e);
                clickPrevented = true;
                emit(EVENT_DRAGGING);
                prevent(e);
            } else if (isSliderDirection(e)) {
                dragging = shouldStart(e);
                prevent(e);
            }
        }
        function onPointerUp(e) {
            if (state.is(DRAGGING)) {
                state.set(IDLE);
                emit(EVENT_DRAGGED);
            }
            if (dragging) {
                move(e);
                prevent(e);
            }
            unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
            unbind(target, POINTER_UP_EVENTS, onPointerUp);
            dragging = false;
        }
        function onClick(e) {
            if (!disabled && clickPrevented) prevent(e, true);
        }
        function save(e) {
            prevBaseEvent = baseEvent;
            baseEvent = e;
            basePosition = getPosition();
        }
        function move(e) {
            var velocity = computeVelocity(e);
            var destination = computeDestination(velocity);
            var rewind = options.rewind && options.rewindByDrag;
            reduce(false);
            if (isFree) Controller.scroll(destination, 0, options.snap); else if (Splide2.is(FADE)) Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+"); else if (Splide2.is(SLIDE) && exceeded && rewind) Controller.go(exceededLimit(true) ? ">" : "<"); else Controller.go(Controller.toDest(destination), true);
            reduce(true);
        }
        function shouldStart(e) {
            var thresholds = options.dragMinThreshold;
            var isObj = isObject(thresholds);
            var mouse = isObj && thresholds.mouse || 0;
            var touch = (isObj ? thresholds.touch : +thresholds) || 10;
            return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
        }
        function isSliderDirection(e) {
            return abs(diffCoord(e)) > abs(diffCoord(e, true));
        }
        function computeVelocity(e) {
            if (Splide2.is(LOOP) || !exceeded) {
                var time = diffTime(e);
                if (time && time < LOG_INTERVAL) return diffCoord(e) / time;
            }
            return 0;
        }
        function computeDestination(velocity) {
            return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? 1 / 0 : Components2.Layout.listSize() * (options.flickMaxPages || 1));
        }
        function diffCoord(e, orthogonal) {
            return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
        }
        function diffTime(e) {
            return timeOf(e) - timeOf(getBaseEvent(e));
        }
        function getBaseEvent(e) {
            return baseEvent === e && prevBaseEvent || baseEvent;
        }
        function coordOf(e, orthogonal) {
            return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
        }
        function constrain(diff) {
            return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
        }
        function isDraggable(target2) {
            var noDrag = options.noDrag;
            return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
        }
        function isTouchEvent(e) {
            return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
        }
        function isDragging() {
            return dragging;
        }
        function disable(value) {
            disabled = value;
        }
        return {
            mount,
            disable,
            isDragging
        };
    }
    var NORMALIZATION_MAP = {
        Spacebar: " ",
        Right: ARROW_RIGHT,
        Left: ARROW_LEFT,
        Up: ARROW_UP,
        Down: ARROW_DOWN
    };
    function normalizeKey(key) {
        key = isString(key) ? key : key.key;
        return NORMALIZATION_MAP[key] || key;
    }
    var KEYBOARD_EVENT = "keydown";
    function Keyboard(Splide2, Components2, options) {
        var _EventInterface10 = EventInterface(Splide2), on = _EventInterface10.on, bind = _EventInterface10.bind, unbind = _EventInterface10.unbind;
        var root = Splide2.root;
        var resolve = Components2.Direction.resolve;
        var target;
        var disabled;
        function mount() {
            init();
            on(EVENT_UPDATED, destroy);
            on(EVENT_UPDATED, init);
            on(EVENT_MOVE, onMove);
        }
        function init() {
            var keyboard = options.keyboard;
            if (keyboard) {
                target = keyboard === "global" ? window : root;
                bind(target, KEYBOARD_EVENT, onKeydown);
            }
        }
        function destroy() {
            unbind(target, KEYBOARD_EVENT);
        }
        function disable(value) {
            disabled = value;
        }
        function onMove() {
            var _disabled = disabled;
            disabled = true;
            nextTick((function() {
                disabled = _disabled;
            }));
        }
        function onKeydown(e) {
            if (!disabled) {
                var key = normalizeKey(e);
                if (key === resolve(ARROW_LEFT)) Splide2.go("<"); else if (key === resolve(ARROW_RIGHT)) Splide2.go(">");
            }
        }
        return {
            mount,
            destroy,
            disable
        };
    }
    var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
    var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
    var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
    function LazyLoad(Splide2, Components2, options) {
        var _EventInterface11 = EventInterface(Splide2), on = _EventInterface11.on, off = _EventInterface11.off, bind = _EventInterface11.bind, emit = _EventInterface11.emit;
        var isSequential = options.lazyLoad === "sequential";
        var events = [ EVENT_MOVED, EVENT_SCROLLED ];
        var entries = [];
        function mount() {
            if (options.lazyLoad) {
                init();
                on(EVENT_REFRESH, init);
            }
        }
        function init() {
            empty(entries);
            register();
            if (isSequential) loadNext(); else {
                off(events);
                on(events, check);
                check();
            }
        }
        function register() {
            Components2.Slides.forEach((function(Slide) {
                queryAll(Slide.slide, IMAGE_SELECTOR).forEach((function(img) {
                    var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
                    var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
                    if (src !== img.src || srcset !== img.srcset) {
                        var className = options.classes.spinner;
                        var parent = img.parentElement;
                        var spinner = child(parent, "." + className) || create("span", className, parent);
                        entries.push([ img, Slide, spinner ]);
                        img.src || display(img, "none");
                    }
                }));
            }));
        }
        function check() {
            entries = entries.filter((function(data) {
                var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
                return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
            }));
            entries.length || off(events);
        }
        function load(data) {
            var img = data[0];
            addClass(data[1].slide, CLASS_LOADING);
            bind(img, "load error", apply(onLoad, data));
            setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
            setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
            removeAttribute(img, SRC_DATA_ATTRIBUTE);
            removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
        }
        function onLoad(data, e) {
            var img = data[0], Slide = data[1];
            removeClass(Slide.slide, CLASS_LOADING);
            if (e.type !== "error") {
                remove(data[2]);
                display(img, "");
                emit(EVENT_LAZYLOAD_LOADED, img, Slide);
                emit(EVENT_RESIZE);
            }
            isSequential && loadNext();
        }
        function loadNext() {
            entries.length && load(entries.shift());
        }
        return {
            mount,
            destroy: apply(empty, entries),
            check
        };
    }
    function Pagination(Splide2, Components2, options) {
        var event = EventInterface(Splide2);
        var on = event.on, emit = event.emit, bind = event.bind;
        var Slides = Components2.Slides, Elements = Components2.Elements, Controller = Components2.Controller;
        var hasFocus = Controller.hasFocus, getIndex = Controller.getIndex, go = Controller.go;
        var resolve = Components2.Direction.resolve;
        var placeholder = Elements.pagination;
        var items = [];
        var list;
        var paginationClasses;
        function mount() {
            destroy();
            on([ EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED ], mount);
            var enabled = options.pagination;
            placeholder && display(placeholder, enabled ? "" : "none");
            if (enabled) {
                on([ EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED ], update);
                createPagination();
                update();
                emit(EVENT_PAGINATION_MOUNTED, {
                    list,
                    items
                }, getAt(Splide2.index));
            }
        }
        function destroy() {
            if (list) {
                remove(placeholder ? slice(list.children) : list);
                removeClass(list, paginationClasses);
                empty(items);
                list = null;
            }
            event.destroy();
        }
        function createPagination() {
            var length = Splide2.length;
            var classes = options.classes, i18n = options.i18n, perPage = options.perPage;
            var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
            list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
            addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
            setAttribute(list, ROLE, "tablist");
            setAttribute(list, ARIA_LABEL, i18n.select);
            setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
            for (var i = 0; i < max; i++) {
                var li = create("li", null, list);
                var button = create("button", {
                    class: classes.page,
                    type: "button"
                }, li);
                var controls = Slides.getIn(i).map((function(Slide) {
                    return Slide.slide.id;
                }));
                var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
                bind(button, "click", apply(onClick, i));
                if (options.paginationKeyboard) bind(button, "keydown", apply(onKeydown, i));
                setAttribute(li, ROLE, "presentation");
                setAttribute(button, ROLE, "tab");
                setAttribute(button, ARIA_CONTROLS, controls.join(" "));
                setAttribute(button, ARIA_LABEL, format(text, i + 1));
                setAttribute(button, TAB_INDEX, -1);
                items.push({
                    li,
                    button,
                    page: i
                });
            }
        }
        function onClick(page) {
            go(">" + page, true);
        }
        function onKeydown(page, e) {
            var length = items.length;
            var key = normalizeKey(e);
            var dir = getDirection();
            var nextPage = -1;
            if (key === resolve(ARROW_RIGHT, false, dir)) nextPage = ++page % length; else if (key === resolve(ARROW_LEFT, false, dir)) nextPage = (--page + length) % length; else if (key === "Home") nextPage = 0; else if (key === "End") nextPage = length - 1;
            var item = items[nextPage];
            if (item) {
                splide_esm_focus(item.button);
                go(">" + nextPage);
                prevent(e, true);
            }
        }
        function getDirection() {
            return options.paginationDirection || options.direction;
        }
        function getAt(index) {
            return items[Controller.toPage(index)];
        }
        function update() {
            var prev = getAt(getIndex(true));
            var curr = getAt(getIndex());
            if (prev) {
                var button = prev.button;
                removeClass(button, CLASS_ACTIVE);
                removeAttribute(button, ARIA_SELECTED);
                setAttribute(button, TAB_INDEX, -1);
            }
            if (curr) {
                var _button = curr.button;
                addClass(_button, CLASS_ACTIVE);
                setAttribute(_button, ARIA_SELECTED, true);
                setAttribute(_button, TAB_INDEX, "");
            }
            emit(EVENT_PAGINATION_UPDATED, {
                list,
                items
            }, prev, curr);
        }
        return {
            items,
            mount,
            destroy,
            getAt,
            update
        };
    }
    var TRIGGER_KEYS = [ " ", "Enter" ];
    function Sync(Splide2, Components2, options) {
        var isNavigation = options.isNavigation, slideFocus = options.slideFocus;
        var events = [];
        function mount() {
            Splide2.splides.forEach((function(target) {
                if (!target.isParent) {
                    sync(Splide2, target.splide);
                    sync(target.splide, Splide2);
                }
            }));
            if (isNavigation) navigate();
        }
        function destroy() {
            events.forEach((function(event) {
                event.destroy();
            }));
            empty(events);
        }
        function remount() {
            destroy();
            mount();
        }
        function sync(splide, target) {
            var event = EventInterface(splide);
            event.on(EVENT_MOVE, (function(index, prev, dest) {
                target.go(target.is(LOOP) ? dest : index);
            }));
            events.push(event);
        }
        function navigate() {
            var event = EventInterface(Splide2);
            var on = event.on;
            on(EVENT_CLICK, onClick);
            on(EVENT_SLIDE_KEYDOWN, onKeydown);
            on([ EVENT_MOUNTED, EVENT_UPDATED ], update);
            events.push(event);
            event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
        }
        function update() {
            setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
        }
        function onClick(Slide) {
            Splide2.go(Slide.index);
        }
        function onKeydown(Slide, e) {
            if (includes(TRIGGER_KEYS, normalizeKey(e))) {
                onClick(Slide);
                prevent(e);
            }
        }
        return {
            setup: apply(Components2.Media.set, {
                slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
            }, true),
            mount,
            destroy,
            remount
        };
    }
    function Wheel(Splide2, Components2, options) {
        var _EventInterface12 = EventInterface(Splide2), bind = _EventInterface12.bind;
        var lastTime = 0;
        function mount() {
            if (options.wheel) bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
        }
        function onWheel(e) {
            if (e.cancelable) {
                var deltaY = e.deltaY;
                var backwards = deltaY < 0;
                var timeStamp = timeOf(e);
                var _min = options.wheelMinThreshold || 0;
                var sleep = options.wheelSleep || 0;
                if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
                    Splide2.go(backwards ? "<" : ">");
                    lastTime = timeStamp;
                }
                shouldPrevent(backwards) && prevent(e);
            }
        }
        function shouldPrevent(backwards) {
            return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
        }
        return {
            mount
        };
    }
    var SR_REMOVAL_DELAY = 90;
    function Live(Splide2, Components2, options) {
        var _EventInterface13 = EventInterface(Splide2), on = _EventInterface13.on;
        var track = Components2.Elements.track;
        var enabled = options.live && !options.isNavigation;
        var sr = create("span", CLASS_SR);
        var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
        function mount() {
            if (enabled) {
                disable(!Components2.Autoplay.isPaused());
                setAttribute(track, ARIA_ATOMIC, true);
                sr.textContent = "…";
                on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
                on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
                on([ EVENT_MOVED, EVENT_SCROLLED ], apply(toggle, true));
            }
        }
        function toggle(active) {
            setAttribute(track, ARIA_BUSY, active);
            if (active) {
                append(track, sr);
                interval.start();
            } else {
                remove(sr);
                interval.cancel();
            }
        }
        function destroy() {
            removeAttribute(track, [ ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY ]);
            remove(sr);
        }
        function disable(disabled) {
            if (enabled) setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
        }
        return {
            mount,
            disable,
            destroy
        };
    }
    var ComponentConstructors = Object.freeze({
        __proto__: null,
        Media,
        Direction,
        Elements,
        Slides,
        Layout,
        Clones,
        Move,
        Controller,
        Arrows,
        Autoplay,
        Cover,
        Scroll,
        Drag,
        Keyboard,
        LazyLoad,
        Pagination,
        Sync,
        Wheel,
        Live
    });
    var I18N = {
        prev: "Previous slide",
        next: "Next slide",
        first: "Go to first slide",
        last: "Go to last slide",
        slideX: "Go to slide %s",
        pageX: "Go to page %s",
        play: "Start autoplay",
        pause: "Pause autoplay",
        carousel: "carousel",
        slide: "slide",
        select: "Select a slide to show",
        slideLabel: "%s of %s"
    };
    var DEFAULTS = {
        type: "slide",
        role: "region",
        speed: 400,
        perPage: 1,
        cloneStatus: true,
        arrows: true,
        pagination: true,
        paginationKeyboard: true,
        interval: 5e3,
        pauseOnHover: true,
        pauseOnFocus: true,
        resetProgress: true,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        drag: true,
        direction: "ltr",
        trimSpace: true,
        focusableNodes: "a, button, textarea, input, select, iframe",
        live: true,
        classes: CLASSES,
        i18n: I18N,
        reducedMotion: {
            speed: 0,
            rewindSpeed: 0,
            autoplay: "pause"
        }
    };
    function Fade(Splide2, Components2, options) {
        var Slides = Components2.Slides;
        function mount() {
            EventInterface(Splide2).on([ EVENT_MOUNTED, EVENT_REFRESH ], init);
        }
        function init() {
            Slides.forEach((function(Slide) {
                Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
            }));
        }
        function start(index, done) {
            Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
            nextTick(done);
        }
        return {
            mount,
            start,
            cancel: noop
        };
    }
    function Slide(Splide2, Components2, options) {
        var Move = Components2.Move, Controller = Components2.Controller, Scroll = Components2.Scroll;
        var list = Components2.Elements.list;
        var transition = apply(style, list, "transition");
        var endCallback;
        function mount() {
            EventInterface(Splide2).bind(list, "transitionend", (function(e) {
                if (e.target === list && endCallback) {
                    cancel();
                    endCallback();
                }
            }));
        }
        function start(index, done) {
            var destination = Move.toPosition(index, true);
            var position = Move.getPosition();
            var speed = getSpeed(index);
            if (abs(destination - position) >= 1 && speed >= 1) if (options.useScroll) Scroll.scroll(destination, speed, false, done); else {
                transition("transform " + speed + "ms " + options.easing);
                Move.translate(destination, true);
                endCallback = done;
            } else {
                Move.jump(index);
                done();
            }
        }
        function cancel() {
            transition("");
            Scroll.cancel();
        }
        function getSpeed(index) {
            var rewindSpeed = options.rewindSpeed;
            if (Splide2.is(SLIDE) && rewindSpeed) {
                var prev = Controller.getIndex(true);
                var end = Controller.getEnd();
                if (prev === 0 && index >= end || prev >= end && index === 0) return rewindSpeed;
            }
            return options.speed;
        }
        return {
            mount,
            start,
            cancel
        };
    }
    var _Splide = function() {
        function _Splide(target, options) {
            this.event = EventInterface();
            this.Components = {};
            this.state = State(CREATED);
            this.splides = [];
            this._o = {};
            this._E = {};
            var root = isString(target) ? query(document, target) : target;
            assert(root, root + " is invalid.");
            this.root = root;
            options = merge({
                label: getAttribute(root, ARIA_LABEL) || "",
                labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
            }, DEFAULTS, _Splide.defaults, options || {});
            try {
                merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
            } catch (e) {
                assert(false, "Invalid JSON");
            }
            this._o = Object.create(merge({}, options));
        }
        var _proto = _Splide.prototype;
        _proto.mount = function mount(Extensions, Transition) {
            var _this = this;
            var state = this.state, Components2 = this.Components;
            assert(state.is([ CREATED, DESTROYED ]), "Already mounted!");
            state.set(CREATED);
            this._C = Components2;
            this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
            this._E = Extensions || this._E;
            var Constructors = splide_esm_assign({}, ComponentConstructors, this._E, {
                Transition: this._T
            });
            forOwn(Constructors, (function(Component, key) {
                var component = Component(_this, Components2, _this._o);
                Components2[key] = component;
                component.setup && component.setup();
            }));
            forOwn(Components2, (function(component) {
                component.mount && component.mount();
            }));
            this.emit(EVENT_MOUNTED);
            addClass(this.root, CLASS_INITIALIZED);
            state.set(IDLE);
            this.emit(EVENT_READY);
            return this;
        };
        _proto.sync = function sync(splide) {
            this.splides.push({
                splide
            });
            splide.splides.push({
                splide: this,
                isParent: true
            });
            if (this.state.is(IDLE)) {
                this._C.Sync.remount();
                splide.Components.Sync.remount();
            }
            return this;
        };
        _proto.go = function go(control) {
            this._C.Controller.go(control);
            return this;
        };
        _proto.on = function on(events, callback) {
            this.event.on(events, callback);
            return this;
        };
        _proto.off = function off(events) {
            this.event.off(events);
            return this;
        };
        _proto.emit = function emit(event) {
            var _this$event;
            (_this$event = this.event).emit.apply(_this$event, [ event ].concat(slice(arguments, 1)));
            return this;
        };
        _proto.add = function add(slides, index) {
            this._C.Slides.add(slides, index);
            return this;
        };
        _proto.remove = function remove(matcher) {
            this._C.Slides.remove(matcher);
            return this;
        };
        _proto.is = function is(type) {
            return this._o.type === type;
        };
        _proto.refresh = function refresh() {
            this.emit(EVENT_REFRESH);
            return this;
        };
        _proto.destroy = function destroy(completely) {
            if (completely === void 0) completely = true;
            var event = this.event, state = this.state;
            if (state.is(CREATED)) EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely)); else {
                forOwn(this._C, (function(component) {
                    component.destroy && component.destroy(completely);
                }), true);
                event.emit(EVENT_DESTROY);
                event.destroy();
                completely && empty(this.splides);
                state.set(DESTROYED);
            }
            return this;
        };
        _createClass(_Splide, [ {
            key: "options",
            get: function get() {
                return this._o;
            },
            set: function set(options) {
                this._C.Media.set(options, true, true);
            }
        }, {
            key: "length",
            get: function get() {
                return this._C.Slides.getLength(true);
            }
        }, {
            key: "index",
            get: function get() {
                return this._C.Controller.getIndex();
            }
        } ]);
        return _Splide;
    }();
    var Splide = _Splide;
    Splide.defaults = {};
    Splide.STATES = STATES;
    var CLASS_RENDERED = "is-rendered";
    var RENDERER_DEFAULT_CONFIG = {
        listTag: "ul",
        slideTag: "li"
    };
    var Style = null && function() {
        function Style(id, options) {
            this.styles = {};
            this.id = id;
            this.options = options;
        }
        var _proto2 = Style.prototype;
        _proto2.rule = function rule(selector, prop, value, breakpoint) {
            breakpoint = breakpoint || "default";
            var selectors = this.styles[breakpoint] = this.styles[breakpoint] || {};
            var styles = selectors[selector] = selectors[selector] || {};
            styles[prop] = value;
        };
        _proto2.build = function build() {
            var _this2 = this;
            var css = "";
            if (this.styles.default) css += this.buildSelectors(this.styles.default);
            Object.keys(this.styles).sort((function(n, m) {
                return _this2.options.mediaQuery === "min" ? +n - +m : +m - +n;
            })).forEach((function(breakpoint) {
                if (breakpoint !== "default") {
                    css += "@media screen and (max-width: " + breakpoint + "px) {";
                    css += _this2.buildSelectors(_this2.styles[breakpoint]);
                    css += "}";
                }
            }));
            return css;
        };
        _proto2.buildSelectors = function buildSelectors(selectors) {
            var _this3 = this;
            var css = "";
            forOwn(selectors, (function(styles, selector) {
                selector = ("#" + _this3.id + " " + selector).trim();
                css += selector + " {";
                forOwn(styles, (function(value, prop) {
                    if (value || value === 0) css += prop + ": " + value + ";";
                }));
                css += "}";
            }));
            return css;
        };
        return Style;
    }();
    null && function() {
        function SplideRenderer(contents, options, config, defaults) {
            this.slides = [];
            this.options = {};
            this.breakpoints = [];
            merge(DEFAULTS, defaults || {});
            merge(merge(this.options, DEFAULTS), options || {});
            this.contents = contents;
            this.config = splide_esm_assign({}, RENDERER_DEFAULT_CONFIG, config || {});
            this.id = this.config.id || uniqueId("splide");
            this.Style = new Style(this.id, this.options);
            this.Direction = Direction(null, null, this.options);
            assert(this.contents.length, "Provide at least 1 content.");
            this.init();
        }
        SplideRenderer.clean = function clean(splide) {
            var _EventInterface14 = EventInterface(splide), on = _EventInterface14.on;
            var root = splide.root;
            var clones = queryAll(root, "." + CLASS_CLONE);
            on(EVENT_MOUNTED, (function() {
                remove(child(root, "style"));
            }));
            remove(clones);
        };
        var _proto3 = SplideRenderer.prototype;
        _proto3.init = function init() {
            this.parseBreakpoints();
            this.initSlides();
            this.registerRootStyles();
            this.registerTrackStyles();
            this.registerSlideStyles();
            this.registerListStyles();
        };
        _proto3.initSlides = function initSlides() {
            var _this4 = this;
            push(this.slides, this.contents.map((function(content, index) {
                content = isString(content) ? {
                    html: content
                } : content;
                content.styles = content.styles || {};
                content.attrs = content.attrs || {};
                _this4.cover(content);
                var classes = _this4.options.classes.slide + " " + (index === 0 ? CLASS_ACTIVE : "");
                splide_esm_assign(content.attrs, {
                    class: (classes + " " + (content.attrs.class || "")).trim(),
                    style: _this4.buildStyles(content.styles)
                });
                return content;
            })));
            if (this.isLoop()) this.generateClones(this.slides);
        };
        _proto3.registerRootStyles = function registerRootStyles() {
            var _this5 = this;
            this.breakpoints.forEach((function(_ref2) {
                var width = _ref2[0], options = _ref2[1];
                _this5.Style.rule(" ", "max-width", unit(options.width), width);
            }));
        };
        _proto3.registerTrackStyles = function registerTrackStyles() {
            var _this6 = this;
            var Style2 = this.Style;
            var selector = "." + CLASS_TRACK;
            this.breakpoints.forEach((function(_ref3) {
                var width = _ref3[0], options = _ref3[1];
                Style2.rule(selector, _this6.resolve("paddingLeft"), _this6.cssPadding(options, false), width);
                Style2.rule(selector, _this6.resolve("paddingRight"), _this6.cssPadding(options, true), width);
                Style2.rule(selector, "height", _this6.cssTrackHeight(options), width);
            }));
        };
        _proto3.registerListStyles = function registerListStyles() {
            var _this7 = this;
            var Style2 = this.Style;
            var selector = "." + CLASS_LIST;
            this.breakpoints.forEach((function(_ref4) {
                var width = _ref4[0], options = _ref4[1];
                Style2.rule(selector, "transform", _this7.buildTranslate(options), width);
                if (!_this7.cssSlideHeight(options)) Style2.rule(selector, "aspect-ratio", _this7.cssAspectRatio(options), width);
            }));
        };
        _proto3.registerSlideStyles = function registerSlideStyles() {
            var _this8 = this;
            var Style2 = this.Style;
            var selector = "." + CLASS_SLIDE;
            this.breakpoints.forEach((function(_ref5) {
                var width = _ref5[0], options = _ref5[1];
                Style2.rule(selector, "width", _this8.cssSlideWidth(options), width);
                Style2.rule(selector, "height", _this8.cssSlideHeight(options) || "100%", width);
                Style2.rule(selector, _this8.resolve("marginRight"), unit(options.gap) || "0px", width);
                Style2.rule(selector + " > img", "display", options.cover ? "none" : "inline", width);
            }));
        };
        _proto3.buildTranslate = function buildTranslate(options) {
            var _this$Direction = this.Direction, resolve = _this$Direction.resolve, orient = _this$Direction.orient;
            var values = [];
            values.push(this.cssOffsetClones(options));
            values.push(this.cssOffsetGaps(options));
            if (this.isCenter(options)) {
                values.push(this.buildCssValue(orient(-50), "%"));
                values.push.apply(values, this.cssOffsetCenter(options));
            }
            return values.filter(Boolean).map((function(value) {
                return "translate" + resolve("X") + "(" + value + ")";
            })).join(" ");
        };
        _proto3.cssOffsetClones = function cssOffsetClones(options) {
            var _this$Direction2 = this.Direction, resolve = _this$Direction2.resolve, orient = _this$Direction2.orient;
            var cloneCount = this.getCloneCount();
            if (this.isFixedWidth(options)) {
                var _this$parseCssValue = this.parseCssValue(options[resolve("fixedWidth")]), value = _this$parseCssValue.value, unit2 = _this$parseCssValue.unit;
                return this.buildCssValue(orient(value) * cloneCount, unit2);
            }
            var percent = 100 * cloneCount / options.perPage;
            return orient(percent) + "%";
        };
        _proto3.cssOffsetCenter = function cssOffsetCenter(options) {
            var _this$Direction3 = this.Direction, resolve = _this$Direction3.resolve, orient = _this$Direction3.orient;
            if (this.isFixedWidth(options)) {
                var _this$parseCssValue2 = this.parseCssValue(options[resolve("fixedWidth")]), value = _this$parseCssValue2.value, unit2 = _this$parseCssValue2.unit;
                return [ this.buildCssValue(orient(value / 2), unit2) ];
            }
            var values = [];
            var perPage = options.perPage, gap = options.gap;
            values.push(orient(50 / perPage) + "%");
            if (gap) {
                var _this$parseCssValue3 = this.parseCssValue(gap), _value = _this$parseCssValue3.value, _unit = _this$parseCssValue3.unit;
                var gapOffset = (_value / perPage - _value) / 2;
                values.push(this.buildCssValue(orient(gapOffset), _unit));
            }
            return values;
        };
        _proto3.cssOffsetGaps = function cssOffsetGaps(options) {
            var cloneCount = this.getCloneCount();
            if (cloneCount && options.gap) {
                var orient = this.Direction.orient;
                var _this$parseCssValue4 = this.parseCssValue(options.gap), value = _this$parseCssValue4.value, unit2 = _this$parseCssValue4.unit;
                if (this.isFixedWidth(options)) return this.buildCssValue(orient(value * cloneCount), unit2);
                var perPage = options.perPage;
                var gaps = cloneCount / perPage;
                return this.buildCssValue(orient(gaps * value), unit2);
            }
            return "";
        };
        _proto3.resolve = function resolve(prop) {
            return camelToKebab(this.Direction.resolve(prop));
        };
        _proto3.cssPadding = function cssPadding(options, right) {
            var padding = options.padding;
            var prop = this.Direction.resolve(right ? "right" : "left", true);
            return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
        };
        _proto3.cssTrackHeight = function cssTrackHeight(options) {
            var height = "";
            if (this.isVertical()) {
                height = this.cssHeight(options);
                assert(height, '"height" is missing.');
                height = "calc(" + height + " - " + this.cssPadding(options, false) + " - " + this.cssPadding(options, true) + ")";
            }
            return height;
        };
        _proto3.cssHeight = function cssHeight(options) {
            return unit(options.height);
        };
        _proto3.cssSlideWidth = function cssSlideWidth(options) {
            return options.autoWidth ? "" : unit(options.fixedWidth) || (this.isVertical() ? "" : this.cssSlideSize(options));
        };
        _proto3.cssSlideHeight = function cssSlideHeight(options) {
            return unit(options.fixedHeight) || (this.isVertical() ? options.autoHeight ? "" : this.cssSlideSize(options) : this.cssHeight(options));
        };
        _proto3.cssSlideSize = function cssSlideSize(options) {
            var gap = unit(options.gap);
            return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
        };
        _proto3.cssAspectRatio = function cssAspectRatio(options) {
            var heightRatio = options.heightRatio;
            return heightRatio ? "" + 1 / heightRatio : "";
        };
        _proto3.buildCssValue = function buildCssValue(value, unit2) {
            return "" + value + unit2;
        };
        _proto3.parseCssValue = function parseCssValue(value) {
            if (isString(value)) {
                var number = parseFloat(value) || 0;
                var unit2 = value.replace(/\d*(\.\d*)?/, "") || "px";
                return {
                    value: number,
                    unit: unit2
                };
            }
            return {
                value,
                unit: "px"
            };
        };
        _proto3.parseBreakpoints = function parseBreakpoints() {
            var _this9 = this;
            var breakpoints = this.options.breakpoints;
            this.breakpoints.push([ "default", this.options ]);
            if (breakpoints) forOwn(breakpoints, (function(options, width) {
                _this9.breakpoints.push([ width, merge(merge({}, _this9.options), options) ]);
            }));
        };
        _proto3.isFixedWidth = function isFixedWidth(options) {
            return !!options[this.Direction.resolve("fixedWidth")];
        };
        _proto3.isLoop = function isLoop() {
            return this.options.type === LOOP;
        };
        _proto3.isCenter = function isCenter(options) {
            if (options.focus === "center") {
                if (this.isLoop()) return true;
                if (this.options.type === SLIDE) return !this.options.trimSpace;
            }
            return false;
        };
        _proto3.isVertical = function isVertical() {
            return this.options.direction === TTB;
        };
        _proto3.buildClasses = function buildClasses() {
            var options = this.options;
            return [ CLASS_ROOT, CLASS_ROOT + "--" + options.type, CLASS_ROOT + "--" + options.direction, options.drag && CLASS_ROOT + "--draggable", options.isNavigation && CLASS_ROOT + "--nav", CLASS_ACTIVE, !this.config.hidden && CLASS_RENDERED ].filter(Boolean).join(" ");
        };
        _proto3.buildAttrs = function buildAttrs(attrs) {
            var attr = "";
            forOwn(attrs, (function(value, key) {
                attr += value ? " " + camelToKebab(key) + '="' + value + '"' : "";
            }));
            return attr.trim();
        };
        _proto3.buildStyles = function buildStyles(styles) {
            var style = "";
            forOwn(styles, (function(value, key) {
                style += " " + camelToKebab(key) + ":" + value + ";";
            }));
            return style.trim();
        };
        _proto3.renderSlides = function renderSlides() {
            var _this10 = this;
            var tag = this.config.slideTag;
            return this.slides.map((function(content) {
                return "<" + tag + " " + _this10.buildAttrs(content.attrs) + ">" + (content.html || "") + "</" + tag + ">";
            })).join("");
        };
        _proto3.cover = function cover(content) {
            var styles = content.styles, _content$html = content.html, html = _content$html === void 0 ? "" : _content$html;
            if (this.options.cover && !this.options.lazyLoad) {
                var src = html.match(/<img.*?src\s*=\s*(['"])(.+?)\1.*?>/);
                if (src && src[2]) styles.background = "center/cover no-repeat url('" + src[2] + "')";
            }
        };
        _proto3.generateClones = function generateClones(contents) {
            var classes = this.options.classes;
            var count = this.getCloneCount();
            var slides = contents.slice();
            while (slides.length < count) push(slides, slides);
            push(slides.slice(-count).reverse(), slides.slice(0, count)).forEach((function(content, index) {
                var attrs = splide_esm_assign({}, content.attrs, {
                    class: content.attrs.class + " " + classes.clone
                });
                var clone = splide_esm_assign({}, content, {
                    attrs
                });
                index < count ? contents.unshift(clone) : contents.push(clone);
            }));
        };
        _proto3.getCloneCount = function getCloneCount() {
            if (this.isLoop()) {
                var options = this.options;
                if (options.clones) return options.clones;
                var perPage = max.apply(void 0, this.breakpoints.map((function(_ref6) {
                    var options2 = _ref6[1];
                    return options2.perPage;
                })));
                return perPage * ((options.flickMaxPages || 1) + 1);
            }
            return 0;
        };
        _proto3.renderArrows = function renderArrows() {
            var html = "";
            html += '<div class="' + this.options.classes.arrows + '">';
            html += this.renderArrow(true);
            html += this.renderArrow(false);
            html += "</div>";
            return html;
        };
        _proto3.renderArrow = function renderArrow(prev) {
            var _this$options = this.options, classes = _this$options.classes, i18n = _this$options.i18n;
            var attrs = {
                class: classes.arrow + " " + (prev ? classes.prev : classes.next),
                type: "button",
                ariaLabel: prev ? i18n.prev : i18n.next
            };
            return "<button " + this.buildAttrs(attrs) + '><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '"><path d="' + (this.options.arrowPath || PATH) + '" /></svg></button>';
        };
        _proto3.html = function html() {
            var _this$config = this.config, rootClass = _this$config.rootClass, listTag = _this$config.listTag, arrows = _this$config.arrows, beforeTrack = _this$config.beforeTrack, afterTrack = _this$config.afterTrack, slider = _this$config.slider, beforeSlider = _this$config.beforeSlider, afterSlider = _this$config.afterSlider;
            var html = "";
            html += '<div id="' + this.id + '" class="' + this.buildClasses() + " " + (rootClass || "") + '">';
            html += "<style>" + this.Style.build() + "</style>";
            if (slider) {
                html += beforeSlider || "";
                html += '<div class="splide__slider">';
            }
            html += beforeTrack || "";
            if (arrows) html += this.renderArrows();
            html += '<div class="splide__track">';
            html += "<" + listTag + ' class="splide__list">';
            html += this.renderSlides();
            html += "</" + listTag + ">";
            html += "</div>";
            html += afterTrack || "";
            if (slider) {
                html += "</div>";
                html += afterSlider || "";
            }
            html += "</div>";
            return html;
        };
    }();
    document.addEventListener("DOMContentLoaded", (function() {
        var topHomeSliderEl = document.querySelector(".top-home__slider");
        if (topHomeSliderEl) {
            var topHomeSlider = new Splide(topHomeSliderEl, {
                perPage: 2,
                arrows: false,
                pagination: true,
                gap: 10,
                destroy: true,
                breakpoints: {
                    767.98: {
                        destroy: false
                    },
                    549.98: {
                        perPage: 1,
                        padding: {
                            right: `30%`
                        }
                    },
                    399.98: {
                        padding: 0
                    }
                }
            });
            topHomeSlider.mount();
        }
        const creatorsSlider = document.querySelectorAll(".top-creators-pr__slider");
        creatorsSlider.forEach(((slider, index) => {
            const parent = slider.closest("[data-slider-parent]");
            let prevArrow = null;
            let nextArrow = null;
            if (parent) {
                prevArrow = parent.querySelector(".slider-arrow--prev");
                nextArrow = parent.querySelector(".slider-arrow--next");
            }
            let options = {
                perPage: 1,
                arrows: false,
                pagination: true,
                omitEnd: true,
                gap: 10,
                breakpoints: {
                    1199.98: {
                        perPage: 2
                    },
                    549.98: {
                        perPage: 1,
                        padding: {
                            right: 100
                        }
                    },
                    399.98: {
                        padding: 0
                    }
                }
            };
            function refreshButtons() {
                if (slider.closest("[hidden]") !== null) return;
                if (prevArrow) prevArrow.disabled = splideInstance.index === 0;
                if (nextArrow) nextArrow.disabled = splideInstance.index === splideInstance.Components.Controller.getEnd();
            }
            const splideInstance = new Splide(slider, options);
            splideInstance.on("mounted move", (() => {
                refreshButtons();
            }));
            splideInstance.mount();
            if (prevArrow) prevArrow.addEventListener("click", (() => splideInstance.go("<")));
            if (nextArrow) nextArrow.addEventListener("click", (() => splideInstance.go(">")));
        }));
        const articleSliderEls = document.querySelectorAll(".aside-article__slider");
        articleSliderEls.forEach(((slider, index) => {
            const parent = slider.closest("[data-slider-parent]");
            let prevArrow = null;
            let nextArrow = null;
            if (parent) {
                prevArrow = parent.querySelector(".slider-arrow--prev");
                nextArrow = parent.querySelector(".slider-arrow--next");
            }
            let options = {
                perPage: 2,
                arrows: false,
                pagination: true,
                gap: 10,
                destroy: true,
                omitEnd: true,
                breakpoints: {
                    767.98: {
                        destroy: false
                    },
                    549.98: {
                        perPage: 1,
                        padding: {
                            right: `30%`
                        }
                    },
                    399.98: {
                        padding: 0
                    }
                }
            };
            function refreshButtons() {
                if (slider.closest("[hidden]") !== null) return;
                if (prevArrow) prevArrow.disabled = splideInstance.index === 0;
                if (nextArrow) nextArrow.disabled = splideInstance.index === splideInstance.Components.Controller.getEnd();
            }
            const splideInstance = new Splide(slider, options);
            splideInstance.on("mounted move", (() => {
                refreshButtons();
            }));
            splideInstance.mount();
            if (prevArrow) prevArrow.addEventListener("click", (() => splideInstance.go("<")));
            if (nextArrow) nextArrow.addEventListener("click", (() => splideInstance.go(">")));
        }));
        var modelsPrSliderEl = document.querySelector(".models-profile__slider");
        if (modelsPrSliderEl) {
            var modelsPrSlider = new Splide(modelsPrSliderEl, {
                perPage: 2,
                arrows: false,
                pagination: true,
                gap: 10,
                destroy: true,
                breakpoints: {
                    767.98: {
                        destroy: false
                    },
                    549.98: {
                        perPage: 1,
                        padding: {
                            right: `30%`
                        }
                    },
                    399.98: {
                        padding: 0
                    }
                }
            });
            modelsPrSlider.mount();
        }
    }));
    function isObject_isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
    }
    const lodash_es_isObject = isObject_isObject;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    const _freeGlobal = freeGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = _freeGlobal || freeSelf || Function("return this")();
    const _root = root;
    var now = function() {
        return _root.Date.now();
    };
    const lodash_es_now = now;
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) ;
        return index;
    }
    const _trimmedEndIndex = trimmedEndIndex;
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
        return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    const _baseTrim = baseTrim;
    var Symbol = _root.Symbol;
    const _Symbol = Symbol;
    var objectProto = Object.prototype;
    var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
    function getRawTag(value) {
        var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
            value[symToStringTag] = void 0;
            var unmasked = true;
        } catch (e) {}
        var result = nativeObjectToString.call(value);
        if (unmasked) if (isOwn) value[symToStringTag] = tag; else delete value[symToStringTag];
        return result;
    }
    const _getRawTag = getRawTag;
    var _objectToString_objectProto = Object.prototype;
    var _objectToString_nativeObjectToString = _objectToString_objectProto.toString;
    function objectToString(value) {
        return _objectToString_nativeObjectToString.call(value);
    }
    const _objectToString = objectToString;
    var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
    var _baseGetTag_symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
    function baseGetTag(value) {
        if (value == null) return value === void 0 ? undefinedTag : nullTag;
        return _baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
    }
    const _baseGetTag = baseGetTag;
    function isObjectLike(value) {
        return value != null && typeof value == "object";
    }
    const lodash_es_isObjectLike = isObjectLike;
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
        return typeof value == "symbol" || lodash_es_isObjectLike(value) && _baseGetTag(value) == symbolTag;
    }
    const lodash_es_isSymbol = isSymbol;
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
        if (typeof value == "number") return value;
        if (lodash_es_isSymbol(value)) return NAN;
        if (lodash_es_isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = lodash_es_isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") return value === 0 ? value : +value;
        value = _baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    const lodash_es_toNumber = toNumber;
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max, nativeMin = Math.min;
    function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
        wait = lodash_es_toNumber(wait) || 0;
        if (lodash_es_isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(lodash_es_toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = void 0;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }
        function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout(timerExpired, wait);
            return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
            var time = lodash_es_now();
            if (shouldInvoke(time)) return trailingEdge(time);
            timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
            timerId = void 0;
            if (trailing && lastArgs) return invokeFunc(time);
            lastArgs = lastThis = void 0;
            return result;
        }
        function cancel() {
            if (timerId !== void 0) clearTimeout(timerId);
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
            return timerId === void 0 ? result : trailingEdge(lodash_es_now());
        }
        function debounced() {
            var time = lodash_es_now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
                if (timerId === void 0) return leadingEdge(lastCallTime);
                if (maxing) {
                    clearTimeout(timerId);
                    timerId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    }
    const lodash_es_debounce = debounce;
    var throttle_FUNC_ERROR_TEXT = "Expected a function";
    function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") throw new TypeError(throttle_FUNC_ERROR_TEXT);
        if (lodash_es_isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return lodash_es_debounce(func, wait, {
            leading,
            maxWait: wait,
            trailing
        });
    }
    const lodash_es_throttle = throttle;
    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function getElementWindow$1(element) {
        if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) return window;
        return element.ownerDocument.defaultView;
    }
    function getElementDocument$1(element) {
        if (!element || !element.ownerDocument) return document;
        return element.ownerDocument;
    }
    var getOptions$1 = function(obj) {
        var initialObj = {};
        var options = Array.prototype.reduce.call(obj, (function(acc, attribute) {
            var option = attribute.name.match(/data-simplebar-(.+)/);
            if (option) {
                var key = option[1].replace(/\W+(.)/g, (function(_, chr) {
                    return chr.toUpperCase();
                }));
                switch (attribute.value) {
                  case "true":
                    acc[key] = true;
                    break;

                  case "false":
                    acc[key] = false;
                    break;

                  case void 0:
                    acc[key] = true;
                    break;

                  default:
                    acc[key] = attribute.value;
                }
            }
            return acc;
        }), initialObj);
        return options;
    };
    function addClasses$1(el, classes) {
        var _a;
        if (!el) return;
        (_a = el.classList).add.apply(_a, classes.split(" "));
    }
    function removeClasses$1(el, classes) {
        if (!el) return;
        classes.split(" ").forEach((function(className) {
            el.classList.remove(className);
        }));
    }
    function classNamesToQuery$1(classNames) {
        return ".".concat(classNames.split(" ").join("."));
    }
    var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
    var helpers = Object.freeze({
        __proto__: null,
        addClasses: addClasses$1,
        canUseDOM,
        classNamesToQuery: classNamesToQuery$1,
        getElementDocument: getElementDocument$1,
        getElementWindow: getElementWindow$1,
        getOptions: getOptions$1,
        removeClasses: removeClasses$1
    });
    var cachedScrollbarWidth = null;
    var cachedDevicePixelRatio = null;
    if (canUseDOM) window.addEventListener("resize", (function() {
        if (cachedDevicePixelRatio !== window.devicePixelRatio) {
            cachedDevicePixelRatio = window.devicePixelRatio;
            cachedScrollbarWidth = null;
        }
    }));
    function scrollbarWidth() {
        if (cachedScrollbarWidth === null) {
            if (typeof document === "undefined") {
                cachedScrollbarWidth = 0;
                return cachedScrollbarWidth;
            }
            var body = document.body;
            var box = document.createElement("div");
            box.classList.add("simplebar-hide-scrollbar");
            body.appendChild(box);
            var width = box.getBoundingClientRect().right;
            body.removeChild(box);
            cachedScrollbarWidth = width;
        }
        return cachedScrollbarWidth;
    }
    var getElementWindow = getElementWindow$1, getElementDocument = getElementDocument$1, getOptions = getOptions$1, addClasses = addClasses$1, dist_removeClasses = removeClasses$1, classNamesToQuery = classNamesToQuery$1;
    var SimpleBarCore = function() {
        function SimpleBarCore(element, options) {
            if (options === void 0) options = {};
            var _this = this;
            this.removePreventClickId = null;
            this.minScrollbarWidth = 20;
            this.stopScrollDelay = 175;
            this.isScrolling = false;
            this.isMouseEntering = false;
            this.isDragging = false;
            this.scrollXTicking = false;
            this.scrollYTicking = false;
            this.wrapperEl = null;
            this.contentWrapperEl = null;
            this.contentEl = null;
            this.offsetEl = null;
            this.maskEl = null;
            this.placeholderEl = null;
            this.heightAutoObserverWrapperEl = null;
            this.heightAutoObserverEl = null;
            this.rtlHelpers = null;
            this.scrollbarWidth = 0;
            this.resizeObserver = null;
            this.mutationObserver = null;
            this.elStyles = null;
            this.isRtl = null;
            this.mouseX = 0;
            this.mouseY = 0;
            this.onMouseMove = function() {};
            this.onWindowResize = function() {};
            this.onStopScrolling = function() {};
            this.onMouseEntered = function() {};
            this.onScroll = function() {
                var elWindow = getElementWindow(_this.el);
                if (!_this.scrollXTicking) {
                    elWindow.requestAnimationFrame(_this.scrollX);
                    _this.scrollXTicking = true;
                }
                if (!_this.scrollYTicking) {
                    elWindow.requestAnimationFrame(_this.scrollY);
                    _this.scrollYTicking = true;
                }
                if (!_this.isScrolling) {
                    _this.isScrolling = true;
                    addClasses(_this.el, _this.classNames.scrolling);
                }
                _this.showScrollbar("x");
                _this.showScrollbar("y");
                _this.onStopScrolling();
            };
            this.scrollX = function() {
                if (_this.axis.x.isOverflowing) _this.positionScrollbar("x");
                _this.scrollXTicking = false;
            };
            this.scrollY = function() {
                if (_this.axis.y.isOverflowing) _this.positionScrollbar("y");
                _this.scrollYTicking = false;
            };
            this._onStopScrolling = function() {
                dist_removeClasses(_this.el, _this.classNames.scrolling);
                if (_this.options.autoHide) {
                    _this.hideScrollbar("x");
                    _this.hideScrollbar("y");
                }
                _this.isScrolling = false;
            };
            this.onMouseEnter = function() {
                if (!_this.isMouseEntering) {
                    addClasses(_this.el, _this.classNames.mouseEntered);
                    _this.showScrollbar("x");
                    _this.showScrollbar("y");
                    _this.isMouseEntering = true;
                }
                _this.onMouseEntered();
            };
            this._onMouseEntered = function() {
                dist_removeClasses(_this.el, _this.classNames.mouseEntered);
                if (_this.options.autoHide) {
                    _this.hideScrollbar("x");
                    _this.hideScrollbar("y");
                }
                _this.isMouseEntering = false;
            };
            this._onMouseMove = function(e) {
                _this.mouseX = e.clientX;
                _this.mouseY = e.clientY;
                if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseMoveForAxis("x");
                if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseMoveForAxis("y");
            };
            this.onMouseLeave = function() {
                _this.onMouseMove.cancel();
                if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseLeaveForAxis("x");
                if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseLeaveForAxis("y");
                _this.mouseX = -1;
                _this.mouseY = -1;
            };
            this._onWindowResize = function() {
                _this.scrollbarWidth = _this.getScrollbarWidth();
                _this.hideNativeScrollbar();
            };
            this.onPointerEvent = function(e) {
                if (!_this.axis.x.track.el || !_this.axis.y.track.el || !_this.axis.x.scrollbar.el || !_this.axis.y.scrollbar.el) return;
                var isWithinTrackXBounds, isWithinTrackYBounds;
                _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
                _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
                if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
                if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
                if (isWithinTrackXBounds || isWithinTrackYBounds) {
                    e.stopPropagation();
                    if (e.type === "pointerdown" && e.pointerType !== "touch") {
                        if (isWithinTrackXBounds) {
                            _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();
                            if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) _this.onDragStart(e, "x"); else _this.onTrackClick(e, "x");
                        }
                        if (isWithinTrackYBounds) {
                            _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();
                            if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) _this.onDragStart(e, "y"); else _this.onTrackClick(e, "y");
                        }
                    }
                }
            };
            this.drag = function(e) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                if (!_this.draggedAxis || !_this.contentWrapperEl) return;
                var eventOffset;
                var track = _this.axis[_this.draggedAxis].track;
                var trackSize = (_b = (_a = track.rect) === null || _a === void 0 ? void 0 : _a[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _b !== void 0 ? _b : 0;
                var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
                var contentSize = (_d = (_c = _this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c[_this.axis[_this.draggedAxis].scrollSizeAttr]) !== null && _d !== void 0 ? _d : 0;
                var hostSize = parseInt((_f = (_e = _this.elStyles) === null || _e === void 0 ? void 0 : _e[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _f !== void 0 ? _f : "0px", 10);
                e.preventDefault();
                e.stopPropagation();
                if (_this.draggedAxis === "y") eventOffset = e.pageY; else eventOffset = e.pageX;
                var dragPos = eventOffset - ((_h = (_g = track.rect) === null || _g === void 0 ? void 0 : _g[_this.axis[_this.draggedAxis].offsetAttr]) !== null && _h !== void 0 ? _h : 0) - _this.axis[_this.draggedAxis].dragOffset;
                dragPos = _this.draggedAxis === "x" && _this.isRtl ? ((_k = (_j = track.rect) === null || _j === void 0 ? void 0 : _j[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _k !== void 0 ? _k : 0) - scrollbar.size - dragPos : dragPos;
                var dragPerc = dragPos / (trackSize - scrollbar.size);
                var scrollPos = dragPerc * (contentSize - hostSize);
                if (_this.draggedAxis === "x" && _this.isRtl) scrollPos = ((_l = SimpleBarCore.getRtlHelpers()) === null || _l === void 0 ? void 0 : _l.isScrollingToNegative) ? -scrollPos : scrollPos;
                _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
            };
            this.onEndDrag = function(e) {
                _this.isDragging = false;
                var elDocument = getElementDocument(_this.el);
                var elWindow = getElementWindow(_this.el);
                e.preventDefault();
                e.stopPropagation();
                dist_removeClasses(_this.el, _this.classNames.dragging);
                _this.onStopScrolling();
                elDocument.removeEventListener("mousemove", _this.drag, true);
                elDocument.removeEventListener("mouseup", _this.onEndDrag, true);
                _this.removePreventClickId = elWindow.setTimeout((function() {
                    elDocument.removeEventListener("click", _this.preventClick, true);
                    elDocument.removeEventListener("dblclick", _this.preventClick, true);
                    _this.removePreventClickId = null;
                }));
            };
            this.preventClick = function(e) {
                e.preventDefault();
                e.stopPropagation();
            };
            this.el = element;
            this.options = __assign(__assign({}, SimpleBarCore.defaultOptions), options);
            this.classNames = __assign(__assign({}, SimpleBarCore.defaultOptions.classNames), options.classNames);
            this.axis = {
                x: {
                    scrollOffsetAttr: "scrollLeft",
                    sizeAttr: "width",
                    scrollSizeAttr: "scrollWidth",
                    offsetSizeAttr: "offsetWidth",
                    offsetAttr: "left",
                    overflowAttr: "overflowX",
                    dragOffset: 0,
                    isOverflowing: true,
                    forceVisible: false,
                    track: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    },
                    scrollbar: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    }
                },
                y: {
                    scrollOffsetAttr: "scrollTop",
                    sizeAttr: "height",
                    scrollSizeAttr: "scrollHeight",
                    offsetSizeAttr: "offsetHeight",
                    offsetAttr: "top",
                    overflowAttr: "overflowY",
                    dragOffset: 0,
                    isOverflowing: true,
                    forceVisible: false,
                    track: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    },
                    scrollbar: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    }
                }
            };
            if (typeof this.el !== "object" || !this.el.nodeName) throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
            this.onMouseMove = lodash_es_throttle(this._onMouseMove, 64);
            this.onWindowResize = lodash_es_debounce(this._onWindowResize, 64, {
                leading: true
            });
            this.onStopScrolling = lodash_es_debounce(this._onStopScrolling, this.stopScrollDelay);
            this.onMouseEntered = lodash_es_debounce(this._onMouseEntered, this.stopScrollDelay);
            this.init();
        }
        SimpleBarCore.getRtlHelpers = function() {
            if (SimpleBarCore.rtlHelpers) return SimpleBarCore.rtlHelpers;
            var dummyDiv = document.createElement("div");
            dummyDiv.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
            var scrollbarDummyEl = dummyDiv.firstElementChild;
            var dummyChild = scrollbarDummyEl === null || scrollbarDummyEl === void 0 ? void 0 : scrollbarDummyEl.firstElementChild;
            if (!dummyChild) return null;
            document.body.appendChild(scrollbarDummyEl);
            scrollbarDummyEl.scrollLeft = 0;
            var dummyContainerOffset = SimpleBarCore.getOffset(scrollbarDummyEl);
            var dummyChildOffset = SimpleBarCore.getOffset(dummyChild);
            scrollbarDummyEl.scrollLeft = -999;
            var dummyChildOffsetAfterScroll = SimpleBarCore.getOffset(dummyChild);
            document.body.removeChild(scrollbarDummyEl);
            SimpleBarCore.rtlHelpers = {
                isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
                isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
            };
            return SimpleBarCore.rtlHelpers;
        };
        SimpleBarCore.prototype.getScrollbarWidth = function() {
            try {
                if (this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style) return 0; else return scrollbarWidth();
            } catch (e) {
                return scrollbarWidth();
            }
        };
        SimpleBarCore.getOffset = function(el) {
            var rect = el.getBoundingClientRect();
            var elDocument = getElementDocument(el);
            var elWindow = getElementWindow(el);
            return {
                top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
                left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
            };
        };
        SimpleBarCore.prototype.init = function() {
            if (canUseDOM) {
                this.initDOM();
                this.rtlHelpers = SimpleBarCore.getRtlHelpers();
                this.scrollbarWidth = this.getScrollbarWidth();
                this.recalculate();
                this.initListeners();
            }
        };
        SimpleBarCore.prototype.initDOM = function() {
            var _a, _b;
            this.wrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.wrapper));
            this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper));
            this.contentEl = this.options.contentNode || this.el.querySelector(classNamesToQuery(this.classNames.contentEl));
            this.offsetEl = this.el.querySelector(classNamesToQuery(this.classNames.offset));
            this.maskEl = this.el.querySelector(classNamesToQuery(this.classNames.mask));
            this.placeholderEl = this.findChild(this.wrapperEl, classNamesToQuery(this.classNames.placeholder));
            this.heightAutoObserverWrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverWrapperEl));
            this.heightAutoObserverEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverEl));
            this.axis.x.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.horizontal)));
            this.axis.y.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.vertical)));
            this.axis.x.scrollbar.el = ((_a = this.axis.x.track.el) === null || _a === void 0 ? void 0 : _a.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
            this.axis.y.scrollbar.el = ((_b = this.axis.y.track.el) === null || _b === void 0 ? void 0 : _b.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
            if (!this.options.autoHide) {
                addClasses(this.axis.x.scrollbar.el, this.classNames.visible);
                addClasses(this.axis.y.scrollbar.el, this.classNames.visible);
            }
        };
        SimpleBarCore.prototype.initListeners = function() {
            var _this = this;
            var _a;
            var elWindow = getElementWindow(this.el);
            this.el.addEventListener("mouseenter", this.onMouseEnter);
            this.el.addEventListener("pointerdown", this.onPointerEvent, true);
            this.el.addEventListener("mousemove", this.onMouseMove);
            this.el.addEventListener("mouseleave", this.onMouseLeave);
            (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", this.onScroll);
            elWindow.addEventListener("resize", this.onWindowResize);
            if (!this.contentEl) return;
            if (window.ResizeObserver) {
                var resizeObserverStarted_1 = false;
                var resizeObserver = elWindow.ResizeObserver || ResizeObserver;
                this.resizeObserver = new resizeObserver((function() {
                    if (!resizeObserverStarted_1) return;
                    elWindow.requestAnimationFrame((function() {
                        _this.recalculate();
                    }));
                }));
                this.resizeObserver.observe(this.el);
                this.resizeObserver.observe(this.contentEl);
                elWindow.requestAnimationFrame((function() {
                    resizeObserverStarted_1 = true;
                }));
            }
            this.mutationObserver = new elWindow.MutationObserver((function() {
                elWindow.requestAnimationFrame((function() {
                    _this.recalculate();
                }));
            }));
            this.mutationObserver.observe(this.contentEl, {
                childList: true,
                subtree: true,
                characterData: true
            });
        };
        SimpleBarCore.prototype.recalculate = function() {
            if (!this.heightAutoObserverEl || !this.contentEl || !this.contentWrapperEl || !this.wrapperEl || !this.placeholderEl) return;
            var elWindow = getElementWindow(this.el);
            this.elStyles = elWindow.getComputedStyle(this.el);
            this.isRtl = this.elStyles.direction === "rtl";
            var contentElOffsetWidth = this.contentEl.offsetWidth;
            var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
            var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
            var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
            var elOverflowX = this.elStyles.overflowX;
            var elOverflowY = this.elStyles.overflowY;
            this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
            this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
            var contentElScrollHeight = this.contentEl.scrollHeight;
            var contentElScrollWidth = this.contentEl.scrollWidth;
            this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%";
            this.placeholderEl.style.width = isWidthAuto ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px") : "auto";
            this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
            var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
            this.axis.x.isOverflowing = contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
            this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight;
            this.axis.x.isOverflowing = elOverflowX === "hidden" ? false : this.axis.x.isOverflowing;
            this.axis.y.isOverflowing = elOverflowY === "hidden" ? false : this.axis.y.isOverflowing;
            this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === true;
            this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === true;
            this.hideNativeScrollbar();
            var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
            var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
            this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
            this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
            this.axis.x.scrollbar.size = this.getScrollbarSize("x");
            this.axis.y.scrollbar.size = this.getScrollbarSize("y");
            if (this.axis.x.scrollbar.el) this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
            if (this.axis.y.scrollbar.el) this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
            this.positionScrollbar("x");
            this.positionScrollbar("y");
            this.toggleTrackVisibility("x");
            this.toggleTrackVisibility("y");
        };
        SimpleBarCore.prototype.getScrollbarSize = function(axis) {
            var _a, _b;
            if (axis === void 0) axis = "y";
            if (!this.axis[axis].isOverflowing || !this.contentEl) return 0;
            var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
            var trackSize = (_b = (_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) !== null && _b !== void 0 ? _b : 0;
            var scrollbarRatio = trackSize / contentSize;
            var scrollbarSize;
            scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);
            if (this.options.scrollbarMaxSize) scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
            return scrollbarSize;
        };
        SimpleBarCore.prototype.positionScrollbar = function(axis) {
            var _a, _b, _c;
            if (axis === void 0) axis = "y";
            var scrollbar = this.axis[axis].scrollbar;
            if (!this.axis[axis].isOverflowing || !this.contentWrapperEl || !scrollbar.el || !this.elStyles) return;
            var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
            var trackSize = ((_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) || 0;
            var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
            var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
            scrollOffset = axis === "x" && this.isRtl && ((_b = SimpleBarCore.getRtlHelpers()) === null || _b === void 0 ? void 0 : _b.isScrollOriginAtZero) ? -scrollOffset : scrollOffset;
            if (axis === "x" && this.isRtl) scrollOffset = ((_c = SimpleBarCore.getRtlHelpers()) === null || _c === void 0 ? void 0 : _c.isScrollingToNegative) ? scrollOffset : -scrollOffset;
            var scrollPourcent = scrollOffset / (contentSize - hostSize);
            var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
            handleOffset = axis === "x" && this.isRtl ? -handleOffset + (trackSize - scrollbar.size) : handleOffset;
            scrollbar.el.style.transform = axis === "x" ? "translate3d(".concat(handleOffset, "px, 0, 0)") : "translate3d(0, ".concat(handleOffset, "px, 0)");
        };
        SimpleBarCore.prototype.toggleTrackVisibility = function(axis) {
            if (axis === void 0) axis = "y";
            var track = this.axis[axis].track.el;
            var scrollbar = this.axis[axis].scrollbar.el;
            if (!track || !scrollbar || !this.contentWrapperEl) return;
            if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
                track.style.visibility = "visible";
                this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "scroll";
                this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis));
            } else {
                track.style.visibility = "hidden";
                this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "hidden";
                this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis));
            }
            if (this.axis[axis].isOverflowing) scrollbar.style.display = "block"; else scrollbar.style.display = "none";
        };
        SimpleBarCore.prototype.showScrollbar = function(axis) {
            if (axis === void 0) axis = "y";
            if (this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible) {
                addClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                this.axis[axis].scrollbar.isVisible = true;
            }
        };
        SimpleBarCore.prototype.hideScrollbar = function(axis) {
            if (axis === void 0) axis = "y";
            if (this.isDragging) return;
            if (this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible) {
                dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                this.axis[axis].scrollbar.isVisible = false;
            }
        };
        SimpleBarCore.prototype.hideNativeScrollbar = function() {
            if (!this.offsetEl) return;
            this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
            this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
        };
        SimpleBarCore.prototype.onMouseMoveForAxis = function(axis) {
            if (axis === void 0) axis = "y";
            var currentAxis = this.axis[axis];
            if (!currentAxis.track.el || !currentAxis.scrollbar.el) return;
            currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect();
            currentAxis.scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
            if (this.isWithinBounds(currentAxis.track.rect)) {
                this.showScrollbar(axis);
                addClasses(currentAxis.track.el, this.classNames.hover);
                if (this.isWithinBounds(currentAxis.scrollbar.rect)) addClasses(currentAxis.scrollbar.el, this.classNames.hover); else dist_removeClasses(currentAxis.scrollbar.el, this.classNames.hover);
            } else {
                dist_removeClasses(currentAxis.track.el, this.classNames.hover);
                if (this.options.autoHide) this.hideScrollbar(axis);
            }
        };
        SimpleBarCore.prototype.onMouseLeaveForAxis = function(axis) {
            if (axis === void 0) axis = "y";
            dist_removeClasses(this.axis[axis].track.el, this.classNames.hover);
            dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover);
            if (this.options.autoHide) this.hideScrollbar(axis);
        };
        SimpleBarCore.prototype.onDragStart = function(e, axis) {
            var _a;
            if (axis === void 0) axis = "y";
            this.isDragging = true;
            var elDocument = getElementDocument(this.el);
            var elWindow = getElementWindow(this.el);
            var scrollbar = this.axis[axis].scrollbar;
            var eventOffset = axis === "y" ? e.pageY : e.pageX;
            this.axis[axis].dragOffset = eventOffset - (((_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) || 0);
            this.draggedAxis = axis;
            addClasses(this.el, this.classNames.dragging);
            elDocument.addEventListener("mousemove", this.drag, true);
            elDocument.addEventListener("mouseup", this.onEndDrag, true);
            if (this.removePreventClickId === null) {
                elDocument.addEventListener("click", this.preventClick, true);
                elDocument.addEventListener("dblclick", this.preventClick, true);
            } else {
                elWindow.clearTimeout(this.removePreventClickId);
                this.removePreventClickId = null;
            }
        };
        SimpleBarCore.prototype.onTrackClick = function(e, axis) {
            var _this = this;
            var _a, _b, _c, _d;
            if (axis === void 0) axis = "y";
            var currentAxis = this.axis[axis];
            if (!this.options.clickOnTrack || !currentAxis.scrollbar.el || !this.contentWrapperEl) return;
            e.preventDefault();
            var elWindow = getElementWindow(this.el);
            this.axis[axis].scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
            var scrollbar = this.axis[axis].scrollbar;
            var scrollbarOffset = (_b = (_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) !== null && _b !== void 0 ? _b : 0;
            var hostSize = parseInt((_d = (_c = this.elStyles) === null || _c === void 0 ? void 0 : _c[this.axis[axis].sizeAttr]) !== null && _d !== void 0 ? _d : "0px", 10);
            var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
            var t = axis === "y" ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
            var dir = t < 0 ? -1 : 1;
            var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
            var speed = 40;
            var scrollTo = function() {
                if (!_this.contentWrapperEl) return;
                if (dir === -1) {
                    if (scrolled > scrollSize) {
                        scrolled -= speed;
                        _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                        elWindow.requestAnimationFrame(scrollTo);
                    }
                } else if (scrolled < scrollSize) {
                    scrolled += speed;
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                    elWindow.requestAnimationFrame(scrollTo);
                }
            };
            scrollTo();
        };
        SimpleBarCore.prototype.getContentElement = function() {
            return this.contentEl;
        };
        SimpleBarCore.prototype.getScrollElement = function() {
            return this.contentWrapperEl;
        };
        SimpleBarCore.prototype.removeListeners = function() {
            var elWindow = getElementWindow(this.el);
            this.el.removeEventListener("mouseenter", this.onMouseEnter);
            this.el.removeEventListener("pointerdown", this.onPointerEvent, true);
            this.el.removeEventListener("mousemove", this.onMouseMove);
            this.el.removeEventListener("mouseleave", this.onMouseLeave);
            if (this.contentWrapperEl) this.contentWrapperEl.removeEventListener("scroll", this.onScroll);
            elWindow.removeEventListener("resize", this.onWindowResize);
            if (this.mutationObserver) this.mutationObserver.disconnect();
            if (this.resizeObserver) this.resizeObserver.disconnect();
            this.onMouseMove.cancel();
            this.onWindowResize.cancel();
            this.onStopScrolling.cancel();
            this.onMouseEntered.cancel();
        };
        SimpleBarCore.prototype.unMount = function() {
            this.removeListeners();
        };
        SimpleBarCore.prototype.isWithinBounds = function(bbox) {
            return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
        };
        SimpleBarCore.prototype.findChild = function(el, query) {
            var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
            return Array.prototype.filter.call(el.children, (function(child) {
                return matches.call(child, query);
            }))[0];
        };
        SimpleBarCore.rtlHelpers = null;
        SimpleBarCore.defaultOptions = {
            forceVisible: false,
            clickOnTrack: true,
            scrollbarMinSize: 25,
            scrollbarMaxSize: 0,
            ariaLabel: "scrollable content",
            tabIndex: 0,
            classNames: {
                contentEl: "simplebar-content",
                contentWrapper: "simplebar-content-wrapper",
                offset: "simplebar-offset",
                mask: "simplebar-mask",
                wrapper: "simplebar-wrapper",
                placeholder: "simplebar-placeholder",
                scrollbar: "simplebar-scrollbar",
                track: "simplebar-track",
                heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
                heightAutoObserverEl: "simplebar-height-auto-observer",
                visible: "simplebar-visible",
                horizontal: "simplebar-horizontal",
                vertical: "simplebar-vertical",
                hover: "simplebar-hover",
                dragging: "simplebar-dragging",
                scrolling: "simplebar-scrolling",
                scrollable: "simplebar-scrollable",
                mouseEntered: "simplebar-mouse-entered"
            },
            scrollableNode: null,
            contentNode: null,
            autoHide: true
        };
        SimpleBarCore.getOptions = getOptions;
        SimpleBarCore.helpers = helpers;
        return SimpleBarCore;
    }();
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
    }
    var _a = SimpleBarCore.helpers, dist_getOptions = _a.getOptions, dist_addClasses = _a.addClasses, dist_canUseDOM = _a.canUseDOM;
    var SimpleBar = function(_super) {
        __extends(SimpleBar, _super);
        function SimpleBar() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var _this = _super.apply(this, args) || this;
            SimpleBar.instances.set(args[0], _this);
            return _this;
        }
        SimpleBar.initDOMLoadedElements = function() {
            document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements);
            window.removeEventListener("load", this.initDOMLoadedElements);
            Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function(el) {
                if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el)) new SimpleBar(el, dist_getOptions(el.attributes));
            }));
        };
        SimpleBar.removeObserver = function() {
            var _a;
            (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
        SimpleBar.prototype.initDOM = function() {
            var _this = this;
            var _a, _b, _c;
            if (!Array.prototype.filter.call(this.el.children, (function(child) {
                return child.classList.contains(_this.classNames.wrapper);
            })).length) {
                this.wrapperEl = document.createElement("div");
                this.contentWrapperEl = document.createElement("div");
                this.offsetEl = document.createElement("div");
                this.maskEl = document.createElement("div");
                this.contentEl = document.createElement("div");
                this.placeholderEl = document.createElement("div");
                this.heightAutoObserverWrapperEl = document.createElement("div");
                this.heightAutoObserverEl = document.createElement("div");
                dist_addClasses(this.wrapperEl, this.classNames.wrapper);
                dist_addClasses(this.contentWrapperEl, this.classNames.contentWrapper);
                dist_addClasses(this.offsetEl, this.classNames.offset);
                dist_addClasses(this.maskEl, this.classNames.mask);
                dist_addClasses(this.contentEl, this.classNames.contentEl);
                dist_addClasses(this.placeholderEl, this.classNames.placeholder);
                dist_addClasses(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl);
                dist_addClasses(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl);
                while (this.el.firstChild) this.contentEl.appendChild(this.el.firstChild);
                this.contentWrapperEl.appendChild(this.contentEl);
                this.offsetEl.appendChild(this.contentWrapperEl);
                this.maskEl.appendChild(this.offsetEl);
                this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
                this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
                this.wrapperEl.appendChild(this.maskEl);
                this.wrapperEl.appendChild(this.placeholderEl);
                this.el.appendChild(this.wrapperEl);
                (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.setAttribute("tabindex", this.options.tabIndex.toString());
                (_b = this.contentWrapperEl) === null || _b === void 0 ? void 0 : _b.setAttribute("role", "region");
                (_c = this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c.setAttribute("aria-label", this.options.ariaLabel);
            }
            if (!this.axis.x.track.el || !this.axis.y.track.el) {
                var track = document.createElement("div");
                var scrollbar = document.createElement("div");
                dist_addClasses(track, this.classNames.track);
                dist_addClasses(scrollbar, this.classNames.scrollbar);
                track.appendChild(scrollbar);
                this.axis.x.track.el = track.cloneNode(true);
                dist_addClasses(this.axis.x.track.el, this.classNames.horizontal);
                this.axis.y.track.el = track.cloneNode(true);
                dist_addClasses(this.axis.y.track.el, this.classNames.vertical);
                this.el.appendChild(this.axis.x.track.el);
                this.el.appendChild(this.axis.y.track.el);
            }
            SimpleBarCore.prototype.initDOM.call(this);
            this.el.setAttribute("data-simplebar", "init");
        };
        SimpleBar.prototype.unMount = function() {
            SimpleBarCore.prototype.unMount.call(this);
            SimpleBar.instances["delete"](this.el);
        };
        SimpleBar.initHtmlApi = function() {
            this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
            if (typeof MutationObserver !== "undefined") {
                this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
                this.globalObserver.observe(document, {
                    childList: true,
                    subtree: true
                });
            }
            if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) window.setTimeout(this.initDOMLoadedElements); else {
                document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements);
                window.addEventListener("load", this.initDOMLoadedElements);
            }
        };
        SimpleBar.handleMutations = function(mutations) {
            mutations.forEach((function(mutation) {
                mutation.addedNodes.forEach((function(addedNode) {
                    if (addedNode.nodeType === 1) if (addedNode.hasAttribute("data-simplebar")) !SimpleBar.instances.has(addedNode) && document.documentElement.contains(addedNode) && new SimpleBar(addedNode, dist_getOptions(addedNode.attributes)); else addedNode.querySelectorAll("[data-simplebar]").forEach((function(el) {
                        if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el) && document.documentElement.contains(el)) new SimpleBar(el, dist_getOptions(el.attributes));
                    }));
                }));
                mutation.removedNodes.forEach((function(removedNode) {
                    var _a;
                    if (removedNode.nodeType === 1) if (removedNode.getAttribute("data-simplebar") === "init") !document.documentElement.contains(removedNode) && ((_a = SimpleBar.instances.get(removedNode)) === null || _a === void 0 ? void 0 : _a.unMount()); else Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), (function(el) {
                        var _a;
                        !document.documentElement.contains(el) && ((_a = SimpleBar.instances.get(el)) === null || _a === void 0 ? void 0 : _a.unMount());
                    }));
                }));
            }));
        };
        SimpleBar.instances = new WeakMap;
        return SimpleBar;
    }(SimpleBarCore);
    if (dist_canUseDOM) SimpleBar.initHtmlApi();
    if (document.querySelectorAll("[data-simplebar]").length) document.querySelectorAll("[data-simplebar]").forEach((scrollBlock => {
        new SimpleBar(scrollBlock, {
            autoHide: false
        });
    }));
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    if (item.dataset.watch === "navigator" && !item.dataset.watchThreshold) {
                        let valueOfThreshold;
                        if (item.clientHeight > 2) {
                            valueOfThreshold = window.innerHeight / 2 / (item.clientHeight - 1);
                            if (valueOfThreshold > 1) valueOfThreshold = 1;
                        } else valueOfThreshold = 1;
                        item.setAttribute("data-watch-threshold", valueOfThreshold.toFixed(2));
                    }
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if (paramsWatch.threshold === "prx") {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            console.log(configWatcher);
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            if (entry.isIntersecting) this.scrollWatcherOff(targetElement, observer);
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    document.addEventListener("DOMContentLoaded", (() => {
        modules_flsModules.watcher = new ScrollWatcher({});
    }));
    let addWindowScrollEvent = false;
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        document.addEventListener("watcherCallback", pageNavigationAction);
        function pageNavigationAction(e) {
            if (e.type === "click") {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    if (modules_flsModules.fullpage) {
                        const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                        const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                        if (fullpageSectionId !== null) {
                            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                        }
                    } else gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            } else if (e.type === "watcherCallback" && e.detail) {
                const entry = e.detail.entry;
                const targetElement = entry.target;
                if (targetElement.dataset.watch === "navigator") {
                    document.querySelector(`[data-goto]._navigator-active`);
                    let navigatorCurrentItem;
                    if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                        const element = targetElement.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                    if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                }
            }
        }
        if (getHash()) {
            let goToHash;
            if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
            goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
        }
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                const parentSelectorMatch = dataArray[0].trim().match(/^\{(.+)\}(?:\s*(.+)?)$/);
                if (parentSelectorMatch) {
                    const parentSelector = parentSelectorMatch[1].trim();
                    const childSelector = parentSelectorMatch[2] ? parentSelectorMatch[2].trim() : null;
                    const parentElement = node.closest(parentSelector);
                    if (parentElement) оbject.destination = childSelector ? parentElement.querySelector(childSelector) : parentElement;
                } else оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767.98";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            if (!destination) return;
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    var HOOKS = [ "onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition" ];
    var defaults = {
        _disable: [],
        allowInput: false,
        allowInvalidPreload: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        autoFillDefaultTime: true,
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enableSeconds: false,
        enableTime: false,
        errorHandler: function(err) {
            return typeof console !== "undefined" && console.warn(err);
        },
        getWeek: function(givenDate) {
            var date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            var week1 = new Date(date.getFullYear(), 0, 4);
            return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        monthSelectorType: "dropdown",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date,
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: void 0,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false
    };
    var english = {
        weekdays: {
            shorthand: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            longhand: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
        },
        months: {
            shorthand: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            longhand: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
        },
        daysInMonth: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
        firstDayOfWeek: 0,
        ordinal: function(nth) {
            var s = nth % 100;
            if (s > 3 && s < 21) return "th";
            switch (s % 10) {
              case 1:
                return "st";

              case 2:
                return "nd";

              case 3:
                return "rd";

              default:
                return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: [ "AM", "PM" ],
        yearAriaLabel: "Year",
        monthAriaLabel: "Month",
        hourAriaLabel: "Hour",
        minuteAriaLabel: "Minute",
        time_24hr: false
    };
    const l10n_default = english;
    var utils_pad = function(number, length) {
        if (length === void 0) length = 2;
        return ("000" + number).slice(length * -1);
    };
    var utils_int = function(bool) {
        return bool === true ? 1 : 0;
    };
    function utils_debounce(fn, wait) {
        var t;
        return function() {
            var _this = this;
            var args = arguments;
            clearTimeout(t);
            t = setTimeout((function() {
                return fn.apply(_this, args);
            }), wait);
        };
    }
    var arrayify = function(obj) {
        return obj instanceof Array ? obj : [ obj ];
    };
    function dom_toggleClass(elem, className, bool) {
        if (bool === true) return elem.classList.add(className);
        elem.classList.remove(className);
    }
    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== void 0) e.textContent = content;
        return e;
    }
    function clearNode(node) {
        while (node.firstChild) node.removeChild(node.firstChild);
    }
    function findParent(node, condition) {
        if (condition(node)) return node; else if (node.parentNode) return findParent(node.parentNode, condition);
        return;
    }
    function createNumberInput(inputClassName, opts) {
        var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
        if (navigator.userAgent.indexOf("MSIE 9.0") === -1) numInput.type = "number"; else {
            numInput.type = "text";
            numInput.pattern = "\\d*";
        }
        if (opts !== void 0) for (var key in opts) numInput.setAttribute(key, opts[key]);
        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);
        return wrapper;
    }
    function getEventTarget(event) {
        try {
            if (typeof event.composedPath === "function") {
                var path = event.composedPath();
                return path[0];
            }
            return event.target;
        } catch (error) {
            return event.target;
        }
    }
    var doNothing = function() {
        return;
    };
    var monthToStr = function(monthNumber, shorthand, locale) {
        return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
    };
    var revFormat = {
        D: doNothing,
        F: function(dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: function(dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        H: function(dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function(dateObj, amPM, locale) {
            dateObj.setHours(dateObj.getHours() % 12 + 12 * utils_int(new RegExp(locale.amPM[1], "i").test(amPM)));
        },
        M: function(dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: function(dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: function(_, unixSeconds) {
            return new Date(parseFloat(unixSeconds) * 1e3);
        },
        W: function(dateObj, weekNum, locale) {
            var weekNumber = parseInt(weekNum);
            var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
            date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
            return date;
        },
        Y: function(dateObj, year) {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: function(_, ISODate) {
            return new Date(ISODate);
        },
        d: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function(dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        i: function(dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function(dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: doNothing,
        m: function(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function(dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function(dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: function(_, unixMillSeconds) {
            return new Date(parseFloat(unixMillSeconds));
        },
        w: doNothing,
        y: function(dateObj, year) {
            dateObj.setFullYear(2e3 + parseFloat(year));
        }
    };
    var tokenRegex = {
        D: "",
        F: "",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})"
    };
    var formats = {
        Z: function(date) {
            return date.toISOString();
        },
        D: function(date, locale, options) {
            return locale.weekdays.shorthand[formats.w(date, locale, options)];
        },
        F: function(date, locale, options) {
            return monthToStr(formats.n(date, locale, options) - 1, false, locale);
        },
        G: function(date, locale, options) {
            return utils_pad(formats.h(date, locale, options));
        },
        H: function(date) {
            return utils_pad(date.getHours());
        },
        J: function(date, locale) {
            return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
        },
        K: function(date, locale) {
            return locale.amPM[utils_int(date.getHours() > 11)];
        },
        M: function(date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        S: function(date) {
            return utils_pad(date.getSeconds());
        },
        U: function(date) {
            return date.getTime() / 1e3;
        },
        W: function(date, _, options) {
            return options.getWeek(date);
        },
        Y: function(date) {
            return utils_pad(date.getFullYear(), 4);
        },
        d: function(date) {
            return utils_pad(date.getDate());
        },
        h: function(date) {
            return date.getHours() % 12 ? date.getHours() % 12 : 12;
        },
        i: function(date) {
            return utils_pad(date.getMinutes());
        },
        j: function(date) {
            return date.getDate();
        },
        l: function(date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        m: function(date) {
            return utils_pad(date.getMonth() + 1);
        },
        n: function(date) {
            return date.getMonth() + 1;
        },
        s: function(date) {
            return date.getSeconds();
        },
        u: function(date) {
            return date.getTime();
        },
        w: function(date) {
            return date.getDay();
        },
        y: function(date) {
            return String(date.getFullYear()).substring(2);
        }
    };
    var createDateFormatter = function(_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
        return function(dateObj, frmt, overrideLocale) {
            var locale = overrideLocale || l10n;
            if (config.formatDate !== void 0 && !isMobile) return config.formatDate(dateObj, frmt, locale);
            return frmt.split("").map((function(c, i, arr) {
                return formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
            })).join("");
        };
    };
    var createDateParser = function(_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
        return function(date, givenFormat, timeless, customLocale) {
            if (date !== 0 && !date) return;
            var locale = customLocale || l10n;
            var parsedDate;
            var dateOrig = date;
            if (date instanceof Date) parsedDate = new Date(date.getTime()); else if (typeof date !== "string" && date.toFixed !== void 0) parsedDate = new Date(date); else if (typeof date === "string") {
                var format = givenFormat || (config || defaults).dateFormat;
                var datestr = String(date).trim();
                if (datestr === "today") {
                    parsedDate = new Date;
                    timeless = true;
                } else if (config && config.parseDate) parsedDate = config.parseDate(date, format); else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) parsedDate = new Date(date); else {
                    var matched = void 0, ops = [];
                    for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                        var token = format[i];
                        var isBackSlash = token === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;
                        if (tokenRegex[token] && !escaped) {
                            regexStr += tokenRegex[token];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex]
                            });
                        } else if (!isBackSlash) regexStr += ".";
                    }
                    parsedDate = !config || !config.noCalendar ? new Date((new Date).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((new Date).setHours(0, 0, 0, 0));
                    ops.forEach((function(_a) {
                        var fn = _a.fn, val = _a.val;
                        return parsedDate = fn(parsedDate, val, locale) || parsedDate;
                    }));
                    parsedDate = matched ? parsedDate : void 0;
                }
            }
            if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                return;
            }
            if (timeless === true) parsedDate.setHours(0, 0, 0, 0);
            return parsedDate;
        };
    };
    function compareDates(date1, date2, timeless) {
        if (timeless === void 0) timeless = true;
        if (timeless !== false) return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
        return date1.getTime() - date2.getTime();
    }
    var isBetween = function(ts, ts1, ts2) {
        return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    var calculateSecondsSinceMidnight = function(hours, minutes, seconds) {
        return hours * 3600 + minutes * 60 + seconds;
    };
    var parseSeconds = function(secondsSinceMidnight) {
        var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
        return [ hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60 ];
    };
    var duration = {
        DAY: 864e5
    };
    function getDefaultHours(config) {
        var hours = config.defaultHour;
        var minutes = config.defaultMinute;
        var seconds = config.defaultSeconds;
        if (config.minDate !== void 0) {
            var minHour = config.minDate.getHours();
            var minMinutes = config.minDate.getMinutes();
            var minSeconds = config.minDate.getSeconds();
            if (hours < minHour) hours = minHour;
            if (hours === minHour && minutes < minMinutes) minutes = minMinutes;
            if (hours === minHour && minutes === minMinutes && seconds < minSeconds) seconds = config.minDate.getSeconds();
        }
        if (config.maxDate !== void 0) {
            var maxHr = config.maxDate.getHours();
            var maxMinutes = config.maxDate.getMinutes();
            hours = Math.min(hours, maxHr);
            if (hours === maxHr) minutes = Math.min(maxMinutes, minutes);
            if (hours === maxHr && minutes === maxMinutes) seconds = config.maxDate.getSeconds();
        }
        return {
            hours,
            minutes,
            seconds
        };
    }
    __webpack_require__(990);
    var esm_assign = void 0 && (void 0).__assign || function() {
        esm_assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return esm_assign.apply(this, arguments);
    };
    var __spreadArrays = void 0 && (void 0).__spreadArrays || function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        var r = Array(s), k = 0;
        for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
        k++) r[k] = a[j];
        return r;
    };
    var DEBOUNCED_CHANGE_MS = 300;
    function FlatpickrInstance(element, instanceConfig) {
        var self = {
            config: esm_assign(esm_assign({}, defaults), flatpickr.defaultConfig),
            l10n: l10n_default
        };
        self.parseDate = createDateParser({
            config: self.config,
            l10n: self.l10n
        });
        self._handlers = [];
        self.pluginElements = [];
        self.loadedPlugins = [];
        self._bind = bind;
        self._setHoursFromDate = setHoursFromDate;
        self._positionCalendar = positionCalendar;
        self.changeMonth = changeMonth;
        self.changeYear = changeYear;
        self.clear = clear;
        self.close = close;
        self.onMouseOver = onMouseOver;
        self._createElement = createElement;
        self.createDay = createDay;
        self.destroy = destroy;
        self.isEnabled = isEnabled;
        self.jumpToDate = jumpToDate;
        self.updateValue = updateValue;
        self.open = open;
        self.redraw = redraw;
        self.set = set;
        self.setDate = setDate;
        self.toggle = toggle;
        function setupHelperFunctions() {
            self.utils = {
                getDaysInMonth: function(month, yr) {
                    if (month === void 0) month = self.currentMonth;
                    if (yr === void 0) yr = self.currentYear;
                    if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;
                    return self.l10n.daysInMonth[month];
                }
            };
        }
        function init() {
            self.element = self.input = element;
            self.isOpen = false;
            parseConfig();
            setupLocale();
            setupInputs();
            setupDates();
            setupHelperFunctions();
            if (!self.isMobile) build();
            bindEvents();
            if (self.selectedDates.length || self.config.noCalendar) {
                if (self.config.enableTime) setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : void 0);
                updateValue(false);
            }
            setCalendarWidth();
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (!self.isMobile && isSafari) positionCalendar();
            triggerEvent("onReady");
        }
        function getClosestActiveElement() {
            var _a;
            return ((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
        }
        function bindToInstance(fn) {
            return fn.bind(self);
        }
        function setCalendarWidth() {
            var config = self.config;
            if (config.weekNumbers === false && config.showMonths === 1) return; else if (config.noCalendar !== true) window.requestAnimationFrame((function() {
                if (self.calendarContainer !== void 0) {
                    self.calendarContainer.style.visibility = "hidden";
                    self.calendarContainer.style.display = "block";
                }
                if (self.daysContainer !== void 0) {
                    var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                    self.daysContainer.style.width = daysWidth + "px";
                    self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== void 0 ? self.weekWrapper.offsetWidth : 0) + "px";
                    self.calendarContainer.style.removeProperty("visibility");
                    self.calendarContainer.style.removeProperty("display");
                }
            }));
        }
        function updateTime(e) {
            if (self.selectedDates.length === 0) {
                var defaultDate = self.config.minDate === void 0 || compareDates(new Date, self.config.minDate) >= 0 ? new Date : new Date(self.config.minDate.getTime());
                var defaults = getDefaultHours(self.config);
                defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
                self.selectedDates = [ defaultDate ];
                self.latestSelectedDateObj = defaultDate;
            }
            if (e !== void 0 && e.type !== "blur") timeWrapper(e);
            var prevValue = self._input.value;
            setHoursFromInputs();
            updateValue();
            if (self._input.value !== prevValue) self._debouncedChange();
        }
        function ampm2military(hour, amPM) {
            return hour % 12 + 12 * utils_int(amPM === self.l10n.amPM[1]);
        }
        function military2ampm(hour) {
            switch (hour % 24) {
              case 0:
              case 12:
                return 12;

              default:
                return hour % 12;
            }
        }
        function setHoursFromInputs() {
            if (self.hourElement === void 0 || self.minuteElement === void 0) return;
            var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== void 0 ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
            if (self.amPM !== void 0) hours = ampm2military(hours, self.amPM.textContent);
            var limitMinHours = self.config.minTime !== void 0 || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
            var limitMaxHours = self.config.maxTime !== void 0 || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
            if (self.config.maxTime !== void 0 && self.config.minTime !== void 0 && self.config.minTime > self.config.maxTime) {
                var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
                var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
                var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
                if (currentTime > maxBound && currentTime < minBound) {
                    var result = parseSeconds(minBound);
                    hours = result[0];
                    minutes = result[1];
                    seconds = result[2];
                }
            } else {
                if (limitMaxHours) {
                    var maxTime = self.config.maxTime !== void 0 ? self.config.maxTime : self.config.maxDate;
                    hours = Math.min(hours, maxTime.getHours());
                    if (hours === maxTime.getHours()) minutes = Math.min(minutes, maxTime.getMinutes());
                    if (minutes === maxTime.getMinutes()) seconds = Math.min(seconds, maxTime.getSeconds());
                }
                if (limitMinHours) {
                    var minTime = self.config.minTime !== void 0 ? self.config.minTime : self.config.minDate;
                    hours = Math.max(hours, minTime.getHours());
                    if (hours === minTime.getHours() && minutes < minTime.getMinutes()) minutes = minTime.getMinutes();
                    if (minutes === minTime.getMinutes()) seconds = Math.max(seconds, minTime.getSeconds());
                }
            }
            setHours(hours, minutes, seconds);
        }
        function setHoursFromDate(dateObj) {
            var date = dateObj || self.latestSelectedDateObj;
            if (date && date instanceof Date) setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
        function setHours(hours, minutes, seconds) {
            if (self.latestSelectedDateObj !== void 0) self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            if (!self.hourElement || !self.minuteElement || self.isMobile) return;
            self.hourElement.value = utils_pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * utils_int(hours % 12 === 0) : hours);
            self.minuteElement.value = utils_pad(minutes);
            if (self.amPM !== void 0) self.amPM.textContent = self.l10n.amPM[utils_int(hours >= 12)];
            if (self.secondElement !== void 0) self.secondElement.value = utils_pad(seconds);
        }
        function onYearInput(event) {
            var eventTarget = getEventTarget(event);
            var year = parseInt(eventTarget.value) + (event.delta || 0);
            if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) changeYear(year);
        }
        function bind(element, event, handler, options) {
            if (event instanceof Array) return event.forEach((function(ev) {
                return bind(element, ev, handler, options);
            }));
            if (element instanceof Array) return element.forEach((function(el) {
                return bind(el, event, handler, options);
            }));
            element.addEventListener(event, handler, options);
            self._handlers.push({
                remove: function() {
                    return element.removeEventListener(event, handler, options);
                }
            });
        }
        function triggerChange() {
            triggerEvent("onChange");
        }
        function bindEvents() {
            if (self.config.wrap) [ "open", "close", "toggle", "clear" ].forEach((function(evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), (function(el) {
                    return bind(el, "click", self[evt]);
                }));
            }));
            if (self.isMobile) {
                setupMobile();
                return;
            }
            var debouncedResize = utils_debounce(onResize, 50);
            self._debouncedChange = utils_debounce(triggerChange, DEBOUNCED_CHANGE_MS);
            if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) bind(self.daysContainer, "mouseover", (function(e) {
                if (self.config.mode === "range") onMouseOver(getEventTarget(e));
            }));
            bind(self._input, "keydown", onKeyDown);
            if (self.calendarContainer !== void 0) bind(self.calendarContainer, "keydown", onKeyDown);
            if (!self.config.inline && !self.config.static) bind(window, "resize", debouncedResize);
            if (window.ontouchstart !== void 0) bind(window.document, "touchstart", documentClick); else bind(window.document, "mousedown", documentClick);
            bind(window.document, "focus", documentClick, {
                capture: true
            });
            if (self.config.clickOpens === true) {
                bind(self._input, "focus", self.open);
                bind(self._input, "click", self.open);
            }
            if (self.daysContainer !== void 0) {
                bind(self.monthNav, "click", onMonthNavClick);
                bind(self.monthNav, [ "keyup", "increment" ], onYearInput);
                bind(self.daysContainer, "click", selectDate);
            }
            if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0) {
                var selText = function(e) {
                    return getEventTarget(e).select();
                };
                bind(self.timeContainer, [ "increment" ], updateTime);
                bind(self.timeContainer, "blur", updateTime, {
                    capture: true
                });
                bind(self.timeContainer, "click", timeIncrement);
                bind([ self.hourElement, self.minuteElement ], [ "focus", "click" ], selText);
                if (self.secondElement !== void 0) bind(self.secondElement, "focus", (function() {
                    return self.secondElement && self.secondElement.select();
                }));
                if (self.amPM !== void 0) bind(self.amPM, "click", (function(e) {
                    updateTime(e);
                }));
            }
            if (self.config.allowInput) bind(self._input, "blur", onBlur);
        }
        function jumpToDate(jumpDate, triggerChange) {
            var jumpTo = jumpDate !== void 0 ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
            var oldYear = self.currentYear;
            var oldMonth = self.currentMonth;
            try {
                if (jumpTo !== void 0) {
                    self.currentYear = jumpTo.getFullYear();
                    self.currentMonth = jumpTo.getMonth();
                }
            } catch (e) {
                e.message = "Invalid date supplied: " + jumpTo;
                self.config.errorHandler(e);
            }
            if (triggerChange && self.currentYear !== oldYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            if (triggerChange && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) triggerEvent("onMonthChange");
            self.redraw();
        }
        function timeIncrement(e) {
            var eventTarget = getEventTarget(e);
            if (~eventTarget.className.indexOf("arrow")) incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
        }
        function incrementNumInput(e, delta, inputElem) {
            var target = e && getEventTarget(e);
            var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }
        function build() {
            var fragment = window.document.createDocumentFragment();
            self.calendarContainer = createElement("div", "flatpickr-calendar");
            self.calendarContainer.tabIndex = -1;
            if (!self.config.noCalendar) {
                fragment.appendChild(buildMonthNav());
                self.innerContainer = createElement("div", "flatpickr-innerContainer");
                if (self.config.weekNumbers) {
                    var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                    self.innerContainer.appendChild(weekWrapper);
                    self.weekNumbers = weekNumbers;
                    self.weekWrapper = weekWrapper;
                }
                self.rContainer = createElement("div", "flatpickr-rContainer");
                self.rContainer.appendChild(buildWeekdays());
                if (!self.daysContainer) {
                    self.daysContainer = createElement("div", "flatpickr-days");
                    self.daysContainer.tabIndex = -1;
                }
                buildDays();
                self.rContainer.appendChild(self.daysContainer);
                self.innerContainer.appendChild(self.rContainer);
                fragment.appendChild(self.innerContainer);
            }
            if (self.config.enableTime) fragment.appendChild(buildTime());
            dom_toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
            dom_toggleClass(self.calendarContainer, "animate", self.config.animate === true);
            dom_toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
            self.calendarContainer.appendChild(fragment);
            var customAppend = self.config.appendTo !== void 0 && self.config.appendTo.nodeType !== void 0;
            if (self.config.inline || self.config.static) {
                self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                if (self.config.inline) if (!customAppend && self.element.parentNode) self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling); else if (self.config.appendTo !== void 0) self.config.appendTo.appendChild(self.calendarContainer);
                if (self.config.static) {
                    var wrapper = createElement("div", "flatpickr-wrapper");
                    if (self.element.parentNode) self.element.parentNode.insertBefore(wrapper, self.element);
                    wrapper.appendChild(self.element);
                    if (self.altInput) wrapper.appendChild(self.altInput);
                    wrapper.appendChild(self.calendarContainer);
                }
            }
            if (!self.config.static && !self.config.inline) (self.config.appendTo !== void 0 ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
        }
        function createDay(className, date, _dayNumber, i) {
            var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
            dayElement.dateObj = date;
            dayElement.$i = i;
            dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
            if (className.indexOf("hidden") === -1 && compareDates(date, self.now) === 0) {
                self.todayDateElem = dayElement;
                dayElement.classList.add("today");
                dayElement.setAttribute("aria-current", "date");
            }
            if (dateIsEnabled) {
                dayElement.tabIndex = -1;
                if (isDateSelected(date)) {
                    dayElement.classList.add("selected");
                    self.selectedDateElem = dayElement;
                    if (self.config.mode === "range") {
                        dom_toggleClass(dayElement, "startRange", self.selectedDates[0] && compareDates(date, self.selectedDates[0], true) === 0);
                        dom_toggleClass(dayElement, "endRange", self.selectedDates[1] && compareDates(date, self.selectedDates[1], true) === 0);
                        if (className === "nextMonthDay") dayElement.classList.add("inRange");
                    }
                }
            } else dayElement.classList.add("flatpickr-disabled");
            if (self.config.mode === "range") if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");
            if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && i % 7 === 6) self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
            triggerEvent("onDayCreate", dayElement);
            return dayElement;
        }
        function focusOnDayElem(targetNode) {
            targetNode.focus();
            if (self.config.mode === "range") onMouseOver(targetNode);
        }
        function getFirstAvailableDay(delta) {
            var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            for (var m = startMonth; m != endMonth; m += delta) {
                var month = self.daysContainer.children[m];
                var startIndex = delta > 0 ? 0 : month.children.length - 1;
                var endIndex = delta > 0 ? month.children.length : -1;
                for (var i = startIndex; i != endIndex; i += delta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj)) return c;
                }
            }
            return;
        }
        function getNextAvailableDay(current, delta) {
            var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            var loopDelta = delta > 0 ? 1 : -1;
            for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                var month = self.daysContainer.children[m];
                var startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
                var numMonthDays = month.children.length;
                for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta)) return focusOnDayElem(c);
                }
            }
            self.changeMonth(loopDelta);
            focusOnDay(getFirstAvailableDay(loopDelta), 0);
            return;
        }
        function focusOnDay(current, offset) {
            var activeElement = getClosestActiveElement();
            var dayFocused = isInView(activeElement || document.body);
            var startElem = current !== void 0 ? current : dayFocused ? activeElement : self.selectedDateElem !== void 0 && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== void 0 && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
            if (startElem === void 0) self._input.focus(); else if (!dayFocused) focusOnDayElem(startElem); else getNextAvailableDay(startElem, offset);
        }
        function buildMonthDays(year, month) {
            var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
            var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
            var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
            var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
            for (;dayNumber <= prevMonthDays; dayNumber++, dayIndex++) days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
            for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
            for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, 
            dayIndex++) days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
            var dayContainer = createElement("div", "dayContainer");
            dayContainer.appendChild(days);
            return dayContainer;
        }
        function buildDays() {
            if (self.daysContainer === void 0) return;
            clearNode(self.daysContainer);
            if (self.weekNumbers) clearNode(self.weekNumbers);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < self.config.showMonths; i++) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
            }
            self.daysContainer.appendChild(frag);
            self.days = self.daysContainer.firstChild;
            if (self.config.mode === "range" && self.selectedDates.length === 1) onMouseOver();
        }
        function buildMonthSwitch() {
            if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown") return;
            var shouldBuildMonth = function(month) {
                if (self.config.minDate !== void 0 && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) return false;
                return !(self.config.maxDate !== void 0 && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
            };
            self.monthsDropdownContainer.tabIndex = -1;
            self.monthsDropdownContainer.innerHTML = "";
            for (var i = 0; i < 12; i++) {
                if (!shouldBuildMonth(i)) continue;
                var month = createElement("option", "flatpickr-monthDropdown-month");
                month.value = new Date(self.currentYear, i).getMonth().toString();
                month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                month.tabIndex = -1;
                if (self.currentMonth === i) month.selected = true;
                self.monthsDropdownContainer.appendChild(month);
            }
        }
        function buildMonth() {
            var container = createElement("div", "flatpickr-month");
            var monthNavFragment = window.document.createDocumentFragment();
            var monthElement;
            if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") monthElement = createElement("span", "cur-month"); else {
                self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
                bind(self.monthsDropdownContainer, "change", (function(e) {
                    var target = getEventTarget(e);
                    var selectedMonth = parseInt(target.value, 10);
                    self.changeMonth(selectedMonth - self.currentMonth);
                    triggerEvent("onMonthChange");
                }));
                buildMonthSwitch();
                monthElement = self.monthsDropdownContainer;
            }
            var yearInput = createNumberInput("cur-year", {
                tabindex: "-1"
            });
            var yearElement = yearInput.getElementsByTagName("input")[0];
            yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
            if (self.config.minDate) yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
            if (self.config.maxDate) {
                yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
            }
            var currentMonth = createElement("div", "flatpickr-current-month");
            currentMonth.appendChild(monthElement);
            currentMonth.appendChild(yearInput);
            monthNavFragment.appendChild(currentMonth);
            container.appendChild(monthNavFragment);
            return {
                container,
                yearElement,
                monthElement
            };
        }
        function buildMonths() {
            clearNode(self.monthNav);
            self.monthNav.appendChild(self.prevMonthNav);
            if (self.config.showMonths) {
                self.yearElements = [];
                self.monthElements = [];
            }
            for (var m = self.config.showMonths; m--; ) {
                var month = buildMonth();
                self.yearElements.push(month.yearElement);
                self.monthElements.push(month.monthElement);
                self.monthNav.appendChild(month.container);
            }
            self.monthNav.appendChild(self.nextMonthNav);
        }
        function buildMonthNav() {
            self.monthNav = createElement("div", "flatpickr-months");
            self.yearElements = [];
            self.monthElements = [];
            self.prevMonthNav = createElement("span", "flatpickr-prev-month");
            self.prevMonthNav.innerHTML = self.config.prevArrow;
            self.nextMonthNav = createElement("span", "flatpickr-next-month");
            self.nextMonthNav.innerHTML = self.config.nextArrow;
            buildMonths();
            Object.defineProperty(self, "_hidePrevMonthArrow", {
                get: function() {
                    return self.__hidePrevMonthArrow;
                },
                set: function(bool) {
                    if (self.__hidePrevMonthArrow !== bool) {
                        dom_toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                        self.__hidePrevMonthArrow = bool;
                    }
                }
            });
            Object.defineProperty(self, "_hideNextMonthArrow", {
                get: function() {
                    return self.__hideNextMonthArrow;
                },
                set: function(bool) {
                    if (self.__hideNextMonthArrow !== bool) {
                        dom_toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                        self.__hideNextMonthArrow = bool;
                    }
                }
            });
            self.currentYearElement = self.yearElements[0];
            updateNavigationCurrentMonth();
            return self.monthNav;
        }
        function buildTime() {
            self.calendarContainer.classList.add("hasTime");
            if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
            var defaults = getDefaultHours(self.config);
            self.timeContainer = createElement("div", "flatpickr-time");
            self.timeContainer.tabIndex = -1;
            var separator = createElement("span", "flatpickr-time-separator", ":");
            var hourInput = createNumberInput("flatpickr-hour", {
                "aria-label": self.l10n.hourAriaLabel
            });
            self.hourElement = hourInput.getElementsByTagName("input")[0];
            var minuteInput = createNumberInput("flatpickr-minute", {
                "aria-label": self.l10n.minuteAriaLabel
            });
            self.minuteElement = minuteInput.getElementsByTagName("input")[0];
            self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
            self.hourElement.value = utils_pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults.hours : military2ampm(defaults.hours));
            self.minuteElement.value = utils_pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults.minutes);
            self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
            self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
            self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
            self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
            self.hourElement.setAttribute("maxlength", "2");
            self.minuteElement.setAttribute("min", "0");
            self.minuteElement.setAttribute("max", "59");
            self.minuteElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild(hourInput);
            self.timeContainer.appendChild(separator);
            self.timeContainer.appendChild(minuteInput);
            if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");
            if (self.config.enableSeconds) {
                self.timeContainer.classList.add("hasSeconds");
                var secondInput = createNumberInput("flatpickr-second");
                self.secondElement = secondInput.getElementsByTagName("input")[0];
                self.secondElement.value = utils_pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults.seconds);
                self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                self.secondElement.setAttribute("min", "0");
                self.secondElement.setAttribute("max", "59");
                self.secondElement.setAttribute("maxlength", "2");
                self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                self.timeContainer.appendChild(secondInput);
            }
            if (!self.config.time_24hr) {
                self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[utils_int((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
                self.amPM.title = self.l10n.toggleTitle;
                self.amPM.tabIndex = -1;
                self.timeContainer.appendChild(self.amPM);
            }
            return self.timeContainer;
        }
        function buildWeekdays() {
            if (!self.weekdayContainer) self.weekdayContainer = createElement("div", "flatpickr-weekdays"); else clearNode(self.weekdayContainer);
            for (var i = self.config.showMonths; i--; ) {
                var container = createElement("div", "flatpickr-weekdaycontainer");
                self.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self.weekdayContainer;
        }
        function updateWeekdays() {
            if (!self.weekdayContainer) return;
            var firstDayOfWeek = self.l10n.firstDayOfWeek;
            var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
            if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
            for (var i = self.config.showMonths; i--; ) self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
        }
        function buildWeeks() {
            self.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = createElement("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
            var weekNumbers = createElement("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper,
                weekNumbers
            };
        }
        function changeMonth(value, isOffset) {
            if (isOffset === void 0) isOffset = true;
            var delta = isOffset ? value : value - self.currentMonth;
            if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true) return;
            self.currentMonth += delta;
            if (self.currentMonth < 0 || self.currentMonth > 11) {
                self.currentYear += self.currentMonth > 11 ? 1 : -1;
                self.currentMonth = (self.currentMonth + 12) % 12;
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            buildDays();
            triggerEvent("onMonthChange");
            updateNavigationCurrentMonth();
        }
        function clear(triggerChangeEvent, toInitial) {
            if (triggerChangeEvent === void 0) triggerChangeEvent = true;
            if (toInitial === void 0) toInitial = true;
            self.input.value = "";
            if (self.altInput !== void 0) self.altInput.value = "";
            if (self.mobileInput !== void 0) self.mobileInput.value = "";
            self.selectedDates = [];
            self.latestSelectedDateObj = void 0;
            if (toInitial === true) {
                self.currentYear = self._initialDate.getFullYear();
                self.currentMonth = self._initialDate.getMonth();
            }
            if (self.config.enableTime === true) {
                var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                setHours(hours, minutes, seconds);
            }
            self.redraw();
            if (triggerChangeEvent) triggerEvent("onChange");
        }
        function close() {
            self.isOpen = false;
            if (!self.isMobile) {
                if (self.calendarContainer !== void 0) self.calendarContainer.classList.remove("open");
                if (self._input !== void 0) self._input.classList.remove("active");
            }
            triggerEvent("onClose");
        }
        function destroy() {
            if (self.config !== void 0) triggerEvent("onDestroy");
            for (var i = self._handlers.length; i--; ) self._handlers[i].remove();
            self._handlers = [];
            if (self.mobileInput) {
                if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
                self.mobileInput = void 0;
            } else if (self.calendarContainer && self.calendarContainer.parentNode) if (self.config.static && self.calendarContainer.parentNode) {
                var wrapper = self.calendarContainer.parentNode;
                wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                if (wrapper.parentNode) {
                    while (wrapper.firstChild) wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            } else self.calendarContainer.parentNode.removeChild(self.calendarContainer);
            if (self.altInput) {
                self.input.type = "text";
                if (self.altInput.parentNode) self.altInput.parentNode.removeChild(self.altInput);
                delete self.altInput;
            }
            if (self.input) {
                self.input.type = self.input._type;
                self.input.classList.remove("flatpickr-input");
                self.input.removeAttribute("readonly");
            }
            [ "_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config" ].forEach((function(k) {
                try {
                    delete self[k];
                } catch (_) {}
            }));
        }
        function isCalendarElem(elem) {
            return self.calendarContainer.contains(elem);
        }
        function documentClick(e) {
            if (self.isOpen && !self.config.inline) {
                var eventTarget_1 = getEventTarget(e);
                var isCalendarElement = isCalendarElem(eventTarget_1);
                var isInput = eventTarget_1 === self.input || eventTarget_1 === self.altInput || self.element.contains(eventTarget_1) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
                var lostFocus = !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
                var isIgnored = !self.config.ignoredFocusElements.some((function(elem) {
                    return elem.contains(eventTarget_1);
                }));
                if (lostFocus && isIgnored) {
                    if (self.config.allowInput) self.setDate(self._input.value, false, self.config.altInput ? self.config.altFormat : self.config.dateFormat);
                    if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0 && self.input.value !== "" && self.input.value !== void 0) updateTime();
                    self.close();
                    if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) self.clear(false);
                }
            }
        }
        function changeYear(newYear) {
            if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear()) return;
            var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
            self.currentYear = newYearNum || self.currentYear;
            if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth); else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
            if (isNewYear) {
                self.redraw();
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
        }
        function isEnabled(date, timeless) {
            var _a;
            if (timeless === void 0) timeless = true;
            var dateToCheck = self.parseDate(date, void 0, timeless);
            if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== void 0 ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== void 0 ? timeless : !self.maxDateHasTime) > 0) return false;
            if (!self.config.enable && self.config.disable.length === 0) return true;
            if (dateToCheck === void 0) return false;
            var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
            for (var i = 0, d = void 0; i < array.length; i++) {
                d = array[i];
                if (typeof d === "function" && d(dateToCheck)) return bool; else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime()) return bool; else if (typeof d === "string") {
                    var parsed = self.parseDate(d, void 0, true);
                    return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
                } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime()) return bool;
            }
            return !bool;
        }
        function isInView(elem) {
            if (self.daysContainer !== void 0) return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
            return false;
        }
        function onBlur(e) {
            var isInput = e.target === self._input;
            var valueChanged = self._input.value.trimEnd() !== getDateStr();
            if (isInput && valueChanged && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
        }
        function onKeyDown(e) {
            var eventTarget = getEventTarget(e);
            var isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
            var allowInput = self.config.allowInput;
            var allowKeydown = self.isOpen && (!allowInput || !isInput);
            var allowInlineKeydown = self.config.inline && isInput && !allowInput;
            if (e.keyCode === 13 && isInput) if (allowInput) {
                self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
                self.close();
                return eventTarget.blur();
            } else self.open(); else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
                var isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
                switch (e.keyCode) {
                  case 13:
                    if (isTimeObj) {
                        e.preventDefault();
                        updateTime();
                        focusAndClose();
                    } else selectDate(e);
                    break;

                  case 27:
                    e.preventDefault();
                    focusAndClose();
                    break;

                  case 8:
                  case 46:
                    if (isInput && !self.config.allowInput) {
                        e.preventDefault();
                        self.clear();
                    }
                    break;

                  case 37:
                  case 39:
                    if (!isTimeObj && !isInput) {
                        e.preventDefault();
                        var activeElement = getClosestActiveElement();
                        if (self.daysContainer !== void 0 && (allowInput === false || activeElement && isInView(activeElement))) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey) focusOnDay(void 0, delta_1); else {
                                e.stopPropagation();
                                changeMonth(delta_1);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                        }
                    } else if (self.hourElement) self.hourElement.focus();
                    break;

                  case 38:
                  case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if (self.daysContainer && eventTarget.$i !== void 0 || eventTarget === self.input || eventTarget === self.altInput) {
                        if (e.ctrlKey) {
                            e.stopPropagation();
                            changeYear(self.currentYear - delta);
                            focusOnDay(getFirstAvailableDay(1), 0);
                        } else if (!isTimeObj) focusOnDay(void 0, delta * 7);
                    } else if (eventTarget === self.currentYearElement) changeYear(self.currentYear - delta); else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement) self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;

                  case 9:
                    if (isTimeObj) {
                        var elems = [ self.hourElement, self.minuteElement, self.secondElement, self.amPM ].concat(self.pluginElements).filter((function(x) {
                            return x;
                        }));
                        var i = elems.indexOf(eventTarget);
                        if (i !== -1) {
                            var target = elems[i + (e.shiftKey ? -1 : 1)];
                            e.preventDefault();
                            (target || self._input).focus();
                        }
                    } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
                        e.preventDefault();
                        self._input.focus();
                    }
                    break;

                  default:
                    break;
                }
            }
            if (self.amPM !== void 0 && eventTarget === self.amPM) switch (e.key) {
              case self.l10n.amPM[0].charAt(0):
              case self.l10n.amPM[0].charAt(0).toLowerCase():
                self.amPM.textContent = self.l10n.amPM[0];
                setHoursFromInputs();
                updateValue();
                break;

              case self.l10n.amPM[1].charAt(0):
              case self.l10n.amPM[1].charAt(0).toLowerCase():
                self.amPM.textContent = self.l10n.amPM[1];
                setHoursFromInputs();
                updateValue();
                break;
            }
            if (isInput || isCalendarElem(eventTarget)) triggerEvent("onKeyDown", e);
        }
        function onMouseOver(elem, cellClass) {
            if (cellClass === void 0) cellClass = "flatpickr-day";
            if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains(cellClass) || elem.classList.contains("flatpickr-disabled"))) return;
            var hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
            var containsDisabled = false;
            var minRange = 0, maxRange = 0;
            for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) if (!isEnabled(new Date(t), true)) {
                containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
                if (t < initialDate && (!minRange || t > minRange)) minRange = t; else if (t > initialDate && (!maxRange || t < maxRange)) maxRange = t;
            }
            var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
            hoverableCells.forEach((function(dayElem) {
                var date = dayElem.dateObj;
                var timestamp = date.getTime();
                var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
                if (outOfRange) {
                    dayElem.classList.add("notAllowed");
                    [ "inRange", "startRange", "endRange" ].forEach((function(c) {
                        dayElem.classList.remove(c);
                    }));
                    return;
                } else if (containsDisabled && !outOfRange) return;
                [ "startRange", "inRange", "endRange", "notAllowed" ].forEach((function(c) {
                    dayElem.classList.remove(c);
                }));
                if (elem !== void 0) {
                    elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
                    if (initialDate < hoverDate && timestamp === initialDate) dayElem.classList.add("startRange"); else if (initialDate > hoverDate && timestamp === initialDate) dayElem.classList.add("endRange");
                    if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate)) dayElem.classList.add("inRange");
                }
            }));
        }
        function onResize() {
            if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
        }
        function open(e, positionElement) {
            if (positionElement === void 0) positionElement = self._positionElement;
            if (self.isMobile === true) {
                if (e) {
                    e.preventDefault();
                    var eventTarget = getEventTarget(e);
                    if (eventTarget) eventTarget.blur();
                }
                if (self.mobileInput !== void 0) {
                    self.mobileInput.focus();
                    self.mobileInput.click();
                }
                triggerEvent("onOpen");
                return;
            } else if (self._input.disabled || self.config.inline) return;
            var wasOpen = self.isOpen;
            self.isOpen = true;
            if (!wasOpen) {
                self.calendarContainer.classList.add("open");
                self._input.classList.add("active");
                triggerEvent("onOpen");
                positionCalendar(positionElement);
            }
            if (self.config.enableTime === true && self.config.noCalendar === true) if (self.config.allowInput === false && (e === void 0 || !self.timeContainer.contains(e.relatedTarget))) setTimeout((function() {
                return self.hourElement.select();
            }), 50);
        }
        function minMaxDateSetter(type) {
            return function(date) {
                var dateObj = self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat);
                var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                if (dateObj !== void 0) self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
                if (self.selectedDates) {
                    self.selectedDates = self.selectedDates.filter((function(d) {
                        return isEnabled(d);
                    }));
                    if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
                    updateValue();
                }
                if (self.daysContainer) {
                    redraw();
                    if (dateObj !== void 0) self.currentYearElement[type] = dateObj.getFullYear().toString(); else self.currentYearElement.removeAttribute(type);
                    self.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
                }
            };
        }
        function parseConfig() {
            var boolOpts = [ "wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile" ];
            var userConfig = esm_assign(esm_assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
            var formats = {};
            self.config.parseDate = userConfig.parseDate;
            self.config.formatDate = userConfig.formatDate;
            Object.defineProperty(self.config, "enable", {
                get: function() {
                    return self.config._enable;
                },
                set: function(dates) {
                    self.config._enable = parseDateRules(dates);
                }
            });
            Object.defineProperty(self.config, "disable", {
                get: function() {
                    return self.config._disable;
                },
                set: function(dates) {
                    self.config._disable = parseDateRules(dates);
                }
            });
            var timeMode = userConfig.mode === "time";
            if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                formats.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
            }
            if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
                var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                formats.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + " h:i" + (userConfig.enableSeconds ? ":S" : "") + " K";
            }
            Object.defineProperty(self.config, "minDate", {
                get: function() {
                    return self.config._minDate;
                },
                set: minMaxDateSetter("min")
            });
            Object.defineProperty(self.config, "maxDate", {
                get: function() {
                    return self.config._maxDate;
                },
                set: minMaxDateSetter("max")
            });
            var minMaxTimeSetter = function(type) {
                return function(val) {
                    self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
                };
            };
            Object.defineProperty(self.config, "minTime", {
                get: function() {
                    return self.config._minTime;
                },
                set: minMaxTimeSetter("min")
            });
            Object.defineProperty(self.config, "maxTime", {
                get: function() {
                    return self.config._maxTime;
                },
                set: minMaxTimeSetter("max")
            });
            if (userConfig.mode === "time") {
                self.config.noCalendar = true;
                self.config.enableTime = true;
            }
            Object.assign(self.config, formats, userConfig);
            for (var i = 0; i < boolOpts.length; i++) self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
            HOOKS.filter((function(hook) {
                return self.config[hook] !== void 0;
            })).forEach((function(hook) {
                self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
            }));
            self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            for (i = 0; i < self.config.plugins.length; i++) {
                var pluginConf = self.config.plugins[i](self) || {};
                for (var key in pluginConf) if (HOOKS.indexOf(key) > -1) self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]); else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
            }
            if (!userConfig.altInputClass) self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
            triggerEvent("onParseConfig");
        }
        function getInputElem() {
            return self.config.wrap ? element.querySelector("[data-input]") : element;
        }
        function setupLocale() {
            if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined") self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
            self.l10n = esm_assign(esm_assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : void 0);
            tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
            tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
            tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
            tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
            tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
            var userConfig = esm_assign(esm_assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
            if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) self.config.time_24hr = self.l10n.time_24hr;
            self.formatDate = createDateFormatter(self);
            self.parseDate = createDateParser({
                config: self.config,
                l10n: self.l10n
            });
        }
        function positionCalendar(customPositionElement) {
            if (typeof self.config.position === "function") return void self.config.position(self, customPositionElement);
            if (self.calendarContainer === void 0) return;
            triggerEvent("onPreCalendarPosition");
            var positionElement = customPositionElement || self._positionElement;
            var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function(acc, child) {
                return acc + child.offsetHeight;
            }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
            var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            dom_toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
            dom_toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
            if (self.config.inline) return;
            var left = window.pageXOffset + inputBounds.left;
            var isCenter = false;
            var isRight = false;
            if (configPosHorizontal === "center") {
                left -= (calendarWidth - inputBounds.width) / 2;
                isCenter = true;
            } else if (configPosHorizontal === "right") {
                left -= calendarWidth - inputBounds.width;
                isRight = true;
            }
            dom_toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
            dom_toggleClass(self.calendarContainer, "arrowCenter", isCenter);
            dom_toggleClass(self.calendarContainer, "arrowRight", isRight);
            var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
            var rightMost = left + calendarWidth > window.document.body.offsetWidth;
            var centerMost = right + calendarWidth > window.document.body.offsetWidth;
            dom_toggleClass(self.calendarContainer, "rightMost", rightMost);
            if (self.config.static) return;
            self.calendarContainer.style.top = top + "px";
            if (!rightMost) {
                self.calendarContainer.style.left = left + "px";
                self.calendarContainer.style.right = "auto";
            } else if (!centerMost) {
                self.calendarContainer.style.left = "auto";
                self.calendarContainer.style.right = right + "px";
            } else {
                var doc = getDocumentStyleSheet();
                if (doc === void 0) return;
                var bodyWidth = window.document.body.offsetWidth;
                var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                var centerBefore = ".flatpickr-calendar.centerMost:before";
                var centerAfter = ".flatpickr-calendar.centerMost:after";
                var centerIndex = doc.cssRules.length;
                var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                dom_toggleClass(self.calendarContainer, "rightMost", false);
                dom_toggleClass(self.calendarContainer, "centerMost", true);
                doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                self.calendarContainer.style.left = centerLeft + "px";
                self.calendarContainer.style.right = "auto";
            }
        }
        function getDocumentStyleSheet() {
            var editableSheet = null;
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                if (!sheet.cssRules) continue;
                try {
                    sheet.cssRules;
                } catch (err) {
                    continue;
                }
                editableSheet = sheet;
                break;
            }
            return editableSheet != null ? editableSheet : createStyleSheet();
        }
        function createStyleSheet() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        }
        function redraw() {
            if (self.config.noCalendar || self.isMobile) return;
            buildMonthSwitch();
            updateNavigationCurrentMonth();
            buildDays();
        }
        function focusAndClose() {
            self._input.focus();
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) setTimeout(self.close, 0); else self.close();
        }
        function selectDate(e) {
            e.preventDefault();
            e.stopPropagation();
            var isSelectable = function(day) {
                return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
            };
            var t = findParent(getEventTarget(e), isSelectable);
            if (t === void 0) return;
            var target = t;
            var selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
            var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
            self.selectedDateElem = target;
            if (self.config.mode === "single") self.selectedDates = [ selectedDate ]; else if (self.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex) self.selectedDates.splice(parseInt(selectedIndex), 1); else self.selectedDates.push(selectedDate);
            } else if (self.config.mode === "range") {
                if (self.selectedDates.length === 2) self.clear(false, false);
                self.latestSelectedDateObj = selectedDate;
                self.selectedDates.push(selectedDate);
                if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort((function(a, b) {
                    return a.getTime() - b.getTime();
                }));
            }
            setHoursFromInputs();
            if (shouldChangeMonth) {
                var isNewYear = self.currentYear !== selectedDate.getFullYear();
                self.currentYear = selectedDate.getFullYear();
                self.currentMonth = selectedDate.getMonth();
                if (isNewYear) {
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                triggerEvent("onMonthChange");
            }
            updateNavigationCurrentMonth();
            buildDays();
            updateValue();
            if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1) focusOnDayElem(target); else if (self.selectedDateElem !== void 0 && self.hourElement === void 0) self.selectedDateElem && self.selectedDateElem.focus();
            if (self.hourElement !== void 0) self.hourElement !== void 0 && self.hourElement.focus();
            if (self.config.closeOnSelect) {
                var single = self.config.mode === "single" && !self.config.enableTime;
                var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
                if (single || range) focusAndClose();
            }
            triggerChange();
        }
        var CALLBACKS = {
            locale: [ setupLocale, updateWeekdays ],
            showMonths: [ buildMonths, setCalendarWidth, buildWeekdays ],
            minDate: [ jumpToDate ],
            maxDate: [ jumpToDate ],
            positionElement: [ updatePositionElement ],
            clickOpens: [ function() {
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                } else {
                    self._input.removeEventListener("focus", self.open);
                    self._input.removeEventListener("click", self.open);
                }
            } ]
        };
        function set(option, value) {
            if (option !== null && typeof option === "object") {
                Object.assign(self.config, option);
                for (var key in option) if (CALLBACKS[key] !== void 0) CALLBACKS[key].forEach((function(x) {
                    return x();
                }));
            } else {
                self.config[option] = value;
                if (CALLBACKS[option] !== void 0) CALLBACKS[option].forEach((function(x) {
                    return x();
                })); else if (HOOKS.indexOf(option) > -1) self.config[option] = arrayify(value);
            }
            self.redraw();
            updateValue(true);
        }
        function setSelectedDate(inputDate, format) {
            var dates = [];
            if (inputDate instanceof Array) dates = inputDate.map((function(d) {
                return self.parseDate(d, format);
            })); else if (inputDate instanceof Date || typeof inputDate === "number") dates = [ self.parseDate(inputDate, format) ]; else if (typeof inputDate === "string") switch (self.config.mode) {
              case "single":
              case "time":
                dates = [ self.parseDate(inputDate, format) ];
                break;

              case "multiple":
                dates = inputDate.split(self.config.conjunction).map((function(date) {
                    return self.parseDate(date, format);
                }));
                break;

              case "range":
                dates = inputDate.split(self.l10n.rangeSeparator).map((function(date) {
                    return self.parseDate(date, format);
                }));
                break;

              default:
                break;
            } else self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
            self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter((function(d) {
                return d instanceof Date && isEnabled(d, false);
            }));
            if (self.config.mode === "range") self.selectedDates.sort((function(a, b) {
                return a.getTime() - b.getTime();
            }));
        }
        function setDate(date, triggerChange, format) {
            if (triggerChange === void 0) triggerChange = false;
            if (format === void 0) format = self.config.dateFormat;
            if (date !== 0 && !date || date instanceof Array && date.length === 0) return self.clear(triggerChange);
            setSelectedDate(date, format);
            self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
            self.redraw();
            jumpToDate(void 0, triggerChange);
            setHoursFromDate();
            if (self.selectedDates.length === 0) self.clear(false);
            updateValue(triggerChange);
            if (triggerChange) triggerEvent("onChange");
        }
        function parseDateRules(arr) {
            return arr.slice().map((function(rule) {
                if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) return self.parseDate(rule, void 0, true); else if (rule && typeof rule === "object" && rule.from && rule.to) return {
                    from: self.parseDate(rule.from, void 0),
                    to: self.parseDate(rule.to, void 0)
                };
                return rule;
            })).filter((function(x) {
                return x;
            }));
        }
        function setupDates() {
            self.selectedDates = [];
            self.now = self.parseDate(self.config.now) || new Date;
            var preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
            if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);
            self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
            if (self.selectedDates.length > 0) self.latestSelectedDateObj = self.selectedDates[0];
            if (self.config.minTime !== void 0) self.config.minTime = self.parseDate(self.config.minTime, "H:i");
            if (self.config.maxTime !== void 0) self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
            self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
            self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
        }
        function setupInputs() {
            self.input = getInputElem();
            if (!self.input) {
                self.config.errorHandler(new Error("Invalid input element specified"));
                return;
            }
            self.input._type = self.input.type;
            self.input.type = "text";
            self.input.classList.add("flatpickr-input");
            self._input = self.input;
            if (self.config.altInput) {
                self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                self._input = self.altInput;
                self.altInput.placeholder = self.input.placeholder;
                self.altInput.disabled = self.input.disabled;
                self.altInput.required = self.input.required;
                self.altInput.tabIndex = self.input.tabIndex;
                self.altInput.type = "text";
                self.input.setAttribute("type", "hidden");
                if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
            }
            if (!self.config.allowInput) self._input.setAttribute("readonly", "readonly");
            updatePositionElement();
        }
        function updatePositionElement() {
            self._positionElement = self.config.positionElement || self._input;
        }
        function setupMobile() {
            var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
            self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
            self.mobileInput.tabIndex = 1;
            self.mobileInput.type = inputType;
            self.mobileInput.disabled = self.input.disabled;
            self.mobileInput.required = self.input.required;
            self.mobileInput.placeholder = self.input.placeholder;
            self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
            if (self.selectedDates.length > 0) self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
            if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
            if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
            if (self.input.getAttribute("step")) self.mobileInput.step = String(self.input.getAttribute("step"));
            self.input.type = "hidden";
            if (self.altInput !== void 0) self.altInput.type = "hidden";
            try {
                if (self.input.parentNode) self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
            } catch (_a) {}
            bind(self.mobileInput, "change", (function(e) {
                self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
                triggerEvent("onChange");
                triggerEvent("onClose");
            }));
        }
        function toggle(e) {
            if (self.isOpen === true) return self.close();
            self.open(e);
        }
        function triggerEvent(event, data) {
            if (self.config === void 0) return;
            var hooks = self.config[event];
            if (hooks !== void 0 && hooks.length > 0) for (var i = 0; hooks[i] && i < hooks.length; i++) hooks[i](self.selectedDates, self.input.value, self, data);
            if (event === "onChange") {
                self.input.dispatchEvent(createEvent("change"));
                self.input.dispatchEvent(createEvent("input"));
            }
        }
        function createEvent(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, true, true);
            return e;
        }
        function isDateSelected(date) {
            for (var i = 0; i < self.selectedDates.length; i++) {
                var selectedDate = self.selectedDates[i];
                if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0) return "" + i;
            }
            return false;
        }
        function isDateInRange(date) {
            if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
            return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
        }
        function updateNavigationCurrentMonth() {
            if (self.config.noCalendar || self.isMobile || !self.monthNav) return;
            self.yearElements.forEach((function(yearElement, i) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") self.monthElements[i].textContent = monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " "; else self.monthsDropdownContainer.value = d.getMonth().toString();
                yearElement.value = d.getFullYear().toString();
            }));
            self._hidePrevMonthArrow = self.config.minDate !== void 0 && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
            self._hideNextMonthArrow = self.config.maxDate !== void 0 && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
        }
        function getDateStr(specificFormat) {
            var format = specificFormat || (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
            return self.selectedDates.map((function(dObj) {
                return self.formatDate(dObj, format);
            })).filter((function(d, i, arr) {
                return self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i;
            })).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
        }
        function updateValue(triggerChange) {
            if (triggerChange === void 0) triggerChange = true;
            if (self.mobileInput !== void 0 && self.mobileFormatStr) self.mobileInput.value = self.latestSelectedDateObj !== void 0 ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
            self.input.value = getDateStr(self.config.dateFormat);
            if (self.altInput !== void 0) self.altInput.value = getDateStr(self.config.altFormat);
            if (triggerChange !== false) triggerEvent("onValueUpdate");
        }
        function onMonthNavClick(e) {
            var eventTarget = getEventTarget(e);
            var isPrevMonth = self.prevMonthNav.contains(eventTarget);
            var isNextMonth = self.nextMonthNav.contains(eventTarget);
            if (isPrevMonth || isNextMonth) changeMonth(isPrevMonth ? -1 : 1); else if (self.yearElements.indexOf(eventTarget) >= 0) eventTarget.select(); else if (eventTarget.classList.contains("arrowUp")) self.changeYear(self.currentYear + 1); else if (eventTarget.classList.contains("arrowDown")) self.changeYear(self.currentYear - 1);
        }
        function timeWrapper(e) {
            e.preventDefault();
            var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
            if (self.amPM !== void 0 && eventTarget === self.amPM) self.amPM.textContent = self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
            var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
            var newValue = curValue + step * delta;
            if (typeof input.value !== "undefined" && input.value.length === 2) {
                var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                if (newValue < min) {
                    newValue = max + newValue + utils_int(!isHourElem) + (utils_int(isHourElem) && utils_int(!self.amPM));
                    if (isMinuteElem) incrementNumInput(void 0, -1, self.hourElement);
                } else if (newValue > max) {
                    newValue = input === self.hourElement ? newValue - max - utils_int(!self.amPM) : min;
                    if (isMinuteElem) incrementNumInput(void 0, 1, self.hourElement);
                }
                if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) self.amPM.textContent = self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
                input.value = utils_pad(newValue);
            }
        }
        init();
        return self;
    }
    function _flatpickr(nodeList, config) {
        var nodes = Array.prototype.slice.call(nodeList).filter((function(x) {
            return x instanceof HTMLElement;
        }));
        var instances = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            try {
                if (node.getAttribute("data-fp-omit") !== null) continue;
                if (node._flatpickr !== void 0) {
                    node._flatpickr.destroy();
                    node._flatpickr = void 0;
                }
                node._flatpickr = FlatpickrInstance(node, config || {});
                instances.push(node._flatpickr);
            } catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
        HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
            return _flatpickr(this, config);
        };
        HTMLElement.prototype.flatpickr = function(config) {
            return _flatpickr([ this ], config);
        };
    }
    var flatpickr = function(selector, config) {
        if (typeof selector === "string") return _flatpickr(window.document.querySelectorAll(selector), config); else if (selector instanceof Node) return _flatpickr([ selector ], config); else return _flatpickr(selector, config);
    };
    flatpickr.defaultConfig = {};
    flatpickr.l10ns = {
        en: esm_assign({}, l10n_default),
        default: esm_assign({}, l10n_default)
    };
    flatpickr.localize = function(l10n) {
        flatpickr.l10ns.default = esm_assign(esm_assign({}, flatpickr.l10ns.default), l10n);
    };
    flatpickr.setDefaults = function(config) {
        flatpickr.defaultConfig = esm_assign(esm_assign({}, flatpickr.defaultConfig), config);
    };
    flatpickr.parseDate = createDateParser({});
    flatpickr.formatDate = createDateFormatter({});
    flatpickr.compareDates = compareDates;
    if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") jQuery.fn.flatpickr = function(config) {
        return _flatpickr(this, config);
    };
    Date.prototype.fp_incr = function(days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") window.flatpickr = flatpickr;
    const esm = flatpickr;
    function updateHeaderHeights() {
        const headerEl = document.querySelector("header.header");
        if (headerEl) {
            const headerHeight = headerEl.offsetHeight;
            document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
        }
    }
    window.addEventListener("resize", updateHeaderHeights);
    window.addEventListener("load", (function() {
        updateHeaderHeights();
    }));
    const searchComp = document.querySelector("[data-search-comp]");
    if (searchComp) _slideUp(searchComp);
    document.addEventListener("DOMContentLoaded", (function() {
        document.querySelectorAll(".comments-block")?.forEach((item => {
            _slideUp(item, 0);
        }));
        document.addEventListener("click", (function(e) {
            if (e.target.closest(".video__button")) {
                const button = e.target.closest(".video__button");
                const videoContainer = button.closest(".video");
                if (videoContainer) {
                    const preview = videoContainer.querySelector(".video__preview");
                    const video = videoContainer.querySelector("video");
                    if (video) {
                        button.remove();
                        if (preview) preview.remove();
                        video.removeAttribute("hidden");
                        video.play();
                    }
                }
            }
            if (e.target.closest(".websites-inputs__remove")) {
                const itemToRemove = e.target.closest(".websites-inputs__item");
                if (itemToRemove) {
                    const websitesContainer = itemToRemove.closest(".websites-inputs");
                    itemToRemove.remove();
                    updateWebsiteInputNames(websitesContainer);
                }
            }
            if (e.target.closest(".websites-inputs__add")) {
                const lastItem = e.target.closest(".websites-inputs__item");
                if (!lastItem) return;
                const websitesContainer = lastItem.closest(".websites-inputs");
                const newItem = lastItem.cloneNode(true);
                const input = newItem.querySelector("input");
                if (input) input.value = "";
                const label = newItem.querySelector(".field__label");
                if (label) label.textContent = "Website URL";
                const addBtn = newItem.querySelector(".websites-inputs__add");
                if (addBtn) {
                    addBtn.classList.remove("websites-inputs__add", "button", "_icon-plus");
                    addBtn.classList.add("websites-inputs__remove", "icon-btn", "_icon-cross");
                }
                websitesContainer.appendChild(newItem);
                updateWebsiteInputNames(websitesContainer);
            }
            document.querySelectorAll(".menu-profile.menu-profile--open").forEach((menu => {
                if (!menu.contains(e.target)) closeProfileMenu(menu);
            }));
            const moreBtn = e.target.closest("[data-menu-more]");
            if (moreBtn) {
                e.stopPropagation();
                const menuContainer = moreBtn.closest(".menu-profile");
                if (menuContainer) if (menuContainer.classList.contains("menu-profile--open")) closeProfileMenu(menuContainer); else openProfileMenu(menuContainer);
            }
            const headerProfile = e.target.closest(".header__profile");
            if (headerProfile) {
                headerProfile.classList.add("_active");
                if (e.target.closest(".menu-profile__close")) {
                    headerProfile.classList.remove("_active");
                    let menuProfile = headerProfile.querySelector(".menu-profile");
                    menuProfile ? closeProfileMenu(menuProfile) : null;
                }
            } else document.querySelector(".header__profile")?.classList.remove("_active");
            if (e.target.closest("field__hide")) {
                const button = e.target;
                const fieldContainer = button.closest(".field__input");
                const input = fieldContainer.querySelector("input");
                if (input.type === "password") {
                    input.type = "text";
                    button.classList.remove("_icon-eye");
                    button.classList.add("_icon-eye-hide");
                } else {
                    input.type = "password";
                    button.classList.remove("_icon-eye-hide");
                    button.classList.add("_icon-eye");
                }
            }
            if (e.target.closest("[data-comments-btn]")) {
                const button = e.target;
                const container = button.closest(".post-block");
                const block = container.querySelector(".comments-block");
                if (block) _slideToggle(block);
            }
            if (e.target.closest("[data-search-toggle]")) {
                const button = e.target;
                const container = button.closest(".set-profile");
                const block = container.querySelector("[data-search-comp]");
                if (block) _slideToggle(block);
            }
        }));
    }));
    function updateWebsiteInputNames(websitesContainer) {
        websitesContainer.querySelectorAll(".websites-inputs__item").forEach(((item, index, items) => {
            const input = item.querySelector("input");
            if (input) input.name = `websites[${index}]website`;
            const label = item.querySelector(".field__label");
            if (label) label.textContent = `Website URL ${index + 1}`;
            const button = item.querySelector("button");
            if (!button) return;
            if (index === items.length - 1) {
                button.classList.remove("websites-inputs__remove", "icon-btn", "_icon-cross");
                button.classList.add("websites-inputs__add", "button", "_icon-plus");
            } else {
                button.classList.remove("websites-inputs__add", "button", "_icon-plus");
                button.classList.add("websites-inputs__remove", "icon-btn", "_icon-cross");
            }
        }));
    }
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll("[data-more-hid]").forEach((el => {
            _slideUp(el);
        }));
    }));
    function openProfileMenu(menuContainer) {
        if (menuContainer.classList.contains("menu-profile--open")) return;
        menuContainer.querySelectorAll("[data-more-hid]").forEach((el => {
            _slideDown(el);
        }));
        menuContainer.classList.add("menu-profile--open");
        document.documentElement.classList.add("dark");
    }
    function closeProfileMenu(menuContainer) {
        if (!menuContainer.classList.contains("menu-profile--open")) return;
        menuContainer.querySelectorAll("[data-more-hid]").forEach((el => {
            _slideUp(el);
        }));
        menuContainer.classList.remove("menu-profile--open");
        if (!document.querySelector(".menu-profile.menu-profile--open")) document.documentElement.classList.remove("dark");
    }
    document.addEventListener("DOMContentLoaded", (function() {
        const ctx = document.getElementById("earning-chart");
        if (ctx) {
            const startDate = new Date("2024-01-01");
            const endDate = new Date("2024-12-31");
            const dates = [];
            const revenues = [];
            for (let date = new Date(startDate); date <= endDate; date.setMonth(date.getMonth() + 1)) {
                dates.push(date.toISOString().split("T")[0]);
                revenues.push(Math.floor(Math.random() * 100));
            }
            const config = {
                type: "line",
                data: {
                    labels: dates,
                    datasets: [ {
                        label: "Дохід (€)",
                        data: revenues,
                        borderColor: "#6C60FF",
                        tension: .3,
                        pointRadius: 0
                    } ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                            callbacks: {
                                title: function(context) {
                                    const date = new Date(context[0].label);
                                    return date.toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    });
                                },
                                label: function(context) {
                                    return `Revenue: €${context.parsed.y}`;
                                }
                            },
                            backgroundColor: "#FFF",
                            titleColor: "#000",
                            bodyColor: "#000",
                            borderWidth: 0,
                            padding: {
                                top: 12,
                                right: 5,
                                bottom: 12,
                                left: 5
                            },
                            cornerRadius: 8,
                            displayColors: false,
                            titleFont: {
                                family: "'Mulish', sans-serif",
                                size: 14,
                                weight: "400",
                                lineHeight: 1.4
                            },
                            bodyFont: {
                                family: "'Mulish', sans-serif",
                                size: 14,
                                lineHeight: 1.4
                            },
                            xAlign: "center",
                            yAlign: "bottom"
                        }
                    },
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "month",
                                displayFormats: {
                                    month: "MMM"
                                },
                                tooltipFormat: "dd MMM yyyy"
                            },
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                maxRotation: 0,
                                autoSkip: true,
                                font: {
                                    size: 11,
                                    weight: 500
                                },
                                callback: function(value) {
                                    const date = new Date(this.getLabelForValue(value));
                                    return date.toLocaleString("en-US", {
                                        month: "short"
                                    }).toUpperCase();
                                }
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return value;
                                },
                                font: {
                                    size: 11,
                                    weight: 500
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: "index"
                    }
                }
            };
            new Chart(ctx, config);
        }
        const calendars = document.querySelectorAll("[data-calendar]");
        if (calendars) calendars.forEach((calendar => {
            const currentYear = (new Date).getFullYear();
            const defaultStart = new Date(currentYear, 0, 1);
            const defaultEnd = new Date(currentYear, 11, 31);
            const picker = esm(calendar, {
                mode: "range",
                defaultDate: [ defaultStart, defaultEnd ],
                conjunction: " - ",
                locale: {
                    rangeSeparator: " - "
                },
                onChange: function(selectedDates) {}
            });
            const calendarSelect = picker.calendarContainer.querySelector(".flatpickr-monthDropdown-months");
            if (calendarSelect) window.select.selectInit(calendarSelect);
            const monthNav = picker.calendarContainer.querySelectorAll(".flatpickr-prev-month, .flatpickr-next-month");
            monthNav.forEach((arrow => {
                arrow.addEventListener("click", (() => {
                    setTimeout((() => {
                        if (calendarSelect) window.select.selectBuild(calendarSelect);
                    }), 10);
                }));
            }));
        }));
    }));
    document.addEventListener("selectCallback", (e => {
        e.detail.select.dispatchEvent(new Event("change"));
        console.log(e.detail.select.value);
    }));
    window["FLS"] = false;
    menuInit();
    showMore();
    spoilers();
    tabs();
    formRating();
    pageNavigation();
})();