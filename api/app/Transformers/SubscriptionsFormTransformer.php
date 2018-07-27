<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\SubscriptionsForm;

class SubscriptionsFormTransformer extends TransformerAbstract
{
    
    public function transform(SubscriptionsForm $item)
    {
        return [
                'id'                            => $item->id,
                'name'                          => $item->name,
                'lists_ids'                     => $item->lists_ids,
                'custom_fields_ids'             => $item->custom_fields_ids,
                'custom_fields_ids_required'    => $item->custom_fields_ids_required,
                'design_data'                   => $item->design_data
        ];
    }
}


