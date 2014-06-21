var log = function() {
    console.log.apply(console, arguments);
};
var T = TweenLite.to;
var isAuthFieldOpen = false;

var activeMajorButton = null;

majorButton_TheGame = null;
majorButton_Gallery = null;
majorButton_The_World = null;
majorButton_Merchandise = null;
majorButton_Community = null;

$(function() {
    TweenLite.defaultEase = tweenEasing;
    var mainHeader = $('#mainHeader');

    // Setup searchAndAuth
        var searchAndAuth = $('> .searchAndAuth', mainHeader);
        var searchButton = $('> .searchButton', searchAndAuth);
        var loginButton = $('> .loginButton', searchAndAuth);
        var loginStop = $('> .loginStop', searchAndAuth);
        var authUserField = $('> .authUserField', searchAndAuth);
        var authPassField = $('> .authPassField', searchAndAuth);

        // Check auth field visibility
        isAuthFieldOpen = authUserField.css('opacity') == 1 ? true : false;
        loginButton.bind({
            'mousedown': function() { searchAndAuth_ToggleAuthFields(authUserField, authPassField, loginStop) }
        });

    // Setup mainNavigation -> 'mainButton1-4' tweens
        var mainNavigation = $('> .mainNavigation', mainHeader);
        var mainButton1 = $('.mainButton1', mainHeader);
        var mainButton2 = $('.mainButton2', mainHeader);
        var mainButton3 = $('.mainButton3', mainHeader);
        var mainButton4 = $('.mainButton4', mainHeader);

    // Setup sideNavigation -> .menu > .list
        var sideNavigation = $('#sideNavigation');
        var sideNavLogo = $('> .logo', sideNavigation);
            sideNavLogo.bind({
                'mousedown': function() { navigateTo(PAGE.BUY_NOW) },
                'mouseenter': function() { sideNavigationLogoOver(sideNavLogo) },
                'mouseleave': function() { sideNavigationLogoOut(sideNavLogo) }
            });

        var sideNavMenu = $('> .menu', sideNavigation);
        var sideNavList = $('> .list', sideNavMenu);
        var sideNavStates = $('> div', sideNavMenu);

            /*
            $('li', sideNavList).each(function(index) {
                var $this = $(this);
                $this.data({index: index});
                $(this).bind({
                    'mouseenter': function(e) { sideNavStateOver($(e.target).data().index); },
                    'mouseleave': function(e) { sideNavStateOut($(e.target).data().index); }
                })
            });
            */

            majorButton_TheGame         = $('li:nth-of-type(1)', sideNavList);
            majorButton_Gallery         = $('li:nth-of-type(2)', sideNavList);
            majorButton_The_World       = $('li:nth-of-type(3)', sideNavList);
            majorButton_Merchandise     = $('li:nth-of-type(4)', sideNavList);
            majorButton_Community       = $('li:nth-of-type(5)', sideNavList);

        sideNavState1 = $('> i:nth-of-type(1)', sideNavStates);
        sideNavState2 = $('> i:nth-of-type(2)', sideNavStates);
        sideNavState3 = $('> i:nth-of-type(3)', sideNavStates);
        sideNavState4 = $('> i:nth-of-type(4)', sideNavStates);
        sideNavState5 = $('> i:nth-of-type(5)', sideNavStates);
        sideNavState6 = $('> i:nth-of-type(6)', sideNavStates);

        bindMajorButtonToNavigation(majorButton_TheGame,    PAGE.BUY_NOW);
        bindMajorButtonToNavigation(majorButton_Gallery,    PAGE.SCREENSHOTS);
        bindMajorButtonToNavigation(majorButton_The_World,  PAGE.CHARACTERS);
        bindMajorButtonToNavigation(majorButton_Merchandise,PAGE.APPAREL);
        bindMajorButtonToNavigation(majorButton_Community,  PAGE.COMMUNITY);

        bindMajorButton(majorButton_TheGame);
        bindMajorButton(majorButton_Gallery);
        bindMajorButton(majorButton_The_World);
        bindMajorButton(majorButton_Merchandise);
        bindMajorButton(majorButton_Community);

    // Get current site
        var site = $('meta[name=site]').attr('content');
        switch(site) {
            case 'buy_now':
                // Major buttons
                activeMajorButton = majorButton_TheGame;
                // Minor buttons
                activateMinorButton(mainButton2);
                bindMinorButtonToNavigation(mainButton2, PAGE.BUY_NOW);
                    bindMinorButton(mainButton1);
                    bindMinorButton(mainButton3);
                    bindMinorButton(mainButton4);
                break;
            case 'apparel':
                // Major buttons
                activeMajorButton = majorButton_Merchandise;

                // Minor buttons
                activateMinorButton(mainButton1);
                bindMinorButtonToNavigation(mainButton1, PAGE.APPAREL);
                    bindMinorButton(mainButton2);
                    bindMinorButton(mainButton3);
                    bindMinorButton(mainButton4);
                break;
            case 'characters':
                // Major buttons
                activeMajorButton = majorButton_The_World;

                // Minor buttons
                activateMinorButton(mainButton2);
                bindMinorButtonToNavigation(mainButton2, PAGE.CHARACTERS);
                    bindMinorButton(mainButton1);
                    bindMinorButton(mainButton3);
                    bindMinorButton(mainButton4);
                break;
            case 'the_making':
                // Major buttons
                activeMajorButton = majorButton_Gallery;

                // Minor buttons
                activateMinorButton(mainButton2);
                bindMinorButtonToNavigation(mainButton2, PAGE.THE_MAKING);
                bindMinorButtonToNavigation(mainButton1, PAGE.SCREENSHOTS);
                    bindMinorButton(mainButton1);
                    bindMinorButton(mainButton3);
                    bindMinorButton(mainButton4);
                break;
            case 'community':
                // Major buttons
                activeMajorButton = majorButton_Community;

                // Minor buttons
                    bindMinorButton(mainButton1);
                    bindMinorButton(mainButton2);
                    bindMinorButton(mainButton3);
                    bindMinorButton(mainButton4);
                break;
            case 'screenshots':
                // Major buttons
                activeMajorButton = majorButton_Gallery;

                // Minor buttons
                activateMinorButton(mainButton1);
                bindMinorButtonToNavigation(mainButton1, PAGE.SCREENSHOTS);
                bindMinorButtonToNavigation(mainButton2, PAGE.THE_MAKING);
                    bindMinorButton(mainButton2);
                    bindMinorButton(mainButton3);
                    bindMinorButton(mainButton4);
                break;
        }
        activateMajorButton(activeMajorButton);

    // Setup 'mainSection' -> .content / .product
        var mainSection = $('#mainSection');
        var mainSectionContent = $('> .content', mainSection);
        var mainSectionProduct = $('> .product', mainSection);
        var figure = $('> figure', mainSectionProduct); // Tommynaut sad/happy

        var mainSectionArrowToRight = $('> .arrowToRight', mainSectionContent);
        var mainSectionArrowToLeft = $('> .arrowToLeft', mainSectionContent);
        var mainSectionBuyNow = $('> .buyNow', mainSectionContent);

            mainSectionBuyNow.bind({
                'mouseenter': function() { mainSectionBuyNowOver(mainSectionBuyNow, mainSectionArrowToRight, mainSectionArrowToLeft, figure); },
                'mouseleave': function() { mainSectionBuyNowOut(mainSectionBuyNow, mainSectionArrowToRight, mainSectionArrowToLeft, figure); }
            });

    // Setup 'mainFooter'
        var mainFooter = $('#mainFooter');
        $('> .social div', mainFooter).bind({
            'mouseenter': function() { mainFooterSocialsOver($(this)); },
            'mouseleave': function() { mainFooterSocialsOut($(this)); }
        });

    // Community page specifics
        var community = $('> .community', mainSection);
        if( community.length ) {
            $('h3').bind({
                'mouseenter': function() {
                    var $this = $(this);
                    T($this, tweenDuration, {css: {color: '#E6520B'}});
                },
                'mouseleave': function() {
                    var $this = $(this);
                    T($this, tweenDuration, {css: {color: 'black'}});
                }
            });
        }

    // Characters page specifics
        var characters = $('> .characters', mainSection);
        if( characters.length ) { // if characters exists
                // Main characters
                var mainCharacters = $('> .mainCharacters', characters);
                var tommynautArea = $('> div:nth-of-type(1)', mainCharacters);
                var beakBeakArea = $('> div:nth-of-type(2)', mainCharacters);
                    var mainCharImg1 = $('> i:nth-of-type(1)', mainCharacters); // none of them
                    var mainCharImg2 = $('> i:nth-of-type(2)', mainCharacters); // Tommynaut
                    var mainCharImg3 = $('> i:nth-of-type(3)', mainCharacters); // Beak-Beak

                    var descrBox = $('> div:nth-of-type(2)', characters);
                        var descrBoxTitle = $('> h2', descrBox);
                        var descrBoxContent = $('> p', descrBox);

                function showNoneOfThem() {
                    T(mainCharImg1, tweenDuration, {css: {opacity: 1}});
                    T(mainCharImg2, tweenDuration, {css: {opacity: 0}});
                    T(mainCharImg3, tweenDuration, {css: {opacity: 0}});

                    descrBoxTitle.html('Characters');
                    descrBoxContent.html('Nulla non dolor nunc. Pellentesque eu magna eu augue vehicula dapibus. Nam sagittis lorem ac elementum tincidunt. Quisque blandit arcu et mollis luctus. Nunc venenatis non nisi vitae fringilla. Cras convallis cursus nibh in consequat. Non nisi vitae fringilla. Cras convallis cursus nibh in consequat.');
                }
                function showTommynaut() {
                    T(mainCharImg1, tweenDuration, {css: {opacity: 0}});
                    T(mainCharImg2, tweenDuration, {css: {opacity: 1}});
                    T(mainCharImg3, tweenDuration, {css: {opacity: 0}});

                    descrBoxTitle.html('Tommynaut');
                    descrBoxContent.html('Cras convallis cursus nibh in consequat. Pellentesque eu magna eu augue vehicula dapibus. Nam sagittis lorem ac elementum tincidunt. Quisque blandit arcu et mollis luctus. Nunc venenatis non nisi vitae fringilla. Cras convallis cursus nibh in consequat. Non nisi vitae fringilla.');
                }
                function showBeakBeak() {
                    T(mainCharImg1, tweenDuration, {css: {opacity: 0}});
                    T(mainCharImg2, tweenDuration, {css: {opacity: 0}});
                    T(mainCharImg3, tweenDuration, {css: {opacity: 1}});

                    descrBoxTitle.html('Beak-Beak');
                    descrBoxContent.html('Pellentesque eu magna eu augue vehicula dapibus. Nam sagittis lorem ac elementum tincidunt. Quisque blandit arcu et mollis luctus. Nunc venenatis non nisi vitae fringilla. Cras convallis cursus nibh in consequat. Non nisi vitae fringilla. In visa vera.');
                }
                tommynautArea.bind({
                    'mouseenter': function() { showTommynaut(); },
                    'mouseleave': function() { showNoneOfThem(); }
                });
                beakBeakArea.bind({
                    'mouseenter': function() { showBeakBeak(); },
                    'mouseleave': function() { showNoneOfThem(); }
                });

                // Thumbnails
                var thumbnailImages = ['thumb_1.jpg', 'thumb_2.jpg', 'thumb_3.jpg', 'thumb_4.jpg', 'thumb_5.jpg', 'thumb_6.jpg'];
                function getThumbnailIndices() {
                    var num = [];
                    for(var i= 0; i < 3; ++i) {
                        var n = Math.round(Math.random()*(thumbnailImages.length-1));

                        for(var j=0, len=num.length; j<len; ++j) {
                            if(num[j] === n) {
                                n = Math.round(Math.random()*(thumbnailImages.length-1));
                                j=0;
                            }
                        }
                        num.push(n);
                    }
                    return num;
                }
                var indices = getThumbnailIndices();

                var toGallery = $('#toGallery');
                    var thumbnail1 = $('> div:nth-of-type(1)', toGallery);
                    var thumbnail2 = $('> div:nth-of-type(2)', toGallery);
                    var thumbnail3 = $('> div:nth-of-type(3)', toGallery);
                        thumbnail1.append($('<img>', {src: 'img/'+(thumbnailImages[indices[0]])}));
                        thumbnail2.append($('<img>', {src: 'img/'+(thumbnailImages[indices[1]])}));
                        thumbnail3.append($('<img>', {src: 'img/'+(thumbnailImages[indices[2]])}));

                    function charactersBindToGallery(element) {
                        element.bind({
                            'mousedown': function() { navigateTo(PAGE.SCREENSHOTS); }
                        });
                    }

                var toGalleryButton = $('> .toGalleryButton', toGallery);

                    charactersBindToGallery(thumbnail1);
                    charactersBindToGallery(thumbnail2);
                    charactersBindToGallery(thumbnail3);
                    charactersBindToGallery(toGalleryButton);
        }

    // Gallery specifics
        var galleryThumbnailTemplate = $('<div/>', {html: '<i></i><img>'});
        function Lightbox() {
            var template = $('<div/>', {id: 'lightboxOverlay'});
            var body = $('body');
            var $this = this;

            var isActive = false;

            this.toggle = function() {
                if( !isActive ) {
                    this.activate();
                } else {
                    this.deactivate();
                }
            }
            this.activate = function() {
                if( !isActive ) {
                    log('activate');
                    template.insertBefore($('#docWrapper'));
                    body.bind({
                        'keydown': function(e) {
                            var keyCode = e.keyCode;

                            if(keyCode == 27) { // {ESC}
                                $this.deactivate();
                            }
                        }
                    });

                    isActive = true;
                }
            }
            this.deactivate = function() {
                if( isActive ) {
                    log('deactivate');
                    template.remove();
                    body.unbind('keydown');

                    isActive = false;
                }
            }
        }
        var lightbox = new Lightbox();

        // Screenshots page specifics
            var screenshots = $('> .screenshots', mainSection);
            if( screenshots.length ) { // if screenshots exists
                var galleryScreenshots = [
                    [ 'scr_01.jpg', 'scr_01_thumb.png' ],
                    [ 'scr_02.jpg', 'scr_02_thumb.png' ],
                    [ 'scr_03.jpg', 'scr_03_thumb.png' ],
                    [ 'scr_04.jpg', 'scr_04_thumb.png' ],
                    [ 'scr_05.jpg', 'scr_05_thumb.png' ],
                    [ 'scr_06.jpg', 'scr_06_thumb.png' ],
                    [ 'scr_07.jpg', 'scr_07_thumb.png' ],
                    [ 'scr_08.jpg', 'scr_08_thumb.png' ],
                    [ 'scr_09.jpg', 'scr_09_thumb.png' ],
                    [ 'scr_10.jpg', 'scr_10_thumb.png' ]
                ];

                for(var e in galleryScreenshots) {
                    var image       = galleryScreenshots[e][0];
                    var thumbnail   = galleryScreenshots[e][1];
                    var template = galleryThumbnailTemplate.clone();
                        $('> img', template).attr('src', 'img/screenshots/'+thumbnail);
                        /*
                        template.bind({
                            'mousedown': function() { lightbox.activate(); }
                        });
                        */
                    screenshots.append(template);
                }
            }

        // The making page specifics
            var theMaking = $('> .theMaking', mainSection);
            if( theMaking.length ) { // if theMaking exists
                var galleryTheMakings = [
                    [ 'mkg_01.jpg', 'mkg_01_thumb.png' ],
                    [ 'mkg_02.jpg', 'mkg_02_thumb.png' ],
                    [ 'mkg_03.jpg', 'mkg_03_thumb.png' ],
                    [ 'mkg_04.jpg', 'mkg_04_thumb.png' ],
                    [ 'mkg_05.jpg', 'mkg_05_thumb.png' ],
                    [ 'mkg_06.jpg', 'mkg_06_thumb.png' ],
                    [ 'mkg_07.jpg', 'mkg_07_thumb.png' ],
                    [ 'mkg_08.jpg', 'mkg_08_thumb.png' ],
                    [ 'mkg_09.jpg', 'mkg_09_thumb.png' ],
                    [ 'mkg_10.jpg', 'mkg_10_thumb.png' ],
                    [ 'mkg_11.jpg', 'mkg_11_thumb.png' ],
                    [ 'mkg_12.jpg', 'mkg_12_thumb.png' ]
                ];

                for(var e in galleryTheMakings) {
                    var image       = galleryTheMakings[e][0];
                    var thumbnail   = galleryTheMakings[e][1];
                    var template = galleryThumbnailTemplate.clone();
                        $('> img', template).attr('src', 'img/making/'+thumbnail);
                    theMaking.append(template);
                }
            }
});

