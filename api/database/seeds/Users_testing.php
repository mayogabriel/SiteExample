<?php

use Illuminate\Database\Seeder;

class Users_testing extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        
        /* Create Resseller */
        for($i=1; $i<= 10; $i++) {
            $this->createUser($faker, 0, 3, $i);
        }
        
        /* Create users by resseller */
        for($i=1; $i<= 10; $i++) {
            for($j=1; $j<=5; $j++) {
                $this->createUser($faker, $i, 2, $i);
            }
        }
        
        /* Create users by Client */
        for($i=1; $i<= 20; $i++) {
            $this->createUser($faker, 0, 2, $i);
        }
    }
    
    private function createUser($faker, $parent, $role, $i) {
        $u = new \App\Models\User();
        $u->parent_id = $parent;
        $u->email = $faker->email.'.'.$i;
        $u->lastname = $faker->lastName;
        $u->firstname = $faker->firstName;
        $u->status = rand(0, 1);
        $u->language_id = rand(1, 2);
        $u->timezone = $faker->timezone;
        $u->gender = ((rand(0,1))?'M':'F');
        $u->address = $faker->address;
        $u->zip_code = $faker->postcode;
        $u->phone = $faker->phoneNumber;
        $u->cellphone = $faker->phoneNumber;
        $u->pool_id = rand(1,10);
        $u->save();

        $u->roles()->sync(array($role));
    }
}
