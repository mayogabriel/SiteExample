<?php

use Illuminate\Database\Seeder;
use App\Models\Pool;

class PoolsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=1; $i<=10; $i++){
            $p = new Pool();
            $p->name = 'Pool '.$i;
            $p->status = rand(0, 1);
            $p->save();
        }
    }
}
