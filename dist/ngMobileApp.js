/*!
 * ngMobileApp
 * v0.0.1-alpha
 * Copyright 2016 Mattheus Pirovani Roriz Gonçalves (mattheus.pirovani@gmail.com)
 */
(function () {

    angular.module('ngMobileApp', [
        'ngAzureAppMobile.plugins'
    ]);

    angular.module('ngMobileApp.plugins', [
        'ngMobileApp.plugins.ngAzureAppMobileClient'
    ]);

    angular.module('ngMobileApp.plugins.ngAzureAppMobileClient', [])

        .factory('$mobileAppClient', ['$q', function ($q) {

            var mobileAppsClient;

            var decoratePromise = function (promise) {
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };

                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };
            };

            var connect = function (mobAppUrl) {
                var q = $q.defer();

                mobileAppsClient = new WindowsAzure.MobileServiceClient(mobAppUrl);

                if (mobileAppsClient != null)
                    q.resolve("Conected");
                else
                    q.reject("Error");

                return q.promise;
            }

            var getTable = function (tableName) {

                var q = $q.defer();

                var table = mobileAppsClient.getTable(tableName);

                q.resolve(table);

                return q.promise;

            }

            var invokeApi = function (apiName, options) {

                var q = $q.defer();
                var promise = q.promise;

                function ok(value) {
                    q.resolve(value);
                }

                function errorCallback(error) {
                    q.reject(new Error(error));
                }

                invokeApi = mobileAppsClient.invokeApi(apiName, options);

                invokedApi.then(ok, errorCallback);

                this.decoratePromise(promise);

                return promise;
            }

            var getSyncContext = function () {

                var q = $q.defer();

                var syncContext = mobileAppsClient.getSyncContext();

                q.resolve(syncContext);

                return q.promise;
            }

            var getSyncTable = function (tableName) {

                var q = $q.defer();

                var syncContext = mobileAppsClient.getSyncTable(tableName);

                q.resolve(syncContext);

                return q.promise;
            }

            var login = function () {

            }

            var loginWithOptions = function () {

            }

            var logout = function () {

            }

            return {
                connect: connect,
                getTable: getTable,
                invokeApi: invokeApi,
                getSyncContext: getSyncContext,
                getSyncTable: getSyncTable,
                login: login,
                loginWithOptions: loginWithOptions,
                logout: logout

            }

        }]);

});