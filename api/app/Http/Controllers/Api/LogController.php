<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Auth;

class LogController extends Controller
{
    
    /**
     * Update the specified resource in storage.
     *
     * @param  string $action
     * @param   array $data=null
     * @param   string $type=info
     *
     * @return Log
     */
    static public function save($action, $data=null, $type='info'){

        $register = array(
                        'user_id' => Auth::user()->id,
                        'user_email' => Auth::user()->email,
                        'action' => $action,
        );
        
        if(!empty($data)){
            $register['data']= $data;
        }
        
        $register = json_encode($register);
        
        switch($type){
            case 'notice':
                return Log::notice($register);
            
            case 'emergency':
                return Log::emergency($register);
            
            case 'critical':
                return Log::critical($register);
            
            case 'error':
                return Log::error($register);
            
            case 'warning':
                return Log::warning($register);
            
            case 'debug':
                return Log::debug($register);
            
            default :
                return Log::info($register);
        }
    }
    
    
}
