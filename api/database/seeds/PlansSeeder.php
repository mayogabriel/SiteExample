<?php

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans = array(
            '1' => array(
                '5000' => 346,
                '10000' => 415,
                '20000' => 639,
                '30000' => 819,
                '40000' => 945
            ),
            '2'=>array(
                '5000' => 691,
                '10000' => 829,
                '20000' => 1279,
                '30000' => 1639,
                '40000' => 1889
            )
        );
        
        foreach($plans as $typePlan=>$cants){
            foreach($cants as $c=>$v){
                $plan = new Plan();
                $plan->payment_type_id = $typePlan;
                $plan->name = $c;
                $plan->status = 1;
                $plan->quota = $c;
                $plan->value= $v;
                $plan->save();
            }
        }
    }
}