var PAGE = {
    BUY_NOW:        1,
    CHARACTERS:     2,
    SCREENSHOTS:    3,
    THE_MAKING:     4,
    APPAREL:        5,
    COMMUNITY:      6
};
function navigateTo(page) {
    switch(page) {
        case PAGE.BUY_NOW: window.location.href = 'index.html'; break;
        case PAGE.CHARACTERS: window.location.href = 'characters.html'; break;
        case PAGE.SCREENSHOTS: window.location.href = 'screenshots.html'; break;
        case PAGE.THE_MAKING: window.location.href = 'the_making.html'; break;
        case PAGE.APPAREL: window.location.href = 'apparel.html'; break;
        case PAGE.COMMUNITY: window.location.href = 'community.html'; break;
    }
}
function activateMajorButton(button) {
    //sideNavStateOver(button);

    switch(button) {
        case majorButton_TheGame:
            T(sideNavState2, tweenDuration*5, {css:{opacity: 1}});
            break;
        case majorButton_Gallery:
            T(sideNavState3, tweenDuration*5, {css:{opacity: 1}});
            break;
        case majorButton_The_World:
            T(sideNavState4, tweenDuration*5, {css:{opacity: 1}});
            break;
        case majorButton_Merchandise:
            T(sideNavState5, tweenDuration*5, {css:{opacity: 1}});
            break;
        case majorButton_Community:
            T(sideNavState6, tweenDuration*5, {css:{opacity: 1}});
            break;
    }
}
function activateMinorButton(button) {
    var normal = $('> i:nth-of-type(2)', button);
    var hover =  $('> i:nth-of-type(3)', button);
    T(normal, tweenDuration*5, {css: {opacity: 0}})
    T(hover, tweenDuration*5,  {css: {opacity: 1}})
}
function bindMajorButton(button) {
        button.bind({
            'mouseenter': function() { sideNavStateOver(button); },
            'mouseleave': function() { sideNavStateOut(button); }
        })
}
function bindMinorButton(button) {
    button.bind({
        'mouseenter': function() { mainButtonOver(button); },
        'mouseleave': function() { mainButtonOut(button); }
    });
}
function bindMajorButtonToNavigation(button, page) {
        button.bind({
            'mousedown':  function() { navigateTo(page); }
        });
}
function bindMinorButtonToNavigation(button, page) {
    button.bind({
        'mousedown':  function() { navigateTo(page); }
    });
}

