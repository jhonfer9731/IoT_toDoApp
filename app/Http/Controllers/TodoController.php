<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use App\User;
use Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(){
    $this->middleware('auth'/*, ["except" =>['index', 'show', 'store']]*/);
    }


    public function index(Request $request)
    {
        if($usuarioLoggedId = auth()->user()->id)
        {
            $user = User::find($usuarioLoggedId);
        }
        $todos = $user->todos()->orderBy('created_at','asc')->get();
        //$todos = Todo::orderBy('created_at','asc')->get();
        //return $todos;
        //$cookie = $request->cookie('token');
        //return $cookie;
        return view('todos.index')->with('todos',$todos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data= $request->json()->all();
        $rules = [
            'actividad' => 'required',
            'completada' => 'required'
        ];
        $validator = Validator::make($data,$rules);
        if($validator->passes()){
            $todo = new Todo();
            $todo->actividad = $data["actividad"];
            $todo->user_id = auth()->user()->id;
            $todo->completada = $data["completada"];
            $todo->save();
            return response()->json($data,200);
        }else{
            return $validator->errors()->all();
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
