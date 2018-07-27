<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    
    const users_testing = 80;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        
        $this->call(PoolsSeeder::class);
        $this->command->info('PoolsTableSeeder table seeded!');

        $this->call(UserAndRoleTableSeeder::class);
        $this->command->info('UserAndRoleTableSeeder table seeded!');

        $this->call(SettingTableSeeder::class);
        $this->command->info('Setting table seeded!');
        
        $this->call(PlansSeeder::class);
        $this->command->info('Plan Types table seeded!');
        
        if(config('app.debug')){
            $this->call(Users_testing::class);
            $this->command->info('Store in table users testing seeded!');
        }
        
        $this->call(PaymentsTypesSeeder::class);
        $this->command->info('PAyments Types table seeded!');
        
        $this->call(LanguageCompleteTableSeeder::class);
        $this->command->info('Language complate table seeded!');
                
        if(config('app.debug')) {
            $this->call(CampaignsSeeder::class);
            $this->command->info('Campaigns table seeded!');
        
            $this->call(PeriodsSeeder::class);
            $this->command->info('Periods table seeded!');
            
            $this->call(ContactListSeeder::class);
            $this->command->info('Contact list table seeded!');
        }

        Model::reguard();
    }
}
