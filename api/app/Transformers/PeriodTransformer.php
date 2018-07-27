<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Period;

class PeriodTransformer extends TransformerAbstract
{

    public function transform(Period $period)
    {
        
        return [
            'id'                        => (int)$period->id,
            'start_date'                => $period->start_date,
            'end_date'                  => $period->end_date,
            'quota'                     => (int)$period->quota,
            'credit'                    => (int)$period->credit,
            'consumed'                  => (int)$period->consumed
        ];
    }

}


