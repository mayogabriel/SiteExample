<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Plan;

class PlanTransformer extends TransformerAbstract
{

    public function transform(Plan $item)
    {
        return [
            'id'                => (int)$item->id,
            'payment_type_id'   => (int)$item->payment_type_id,
            'payment_type_name' => $item->payment_type_name,
            'name'              => $item->name,
            'status'            => $item->status,
            'quota'             => $item->quota,
            'value'             => $item->value,
            'expiration_time'   => $item->expiration_time,
            'deleted_at'        => $item->deleted_at,
            'created_at'        => $item->created_at,
            'updated_at'        => $item->updated_at,
        ];
    }
}


