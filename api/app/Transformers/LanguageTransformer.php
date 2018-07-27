<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Language;

class LanguageTransformer extends TransformerAbstract
{
    
    public function transform(Language $item)
    {
        return [
            'id'            =>  (int)$item->id,
            'name'          =>  $item->name,
            'code'          =>  $item->code
        ];
    }
}