<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\CustomField;

class CustomFieldTransformer extends TransformerAbstract
{

    public function transform(CustomField $cf)
    {
        
        return [
            'id'                        => (int)$cf->id,
            'name'                      => $cf->name,
            'value'                     => $cf->value,
            'required'                  => (boolean)$cf->required,
            'field_type'                => $cf->field_type,
            'validation'                => $cf->validation,
            'validation_custom_regex'   => $cf->validation_custom_regex
        ];
    }
}


