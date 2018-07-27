<?php

use Illuminate\Database\Seeder;

class PeriodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $faker = Faker\Factory::create();
        //
        for($i=1; $i<=DatabaseSeeder::users_testing; $i++){
            
            $months = $period = new DatePeriod(
                                        new DateTime('2015-10-01'),
                                        new DateInterval('P1M'),
                                        new DateTime('2017-10-30')
                                );
            
            foreach($months as $m){
                $m= date_format($m, 'Y-m-d');

                $p = new \App\Models\Period();
                $p->user_id = $i;
                $p->start_date = substr($m, 0,4).'-'.substr($m,5,2).'-01';
                $p->end_date = substr($m, 0,4).'-'.substr($m,5,2).'-30';
                $p->quota = mt_rand(10000, 500000);
                $p->credit = mt_rand(10000, 500000);
                $p->consumed = mt_rand(100, 20000);
                $p->save();
            }

        }
    }
}
