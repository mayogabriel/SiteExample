<?php

use Illuminate\Database\Seeder;
use App\Models\ContactList;

class ContactListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        
        for($i=1; $i<=DatabaseSeeder::users_testing; $i++){
            $contactList_cant = mt_rand(3,10);
            
            for($j=0; $j<=$contactList_cant; $j++){
                $c = new ContactList();
                $c->user_id = $i;
                $c->name = $faker->catchPhrase;
                $c->total_contacts = mt_rand(100, 5000000);
                $c->total_actives = mt_rand(100, $c->total_contacts);
                $c->total_inactives = mt_rand(100, $c->total_contacts);
                $c->total_complaints = mt_rand(50, $c->total_contacts);
                $c->total_bounced = mt_rand(50, $c->total_contacts);
                $c->save();
            }
        }
    }
}