function searchAndAuth_ToggleAuthFields(authUserField, authPassField, loginStop) {
    // Clear field text
    authUserField.val('');
    authPassField.val('');
    var x = $('> i', loginStop);

    if( !isAuthFieldOpen ) {
        T(authUserField, tweenDuration, authUserFieldTweenCSS.open)
        T(authPassField, tweenDuration, authPassFieldTweenCSS.open)
        T(x, tweenDuration, {css: {opacity: 1}})
    } else {
        T(authUserField, tweenDuration, authUserFieldTweenCSS.close)
        T(authPassField, tweenDuration, authPassFieldTweenCSS.close)
        T(x, tweenDuration, {css: {opacity: 0}})
    }
    isAuthFieldOpen = !isAuthFieldOpen;
}
function sideNavigationLogoOver(element) {
    var normal = $('> i:nth-of-type(1)', element);
    var hover =  $('> i:nth-of-type(2)', element);

    T(normal, tweenDuration*5, {css: {opacity: 0}});
    T(hover,  tweenDuration, {css: {opacity: 1}});
}
function sideNavigationLogoOut(element) {
    var normal = $('> i:nth-of-type(1)', element);
    var hover =  $('> i:nth-of-type(2)', element);

    T(normal, tweenDuration, {css: {opacity: 1}});
    T(hover,  tweenDuration*5, {css: {opacity: 0}});
}

