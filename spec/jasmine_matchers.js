describe("Ajax", function() {

// test case to test login
    it("can perform a successful ajax request on resource http://uat.maaxframe.com/crm/leads.json/ to log in by a user", function() {
        var asyncCallComplete, result,
            _this = this;
        // asyncCallComplete is set to true when the ajax call is complete
        asyncCallComplete = false;

        // result stores the result of the successful ajax call
        result = null;

        // SECTION 1 - call asynchronous function
        runs(function() {
            return $.ajax({
                url: "http://uat.maaxframe.com/access_controls/users.json",
                type: "POST",
                data: {"_method": "login", "data[users][user_name]": "timlee", "data[users][user_password]": "timlee"},
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                    asyncCallComplete = true;
                    result = data;
                    console.log(result)
                }
            });

        });

        // SECTION 2 - wait for the asynchronous call to complete
        waitsFor(function() {
            return asyncCallComplete !== false;
        });

        // SECTION 3 - perform tests
        return runs(function() {
            console.log(result)
            console.log(result.session_id)
            return expect(result.session_id).toBeDefined();
        });
    });

    // test case for leads ajax call
    it("can perform a successful ajax request on resource http://uat.maaxframe.com/crm/leads.json/ to get all leads", function() {
        var asyncCallComplete, result,
            _this = this;
        // asyncCallComplete is set to true when the ajax call is complete
        asyncCallComplete = false;

        // result stores the result of the successful ajax call
        result = null;

        // SECTION 1 - call asynchronous function
        runs(function() {
            return $.ajax('http://uat.maaxframe.com/crm/leads.json/', {
                type: 'GET',
                contentType: 'application/x-www-form-urlencoded',
                success: function(data) {
                    asyncCallComplete = true;
                    result = data;
                    console.log(data)
                },
                error: function() {
                    asyncCallComplete = true;
                }
            });
        });

        // SECTION 2 - wait for the asynchronous call to complete
        waitsFor(function() {
            return asyncCallComplete !== false;
        });

        // SECTION 3 - perform tests
        return runs(function() {
            return expect(result['data']).toBeDefined();
        });
    });
    // test case for searching a lead
    it("can perform a successful ajax request on resource http://uat.maaxframe.com/crm/leads.json/ to search a lead by name", function() {
        var asyncCallComplete, result,
            _this = this;
        // asyncCallComplete is set to true when the ajax call is complete
        asyncCallComplete = false;

        // result stores the result of the successful ajax call
        result = null;

        // SECTION 1 - call asynchronous function
        runs(function() {
            return $.ajax({
                url: "http://uat.maaxframe.com/crm/leads.json/",
                type: "GET",
                data: {
                    'q': {
                        "search_basic": "Lila Short"
                    }
                },
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                    asyncCallComplete = true;
                    result = data;
                    console.log(data)



                }
            });

        });

        // SECTION 2 - wait for the asynchronous call to complete
        waitsFor(function() {
            return asyncCallComplete !== false;
        });

        // SECTION 3 - perform tests
        return runs(function() {
            return expect(result['data']).toBeDefined();
        });
    });
    
 // test case for creation of lead
    it("can perform a successful ajax request on resource http://uat.maaxframe.com/crm/leads.json/ to create a new lead", function() {
        var asyncCallComplete, result,
            _this = this;
        // asyncCallComplete is set to true when the ajax call is complete
        asyncCallComplete = false;

        // result stores the result of the successful ajax call
        result = null;

        // SECTION 1 - call asynchronous function
        runs(function() {
            return $.ajax({
                url: "http://uat.maaxframe.com/crm/leads.json/",
                type: "POST",
                data: {"data[leads][first_name]": "Tony", "data[leads][last_name]": "Stark", "data[leads][office_email]": "officemail@examplel.com", "data[leads][personal_mail]": "personalmail@example.com", "data[leads][assistant_mail]": "assistantmail@example.com"},
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                    asyncCallComplete = true;
                    result = data;
                    console.log(data)
                }
            });

        });

        // SECTION 2 - wait for the asynchronous call to complete
        waitsFor(function() {
            return asyncCallComplete !== false;
        });

        // SECTION 3 - perform tests
        return runs(function() {
            return expect(result['lead_id']).toBeDefined();
        });
    });
// test case to logout via rest call
it("can perform a successful ajax request on resource http://uat.maaxframe.com/crm/leads.json/ to logout a user", function() {
        var asyncCallComplete, result,
            _this = this;
        // asyncCallComplete is set to true when the ajax call is complete
        asyncCallComplete = false;

        // result stores the result of the successful ajax call
        result = null;

        // SECTION 1 - call asynchronous function
        runs(function() {
            return $.ajax({
                    url: "http://uat.maaxframe.com/access_controls/users.json",
                    type: "GET",
                    data: {"_method": "logout"},
                    contentType: "application/x-www-form-urlencoded",
                    success: function(data) {
                        asyncCallComplete = true;
                    result = data;
                    console.log(data)
                        
                    }
                });

        });

        // SECTION 2 - wait for the asynchronous call to complete
        waitsFor(function() {
            return asyncCallComplete !== false;
        });

        // SECTION 3 - perform tests
        return runs(function() {
            return expect(result['message']).toEqual("Logged out successfully");
        });
    });



});
