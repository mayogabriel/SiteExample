<?php

namespace App\Http\Controllers\Api\Backend\Period;
use Input;
use Illuminate\Http\Request;
use App\Models\Period;
use App\Facades\UserAuth;
use App\Http\Requests;
use App\Transformers\PeriodTransformer;
use App\Http\Controllers\Api\Backend\ApiController;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class PeriodController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request, $id = null){
        

        $user_id = ($id) ? $id : UserAuth::user()->id ;
        
        $periods = Period::query()
                                ->where('user_id','=',$user_id)
                                ->orderBy('periods.id' , 'desc')
                                ->paginate(Input::get('limit', 30));

        $this->checkExist($periods, 'Hubo un error al recuperar los datos.');
        
        return response()->paginator($periods, new PeriodTransformer());
    }
    
    
    static public function getPeriod($date,$user_id){
        $p = DB::table('periods')
                ->where('start_date','<=',$date)
                ->where('end_date','>=',$date)
                ->where('user_id','=',$user_id)
                ->first();
        
        return $p;
    }
    
    static public function getPeriodToArray($date, $user_id){
        $period = self::getPeriod($date, $user_id);
        if(!empty($period))
            return $period;
        else
            return null;
    }
}