function mainButtonDown(element) {
    log('down');
}
function mainButtonOver(element) {
    var normal = $('> i:nth-of-type(2)', element);
    var hover =  $('> i:nth-of-type(3)', element);

    T(normal, tweenDuration, {css: {opacity: 0}});
    T(hover,  tweenDuration, {css: {opacity: 1}});
}
function mainButtonOut(element) {
    var normal = $('> i:nth-of-type(2)', element);
    var hover =  $('> i:nth-of-type(3)', element);

    T(normal, tweenDuration, {css: {opacity: 1}});
    T(hover,  tweenDuration, {css: {opacity: 0}});
}

var sideNavState1 = null; // Normal state
var sideNavState2 = null; // 1st hover
var sideNavState3 = null; // 2nd hover
var sideNavState4 = null; // 3rd hover
var sideNavState5 = null; // 4th hover
var sideNavState6 = null; // 5th hover
function sideNavStateOver(button) {
    T(sideNavState1, tweenDuration*5, {css:{opacity: 0}});
    T(sideNavState2, tweenDuration*3, {css:{opacity: 0}});
    T(sideNavState3, tweenDuration*3, {css:{opacity: 0}});
    T(sideNavState4, tweenDuration*3, {css:{opacity: 0}});
    T(sideNavState5, tweenDuration*3, {css:{opacity: 0}});
    T(sideNavState6, tweenDuration*3, {css:{opacity: 0}});

    switch(button) {
        case majorButton_TheGame:
            T(sideNavState2, tweenDuration, {css:{opacity: 1}});
            break;
        case majorButton_Gallery:
            T(sideNavState3, tweenDuration, {css:{opacity: 1}});
            break;
        case majorButton_The_World:
            T(sideNavState4, tweenDuration, {css:{opacity: 1}});
            break;
        case majorButton_Merchandise:
            T(sideNavState5, tweenDuration, {css:{opacity: 1}});
            break;
        case majorButton_Community:
            T(sideNavState6, tweenDuration, {css:{opacity: 1}});
            break;
    }
}
function sideNavStateOut(button) {
    T(sideNavState1, tweenDuration, {css:{opacity: 1}});

    switch(button) {
        case majorButton_TheGame:
            T(sideNavState2, tweenDuration*5, {css:{opacity: 0}});
            break;
        case majorButton_Gallery:
            T(sideNavState3, tweenDuration*5, {css:{opacity: 0}});
            break;
        case majorButton_The_World:
            T(sideNavState4, tweenDuration*5, {css:{opacity: 0}});
            break;
        case majorButton_Merchandise:
            T(sideNavState5, tweenDuration*5, {css:{opacity: 0}});
            break;
        case majorButton_Community:
            T(sideNavState6, tweenDuration*5, {css:{opacity: 0}});
            break;
    }

    activateMajorButton(activeMajorButton);
}

