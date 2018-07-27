<?php

use Illuminate\Database\Seeder;
use App\Models\PaymentType;

class PaymentsTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = array('Abono', 'Creditos');
        
        foreach ($types as $type){
            $payment_type = new PaymentType();
            $payment_type->name = $type;
            $payment_type->save();
        }
    }
}
