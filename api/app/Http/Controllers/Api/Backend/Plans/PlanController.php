<?php

namespace App\Http\Controllers\Api\Backend\Plans;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Plan;
use Input;
use App\Transformers\PlanTransformer;
use App\Http\Controllers\Api\ApiController;

class PlanController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $plans = Plan::query();
        
        if (Input::has('payment_type')) {
            $plans = $plans->where('payment_type_id', '=', Input::get('payment_type'));
        }
        
        $plans = $plans->paginate(Input::get('limit', 30));
        return response()->paginator($plans, new PlanTransformer);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $plan = Plan::find($id);
        $this->checkExist($plan);

        return response()->item($plan, new PlanTransformer);
    }

}
