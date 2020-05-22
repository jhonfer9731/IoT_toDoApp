<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Todo;
use Validator;
use Auth;



class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     /* Me Muestra todos los ToDo disponibles*/

    public function index(Request $request)
    {
        if($request->isJson()){
            $todos = Todo::orderBy('created_at','desc')->get();
            return response()->json($todos,200);
        }
            return response()->json([ "error"=> "no es json"],401);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     /* Guarda un todo en la base de datos */

    public function store(Request $request)
    {
        if($request->isJson()){
            $data = $request->json()->all();
            $rules = [
                'actividad' => 'required',
                'completada' => 'boolean|required',
                'user_id' => 'integer|nullable'
            ];
            $validator = Validator::make($data,$rules);
            if($validator->passes()){
                //se guarda en la base de datos
                $todo = new Todo();
                $todo->actividad = $data["actividad"];
                $todo->completada = $data["completada"];
                $todo->user_id = 0;
                $todo->save();
                return response()->json(["data" => $data, "id" => $todo->id],201);
            }else{
                return response()->json($validator->errors()->all(),403);
            }
        }else{
            return response()->json([ "error"=> "no es json"],401); 
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $todo = Todo::find($id);
        return response()->json($todo,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if($request->isJson()){
            $data = $request->json()->all();
            $rules = [
                'actividad' => 'required',
                'completada' => 'boolean|required',
                'user_id' => 'integer|required'
            ];
            $validator = Validator::make($data,$rules);
            $todo = Todo::find($id);
            if(!isset($todo)){
                return response()->json([ "mensaje" => "No existe este ToDo"],401);
            }
            if($validator->passes()){
                //se guarda en la base de datos
                $todo->actividad = $data["actividad"];
                $todo->completada = $data["completada"];
                $todo->user_id = $data["user_id"];
                $todo->save();
                return response()->json($data,201);
            }else{
                $respuesta = $validator->errors()->all();
                return response()->json($respuesta,403);
            }

        }else{
            return response()->json(["error"=>"No es json"],401);
        }
        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $todo = Todo::find($id);
        if(!isset($todo))
        {
            return response()->json([ "mensaje" => "No existe este ToDo"],401);
        }
        $todo->delete();
        return response()->json(["borrado" => true, "id"=>$id],200);
    }
}
