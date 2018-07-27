<?php

use Illuminate\Database\Seeder;
use App\Models\Campaign;

class CampaignsSeeder extends Seeder
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
            $campaigns_cant = mt_rand(10,50);
            
            for($j=0; $j<=$campaigns_cant; $j++){
                $c = new Campaign();
                $c->user_id = $i;
                $c->status = mt_rand(0, 1);
                $c->name = $faker->catchPhrase;
                $c->subject = $faker->text(mt_rand(10, 50));
                $c->body = $faker->text(mt_rand(100, 300));
                $c->scheduled = $faker->dateTimeThisYear();
                $c->from_name = $faker->lastName;
                $c->from_email = $faker->companyEmail;
                $c->reply_name = $faker->lastName;
                $c->reply_email = $faker->companyEmail;
                $c->save();
            }
        }
        
    }
}
