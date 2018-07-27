<?php

Route::group(['prefix' => 'api'], function () {

    Route::group(['prefix' => 'admin'], function () {

        //Route::post('slug', 'Api\HelperController@slug');


        //AUTH =================================

        Route::post('auth/signup', ['uses' => 'Api\Backend\AuthController@postSignUp', 'as' => 'auth.signup']);
        Route::post('auth/login', ['uses' => 'Api\Backend\AuthController@postLogin', 'as' => 'auth.login']);
        Route::post('auth/logout', ['uses' => 'Api\Backend\AuthController@postLogout', 'as' => 'auth.logout']);
        Route::post('auth/refresh-token', ['uses' => 'Api\Backend\AuthController@postRefreshToken', 'as' => 'auth.refresh']);

        Route::group(['middleware' => ['auth.user']], function () {
            
            Route::get('me', 'Api\Backend\UserController@index');
            
            //Languages =================================
            Route::get('languages', ['uses' => 'Api\LanguageController@index', 'as' => 'language.index', 'middleware' => 'permission:languages.index']);

            //Users =================================
            Route::get('users', ['uses' => 'Api\UserController@index', 'as' => 'users.index', 'middleware' => 'permission:users.index']);
            Route::get('users/export', ['uses' => 'Api\UserController@export', 'as' => 'users.export', 'middleware' => 'permission:users.index']);
            Route::get('users/{id}', ['uses' => 'Api\UserController@show', 'as' => 'users.show', 'middleware' => 'permission:users.index']);
            Route::post('users', ['uses' => 'Api\UserController@store', 'as' => 'users.store', 'middleware' => 'permission:users.store']);
            Route::put('users/{id}', ['uses' => 'Api\UserController@update', 'as' => 'users.update', 'middleware' => 'permission:users.update']);
            Route::delete('users/{id}', ['uses' => 'Api\UserController@destroy', 'as' => 'users.destroy', 'middleware' => 'permission:users.destroy']);

            // Periods
            Route::get('periods/me', ['uses' => 'Api\Backend\Period\PeriodController@index', 'as' => 'period.index', 'middleware' => 'permission:users.index']);
            Route::get('periods/{id?}', ['uses' => 'Api\Backend\Period\PeriodController@index', 'as' => 'period.index', 'middleware' => 'permission:users.index']);
            
            
            //Roles =================================
            Route::get('roles', ['uses' => 'Api\RoleController@index', 'as' => 'roles.index', 'middleware' => 'permission:roles.index']);
            Route::get('roles/{id}', ['uses' => 'Api\RoleController@show', 'as' => 'roles.show', 'middleware' => 'permission:roles.index']);
            Route::post('roles', ['uses' => 'Api\RoleController@store', 'as' => 'roles.store', 'middleware' => 'permission:roles.store']);
            Route::put('roles/{id}', ['uses' => 'Api\RoleController@update', 'as' => 'roles.update', 'middleware' => 'permission:roles.update']);
            Route::delete('roles/{id}', ['uses' => 'Api\RoleController@destroy', 'as' => 'roles.destroy', 'middleware' => 'permission:roles.destroy']);

            //Permissions =================================
            Route::get('permissions', ['uses' => 'Api\PermissionController@index', 'as' => 'permissions.index', 'middleware' => 'permission:permissions.index']);
            Route::get('permissions/{id}', ['uses' => 'Api\PermissionController@show', 'as' => 'permissions.show', 'middleware' => 'permission:permissions.index']);
            
            //Payments =================================
            Route::get('payments', ['uses' => 'Api\Backend\Payment\PaymentController@index', 'as' => 'payments.index', 'middleware' => 'permission:payments.index']);
            Route::post('payments', ['uses' => 'Api\Backend\Payment\PaymentController@store', 'as' => 'payments.store', 'middleware' => 'permission:payments.show']);
            
            //Plans =================================
            Route::get('plans', ['uses' => 'Api\Backend\Plans\PlanController@index', 'as' => 'plans.index', 'middleware' => 'permission:plans.index']);
            Route::get('plans/{id}', ['uses' => 'Api\Backend\Plans\PlanController@show', 'as' => 'plans.store', 'middleware' => 'permission:plans.show']);
            
            //Contacts =================================
            
            //Custom Fields
            Route::get('contacts/customFields', ['uses' => 'Api\Backend\Contact\CustomFieldController@index', 'as' => 'contacts.customFields.index', 'middleware' => 'permission:contacts.customFields.index']);
       
            // Route::get('contacts/customFields/fieldsTypes', ['uses' => 'Api\Backend\Contact\CustomFieldController@getFieldsTypes', 'as' => 'contacts.customFields.types', 'middleware' => 'permission:contacts.customFields.index']);
            Route::get('contacts/customFields/{id}', ['uses' => 'Api\Backend\Contact\CustomFieldController@show', 'as' => 'contacts.customFields.index', 'middleware' => 'permission:contacts.customFields.index']);
            Route::post('contacts/customFields', ['uses' => 'Api\Backend\Contact\CustomFieldController@store', 'as' => 'contacts.customFields.store', 'middleware' => 'permission:contacts.customFields.store']);
            Route::put('contacts/customFields/{id}', ['uses' => 'Api\Backend\Contact\CustomFieldController@update', 'as' => 'contacts.customFields.update', 'middleware' => 'permission:contacts.customFields.update']);
            Route::delete('contacts/customFields/{id}', ['uses' => 'Api\Backend\Contact\CustomFieldController@destroy', 'as' => 'contacts.customFields.destroy', 'middleware' => 'permission:contacts.customFields.destroy']);
            
            //List
            Route::get('contacts/lists',['uses' => 'Api\Backend\Contact\ContactListController@index', 'as' => 'contacts.lists.index', 'middleware' => 'permission:contacts.lists.index']);
            Route::get('contacts/lists/{id}',['uses' => 'Api\Backend\Contact\ContactListController@show', 'as' => 'contacts.lists.show', 'middleware' => 'permission:contacts.lists.index']);
            Route::post('contacts/lists',['uses' => 'Api\Backend\Contact\ContactListController@store', 'as' => 'contacts.lists.store', 'middleware' => 'permission:contacts.lists.store']);            
            Route::put('contacts/lists/{id}',['uses' => 'Api\Backend\Contact\ContactListController@update', 'as' => 'contacts.lists.update', 'middleware' => 'permission:contacts.lists.update']);
            Route::delete('contacts/lists/{id}',['uses' => 'Api\Backend\Contact\ContactListController@destroy', 'as' => 'contacts.lists.destroy', 'middleware' => 'permission:contacts.lists.destroy']);
            
            Route::post('contacts/lists/import/upload/{method?}',['uses' => 'Api\Backend\Contact\ContactListImportController@store', 'as' => 'lists.import.upload'])->defaults('method', 'file');
            
            //Suscriber
            Route::get('contacts/suscribers',['uses' => 'Api\Backend\Contact\SuscriberController@index', 'as' => 'contacts.suscribers.index', 'middleware' => 'permission:contacts.suscribers.index']);
            Route::get('contacts/suscribers/{id}',['uses' => 'Api\Backend\Contact\SuscriberController@show', 'as' => 'contacts.suscribers.show', 'middleware' => 'permission:contacts.suscribers.index']);
            Route::post('contacts/suscribers',['uses' => 'Api\Backend\Contact\SuscriberController@store', 'as' => 'contacts.suscribers.store', 'middleware' => 'permission:contacts.suscribers.store']);
            Route::put('contacts/suscribers/{id}',['uses' => 'Api\Backend\Contact\SuscriberController@update', 'as' => 'contacts.suscribers.update', 'middleware' => 'permission:contacts.suscribers.update']);
            Route::delete('contacts/suscribers/{id}',['uses' => 'Api\Backend\Contact\SuscriberController@destroy', 'as' => 'contacts.suscribers.destroy', 'middleware' => 'permission:contacts.suscribers.destroy']);
            
            //Notification =================================
            Route::get('notifications',['uses' => 'Api\Backend\Notification\NotificationController@index', 'as' => 'notifications.index', 'middleware' => 'permission:notifications.index']);
            Route::get('notifications/contacts',['uses' => 'Api\Backend\Notification\ContactController@index', 'as' => 'notifications.contacts.index', 'middleware' => 'permission:notifications.contacts.index']);
            Route::get('notifications/contacts/{id}',['uses' => 'Api\Backend\Notification\ContactController@show', 'as' => 'notifications.contacts.show', 'middleware' => 'permission:notifications.contacts.index']);
            Route::get('notifications/camapigns',['uses' => 'Api\Backend\Notification\CampaignController@index', 'as' => 'notifications.campaigns.index', 'middleware' => 'permission:notifications.campaigns.index']);
            Route::get('notifications/campaigns/{id}',['uses' => 'Api\Backend\Notification\CampaignController@show', 'as' => 'notifications.campaigns.show', 'middleware' => 'permission:notifications.campaigns.index']);
            
            // Subscription Form
            Route::get('contacts/subscriptionForm',['uses' => 'Api\Backend\Contact\SubscriptionFormController@index', 'as' => 'contacts.subscriptionsForm.index', 'middleware' => 'permission:contacts.subscriptionsForm.index']);
            Route::get('contacts/subscriptionForm/{id}',['uses' => 'Api\Backend\Contact\SubscriptionFormController@show', 'as' => 'contacts.subscriptionsForm.show', 'middleware' => 'permission:contacts.subscriptionsForm.index']);
            Route::post('contacts/subscriptionForm',['uses' => 'Api\Backend\Contact\SubscriptionFormController@store', 'as' => 'contacts.subscriptionsForm.store', 'middleware' => 'permission:contacts.subscriptionsForm.store']);
            Route::put('contacts/subscriptionForm/{id}',['uses' => 'Api\Backend\Contact\SubscriptionFormController@update', 'as' => 'contacts.subscriptionsForm.update', 'middleware' => 'permission:contacts.subscriptionsForm.update']);
            Route::delete('contacts/subscriptionForm/{id}',['uses' => 'Api\Backend\Contact\SubscriptionFormController@destroy', 'as' => 'contacts.subscriptionsForm.destroy', 'middleware' => 'permission:contacts.subscriptionsForm.destroy']);
            
            
            //Reports =================================
            
            
            //Campaign =================================
            Route::get('campaigns',['uses' => 'Api\Backend\Campaign\CampaignController@index', 'as' => 'campaigns.index', 'middleware' => 'permission:campaigns.index']);
            Route::get('campaigns/{id}',['uses' => 'Api\Backend\Campaign\CampaignController@show', 'as' => 'campaigns.show', 'middleware' => 'permission:campaigns.index']);
            Route::post('campaigns',['uses' => 'Api\Backend\Campaign\CampaignController@store', 'as' => 'campaigns.store', 'middleware' => 'permission:campaigns.store']);
            Route::put('campaigns/{id}',['uses' => 'Api\Backend\Campaign\CampaignController@update', 'as' => 'campaigns.update', 'middleware' => 'permission:campaigns.update']);
            Route::delete('campaigns/{id}',['uses' => 'Api\Backend\Campaign\CampaignController@destroy', 'as' => 'campaigns.destroy', 'middleware' => 'permission:campaigns.destroy']);
            
            //Newsletter =================================
            Route::get('templates',['uses' => 'Api\Backend\Newsletter\TemplateController@index', 'as' => 'templates.index', 'middleware' => 'permission:templates.index']);
            Route::get('templates/{id}',['uses' => 'Api\Backend\Newsletter\TemplateController@show', 'as' => 'templates.show', 'middleware' => 'permission:templates.index']);
            Route::post('templates',['uses' => 'Api\Backend\Newsletter\TemplateController@store', 'as' => 'templates.store', 'middleware' => 'permission:templates.store']);
            Route::put('templates/{id}',['uses' => 'Api\Backend\Newsletter\TemplateController@update', 'as' => 'templates.update', 'middleware' => 'permission:campaigns.update']);
            Route::delete('templates/{id}',['uses' => 'Api\Backend\Newsletter\TemplateController@destroy', 'as' => 'templates.destroy', 'middleware' => 'permission:campaigns.destroy']);
            
        });
    });
    
    
    Route::group(['middleware' => ['before' => 'csrf']], function () {

        Route::get('/media/{type}/{yearAndMonth}/{day}/{filename}', 'Api\MediaController@get');

        Route::group(['middleware' => 'App\Http\Middleware\ThrottleMiddleware:600,5', 'prefix' => ''], function () {
        });
    });
});

Route::get('/testEmail', function(){
    return view('emails.singup');
});
Route::get('/test', ['uses'=>'Api\Backend\Contact\SuscriberController@create']);

Route::any('{path?}', function () {
    View::addExtension('html', 'php');
    View::addNamespace('backendTheme', public_path() . '/assets-backend');

    return view::make('backendTheme::index');

})->where("path", ".+");


//List Import *** new