function mainSectionBuyNowOver(button, arrowToRight, arrowToLeft, figure) {
    var buttonNormal = $('> i:nth-of-type(1)', button);
    var buttonHover  = $('> i:nth-of-type(2)', button);
    var figureNormal = $('> i:nth-of-type(1)', figure);
    var figureHover  = $('> i:nth-of-type(2)', figure);

    // Arrows
        T(arrowToRight, tweenDuration, {css: {marginTop: -15, rotation: 5}});
        T(arrowToLeft,  tweenDuration, {css: {marginTop: -15, rotation: -5}});
    // Button & figure
        T(buttonNormal, tweenDuration*3, {css: {opacity: 0}});
        T(buttonHover,  tweenDuration, {css: {opacity: 1}});
        T(figureNormal, tweenDuration*3, {css: {opacity: 0}});
        T(figureHover,  tweenDuration, {css: {opacity: 1}});
}
function mainSectionBuyNowOut(button, arrowToRight, arrowToLeft, figure) {
    var buttonNormal = $('> i:nth-of-type(1)', button);
    var buttonHover  = $('> i:nth-of-type(2)', button);
    var figureNormal = $('> i:nth-of-type(1)', figure);
    var figureHover  = $('> i:nth-of-type(2)', figure);

    // Arrows
        T(arrowToRight, tweenDuration, {css: {marginTop: 0, rotation: 0}});
        T(arrowToLeft,  tweenDuration, {css: {marginTop: 0, rotation: 0}});
    // Button & figure
        T(buttonNormal, tweenDuration, {css: {opacity: 1}});
        T(buttonHover,  tweenDuration*3, {css: {opacity: 0}});
        T(figureNormal, tweenDuration, {css: {opacity: 1}});
        T(figureHover,  tweenDuration*3, {css: {opacity: 0}});
}

function mainFooterSocialsOver(element) {
    //log(element);
    var normal = $('> i:nth-of-type(1)', element);
    var hover  = $('> i:nth-of-type(2)', element);

    T(normal, tweenDuration*3, {css:{opacity: 0}});
    T(hover,  tweenDuration, {css:{opacity: 1}});
}
function mainFooterSocialsOut(element) {
    //log(element);
    var normal = $('> i:nth-of-type(1)', element);
    var hover  = $('> i:nth-of-type(2)', element);

    T(normal, tweenDuration, {css:{opacity: 1}});
    T(hover,  tweenDuration*3, {css:{opacity: 0}});
}























