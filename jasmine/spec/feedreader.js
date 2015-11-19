/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL defined that is not empty', function() {
            for (i = 0, j = allFeeds.length; i < j; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name defined that is not empty', function() {
            for (i = 0, j = allFeeds.length; i < j; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body')).toHaveClass('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass('menu-hidden');
            
            $('.menu-icon-link').click();
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least a single ".entry" element', function(done) {
            expect($('.feed').children().children()).toHaveClass('entry');
            done();
        });
    });
        
    /* This function accepts a feed index as a parameter,
     * loads that feed, then tests to make sure that it populates
     * the DOM with an entry.
     */
    function testFeedsForEntries(feedIndex) {
        describe('Feed in position ' + feedIndex, function() {
            beforeEach(function(done) {
                loadFeed(feedIndex, function() {
                    done();
                });
            });
            
            /* TODO: Write a test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             */
            it('should have at least a single ".entry" element',
                function(done) {
                expect($('.feed').children().children()).toHaveClass('entry');
                done();
            });
        });
    }
    
    /* Test all of the feeds to make sure each one has entries. */
    for (i = 0, j = allFeeds.length; i < j; i++) {
        testFeedsForEntries(i);
    }

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        var oldContent,
            newContent;
        
        /* This function accepts parameters for the index of the
         * old feed and the index of the new feed. It will set the
         * oldContent variable to the old feed content, then set the
         * newContent variable to the new feed content. The spec then
         * checks to make sure oldContent does not equal newContent
         */
        function testFeedsForChanges(oldFeed, newFeed) {
            describe('Changing from feed ' + oldFeed + ' to feed ' + newFeed,
                function() {
                beforeEach(function(done) {
                    loadFeed(oldFeed, function() {
                        oldContent = $('.header-title').html();
                        loadFeed(newFeed, function() {
                            newContent = $('.header-title').html();
                            done();
                        });
                    });
                });
                
                /* TODO: Write a test that ensures when a new feed is loaded
                 * by the loadFeed function that the content actually changes.
                 * Remember, loadFeed() is asynchronous.
                 */
                it('should show a change in content', function(done) {
                    expect(newContent).not.toBe(oldContent);
                    done();
                });
            });
        }
        
        /* Test changing from one feed to the next */
        for (i = 0, j = allFeeds.length - 1; i < j; i++) {
            testFeedsForChanges(i, i + 1);
        }
        
        /* Make sure that changing from the last feed to the first
         * feed is also successful
         */
        testFeedsForChanges(allFeeds.length - 1, 0);
    });
}());