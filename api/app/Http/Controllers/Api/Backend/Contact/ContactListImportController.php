<?php

namespace App\Http\Controllers\Api\Backend\Contact;

use Auth;
use Input;
use Storage;
use SplFileObject;
use App\Exceptions\NotFoundException;
use App\Http\Requests;
use App\Http\Controllers\Api\Backend\ApiController;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class ContactListImportController extends ApiController
{
    
    protected $disk = 'local';

    //protected $numRowsViews = 2;
    
    
    /**************************************/
    /*          Private Methods           */
    /**************************************/
    
    /**
      * 
      * 
      */
    private function prepareFolder() {
        $this->destinationPath =  storage_path() . '/uploads/import/'. Auth::user()->id .'/';
        Storage::makeDirectory($this->destinationPath);
    }
    
    
    /**
     * Returns the file rows per amount.
     *
     * @param  File $File
     * @return Response
     */
    protected function readFile($File, $FileExtension) {
        try {
            $file = new SplFileObject($File);  
            
            if(strtolower($FileExtension) === 'csv')  // Set Separator
                $file->setFlags(SplFileObject::READ_CSV);
            
            $firstLine = (string) $file->fgets(); // Obtengo la 1ra Linea
            $row  = (array) explode(',', $firstLine); // Separo los campos
            
            return $row;
        } catch (Exception $e) {
            throw new NotFoundException($e->getMessage());
        }
    }
    
    
     /**
      * Returns the file rows per amount.
      *
      * @param  Request $request
      * @return Response
      */
    private function storeByFile($request)  {
        $InputFile = Input::file('file');
        
        $fileExtension = $InputFile->getClientOriginalExtension();
        
        $resultRows = $this->readFile($InputFile, $fileExtension);
        
        // Generate Folder -> Me
        $filename = $InputFile->getFilename().'_'.uniqid().'.'.$fileExtension;
        $InputFile->move($this->destinationPath, $filename);
        
        // New class File
        $entryFile = new \stdClass();
        $entryFile->mime = $InputFile->getClientMimeType();
        $entryFile->original_filename = $InputFile->getClientOriginalName();
        $entryFile->filename = $filename;
        $entryFile->realPath = $InputFile->getRealPath();
        
        return ['Columns' => $resultRows, 'File' => $entryFile];
    }
    
    /**
     * Returns the file rows per amount.
     *
     * @param  Request $request
     * @return Response
     */
    
    private function storeByCopyPaste($request)  {
        
    }
    
    
    
    
    
    /**************************************/
    /*          Public Methods           */
    /**************************************/

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getListToImport()
    {
        
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request, $method)
    {
        $ListID = input::get('listID');
        
        try {
            $this->prepareFolder();
            $methodResolve = camel_case('storeBy '. $method);
            $resultRows = $this->{$methodResolve}($request); // resolve method
            
            // Save File 
            
            
            return response()->json(['success' => true ,
                                     'result' => $resultRows,
                                     'listID' => $ListID
                                    ], 200);
        
        } catch (NotFoundException $e) {
            //throw new NotFoundException('Hubo un error al procesar el archivo. Si el error persiste, Por favor comuniquese con Soporte.', null, 400);
            throw new NotFoundException($e->getMessage());
        }
    }
}
