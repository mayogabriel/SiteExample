<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;

class UserAndRoleTableSeeder extends Seeder
{

    public function run()
    {
        
        $rols = array('freemium','client','reseller','administrator');
        
        /*$ownerRole = Role::create(['name' => 'freemium', 'display_name' => 'freemium']);
        $ownerRole = Role::create(['name' => 'client', 'display_name' => 'client']);
        $ownerRole = Role::create(['name' => 'reseller', 'display_name' => 'reseller']);
        $ownerRole = Role::create(['name' => 'administrator', 'display_name' => 'administrator']);*/



        $allPermissions = [];

        $adminRolePermission = Permission::create(['name' => 'auth.backend', 'display_name' => 'Login to backend']);
        array_push($allPermissions, $adminRolePermission->id);

        // Roles =================================
        $listRolePermission = Permission::create(['name' => 'roles.index', 'display_name' => 'List Roles']);
        $createRolePermission = Permission::create(['name' => 'roles.store', 'display_name' => 'Create Roles']);
        $editRolePermission = Permission::create(['name' => 'roles.update', 'display_name' => 'Edit Roles']);
        $deleteRolePermission = Permission::create(['name' => 'roles.destroy', 'display_name' => 'Delete Roles']);
        array_push($allPermissions, $listRolePermission->id, $createRolePermission->id, $editRolePermission->id, $listRolePermission->id, $deleteRolePermission->id);
        
        
        // Dashboard =================================
        /*foreach($rols as $rol){
            $dashboardPermission = Permission::create(['name' => 'dashboard.'.$rol, 'display_name' => 'Dashboard '.$rol]);
        }*/
        
        // Language =================================
        $listLanguagePermission = Permission::create(['name' => 'languages.index', 'display_name' => 'List Languages']);
        array_push($allPermissions, $listLanguagePermission->id);

        // Users =================================
        $listUserPermission = Permission::create(['name' => 'users.index', 'display_name' => 'List Users']);
        $createUserPermission = Permission::create(['name' => 'users.store', 'display_name' => 'Create Users']);
        $editUserPermission = Permission::create(['name' => 'users.update', 'display_name' => 'Edit Users']);
        $deleteUserPermission = Permission::create(['name' => 'users.destroy', 'display_name' => 'Delete Users']);
        array_push($allPermissions, $listUserPermission->id, $createUserPermission->id, $editUserPermission->id, $listUserPermission->id, $deleteUserPermission->id);
        
        // Permissions =================================
        $listPermissionsPermission = Permission::create(['name' => 'permissions.index', 'display_name' => 'List Permissions']);
        array_push($allPermissions, $listPermissionsPermission->id);
        
        // Payments =================================
        $listPaymentPermission = Permission::create(['name' => 'payments.index', 'display_name' => 'List Payments']);
        $createPaymentPermission = Permission::create(['name' => 'payments.store', 'display_name' => 'Create Payments']);
        array_push($allPermissions, $listPaymentPermission->id, $createPaymentPermission->id);
        
        // Plans =================================
        $listPlansPermission = Permission::create(['name' => 'plans.index', 'display_name' => 'List Plans']);
        $createPlansPermission = Permission::create(['name' => 'plans.show', 'display_name' => 'Show Plan']);
        array_push($allPermissions, $listPlansPermission->id, $createPlansPermission->id);
        
        // Contacts =================================
        
        // Custom Fields
        $listCustomFieldPermission = Permission::create(['name' => 'contacts.customFields.index', 'display_name' => 'List Custom Fields']);
        $createCustomFieldPermission = Permission::create(['name' => 'contacts.customFields.store', 'display_name' => 'Create Custom Fields']);
        $updateCustomFieldPermission = Permission::create(['name' => 'contacts.customFields.update', 'display_name' => 'Edit Custom Fields']);
        $deleteCustomFieldPermission = Permission::create(['name' => 'contacts.customFields.destroy', 'display_name' => 'Delete Custom Fields']);
        array_push($allPermissions, $listCustomFieldPermission->id, $createCustomFieldPermission->id, $updateCustomFieldPermission->id, $deleteCustomFieldPermission->id);

        // Lists
        $listContactsListsPermission = Permission::create(['name' => 'contacts.lists.index', 'display_name' => 'List Contacts Lists']);
        $createContactsListsPermission = Permission::create(['name' => 'contacts.lists.store', 'display_name' => 'Create Contacts Lists']);
        $editContactsListsPermission = Permission::create(['name' => 'contacts.lists.update', 'display_name' => 'Edit Contacts Lists']);
        $deleteContactsListsPermission = Permission::create(['name' => 'contacts.lists.destroy', 'display_name' => 'Delete Contacts Lists']);
        array_push($allPermissions, $listContactsListsPermission->id, $createContactsListsPermission->id, $editContactsListsPermission->id, $deleteContactsListsPermission->id);

        // Suscribers
        $listContactsSuscribersPermission = Permission::create(['name' => 'contacts.suscribers.index', 'display_name' => 'List Contacts suscribers']);
        $createContactsSuscribersPermission = Permission::create(['name' => 'contacts.suscribers.store', 'display_name' => 'Create Contacts suscribers']);
        $editContactsSuscribersPermission = Permission::create(['name' => 'contacts.suscribers.update', 'display_name' => 'Edit Contacts suscribers']);
        $deleteContactsSuscribersPermission = Permission::create(['name' => 'contacts.suscribers.destroy', 'display_name' => 'Delete Contacts suscribers']);
        array_push($allPermissions, $listContactsSuscribersPermission->id, $createContactsSuscribersPermission->id, $editContactsSuscribersPermission->id, $deleteContactsSuscribersPermission->id);
        
        // Subscriptions Form =================================
        $listSubscriptionsFormPermission = Permission::create(['name' => 'contacts.subscriptionsForm.index', 'display_name' => 'List Subscriptions Form']);
        $createSubscriptionsFormPermission = Permission::create(['name' => 'contacts.subscriptionsForm.store', 'display_name' => 'Create Subscription Form']);
        $editSubscriptionsFormPermission = Permission::create(['name' => 'contacts.subscriptionsForm.update', 'display_name' => 'Edit Subscription Form']);
        $deleteSubscriptionsFormPermission = Permission::create(['name' => 'contacts.subscriptionsForm.destroy', 'display_name' => 'Delete Subscription Form']);
        array_push($allPermissions, $listSubscriptionsFormPermission->id, $createSubscriptionsFormPermission->id, $editSubscriptionsFormPermission->id, $deleteSubscriptionsFormPermission->id);
         
        // Notifications =================================
        $showNotificationsPermission = Permission::create(['name' => 'notifications.index', 'display_name' => 'Notifications']);
        $showNotificationsContactsPermission = Permission::create(['name' => 'notifications.contacts.index', 'display_name' => 'Notifications Contacts']);
        $showNotificationsCampaignsPermission = Permission::create(['name' => 'notifications.campaigns.index', 'display_name' => 'Notifications Campaigns']);
        array_push($allPermissions, $showNotificationsPermission->id, $showNotificationsContactsPermission->id, $showNotificationsCampaignsPermission->id);
        
        // Reports =================================
        $showReportsPermission = Permission::create(['name' => 'reports.index', 'display_name' => 'Reports']);
        array_push($allPermissions, $showReportsPermission->id);
        
        // Campaigns =================================
        $listCampaiginsPermission = Permission::create(['name' => 'campaigns.index', 'display_name' => 'List campaigns']);
        $createCampaignsPermission = Permission::create(['name' => 'campaigns.store', 'display_name' => 'Create campaigns']);
        $editCampaignsPermission = Permission::create(['name' => 'campaigns.update', 'display_name' => 'Edit campaigns']);
        $deleteCampaignsPermission = Permission::create(['name' => 'campaigns.destroy', 'display_name' => 'Delete campaigns']);
        array_push($allPermissions, $listCampaiginsPermission->id, $createCampaignsPermission->id, $editCampaignsPermission->id, $deleteCampaignsPermission->id);
        
        // Templates =================================
        $listTemplatesPermission = Permission::create(['name' => 'templates.index', 'display_name' => 'List campaigns']);
        $createTemplatesPermission = Permission::create(['name' => 'templates.store', 'display_name' => 'Create campaigns']);
        $editTemplatesPermission = Permission::create(['name' => 'templates.update', 'display_name' => 'Edit campaigns']);
        $deleteTemplatesPermission = Permission::create(['name' => 'templates.destroy', 'display_name' => 'Delete campaigns']);
        array_push($allPermissions, $listTemplatesPermission->id, $createTemplatesPermission->id, $editTemplatesPermission->id, $deleteTemplatesPermission->id);
        
        foreach($rols as $r){
            $ownerRole = Role::create(['name' => $r, 'display_name' => $r]);
            $ownerRole->perms()->sync($allPermissions);
        }
        
        

        $user = User::create(['name' => 'admin', 'lastname' => 'Super', 'email' => 'admin@newsmaker.com', 'password' => 'adminmark', 'last_login' => date('Y-m-d H:i:s'), 'pool_id'=>1]);
        $user->attachRole($ownerRole);
    }

}