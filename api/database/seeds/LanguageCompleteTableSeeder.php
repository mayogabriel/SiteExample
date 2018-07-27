<?php

use Illuminate\Database\Seeder;

class LanguageCompleteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert([
                    ['code'=>'es', 'name'=>'Spanish'],
                    ['code'=>'en', 'name'=>'English']
                ]);
    }
}
