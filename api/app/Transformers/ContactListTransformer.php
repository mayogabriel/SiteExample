<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\ContactList;

class ContactListTransformer extends TransformerAbstract
{

    public function transform(ContactList $cl)
    {
        
        return [
            'id'                        => (int)$cl->id,
            'user_id'                   => (int)$cl->user_id,
            'name'                      => $cl->name,
            'status'                    => (boolean)$cl->status,
            'total_contacts'            => (int)$cl->total_contacts,
            'total_actives'             => (int)$cl->total_actives,
            'total_inactives'           => (int)$cl->total_inactives,
            'total_complaints'          => (int)$cl->total_compaints,
            'total_bounced'             => (int)$cl->total_bounced
        ];
    }

}


