<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Notification;

class NotificationTransformer extends TransformerAbstract
{

    public function transform(Notification $item)
    {
        return [
            'id'            => (int)$item->id,
            'description'   => $item->description,
            'status'        => (int)$item->status,
            'created_at'    => $item->created_at,
            'updated_at'    => $item->updated_at,
        ];
    }

}


